import { Group } from "./group.entity";
export declare class GroupService {
    private groups;
    private idCounter;
    findAll(uid: number): Group[];
    findOne(uid: number, id: number): Group;
    create(uid: number, name: string): Group;
    update(uid: number, id: number, name: string): Group;
    remove(uid: number, id: number): boolean;
}
//# sourceMappingURL=group.service.d.ts.map