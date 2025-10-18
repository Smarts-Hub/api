import { Router } from "express";
import * as HealthController from "../controllers/health.controller.ts";

const router = Router();

router.get("/", HealthController.getHealth);

export default router;
