import { User } from "../../model/user";
import { Role, UserInput } from "../../types";
import { Family } from "../../model/family";
import familyService from "../../service/family.service";
import familyDb from "../../repository/family.db";
import { FamilyInput } from "../../types";

const userData1 = {
    email: 'john.doe@ucll.be',
    firstName: 'John',
    lastName: 'Doe',
    password: 'johnd123',
    role: 'owner' as Role,
}

const userData2 = {
    email: 'jane.doe@ucll.be',
    firstName: 'Jane',
    lastName: 'Doe',
    password: 'janed123',
    role: 'owner' as Role,
}

const userData3 = {
    email: 'play.doe@ucll.be',
    firstName: 'Play',
    lastName: 'Doe',
    password: 'playd123',
    role: 'owner' as Role,
}

const userInput1: UserInput = {
    email: userData1.email,
    firstName: userData1.firstName,
    lastName: userData1.lastName,
    password: userData1.password,
    role: userData1.role,
};

const userInput2: UserInput = {
    email: userData2.email,
    firstName: userData2.firstName,
    lastName: userData2.lastName,
    password: userData2.password,
    role: userData2.role,
};

const userInput3: UserInput = {
    email: userData3.email,
    firstName: userData3.firstName,
    lastName: userData3.lastName,
    password: userData3.password,
    role: userData3.role,
};

const user1 = new User({
    email: userData1.email,
    firstName: userData1.firstName,
    lastName: userData1.lastName,
    password: userData1.password,
    role: userData1.role,
});


const user2 = new User({
    email: userData2.email,
    firstName: userData2.firstName,
    lastName: userData2.lastName,
    password: userData2.password,
    role: userData2.role,
});

const user3 = new User({
    email: userData3.email,
    firstName: userData3.firstName,
    lastName: userData3.lastName,
    password: userData3.password,
    role: userData3.role,
});


const familyInput: FamilyInput = {
    name: 'Doe',
    members: [userInput1, userInput2, userInput3]
};

const family = new Family({
    name: 'Doe',
    members: [user1, user2, user3],
    items: []
});

let getAllFamiliesMock: jest.Mock;
let getFamilyByNameMock: jest.Mock;
let getFamilyByMemberMock: jest.Mock;

beforeEach(() => {
    getAllFamiliesMock = jest.fn();
    getFamilyByNameMock = jest.fn();
    getFamilyByMemberMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test("given: family in database, when: get all families, then: return all families", () => {
    //given
    getAllFamiliesMock.mockReturnValue([family]);
    familyDb.getAllFamilies = getAllFamiliesMock;

    //when
    const families = familyService.getAllFamilies();

    //then
    expect(families).toEqual([family]);
    expect(getAllFamiliesMock).toHaveBeenCalledTimes(1);
});

test("given: family in database, when: get family by name, then: return family", () => {
    //given
    getFamilyByNameMock.mockReturnValue(family);
    familyDb.getFamilyByName = getFamilyByNameMock;

    //when
    const familyByName = familyService.getFamilyByName(familyInput.name);

    //then
    expect(familyByName).toEqual(family);
    expect(getFamilyByNameMock).toHaveBeenCalledTimes(1);
});

test("given: family not in database, when: get family by name, then: throw error", () => {
    //given
    getFamilyByNameMock.mockReturnValue(null);
    familyDb.getFamilyByName = getFamilyByNameMock;

    //when
    const getFamilyByName = () => familyService.getFamilyByName(familyInput.name);

    //then
    expect(getFamilyByName).toThrowError(`Family with name ${familyInput.name} does not exist.`);
    expect(getFamilyByNameMock).toHaveBeenCalledTimes(1);
});

test("given: family in database, when: get family by member, then: return family", () => {
    //given
    getFamilyByMemberMock.mockReturnValue(family);
    familyDb.getFamilyByMember = getFamilyByMemberMock;

    //when
    const familiesByMember = familyService.getFamilyByMember(userInput1.email!);

    //then
    expect(familiesByMember).toEqual(family);
    expect(getFamilyByMemberMock).toHaveBeenCalledTimes(1);
});

test("given: family not in database, when: get family by member, then: throw error", () => {
    //given
    getFamilyByMemberMock.mockReturnValue(null);
    familyDb.getFamilyByMember = getFamilyByMemberMock;

    //when
    const getFamiliesByMember = () => familyService.getFamilyByMember(userInput1.email!);

    //then
    expect(getFamiliesByMember).toThrow(`No family found for member ${userInput1.email}.`);
    expect(getFamilyByMemberMock).toHaveBeenCalledTimes(1);
});


