import { User } from "../model/user";
import { Family } from "../model/family";
import familyDb from "../repository/family.db";
import { FamilyInput, UserInput } from "../types";
import userDb from "../repository/user.db";
import { memoryUsage } from "process";


const getAllFamilies = async (): Promise<Family[]> => familyDb.getAllFamilies();

const getFamilyByName = async (name: string): Promise<Family | null> => {
    const family = await familyDb.getFamilyByName({ name });
    if (!family) throw new Error(`Family with name ${name} does not exist.`);
    return family;
};

// functie om te checken of een familie bestaat, indien nee, dan null returnen in plaats van een error gooien
const checkAndGetFamilyByName = async (name: string): Promise<Family | null> => {
    const family = await familyDb.getFamilyByName({ name });
    if (family) {
        return family;
    } else {
        return null;
    }

}

const getFamilyByMember = async (memberEmail: string): Promise<Family> => {
    const family = await familyDb.getFamilyByMember({ email: memberEmail });
    if (!family) throw new Error(`No family found for member ${memberEmail}.`);
    return family;
}

// functie om te checken of er een familie bestaat waar de user in zit, indien nee dan null returnen in plaats van een error gooien
const checkAndGetFamilyByMember = async (memberEmail: string): Promise<Family | null> => {
    const family = await familyDb.getFamilyByMember({ email: memberEmail });
    if (family) {
        return family;
    } else {
        return null;
    }
}

const createFamily = async ({
    name,
    members,
}: FamilyInput): Promise<Family> => {
    const existingFamily = await familyDb.getFamilyByName({ name });
    if (existingFamily) throw new Error(`Family with name ${name} already exists.`);

    // lijst van Users maken uit de lijst met UserInputs via hun email
    const membersAsUsers = await Promise.all(
        members.map(async (member) => {
            if (!member.email) throw new Error("User email is required");
            const user = await userDb.getUserByEmail({ email: member.email });
            if (!user) throw new Error(`User with email ${member.email} not found`);
            return user;
        })
    );

    const family = new Family({
        name,
        members: membersAsUsers,
    });

    return await familyDb.createFamily(family);
};

// functie om een member toe te voegen aan een familie (zijn role zal nog "pending" zijn tot een familie administrator de request accepteert)
const addMemberToFamily = async (
    { family: familyInput, user: userInput, }:
        { family: FamilyInput; user: UserInput; }
): Promise<User | null> => {
    //TODO aanpassen naar id
    if (!familyInput.name) throw new Error("Family name is required.");
    // if (!familyInput.id) throw new Error("Family id is required.");
    if (!userInput.email) throw new Error("User email is requird.");

    //TODO aanpassen naar id
    const family = await familyDb.getFamilyByName({ name: familyInput.name }); // juiste family fetchen

    const user = await userDb.getUserByEmail({ email: userInput.email }); // juiste user fetchen


    if (!family) {
        throw new Error("Family not found");
    }
    if (!user) {
        throw new Error("User not found");
    }

    return family.addMemberToFamily(user);

}

const editFamily = async ({ family }: { family: FamilyInput }): Promise<Family> => {
    if (!family.name) throw new Error("Family name is required.");
    if (!family.members) throw new Error("Family members are required.");

    const existingFamily = await familyDb.getFamilyByName({ name: family.name });
    if (!existingFamily) throw new Error(`Family with name ${family.name} does not exist.`);

    // lijst van Users maken uit de lijst met UserInputs via hun email
    const membersAsUsers = await Promise.all(
        family.members.map(async (member) => {
            if (!member.email) throw new Error("User email is required");
            const user = await userDb.getUserByEmail({ email: member.email });
            if (!user) throw new Error(`User with email ${member.email} not found`);
            return user;
        })
    );

    const updatedFamily = new Family({
        name: family.name,
        members: membersAsUsers,
    });

    return await familyDb.editFamily(updatedFamily);
}

export default {
    getAllFamilies,
    getFamilyByName,
    checkAndGetFamilyByName,
    getFamilyByMember,
    checkAndGetFamilyByMember,
    createFamily,
    addMemberToFamily,
    editFamily,
};

