import { User } from "../model/user";
import { Family } from "../model/family";
import e from "express";

const families = [
    new Family({
        name: "Doe",
        members: [
            new User({
                email: "john.doe@ucll.be",
                firstName: "John",
                lastName: "Doe",
                password: "Secret123",
            }),
            new User({
                email: "jane.doe@ucll.be",
                firstName: "Jane",
                lastName: "Doe",
                password: "Secret123",
            }),
            new User({
                email: "play.doe@ucll.be",
                firstName: "Play",
                lastName: "Doe",
                password: "Secret123",
            })
        ]
    }),
    new Family({
        name: "Smith",
        members: [
            new User({
                email: "john.doe@ucll.be",
                firstName: "John",
                lastName: "Doe",
                password: "Secret123",
            }),
            new User({
                email: "jane.smith@ucll.be",
                firstName: "Jane",
                lastName: "Smith",
                password: "Secret123",
            }),
            new User({
                email: "baby.smith@ucll.be",
                firstName: "Baby",
                lastName: "Smith",
                password: "Secret123",
            })
        ]
    })
];

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

const getFamiliesByMember = (email: string): Family[] => {
    try {
        return families.filter((family) => family.getMembers().some((member) => member.getEmail() === email));
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
    getFamiliesByMember,
    createFamily,
};