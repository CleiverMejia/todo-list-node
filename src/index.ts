import groupRoutes from "./routes/group.route";
import taskRoutes from "./routes/task.route";
import userRoutes from "./routes/user.route";

import type { Request, Response } from "express";
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/group", groupRoutes);
app.use("/task", taskRoutes);
app.use("/user", userRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () =>
  console.log(`Aplicación alojada en http://localhost:${PORT}`)
);
