import { Task } from "./task.entity";
export declare class TaskService {
    private tasks;
    private idCounter;
    findAll(uid: number): Task[];
    findOne(uid: number, id: number): Task;
    create(uid: number, title: string, content: string): Task;
    update(uid: number, id: number, title: string, content: string): Task;
    delete(uid: number, id: number): boolean;
}
//# sourceMappingURL=task.service.d.ts.map