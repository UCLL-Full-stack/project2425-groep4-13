import { User } from "../model/user";
import { Family } from "../model/family";
import familyDb from "../repository/family.db";
import { FamilyInput, UserInput } from "../types";


const getAllFamilies = (): Family[] => familyDb.getAllFamilies();

const getFamilyByName = (name: string): Family | null => {
    const family = familyDb.getFamilyByName(name);
    if (!family) throw new Error(`Family with name ${name} does not exist.`);
    return family;
};

const getFamiliesByMember = (memberEmail: string): Family[] => {
    const families = familyDb.getFamiliesByMember(memberEmail);
    if (!families || families.length == 0) throw new Error(`No families found for member ${memberEmail}.`);
    return families;
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
    const family = await familyDb.getFamilyByName(familyInput.name);

    if(!family) {
        throw new Error("Family not found");
    }

    const user = new User(userInput); // DTO omzetten naar domeinobject

    return family.addMemberToFamily(user);
}

export default {
    getAllFamilies,
    getFamilyByName,
    getFamiliesByMember,
    createFamily,
    addMemberToFamily,
};

