import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", new UserController().login);
router.get("/profile", authMiddleware, new UserController().getProfile);
router.get("/", new UserController().findAll);
router.get("/:id", new UserController().findById);
router.post("/", new UserController().create);
router.put("/:id", authMiddleware, new UserController().update);
router.delete("/:id", new UserController().delete);

export default router;
