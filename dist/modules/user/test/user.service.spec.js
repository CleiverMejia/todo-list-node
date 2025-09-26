import { UserService } from "../user.service";
// Prueba unitaria realizada por Daniel Correa Vega
describe("UserService", () => {
    let service;
    beforeEach(() => {
        service = new UserService();
    });
    test("debe crear un usuario", () => {
        const user = service.create("Alex", "alex@example.com");
        expect(user).toHaveProperty("id");
        expect(user.name).toBe("Alex");
        expect(user.email).toBe("alex@example.com");
    });
    test("debe listar usuarios", () => {
        service.create("User1", "u1@test.com");
        service.create("User2", "u2@test.com");
        const users = service.findAll();
        expect(users.length).toBe(2);
    });
    test("debe obtener un usuario por id", () => {
        const created = service.create("User3", "u3@test.com");
        const found = service.findOne(created.id);
        expect(found).toEqual(created);
    });
    test("debe lanzar un error si no encuentra al usuario", () => {
        expect(() => service.findOne(111)).toThrow("User with id 111 not found");
    });
    test("debe actualizar un usuario", () => {
        const created = service.create("User4", "u4@test.com");
        const updated = service.update(created.id, "carlitos", "newu4@test.com");
        expect(updated?.name).toBe("carlitos");
        expect(updated?.email).toBe("newu4@test.com");
    });
    test("debe eliminar un usuario", () => {
        const created = service.create("User5", "u5@test.com");
        const removed = service.remove(created.id);
        expect(removed).toBe(true);
        expect(service.findAll().length).toBe(0);
    });
});
//# sourceMappingURL=user.service.spec.js.map