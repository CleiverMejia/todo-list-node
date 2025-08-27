import { UserService } from "c:/Users/Emerson Lopez/Downloads/todo-list-node/src/modules/user/user.service";
import { GroupService } from "c:/Users/Emerson Lopez/Downloads/todo-list-node/src/modules/group/group.service";
import { Group } from "c:/Users/Emerson Lopez/Downloads/todo-list-node/src/modules/group/group.entity";

describe("GroupService", () => {
  let service: GroupService;
  const userId = 1;

  beforeEach(() => {
    const userService: UserService = new UserService();
    service = new GroupService();
  });

  test("debería crear un grupo", () => {
    const group: Group = service.create(userId, "Trabajo"); 
    expect(group).toEqual({
      id: 1,
      uid: userId,
      name: "Trabajo",
    });
    expect(service.findAll(userId)).toHaveLength(1);
  });

  test("debería obtener todos los grupos de un usuario", () => {
    const g1: Group = service.create(userId, "Trabajo");
    const g2: Group = service.create(userId, "Personal");
    const groups: Group[] = service.findAll(userId); 
    expect(groups).toHaveLength(2);
    expect(groups.map((g: Group) => g.name)).toContain("Trabajo");
    expect(groups.map((g: Group) => g.name)).toContain("Personal");
  });

  test("debería encontrar un grupo específico por id y usuario", () => {
    const created: Group = service.create(userId, "Universidad");
    const found: Group = service.findOne(userId, created.id);
    expect(found).toEqual(created);
  });

  test("debería lanzar error si el grupo no existe", () => {
    expect(() => service.findOne(userId, 999)).toThrow("Grupo no encontrado");
  });

  test("debería actualizar un grupo", () => {
    const created: Group = service.create(userId, "Viejo Nombre");
    const updated: Group = service.update(userId, created.id, "Nuevo Nombre");
    expect(updated.name).toBe("Nuevo Nombre");
  });

  test("debería eliminar un grupo", () => {
    const created: Group = service.create(userId, "Temporal");
    const result: boolean = service.remove(userId, created.id);
    expect(result).toBe(true);
    expect(service.findAll(userId)).toHaveLength(0);
  });

  test("debería devolver false si intenta eliminar un grupo inexistente", () => {
    const result: boolean = service.remove(userId, 999);
    expect(result).toBe(false);
  });
});
