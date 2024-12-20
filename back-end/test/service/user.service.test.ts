// import { User } from '../../model/user';
// import userService from '../../service/user.service';
// import userDb from '../../repository/user.db';
// import { Role, UserInput } from '../../types';
// import { be } from 'date-fns/locale';
// import { after } from 'node:test';

// const userData = {
//     email: 'john.doe@ucll.be',
//     firstName: 'John',
//     lastName: 'Doe',
//     password: 'johnd123',
//     role: "owner" as Role,
// }

// const userInput: UserInput = {
//     email: userData.email,
//     firstName: userData.firstName,
//     lastName: userData.lastName,
//     password: userData.password,
//     role: userData.role,
// };

// const user = new User({
//     email: userData.email,
//     firstName: userData.firstName,
//     lastName: userData.lastName,
//     password: userData.password,
//     role: userData.role,
// });


// let getAllUsersMock: jest.Mock;
// let getUserByEmailMock: jest.Mock;
// let getUserByFirstNameMock: jest.Mock;
// let getUserByLastNameMock: jest.Mock;
// let createUserMock: jest.Mock;

// beforeEach(() => {
//     getAllUsersMock = jest.fn();
//     getUserByEmailMock = jest.fn();
//     getUserByFirstNameMock = jest.fn();
//     getUserByLastNameMock = jest.fn();
//     createUserMock = jest.fn();
// });

// afterEach(() => {
//     jest.clearAllMocks();
// });

// test("given: user in database, when: get all users, then: return all users", () => {
//     //given
//     getAllUsersMock.mockReturnValue([user]);
//     userDb.getAllUsers = getAllUsersMock;

//     //when
//     const users = userService.getAllUsers();

//     //then
//     expect(users).toEqual([user]);
//     expect(getAllUsersMock).toHaveBeenCalledTimes(1);
// });

// test("given: user in database, when: get user by email, then: return user", () => {
//     //given
//     getUserByEmailMock.mockReturnValue(user);
//     userDb.getUserByEmail = getUserByEmailMock;

//     //when
//     const userByEmail = userService.getUserByEmail({email: userInput.email!});

//     //then
//     expect(userByEmail).toEqual(user);
//     expect(getUserByEmailMock).toHaveBeenCalledTimes(1);
// });

// test("given: user not in database, when: get user by email, then: throw error", () => {
//     //given
//     getUserByEmailMock.mockReturnValue(null);
//     userDb.getUserByEmail = getUserByEmailMock;

//     //when
//     const getUserByEmail = () => userService.getUserByEmail({email: userInput.email!});

//     //then
//     expect(getUserByEmail).toThrow(`User with email ${userInput.email} does not exist.`);
//     expect(getUserByEmailMock).toHaveBeenCalledTimes(1);
// });





// test("given: user not in database, when: create user, then: return created user", () => {
//     //given
//     createUserMock.mockReturnValue(user);
//     userDb.getUserByEmail = jest.fn().mockReturnValue(null);
//     userDb.createUser = createUserMock;

//     //when
//     const createdUser = userService.createUser(userInput);

//     // console.log("created:");
//     // console.log(createdUser);
//     // console.log("expected:");
//     // console.log(user);

//     //then
//     expect(createdUser).toEqual(user);
//     expect(createUserMock).toHaveBeenCalledTimes(1);
// });

// test("given: user in database, when: create user, then: throw error", () => {
//     //given
//     createUserMock.mockReturnValue(user);
//     userDb.getUserByEmail = jest.fn().mockReturnValue(user);
//     userDb.createUser = createUserMock;

//     //when
//     const createUser = () => userService.createUser(userInput);

//     //then
//     expect(createUser).toThrow(`User with email ${userInput.email} already exists.`);
//     expect(createUserMock).toHaveBeenCalledTimes(0);
// });




