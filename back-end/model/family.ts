import { User } from "./user";

export class Family {
    private name: string;
    private members: User[];

    constructor(family: {
        name: string;
        members: User[];
    }) {
        this.validate(family);

        this.name = family.name;
        this.members = family.members;
    }

    getName(): string {
        return this.name;
    }

    getMembers(): User[] {
        return this.members;
    }

    validate(family: {
        name: string;
        members: User[];
    }) {
        if (!family.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!family.members || family.members.length === 0) {
            throw new Error('Members are required');
        }
    }

    equals(family: Family): boolean {
        return (
            this.name === family.getName() &&
            this.members === family.getMembers()
        );
    }
}