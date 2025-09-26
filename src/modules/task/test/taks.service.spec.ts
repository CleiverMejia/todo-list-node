import { UserService } from "../../user/user.service";
import { Task } from "../task.entity";
import { TaskService } from "../task.service";

// Prueba unitaria realizada por Cleiver Jose Mejia Rodriguez
describe("TaskService", (): void => {
  let userId: number;
  let service: TaskService;

  beforeEach(() => {
    const userService: UserService = new UserService();
    const { id } = userService.create("test", "test@example");
    userId = id;
    service = new TaskService();
  });

  test("debe listar todas las tareas de un usuario", (): void => {
    service.create(userId, "Titulo1", "Contenido1");
    service.create(userId, "Titulo2", "Contenido2");
    const allUserTasks: Task[] = service.findAll(userId);
    expect(allUserTasks.length).toBe(2);
  });

  test("debe mostrar una tarea por id de un usuario", (): void => {
    const task: Task = service.create(userId, "Titulo", "Contenido");
    const taskFind: Task | undefined = service.findOne(userId, task.id);
    expect(taskFind).toEqual(task);
  });

  test("debe lanzar un error si no encuentra la tarea de un usuario", () => {
    expect(() => service.findOne(userId, 111)).toThrow(
      "Task with id 111 not found"
    );
  });

  test("debe crear una tarea a un usuario", () => {
    const task: Task = service.create(userId, "Titulo", "Contenido");
    expect(task).toHaveProperty("id");
    expect(task.title).toBe("Titulo");
    expect(task.content).toBe("Contenido");
  });

  test("debe actualizar una tarea de un usuario", () => {
    const task: Task = service.create(userId, "Titulo", "Contenido");
    const taskUpdated: Task = service.update(
      userId,
      task.id,
      "Titulo actualizado",
      "Contenido actualizado"
    );
    expect(taskUpdated.title).toBe("Titulo actualizado");
    expect(taskUpdated.content).toBe("Contenido actualizado");
  });

  test("debe eliminar una tarea de un usuario", () => {
    const task: Task = service.create(userId, "Titulo", "Contenido");
    const taskDeleted: boolean = service.delete(userId, task.id);
    expect(taskDeleted).toBe(true);
    expect(service.findAll(userId).length).toBe(0);
  });

  test("debe eliminar una tarea que no existe de un usuario", () => {
    const task: Task = service.create(userId, "Titulo", "Contenido");
    const taskDeleted: boolean = service.delete(userId, 999);
    expect(taskDeleted).toBe(false);
    expect(service.findAll(userId).length).toBe(1);
  });
});
