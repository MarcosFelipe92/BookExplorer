import { Router } from "express";
import userRouter from "./userRouter";
import bookRouter from "./bookRouter";

const router = Router();

router.use("/users", userRouter);
router.use("/books", bookRouter);

export default router;
