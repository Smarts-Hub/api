import { Router } from "express";
import * as PasteController from "../controllers/pastes.controller.js";

const router = Router();

router.post("/", PasteController.createPaste);

router.get("/:slug", PasteController.getPaste);

router.get("/summary/:slug", PasteController.getPasteSummaryBySlug);

router.get("/count/all", PasteController.countPastes);

export default router;
