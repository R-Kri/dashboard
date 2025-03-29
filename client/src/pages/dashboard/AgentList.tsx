import { useState, useEffect } from "react";
import { UserCheck, Pencil, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export default function AgentList() {
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [agents, setAgents] = useState([]);
    const [agentDetails, setAgentDetails] = useState({
        id: null,
        name: "",
        address: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/agents`);
            if (!response.ok) throw new Error("Failed to fetch agents");

            const data = await response.json();
            console.log("Fetched agents:", data); // Log the entire agent data
            setAgents(data);
        } catch (error) {
            console.error("Error fetching agents:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAgentDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const url = isEditing
                ? `${API_BASE_URL}/api/agents/${agentDetails.id}`  
                : `${API_BASE_URL}/api/agents`;

            const method = isEditing ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(agentDetails)
            });

            if (!response.ok) throw new Error("Failed to process request");

            alert(`Agent ${isEditing ? "updated" : "registered"} successfully!`);
            setIsOpen(false);
            setAgentDetails({ id: null, name: "", address: "", phone: "", email: "" });
            fetchAgents(); // Refresh agents after adding/updating
        } catch (error) {
            console.error("Error processing request:", error);
            alert("Failed to process request.");
        }
    };

    const handleEdit = (agent) => {
        setAgentDetails(agent);
        setIsEditing(true);
        setIsOpen(true);
    };

    const handleDelete = async (id) => {
        console.log("Attempting to delete agent with ID:", id, typeof id); // Log the ID and its type

        if (!window.confirm("Are you sure you want to delete this agent?")) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/agents/${id}`, {
                method: "DELETE"
            });

            // Try to get the response body
            const responseData = await response.json().catch(() => ({}));
            console.log("Delete response:", response.status, responseData);

            if (!response.ok) {
                throw new Error(responseData.error || "Failed to delete agent");
            }

            alert("Agent deleted successfully!");
            fetchAgents();
        } catch (error) {
            console.error("Error deleting agent:", error);
            alert(`Failed to delete agent: ${error.message}`);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                        <UserCheck className="h-6 w-6 text-purple-600" />
                    </div>
                    <h1 className="text-2xl font-medium">Agent List</h1>
                </div>
                <button
                    onClick={() => {
                        setIsEditing(false);
                        setIsOpen(true);
                    }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Add New Agent
                </button>
            </div>

            {/* Display agent list */}
            <div className="glass rounded-2xl border border-border overflow-hidden p-6">
                {isLoading ? (
                    <div className="text-center py-12">Loading agents...</div>
                ) : agents.length > 0 ? (
                    <ul className="space-y-4">
                        {agents.map((agent) => (
                            <li key={agent._id} className="border p-4 rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                                    <p className="text-sm text-gray-600">{agent.address}</p>
                                    <p className="text-sm text-gray-600">{agent.phone}</p>
                                    <p className="text-sm text-gray-600">{agent.email}</p>
                                </div>
                                <div className="space-x-3">
                                    <button onClick={() => handleEdit(agent)} className="text-blue-500 hover:text-blue-700">
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(agent._id)} className="text-red-500 hover:text-red-700">
                                        <Trash className="h-5 w-5" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-12">No agents registered yet.</div>
                )}
            </div>

            {/* Pop-up form */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit Agent" : "Add New Agent"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input name="name" value={agentDetails.name} onChange={handleChange} placeholder="Agent Name" />
                        <Input name="address" value={agentDetails.address} onChange={handleChange} placeholder="Address" />
                        <Input name="phone" value={agentDetails.phone} onChange={handleChange} placeholder="Phone Number" />
                        <Input name="email" value={agentDetails.email} onChange={handleChange} placeholder="Email" />
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSubmit}>{isEditing ? "Update" : "Submit"}</Button>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}