import { User } from "../model/user";
import { Family } from "../model/family";
import bcrypt from "bcrypt";
import e from "express";

const initializeDevFamilies = async () => {
    const hashedPassword = await bcrypt.hash("Secret123", 12);

    const families = [
        new Family({
            name: "Doe",
            members: [
                new User({
                    email: "john.doe@ucll.be",
                    firstName: "John",
                    lastName: "Doe",
                    password: hashedPassword,
                    role: "owner",
                }),
                new User({
                    email: "jane.doe@ucll.be",
                    firstName: "Jane",
                    lastName: "Doe",
                    password: hashedPassword,
                    role: "parent",
                }),
                new User({
                    email: "play.doe@ucll.be",
                    firstName: "Play",
                    lastName: "Doe",
                    password: hashedPassword,
                    role: "child",
                })
            ]
        }),
        new Family({
            name: "Smith",
            members: [
                // new User({
                //     email: "john.doe@ucll.be",
                //     firstName: "John",
                //     lastName: "Doe",
                //     password: "Secret123",
                // }),
                new User({
                    email: "jane.smith@ucll.be",
                    firstName: "Jane",
                    lastName: "Smith",
                    password: hashedPassword,
                    role: "owner",
                }),
                new User({
                    email: "baby.smith@ucll.be",
                    firstName: "Baby",
                    lastName: "Smith",
                    password: hashedPassword,
                    role: "parent",
                })
            ]
        })
    ];
    return families;
};

let families: Family[] = [];
initializeDevFamilies().then((result) => {
    families = result;
});

const getAllFamilies = (): Family[] => {
    try {
        return families;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getFamilyByName = (name: string): Family | null => {
    try {
        return families.find((family) => family.getName() === name) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getFamilyByMember = (email: string): Family => {
    try {
        return families.filter((family) => family.getMembers().some((member) => member.getEmail() === email))[0];
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createFamily = (family: Family): Family => {
    try {
        families.push(family);
        return family;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllFamilies,
    getFamilyByName,
    getFamilyByMember,
    createFamily,
};