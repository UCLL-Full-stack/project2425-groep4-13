import { User } from "../model/user";
import { Family } from "../model/family";
import familyDb from "../repository/family.db";
import { FamilyInput, ItemInput, UserInput } from "../types";
import userDb from "../repository/user.db";
import { memoryUsage } from "process";
import itemDb from "../repository/item.db";
import { Item } from "../model/item";


const getAllFamilies = async (): Promise<Family[]> => familyDb.getAllFamilies();

const getFamilyByName = async (name: string): Promise<Family | null> => {
    const family = await familyDb.getFamilyByName({name});
    if (!family) throw new Error(`Family with name ${name} does not exist.`);
    return family;
};

// const getFamilyById = async(id: number): Promise<Family | null> => {
//     const family = await familyDb.getFamilyById({id});
//     if (!family) throw new Error(`Family with id ${id} does not exist.`);
//     return family;
// }

// functie om te checken of een familie bestaat, indien nee, dan null returnen in plaats van een error gooien
const checkAndGetFamilyByName = async (name: string): Promise<Family | null> => {
    const family = await familyDb.getFamilyByName({name});
    if(family) {
        return family;
    } else {
        return null;
    }

}

const getFamilyByMember = async (memberEmail: string): Promise<Family> => {
    const family = await familyDb.getFamilyByMember({email: memberEmail});
    if (!family) throw new Error(`No family found for member ${memberEmail}.`);
    return family;
}

// functie om te checken of er een familie bestaat waar de user in zit, indien nee dan null returnen in plaats van een error gooien
const checkAndGetFamilyByMember = async (memberEmail: string): Promise<Family | null> => {
    const family = await familyDb.getFamilyByMember({email: memberEmail});
    if (family) {
        return family;
    } else {
        return null;
    }
}

const createFamily = async ({
    name,
    members,
    items,
}: FamilyInput): Promise<Family> => {
    const existingFamily = await familyDb.getFamilyByName({name});
    if (existingFamily) throw new Error(`Family with name ${name} already exists.`);

    // lijst van Users maken uit de lijst met UserInputs via hun email
    const membersAsUsers = await Promise.all(
        members.map(async (member) => {
            if (!member.email) throw new Error("User email is required");
            const user = await userDb.getUserByEmail({email: member.email});
            if (!user) throw new Error(`User with email ${member.email} not found`);
            return user;
        })
    );

    const itemObjects = await Promise.all(
        items.map(async (item) => {
            if (!item.product) throw new Error("Item product is required");
            const itemObject = await itemDb.getItemById({id: item.id!})
            if(!itemObject) throw new Error(`Item with id ${item.id} not found`);
            return itemObject;
        })
    )

    const family = new Family({
        name,
        members: membersAsUsers,
        items: itemObjects,
    });

    return await familyDb.createFamily(family);
};

// functie om een member toe te voegen aan een familie (zijn role zal nog "pending" zijn tot een familie administrator de request accepteert)
const addMemberToFamily = async (
    {family: familyInput, user: userInput, }:
    {family: FamilyInput; user: UserInput; }
): Promise<User | null> => {
    if (!familyInput.name) throw new Error("Family name is required.");
    if (!userInput.email) throw new Error("User email is requird.");

    const family = await familyDb.getFamilyByName({name: familyInput.name}); // juiste family fetchen

    const user = await userDb.getUserByEmail({email: userInput.email}); // juiste user fetchen


    if (!family) {
        throw new Error("Family not found");
    }
    if (!user) {
        throw new Error("User not found");
    }

    try {
        // member toevoegen in database
        const updatedFamily = await familyDb.addMemberToFamily({
            familyName: family.getName(),
            memberId: user.getId()!,
        });

        // nieuwe member returnen
        return user;
    } catch (error) {
        console.error("Error adding member to family:", error);
        throw new Error("Failed to add member to family.");
    }
}

// functie om een item toe te voegen aan een familie
const addItemToFamily = async (
    {family: familyInput, item: itemInput}:
    {family: FamilyInput; item: ItemInput; }
): Promise<Item | null> => {
    console.log("HELLOO SIGMAS");
    console.log(itemInput);
    if (!familyInput.name) throw new Error("Family name is required.");
    if (!itemInput.id) throw new Error("Item id is required.");

    const family = await familyDb.getFamilyByName({name: familyInput.name}); // juiste family fetchen
    const item = await itemDb.getItemById({id: itemInput.id}); // juiste item fetchen

    if (!family) {
        throw new Error("Family not found");
    }
    if (!item) {
        throw new Error("Item not found");
    }

    try {
        // item toevoegen in de database
        const updatedFamily = await familyDb.addItemToFamily({
            familyName: family.getName(),
            itemId: item.getId()!,
        });

        // de toegevoegde item teruggeven
        return item;
    } catch (error) {
        console.error("Error adding item to family:", error);
        throw new Error("Failed to add item to family.");
    }
};


export default {
    getAllFamilies,
    getFamilyByName,
    checkAndGetFamilyByName,
    getFamilyByMember,
    checkAndGetFamilyByMember,
    createFamily,
    addMemberToFamily,
    addItemToFamily,
};

