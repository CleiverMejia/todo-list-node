import { Task } from "./task.entity";

export class TaskService {
  private tasks: Task[] = [];
  private idCounter: number = 0;

  public findAll(uid: number): Task[] {
    return this.tasks.filter((task: Task): boolean => task.uid === uid);
  }

  public findOne(uid: number, id: number): Task {
    const task: Task | undefined = this.tasks.find(
      (task: Task): boolean => task.id === id && task.uid === uid
    );

    if (!task) throw new Error(`Task with id ${id} not found`);

    return task;
  }

  public create(uid: number, title: string, content: string): Task {
    const newTask: Task = {
      id: this.idCounter++,
      uid,
      title,
      content,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  public update(uid: number, id: number, title: string, content: string): Task {
    const task = this.findOne(uid, id);

    task.title = title;
    task.content = content;

    return task;
  }

  public delete(uid: number, id: number): boolean {
    const initialLength: number = this.findAll(uid).length;

    this.tasks = this.tasks.filter(
      (task: Task): boolean => task.uid !== uid && task.id !== id
    );

    return this.findAll(uid).length < initialLength;
  }
}
