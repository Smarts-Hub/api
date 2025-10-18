import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.ts";
import pastesRoutes from "./routes/pastes.routes.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes)
app.use("/api/pastes", pastesRoutes)

app.use(errorHandler);

export default app;
