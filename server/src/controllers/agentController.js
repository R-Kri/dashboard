import Agent from "../models/agentModel.js";
import mongoose from "mongoose";
// @desc    Register a new agent
// @route   POST /api/agents
export const registerAgent = async (req, res) => {
    try {
        const { name, address, phone, email } = req.body;

        if (!name || !address || !phone || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newAgent = new Agent({ name, address, phone, email });
        await newAgent.save();

        res.status(201).json({ message: "Agent registered successfully!", agent: newAgent });
    } catch (error) {
        console.error("Error registering agent:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc    Get all agents
// @route   GET /api/agents
export const getAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json(agents);
    } catch (error) {
        console.error("Error fetching agents:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc    Update an agent
// @route   PUT /api/agents/:id
export const updateAgent = async (req, res) => {
    try {
        const { name, address, phone, email } = req.body;

        if (!name || !address || !phone || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).json({ error: "Agent not found" });
        }

        agent.name = name;
        agent.address = address;
        agent.phone = phone;
        agent.email = email;

        await agent.save();

        res.status(200).json({ message: "Agent updated successfully!", agent });
    } catch (error) {
        console.error("Error updating agent:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc    Delete an agent
// @route   DELETE /api/agents/:id
export const deleteAgent = async (req, res) => {
    try {
        // Validate if ID is in the correct format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid agent ID format" });
        }

        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).json({ error: "Agent not found" });
        }

        await agent.deleteOne();
        res.status(200).json({ message: "Agent deleted successfully!" });
    } catch (error) {
        console.error("Error deleting agent:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};