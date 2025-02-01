import { Router } from "express";
import { AuthorController } from "../controllers/AuthorController";

const router = Router();

router.get("/", new AuthorController().findAll);
router.get("/:id", new AuthorController().findById);
router.post("/", new AuthorController().create);
router.put("/:id", new AuthorController().update);
router.delete("/:id", new AuthorController().delete);

export default router;
