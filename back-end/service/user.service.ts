import e from 'express';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';

const getAllUsers = (): User[] => userDb.getAllUsers();

const getUserByEmail = (email: string): User | null => {
    const user = userDb.getUserByEmail(email);
    if (!user) throw new Error(`User with email ${email} does not exist.`);
    return user;
};

const getUserByFirstName = (firstName: string): User | null => {
    const user = userDb.getUserByFirstName(firstName);
    if (!user) throw new Error(`User with first name ${firstName} does not exist.`);
    return user;
};

const getUserByLastName = (lastName: string): User | null => {
    const user = userDb.getUserByLastName(lastName);
    if (!user) throw new Error(`User with last name ${lastName} does not exist.`);
    return user;
};

const createUser = ({
    email,
    firstName,
    lastName,
    password,
}: UserInput): User => {
    const existingUser = userDb.getUserByEmail(email);
    if (existingUser) throw new Error(`User with email ${email} already exists.`);

    const user = new User({
        email,
        firstName,
        lastName,
        password,
    });

    return userDb.createUser(user);
};

export default {
    getAllUsers,
    getUserByEmail,
    getUserByFirstName,
    getUserByLastName,
    createUser,
};