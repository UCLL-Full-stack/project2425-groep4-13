import { User } from "../model/user";
import userDb from "../repository/user.db";
import { Family } from "../model/family";
import familyDb from "../repository/family.db";
import { UserInput } from "../types";
import { FamilyInput } from "../types";

const getAllFamilies = (): Family[] => familyDb.getAllFamilies();

const getFamilyByName = (name: string): Family | null => {
    const family = familyDb.getFamilyByName(name);
    if (!family) throw new Error(`Family with name ${name} does not exist.`);
    return family;
};

const getFamilyByMember = (member: User): Family | null => {
    const family = familyDb.getFamilyByMember(member);
    if (!family) throw new Error(`Family with member ${member} does not exist.`);
    return family;
};

export default {
    getAllFamilies,
    getFamilyByName,
    getFamilyByMember,
};

