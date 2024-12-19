import { User } from '../model/user';

import database from './database';
import bcrypt from 'bcrypt';


// const initializeDevUsers = async () => {
//     const hashedPassword = await bcrypt.hash("Secret123", 12);

//     const users = [
//         new User({
//             email: "john.doe@ucll.be",
//             firstName: "John",
//             lastName: "Doe",
//             password: hashedPassword,
//             role: "owner",
//         }),
//         new User({
//             email: "mike.doe@ucll.be",
//             firstName: "Mike",
//             lastName: "Doe",
//             password: hashedPassword,
//             role: "child",
//         })
//     ];
//     return users;
// };

// let users: User[] = [];
// initializeDevUsers().then((result) => {
//     users = result;
// });

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { email },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                email: user.getEmail(),
                password: user.getPassword(),
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                role: user.getRole(),
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
};
