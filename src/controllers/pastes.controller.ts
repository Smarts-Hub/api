import { Request, Response } from "express";
import * as PasteService from "../services/pastes.service";
import bcrypt from "bcryptjs";

export const createPaste = async (req: Request, res: Response) => {
  try {
    const paste = await PasteService.createPaste(req.body);
    res.status(201).json({ message: "Paste created", slug: paste.slug });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPaste = async (req: Request, res: Response) => {
  try {
    const paste = await PasteService.getPasteBySlug(req.params.slug);

    if (paste.password) {
      const { password } = req.body;
      if (!password) return res.status(401).json({ message: "Password required" });

      const isMatch = await bcrypt.compare(password, paste.password);
      if (!isMatch) return res.status(403).json({ message: "Invalid password" });
    }

    await PasteService.incrementViews(paste.slug);
    res.status(200).json(paste);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePaste = async (req: Request, res: Response) => {
  try {
    const paste = await PasteService.deletePasteBySlug(req.params.slug);
    if (!paste) return res.status(404).json({ message: "Paste not found" });
    res.status(200).json({ message: "Paste deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPasteSummaryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const paste = await PasteService.getPasteSummaryBySlug(slug);

    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    const result = {
      slug: paste.slug,
      title: paste.title,
      description: paste.description,
      isPrivate: paste.isPrivate,
      password: !!paste.password,
      views: paste.views,
      createdAt: paste.createdAt,
      expireAt: paste.expireAt
    };

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const countPastes = async (req: Request, res: Response) => {
  try {
    const count = await PasteService.countPastes();
    res.status(200).json({ total: count });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


