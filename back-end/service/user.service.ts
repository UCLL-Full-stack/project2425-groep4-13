import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput, AuthenticationResponse } from '../types';
import bcrypt from 'bcrypt';
import { generateJWTtoken } from '../util/jwt';


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

const createUser = async ({
    email,
    firstName,
    lastName,
    password,
}: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByEmail(email);
    if (existingUser) throw new Error(`User with email ${email} already exists.`);

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        email,
        firstName,
        lastName,
        password: hashedPassword,
    });

    return await userDb.createUser(user);
};


const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error(`User with e-mail: ${email} does not exist.`);
    }

    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error('Invalid password.');
    }

    return {
        token: generateJWTtoken(email),
        email,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
    }
};

export default {
    getAllUsers,
    getUserByEmail,
    getUserByFirstName,
    getUserByLastName,
    createUser,
    authenticate,
};


