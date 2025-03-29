import express from "express";
import { registerAgent, getAgents, updateAgent, deleteAgent } from "../controllers/agentController.js";

const router = express.Router();

router.post("/", registerAgent);  // Create agent
router.get("/", getAgents);       // Get all agents
router.put("/:id", updateAgent);  // Update agent
router.delete("/:id", deleteAgent); // Delete agent

export default router;
