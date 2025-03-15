
import { useState, useEffect } from "react";
import { UserCheck } from "lucide-react";

export default function AgentList() {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                        <UserCheck className="h-6 w-6 text-purple-600" />
                    </div>
                    <h1 className="text-2xl font-medium">Agent List</h1>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Add New Agent
                </button>
            </div>
            
            <div className="glass rounded-2xl border border-border overflow-hidden p-6">
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-foreground">Agent Management</h3>
                    <p className="text-muted-foreground mt-2">This page is under construction</p>
                </div>
            </div>
        </div>
    );
}
