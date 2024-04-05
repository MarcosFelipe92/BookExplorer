import { Router } from "express";
import { BookController } from "../controllers/BookController";

const router = Router();

router.get("/", new BookController().findAll);
router.get("/:id", new BookController().findById);
router.post("/", new BookController().create);
router.put("/:id", new BookController().update);
router.delete("/:id", new BookController().delete);

export default router;
