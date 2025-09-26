export class UserService {
    users = [];
    idCounter = 1;
    findAll() {
        return this.users;
    }
    findOne(id) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
    create(name, email) {
        const newUser = {
            id: this.idCounter++,
            name,
            email,
        };
        this.users.push(newUser);
        return newUser;
    }
    update(id, name, email) {
        const user = this.findOne(id);
        if (user) {
            user.name = name;
            user.email = email;
        }
        return user;
    }
    remove(id) {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        return this.users.length < initialLength;
    }
}
//# sourceMappingURL=user.service.js.map