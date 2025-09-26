import { UserService } from "../../user/user.service";
import { GroupService } from "../group.service";
// Prueba unitaria realizada por Emerson Rafael Lopez Narvaez
describe("GroupService", () => {
    let service;
    const userId = 1;
    beforeEach(() => {
        const userService = new UserService();
        service = new GroupService();
    });
    test("debería crear un grupo", () => {
        const group = service.create(userId, "Trabajo");
        expect(group).toEqual({
            id: 1,
            uid: userId,
            name: "Trabajo",
        });
        expect(service.findAll(userId)).toHaveLength(1);
    });
    test("debería obtener todos los grupos de un usuario", () => {
        const g1 = service.create(userId, "Trabajo");
        const g2 = service.create(userId, "Personal");
        const groups = service.findAll(userId);
        expect(groups).toHaveLength(2);
        expect(groups.map((g) => g.name)).toContain("Trabajo");
        expect(groups.map((g) => g.name)).toContain("Personal");
    });
    test("debería encontrar un grupo específico por id y usuario", () => {
        const created = service.create(userId, "Universidad");
        const found = service.findOne(userId, created.id);
        expect(found).toEqual(created);
    });
    test("debería lanzar error si el grupo no existe", () => {
        expect(() => service.findOne(userId, 999)).toThrow("Group with id 999 not found for user 1");
    });
    test("debería actualizar un grupo", () => {
        const created = service.create(userId, "Viejo Nombre");
        const updated = service.update(userId, created.id, "Nuevo Nombre");
        expect(updated.name).toBe("Nuevo Nombre");
    });
    test("debería eliminar un grupo", () => {
        const created = service.create(userId, "Temporal");
        const result = service.remove(userId, created.id);
        expect(result).toBe(true);
        expect(service.findAll(userId)).toHaveLength(0);
    });
    test("debería devolver false si intenta eliminar un grupo inexistente", () => {
        const result = service.remove(userId, 999);
        expect(result).toBe(false);
    });
});
//# sourceMappingURL=group.service.spec.js.map