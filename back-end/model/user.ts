import { Role } from "../types";
import {User as UserPrisma} from '@prisma/client'



export class User {
    private id?: number;
    private email: string;
    private firstName: string;
    private lastName: string;
    private password: string;
    private role: Role;

    constructor(user: {
        id?: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);

        this.id = user.id;
        this.email = user.email
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.password = user.password
        this.role = user.role;
    }

    getId(): number | undefined {
        return this.id;
    }
    
    getEmail(): string {
        return this.email;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    validate(user: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        role: Role;
    }) {
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.email === user.getEmail() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }

    static from({ id, email, firstName, lastName, password, role }: UserPrisma) {
        return new User({
            id,
            email,
            firstName,
            lastName,
            password,
            role: role as Role,
        });
    }


}