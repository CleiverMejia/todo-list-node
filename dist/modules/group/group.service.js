export class GroupService {
    groups = [];
    idCounter = 1;
    findAll(uid) {
        return this.groups.filter((group) => group.uid === uid);
    }
    findOne(uid, id) {
        const group = this.groups.find((group) => group.uid === uid && group.id === id);
        if (!group) {
            throw new Error(`Group with id ${id} not found for user ${uid}`);
        }
        return group;
    }
    create(uid, name) {
        const newGroup = {
            id: this.idCounter++,
            uid,
            name,
        };
        this.groups.push(newGroup);
        return newGroup;
    }
    update(uid, id, name) {
        const group = this.findOne(uid, id);
        group.name = name;
        return group;
    }
    remove(uid, id) {
        const initialLength = this.groups.length;
        this.groups = this.groups.filter((group) => !(group.uid === uid && group.id === id));
        return this.groups.length < initialLength;
    }
}
//# sourceMappingURL=group.service.js.map