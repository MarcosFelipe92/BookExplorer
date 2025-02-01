import "express-async-errors";
import express from "express";
import { errorMiddleware } from "./app/middlewares/errorMiddleware";
import router from "./app/routers/routes";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);
