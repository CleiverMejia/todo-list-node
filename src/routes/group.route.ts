import { Router } from "express";
import { GroupController } from "../modules/group/group.controller";

const router = Router();
const groupController = new GroupController();

router.get("/:uid", groupController.findAll);
router.get("/:uid/:id", groupController.findOne);
router.post("/:uid", groupController.create);
router.put("/:uid/:id", groupController.update);
router.delete("/:uid/:id", groupController.delete);

export default router;
