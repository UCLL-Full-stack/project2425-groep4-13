import { User } from "../model/user";
import { Family } from "../model/family";
import familyDb from "../repository/family.db";


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

export default {
    getAllFamilies,
    getFamilyByName,
    getFamiliesByMember
};

