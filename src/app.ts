import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import pastesRoutes from "./routes/pastes.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes)
app.use("/v1/pastes", pastesRoutes)

app.use(errorHandler);

export default app;
