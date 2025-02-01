import { Router } from "express";
import userRouter from "./userRouter";
import bookRouter from "./bookRouter";
import authorRouter from "./authorRouter.ts";

const router = Router();

router.use("/users", userRouter);
router.use("/books", bookRouter);
router.use("/authors", authorRouter);

export default router;
