import type { Request, Response } from "express";
import { TaskService } from "./task.service";
import { Task } from "./task.entity";

export class TaskController {
  constructor(private taskService = new TaskService()) {}

  findAll = (req: Request, res: Response): void => {
    try {
      const { uid } = req.params;
      const tasks: Task[] = this.taskService.findAll(+uid);

      res.status(200).json({
        success: true,
        data: tasks,
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
      const task: Task = this.taskService.findOne(+uid, +id);

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("Task")) {
        res.status(404).json({
          success: false,
          error: "Task not found",
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

      if (!req.body || !req.body.title || !req.body.content) {
        res.status(400).json({
          success: false,
          error: "Bad request",
        });

        return;
      }

      const { title, content } = req.body;

      const task = this.taskService.create(+uid, title, content);

      res.status(201).json({
        success: true,
        data: task,
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

      const { title, content } = req.body;

      const task = this.taskService.update(+uid, +id, title, content);

      res.status(200).json({
        success: true,
        data: task,
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

      this.taskService.delete(+uid, +id);

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
