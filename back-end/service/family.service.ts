import { User } from "../model/user";
import { Family } from "../model/family";
import familyDb from "../repository/family.db";
import { FamilyInput, UserInput } from "../types";
import userDb from "../repository/user.db";
import { memoryUsage } from "process";


const getAllFamilies = (): Family[] => familyDb.getAllFamilies();

const getFamilyByName = (name: string): Family | null => {
    const family = familyDb.getFamilyByName(name);
    if (!family) throw new Error(`Family with name ${name} does not exist.`);
    return family;
};

const getFamilyByMember = (memberEmail: string): Family => {
    const family = familyDb.getFamilyByMember(memberEmail);
    if (!family) throw new Error(`No family found for member ${memberEmail}.`);
    return family;
}

const createFamily = ({
    name,
    members,
}: FamilyInput): Family => {
    const existingFamily = familyDb.getFamilyByName(name);
    if (existingFamily) throw new Error(`Family with name ${name} already exists.`);


    // lijst van Users maken uit de lijst met UserInputs
    const membersAsUsers = members.map(member => 
        new User({
            email: member.email,
            firstName: member.firstName,
            lastName: member.lastName,
            password: member.password,
        })
    );

    const family = new Family({
        name,
        members: membersAsUsers,
    });

    return familyDb.createFamily(family);
};

// functie om een member toe te voegen aan een familie (zijn role zal nog "pending" zijn tot een familie administrator de request accepteert)
const addMemberToFamily = async (
    {family: familyInput, user: userInput, }:
    {family: FamilyInput; user: UserInput; }
): Promise<User | null> => {
    //TODO aanpassen naar id
    if (!familyInput.name) throw new Error("Family name is required.");
    // if (!familyInput.id) throw new Error("Family id is required.");
    if (!userInput.email) throw new Error("User email is requird.");

    //TODO aanpassen naar id
    const family = await familyDb.getFamilyByName(familyInput.name); // juiste family fetchen

    const user = await userDb.getUserByEmail(userInput.email); // juiste user fetchen


    if (!family) {
        throw new Error("Family not found");
    }
    if (!user) {
        throw new Error("User not found");
    }
    
    return family.addMemberToFamily(user);

}

export default {
    getAllFamilies,
    getFamilyByName,
    getFamilyByMember,
    createFamily,
    addMemberToFamily,
};

