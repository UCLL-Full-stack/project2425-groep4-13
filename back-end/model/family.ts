import { Item } from "./item";
import { User } from "./user";
import {Family as FamilyPrisma, User as UserPrisma, Item as ItemPrisma, Product as ProductPrisma} from '@prisma/client'


export class Family {
    private id?: number;
    private name: string;
    private members: User[];
    private items: Item[];

    constructor(family: {
        id?: number;
        name: string;
        members: User[];
        items: Item[];
    }) {
        this.validate(family);

        this.id = family.id;
        this.name = family.name;
        this.members = family.members;
        this.items = family.items;
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
    
    getItems(): Item[] {
        return this.items;
    }

    addMemberToFamily(member: User): User {
        if (!member) throw new Error('Member is required');
        if (this.members.includes(member)) {
            throw new Error('Member is already part of this family');
        }

        this.members.push(member);

        return member
    }

    addItemToFamily(item: Item): Item {
        if (!item) throw new Error("Item is required");
        if (this.items.includes(item)) {
            throw new Error("Item is already saved by this family");
        }

        this.items.push(item);
        
        return item;
    }

    validate(family: {
        name: string;
        members: User[];
        items: Item[];
    }) {
        if (!family.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!family.members || family.members.length === 0) {
            throw new Error('Members are required');
        }
        if (!family.items) {
            throw new Error('Items are required');
        }
    }

    equals(family: Family): boolean {
        return (
            this.name === family.getName() &&
            this.members === family.getMembers() &&
            this.items === family.getItems()
        );
    }

    static from({
        id,
        name,
        members,
        items,
    }: FamilyPrisma & {
        members: UserPrisma[];
        items: (ItemPrisma & { product: ProductPrisma })[];
    }) {
        return new Family({
            id,
            name,
            members: members.map((member) => User.from(member)),
            items: items.map((item) => Item.from(item)),
        });
    }
}