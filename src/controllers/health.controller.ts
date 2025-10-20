import { Request, Response } from "express";
import mongoose from "mongoose";

export const getHealth = async (req: Request, res: Response) => {
    return res.send({
        status: "ok",
        uptime: process.uptime(),
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
        timestamp: new Date().toISOString(),
    }).status(200);
};
