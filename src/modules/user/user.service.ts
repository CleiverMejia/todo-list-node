import { User } from "./user.entity";

export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      console.log("User not found");
      return undefined;
    }
    return user;
  }

  create(name: string, email: string): User {
    const newUser: User = {
      id: this.idCounter++,
      name,
      email,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, name: string, email: string): User | undefined {
    const user = this.findOne(id);
    if (user) {
      user.name = name ?? user.name;
      user.email = email ?? user.email;
    }
    return user;
  }

  remove(id: number): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length < initialLength;
  }
}
