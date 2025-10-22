import { Router } from "express";
import { TaskController } from "../modules/task/task.controller";

const router = Router();
const taskController = new TaskController();

router.get("/:uid", taskController.findAll);
router.get("/:uid/:id", taskController.findOne);
router.post("/:uid", taskController.create);
router.put("/:uid/:id", taskController.update);
router.delete("/:uid/:id", taskController.delete);

export default router;
