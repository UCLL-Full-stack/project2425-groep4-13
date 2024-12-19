import { User } from "./user";
import {Family as FamilyPrisma, User as UserPrisma} from '@prisma/client'


export class Family {
    private id?: number;
    private name: string;
    private members: User[];

    constructor(family: {
        id?: number;
        name: string;
        members: User[];
    }) {
        this.validate(family);

        this.id = family.id;
        this.name = family.name;
        this.members = family.members;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getMembers(): User[] {
        return this.members;
    }

    addMemberToFamily(member: User): User {
        if (!member) throw new Error('Member is required');
        if (this.members.includes(member)) {
            throw new Error('Member is already part of this family');
        }

        this.members.push(member);

        return member
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

    static from({ id, name, members, }: FamilyPrisma & {members: UserPrisma[];}) {
        return new Family({
            id,
            name,
            members: members.map((member) => User.from(member)),
        });
    }
}