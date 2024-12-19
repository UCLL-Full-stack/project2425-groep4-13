import { User } from "../model/user";
import { Family } from "../model/family";
import e from "express";
import database from "./database";

const families = [
    new Family({
        name: "Doe",
        members: [
            new User({
                email: "john.doe@ucll.be",
                firstName: "John",
                lastName: "Doe",
                password: "Secret123",
                role: "owner",
            }),
            new User({
                email: "jane.doe@ucll.be",
                firstName: "Jane",
                lastName: "Doe",
                password: "Secret123",
                role: "parent",
            }),
            new User({
                email: "play.doe@ucll.be",
                firstName: "Play",
                lastName: "Doe",
                password: "Secret123",
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
                password: "Secret123",
                role: "owner",
            }),
            new User({
                email: "baby.smith@ucll.be",
                firstName: "Baby",
                lastName: "Smith",
                password: "Secret123",
                role: "parent",
            })
        ]
    })
];

const getAllFamilies = async (): Promise<Family[]> => {
    try {
        const familiesPrisma = await database.family.findMany({
            include: {
                members: true,
            }
        });
        return familiesPrisma.map((familyPrisma) => Family.from(familyPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getFamilyByName = async ({name} : {name: string}): Promise<Family | null> => {
    try {
        const familyPrisma = await database.family.findUnique({
            where: {name},
            include: {
                members: true,
            }
        });
        return familyPrisma ? Family.from(familyPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getFamilyByMember = async ({ email }: { email: string }): Promise<Family | null> => {
    try {
        const familyPrisma = await database.family.findFirst({
            where: {
                members: {
                    some: {
                        email,
                    },
                },
            },
            include: {
                members: true,
            },
        });

        return familyPrisma ? Family.from(familyPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createFamily = async (family: Family): Promise<Family> => {
    try {
        const familyPrisma = await database.family.create({
            data: {
                name: family.getName(),
                members: {
                    connect: family.getMembers().map((member) => ({id: member.getId()})),
                }
            },
            include:{
                members: true,
            }
            

        })
        return Family.from(familyPrisma);
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