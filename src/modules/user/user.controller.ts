import type { Request, Response } from "express";
import { UserService } from "./user.service";
import { User } from "./user.entity";

export class UserController {
  constructor(private userService = new UserService()) {}

  findAll = (req: Request, res: Response): void => {
    try {
      const users: User[] = this.userService.findAll();

      res.status(200).json({
        success: true,
        data: users,
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
      const { id } = req.params;
      const user: User | undefined = this.userService.findOne(+id);

      if (!user) {
        res.status(404).json({
          success: false,
          error: "User not found",
        });

        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  };

  create = (req: Request, res: Response): void => {
    try {
      if (!req.body || !req.body.name || !req.body.email) {
        res.status(400).json({
          success: false,
          error: "Bad request",
        });

        return;
      }

      const { name, email } = req.body;

      const user = this.userService.create(name, email);

      res.status(201).json({
        success: true,
        data: user,
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
      const { id } = req.params;

      if (!req.body || !req.body.name || !req.body.email) {
        res.status(400).json({
          success: false,
          error: "Bad request",
        });

        return;
      }

      const { name, email } = req.body;

      const user = this.userService.update(+id, name, email);

      res.status(200).json({
        success: true,
        data: user,
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
      const { id } = req.params;

      this.userService.remove(+id);

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
