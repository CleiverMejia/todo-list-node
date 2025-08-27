import { Group } from "./group.entity";

export class GroupService {
private groups: Group[] = [];
private idCounter = 1;

    findAll(uid: number): Group[] {
    return this.groups.filter(group => group.uid === uid);
}

    findOne(uid: number, id: number): Group {
    const group = this.groups.find(group => group.uid === uid && group.id === id);
    if (!group) {
    throw new Error(`Group with id ${id} not found for user ${uid}`);
    }
    return group;
}

create(uid: number, name: string): Group {
    const newGroup: Group = {
    id: this.idCounter++,
    uid,
    name,
    };
    this.groups.push(newGroup);
    return newGroup;
}

update(uid: number, id: number, name: string): Group {
    const group = this.findOne(uid, id);
    group.name = name;
    return group;
}

remove(uid: number, id: number): boolean {
    const initialLength = this.groups.length;
    this.groups = this.groups.filter(group => !(group.uid === uid && group.id === id));
    return this.groups.length < initialLength;
}
}
