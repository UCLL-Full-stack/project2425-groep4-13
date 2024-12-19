import { User } from '../model/user';
import bcrypt from 'bcrypt';

const initializeDevUsers = async () => {
    const hashedPassword = await bcrypt.hash("Secret123", 12);

    const users = [
        new User({
            email: "john.doe@ucll.be",
            firstName: "John",
            lastName: "Doe",
            password: hashedPassword,
            role: "owner",
        }),
        new User({
            email: "mike.doe@ucll.be",
            firstName: "Mike",
            lastName: "Doe",
            password: hashedPassword,
            role: "child",
        })
    ];
    return users;
};

let users: User[] = [];
initializeDevUsers().then((result) => {
    users = result;
});

const getAllUsers = (): User[] => {
    try {
        return users;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = (email: string): User | null => {
    try {
        return users.find((user) => user.getEmail() === email) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByFirstName = (firstName: string): User | null => {
    try {
        return users.find((user) => user.getFirstName() === firstName) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByLastName = (lastName: string): User | null => {
    try {
        return users.find((user) => user.getLastName() === lastName) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = (user: User): User => {
    try {
        users.push(user);
        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllUsers,
    getUserByEmail,
    getUserByFirstName,
    getUserByLastName,
    createUser,
};
