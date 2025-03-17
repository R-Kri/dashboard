import bcrypt from "bcryptjs";
import Admin from "../models/admin.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const seedAdmins = async () => {
    try {
        const existingAdmins = await Admin.countDocuments();
        if (existingAdmins === 0) {
            const admins = [
                {
                    username: process.env.ADMIN1_USERNAME,
                    password: await bcrypt.hash(process.env.ADMIN1_PASSWORD, 10),
                },
                {
                    username: process.env.ADMIN2_USERNAME,
                    password: await bcrypt.hash(process.env.ADMIN2_PASSWORD, 10),
                },
                {
                    username: process.env.ADMIN3_USERNAME,
                    password: await bcrypt.hash(process.env.ADMIN3_PASSWORD, 10),
                },
            ];
            await Admin.insertMany(admins);
            console.log("Admins seeded successfully!");
        } else {
            console.log("Admins already exist, skipping seed.");
        }
    } catch (error) {
        console.error("Error seeding admins:", error);
        throw error;
    }
};
