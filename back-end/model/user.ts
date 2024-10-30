

export class User {
    private email: string;
    private firstName: string;
    private lastName: string;
    private password: string;

    constructor(user: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
    }) {
        this.validate(user);

        this.email = user.email
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.password = user.password
    }

    getEmail(): string | undefined {
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

    validate(user: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
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
    }

    equals(user: User): boolean {
        return (
            this.email === user.getEmail() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.password === user.getPassword()
        );
    }


}