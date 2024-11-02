import { User } from '../../model/user';
import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import { UserInput } from '../../types';
import { be } from 'date-fns/locale';
import { after } from 'node:test';

const userInput: UserInput = {
    email: 'john.doe@ucll.be',
    firstName: 'John',
    lastName: 'Doe',
    password: 'johnd123',
};

const user = new User({
    ...userInput,
});


let getAllUsersMock: jest.Mock;
let getUserByEmailMock: jest.Mock;
let getUserByFirstNameMock: jest.Mock;
let getUserByLastNameMock: jest.Mock;
let createUserMock: jest.Mock;

beforeEach(() => {
    getAllUsersMock = jest.fn();
    getUserByEmailMock = jest.fn();
    getUserByFirstNameMock = jest.fn();
    getUserByLastNameMock = jest.fn();
    createUserMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test("given: user in database, when: get all users, then: return all users", () => {
    //given
    getAllUsersMock.mockReturnValue([user]);
    userDb.getAllUsers = getAllUsersMock;

    //when
    const users = userService.getAllUsers();

    //then
    expect(users).toEqual([user]);
    expect(getAllUsersMock).toHaveBeenCalledTimes(1);
});

test("given: user in database, when: get user by email, then: return user", () => {
    //given
    getUserByEmailMock.mockReturnValue(user);
    userDb.getUserByEmail = getUserByEmailMock;

    //when
    const userByEmail = userService.getUserByEmail(userInput.email);

    //then
    expect(userByEmail).toEqual(user);
    expect(getUserByEmailMock).toHaveBeenCalledTimes(1);
});

test("given: user not in database, when: get user by email, then: throw error", () => {
    //given
    getUserByEmailMock.mockReturnValue(null);
    userDb.getUserByEmail = getUserByEmailMock;

    //when
    const getUserByEmail = () => userService.getUserByEmail(userInput.email);

    //then
    expect(getUserByEmail).toThrow(`User with email ${userInput.email} does not exist.`);
    expect(getUserByEmailMock).toHaveBeenCalledTimes(1);
});

test("given: user in database, when: get user by first name, then: return user", () => {
    //given
    getUserByFirstNameMock.mockReturnValue(user);
    userDb.getUserByFirstName = getUserByFirstNameMock;

    //when
    const userByFirstName = userService.getUserByFirstName(userInput.firstName);

    //then
    expect(userByFirstName).toEqual(user);
    expect(getUserByFirstNameMock).toHaveBeenCalledTimes(1);
});

test("given: user not in database, when: get user by first name, then: throw error", () => {
    //given
    getUserByFirstNameMock.mockReturnValue(null);
    userDb.getUserByFirstName = getUserByFirstNameMock;

    //when
    const getUserByFirstName = () => userService.getUserByFirstName(userInput.firstName);

    //then
    expect(getUserByFirstName).toThrow(`User with first name ${userInput.firstName} does not exist.`);
    expect(getUserByFirstNameMock).toHaveBeenCalledTimes(1);
});

test("given: user in database, when: get user by last name, then: return user", () => {
    //given
    getUserByLastNameMock.mockReturnValue(user);
    userDb.getUserByLastName = getUserByLastNameMock;

    //when
    const userByLastName = userService.getUserByLastName(userInput.lastName);

    //then
    expect(userByLastName).toEqual(user);
    expect(getUserByLastNameMock).toHaveBeenCalledTimes(1);
});

test("given: user not in database, when: get user by last name, then: throw error", () => {
    //given
    getUserByLastNameMock.mockReturnValue(null);
    userDb.getUserByLastName = getUserByLastNameMock;

    //when
    const getUserByLastName = () => userService.getUserByLastName(userInput.lastName);

    //then
    expect(getUserByLastName).toThrow(`User with last name ${userInput.lastName} does not exist.`);
    expect(getUserByLastNameMock).toHaveBeenCalledTimes(1);
});

test("given: user not in database, when: create user, then: return created user", () => {
    //given
    createUserMock.mockReturnValue(user);
    userDb.getUserByEmail = jest.fn().mockReturnValue(null);
    userDb.createUser = createUserMock;

    //when
    const createdUser = userService.createUser(userInput);

    //then
    expect(createdUser).toEqual(user);
    expect(createUserMock).toHaveBeenCalledTimes(1);
});

test("given: user in database, when: create user, then: throw error", () => {
    //given
    createUserMock.mockReturnValue(user);
    userDb.getUserByEmail = jest.fn().mockReturnValue(user);
    userDb.createUser = createUserMock;

    //when
    const createUser = () => userService.createUser(userInput);

    //then
    expect(createUser).toThrow(`User with email ${userInput.email} already exists.`);
    expect(createUserMock).toHaveBeenCalledTimes(0);
});




