import { Router } from "express";
import { UserController } from "../modules/user/user.controller";

const router = Router();
const userController = new UserController();

router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
