import type { Request, Response } from "express";
import { GroupService } from "./group.service";
import { Group } from "./group.entity";

export class GroupController {
  constructor(private groupService = new GroupService()) {}

  findAll = (req: Request, res: Response): void => {
    try {
      const { uid } = req.params;
      const groups: Group[] = this.groupService.findAll(+uid);

      res.status(200).json({
        success: true,
        data: groups,
      });
    } catch {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  };

  findOne = (req: Request, res: Response): void => {
    try {
      const { uid, id } = req.params;
      const group: Group = this.groupService.findOne(+uid, +id);

      res.status(200).json({
        success: true,
        data: group,
      });
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("Group")) {
        res.status(404).json({
          success: false,
          error: "Group not found",
        });

        return;
      }

      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  };

  create = (req: Request, res: Response): void => {
    try {
      const { uid } = req.params;

      if (!req.body || !req.body.name) {
        res.status(400).json({
          success: false,
          error: "Bad request",
        });

        return;
      }

      const { name } = req.body;

      const group = this.groupService.create(+uid, name);

      res.status(201).json({
        success: true,
        data: group,
      });
    } catch {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  };

  update = (req: Request, res: Response): void => {
    try {
      const { uid, id } = req.params;

      if (!req.body) {
        res.status(400).json({
          success: false,
          error: "Bad request",
        });

        return;
      }

      const { name } = req.body;

      const group = this.groupService.update(+uid, +id, name);

      res.status(200).json({
        success: true,
        data: group,
      });
    } catch {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  };

  delete = (req: Request, res: Response): void => {
    try {
      const { uid, id } = req.params;

      this.groupService.remove(+uid, +id);

      res.status(200).json({
        success: true,
      });
    } catch {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  };
}
