import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput, AuthenticationResponse } from '../types';
import bcrypt from 'bcrypt';
import { generateJWTtoken } from '../util/jwt';


const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserByEmail = async ({ email }: { email: string }): Promise<User> => {
    const user = await userDb.getUserByEmail({email});
    if (!user) throw new Error(`User with email ${email} does not exist.`);
    return user;
};


const createUser = async ({
    email,
    firstName,
    lastName,
    password,
    role,
}: UserInput): Promise<AuthenticationResponse> => {
    if (!email) throw new Error("User email is required.");
    if (!firstName) throw new Error("User first name is required.");
    if (!lastName) throw new Error("User last name is required.");
    if (!password) throw new Error("User password is required.");
    if (!role) throw new Error("User role is required.");

    const existingUser = await userDb.getUserByEmail({email});
    if (existingUser) throw new Error(`User with email ${email} already exists.`);

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        role,
    });

    const newUser = await userDb.createUser(user);
    return {
        token: generateJWTtoken({email: newUser.getEmail() || '', role: newUser.getRole()}),
        email: newUser.getEmail() || '',
        fullname: `${newUser.getFirstName()} ${newUser.getLastName()}`,
        role: user.getRole(),
    }
};


const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    if (!email) throw new Error("User email is required.");
    if (!password) throw new Error("User password is required.");

    const user = await getUserByEmail({email});
    if (!user) {
        throw new Error(`User with e-mail: ${email} does not exist.`);
    }

    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error('Invalid password.');
    }

    return {
        token: generateJWTtoken({email, role: user.getRole()}),
        email,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
    }
};

export default {
    getAllUsers,
    getUserByEmail,
    createUser,
    authenticate,
};


