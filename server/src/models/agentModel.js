import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
}, { timestamps: true });

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
