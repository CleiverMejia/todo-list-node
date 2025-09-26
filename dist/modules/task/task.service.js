export class TaskService {
    tasks = [];
    idCounter = 0;
    findAll(uid) {
        return this.tasks.filter((task) => task.uid === uid);
    }
    findOne(uid, id) {
        const task = this.tasks.find((task) => task.id === id && task.uid === uid);
        if (!task)
            throw new Error(`Task with id ${id} not found`);
        return task;
    }
    create(uid, title, content) {
        const newTask = {
            id: this.idCounter++,
            uid,
            title,
            content,
        };
        this.tasks.push(newTask);
        return newTask;
    }
    update(uid, id, title, content) {
        const task = this.findOne(uid, id);
        task.title = title;
        task.content = content;
        return task;
    }
    delete(uid, id) {
        const initialLength = this.findAll(uid).length;
        this.tasks = this.tasks.filter((task) => task.uid !== uid && task.id !== id);
        return this.findAll(uid).length < initialLength;
    }
}
//# sourceMappingURL=task.service.js.map