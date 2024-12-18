import { User } from "../../model/user";
import { UserInput } from "../../types";
import { Family } from "../../model/family";
import familyService from "../../service/family.service";
import familyDb from "../../repository/family.db";
import { FamilyInput } from "../../types";

const userInput1: UserInput = {
    email: 'john.doe@ucll.be',
    firstName: 'John',
    lastName: 'Doe',
    password: 'johnd123',
};

const userInput2: UserInput = {
    email: 'jane.doe@ucll.be',
    firstName: 'Jane',
    lastName: 'Doe',
    password: 'janed123',
};

const userInput3: UserInput = {
    email: 'play.doe@ucll.be',
    firstName: 'Play',
    lastName: 'Doe',
    password: 'playd123',
};

const user1 = new User({
    ...userInput1,
});

const user2 = new User({
    ...userInput2,
});

const user3 = new User({
    ...userInput3,
});


const familyInput: FamilyInput = {
    name: 'Doe',
    members: [userInput1, userInput2, userInput3]
};

const family = new Family({
    name: 'Doe',
    members: [user1, user2, user3]
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
    const familiesByMember = familyService.getFamilyByMember(userInput1.email);

    //then
    expect(familiesByMember).toEqual(family);
    expect(getFamilyByMemberMock).toHaveBeenCalledTimes(1);
});

test("given: family not in database, when: get family by member, then: throw error", () => {
    //given
    getFamilyByMemberMock.mockReturnValue(null);
    familyDb.getFamilyByMember = getFamilyByMemberMock;

    //when
    const getFamiliesByMember = () => familyService.getFamilyByMember(userInput1.email);

    //then
    expect(getFamiliesByMember).toThrow(`No family found for member ${userInput1.email}.`);
    expect(getFamilyByMemberMock).toHaveBeenCalledTimes(1);
});


