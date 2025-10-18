import { Request, Response } from "express";

export const getHealth = async (req: Request, res: Response) => {
    return res.send({
        status: "ok",
        uptime: process.uptime(),
    }).status(200);
};
