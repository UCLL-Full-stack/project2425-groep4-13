import { User } from "../model/user";
import { Family } from "../model/family";
import bcrypt from "bcrypt";
import e from "express";
import database from "./database";

// const initializeDevFamilies = async () => {
//     const hashedPassword = await bcrypt.hash("Secret123", 12);

//     const families = [
//         new Family({
//             name: "Doe",
//             members: [
//                 new User({
//                     email: "john.doe@ucll.be",
//                     firstName: "John",
//                     lastName: "Doe",
//                     password: hashedPassword,
//                     role: "owner",
//                 }),
//                 new User({
//                     email: "jane.doe@ucll.be",
//                     firstName: "Jane",
//                     lastName: "Doe",
//                     password: hashedPassword,
//                     role: "parent",
//                 }),
//                 new User({
//                     email: "play.doe@ucll.be",
//                     firstName: "Play",
//                     lastName: "Doe",
//                     password: hashedPassword,
//                     role: "child",
//                 })
//             ]
//         }),
//         new Family({
//             name: "Smith",
//             members: [
//                 // new User({
//                 //     email: "john.doe@ucll.be",
//                 //     firstName: "John",
//                 //     lastName: "Doe",
//                 //     password: "Secret123",
//                 // }),
//                 new User({
//                     email: "jane.smith@ucll.be",
//                     firstName: "Jane",
//                     lastName: "Smith",
//                     password: hashedPassword,
//                     role: "owner",
//                 }),
//                 new User({
//                     email: "baby.smith@ucll.be",
//                     firstName: "Baby",
//                     lastName: "Smith",
//                     password: hashedPassword,
//                     role: "parent",
//                 })
//             ]
//         })
//     ];
//     return families;
// };

// let families: Family[] = [];
// initializeDevFamilies().then((result) => {
//     families = result;
// });

const getAllFamilies = async (): Promise<Family[]> => {
    try {
        const familiesPrisma = await database.family.findMany({
            include: {
                members: true,
                items: {
                    include: {
                        product: true
                    }
                },
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
                items: {
                    include: {
                        product: true
                    }
                },
            }
        });
        return familyPrisma ? Family.from(familyPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// const getFamilyById = async ({ id }: { id: number }): Promise<Family | null> => {
//     try {
//         const familyPrisma = await database.family.findUnique({
//             where: {id},
//             include: {
//                 members: true,
//                 items: {
//                     include: {
//                         product: true
//                     }
//                 },
//             }
//         });
//         if (!familyPrisma) {
//             return null;
//         }

//         return familyPrisma ? Family.from(familyPrisma): null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// };

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
                items: {
                    include: {
                        product: true
                    }
                },
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
                items: {
                    include: {
                        product: true
                    }
                },
            }
            

        })
        return Family.from(familyPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addMemberToFamily = async ({ familyName, memberId }: { familyName: string, memberId: number }): Promise<Family> => {
    try {
        // checks
        const familyPrisma = await database.family.findUnique({
            where: { name: familyName },
            include: {
                members: true, // Include members to check if the member already exists
            }
        });

        if (!familyPrisma) {
            throw new Error('Family not found.');
        }

        const isMemberExists = familyPrisma.members.some(member => member.id === memberId);
        if (isMemberExists) {
            throw new Error('Member is already part of this family.');
        }

        // member toevoegen
        const updatedFamily = await database.family.update({
            where: { name: familyName },
            data: {
                members: {
                    connect: { id: memberId }
                }
            },
            include: {
                members: true,
                items: {
                    include: {
                        product: true
                    }
                },
            }
        });

        return Family.from(updatedFamily);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addItemToFamily = async ({ familyName, itemId }: { familyName: string, itemId: number }): Promise<Family> => {
    try {
        // Check if the family exists
        const familyPrisma = await database.family.findUnique({
            where: { name: familyName },
            include: {
                members: true, // Include members as well
                items: true,   // Include existing items
            }
        });

        if (!familyPrisma) {
            throw new Error('Family not found.');
        }

        // Check if the item is already part of the family (if necessary)
        const isItemExists = familyPrisma.items.some(item => item.id === itemId);
        if (isItemExists) {
            throw new Error('Item is already part of this family.');
        }

        // Add the item to the family
        const updatedFamily = await database.family.update({
            where: { name: familyName },
            data: {
                items: {
                    connect: { id: itemId },  // Connect the item to the family
                }
            },
            include: {
                members: true,  // Include members in the updated family response
                items: {
                    include: {
                        product: true  // Include item details like product info
                    }
                },
            }
        });

        return Family.from(updatedFamily);  // Return the updated family
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
    addMemberToFamily,
    // getFamilyById,
};