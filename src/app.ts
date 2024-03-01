import "express-async-errors";
import express from "express";
import { errorMiddleware } from "./app/middlewares/errorMiddleware";
import router from "./app/routers/routes";

export const app = express();

app.use(express.json());
app.use(router);
app.use(errorMiddleware);
