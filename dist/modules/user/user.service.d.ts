import { User } from "./user.entity";
export declare class UserService {
    private users;
    private idCounter;
    findAll(): User[];
    findOne(id: number): User | undefined;
    create(name: string, email: string): User;
    update(id: number, name: string, email: string): User | undefined;
    remove(id: number): boolean;
}
//# sourceMappingURL=user.service.d.ts.map