import { User } from '../../model/user';


const email = "john.doe@ucll.be";
const firstName = "John";
const lastName = "Doe";
const password = "Secret123";
const role = "owner";


test("given: valid values for user, when: user is created, then: user is created with those values", () => {
    //given

    //when
    const user = new User({ email: email, firstName: firstName, lastName: lastName, password: password, role: role });

    //then
    expect(user.getEmail()).toEqual(email);
    expect(user.getFirstName()).toEqual(firstName);
    expect(user.getLastName()).toEqual(lastName);
    expect(user.getPassword()).toEqual(password);
});

test("given: invalid email for user, when: user is created, then: error is thrown", () => {
    //given
    const invalidEmail = "";

    //when
    const create = () => new User({ email: invalidEmail, firstName: firstName, lastName: lastName, password: password, role: role });

    //then
    expect(create).toThrow("Email is required");
});

test("given: invalid first name for user, when: user is created, then: error is thrown", () => {
    //given
    const invalidFirstName = "";

    //when
    const create = () => new User({ email: email, firstName: invalidFirstName, lastName: lastName, password: password, role: role });

    //then
    expect(create).toThrow("First name is required");
});

test("given: invalid last name for user, when: user is created, then: error is thrown", () => {
    //given
    const invalidLastName = "";

    //when
    const create = () => new User({ email: email, firstName: firstName, lastName: invalidLastName, password: password, role: role });

    //then
    expect(create).toThrow("Last name is required");
});

test("given: invalid password for user, when: user is created, then: error is thrown", () => {
    //given
    const invalidPassword = "";

    //when
    const create = () => new User({ email: email, firstName: firstName, lastName: lastName, password: invalidPassword, role: role });

    //then
    expect(create).toThrow("Password is required");
});