import { User } from "../../model/user";
import { Family } from "../../model/family";

const user1 = new User({
    email: "john.doe@ucll.be",
    firstName: "John",
    lastName: "Doe",
    password: "Secret123",
    role: "owner",
});

const user2 = new User({
    email: "jane.doe@ucll.be",
    firstName: "Jane",
    lastName: "Doe",
    password: "Secret123",
    role: "owner",
});

const user3 = new User({
    email: "play.doe@ucll.be",
    firstName: "Play",
    lastName: "Doe",
    password: "Secret123",
    role: "owner",
});

const family1 = new Family({
    name: "Doe",
    members: [user1, user2, user3],
    items: [],
});

test("given: valid values for family, when: family is created, then: family is created with those values", () => {
    //given

    //when
    const family = new Family({ name: "Doe", members: [user1, user2, user3], items: [] });
    //then
    expect(family.getName()).toEqual("Doe");
    expect(family.getMembers()).toEqual([user1, user2, user3]);
    expect(family.getItems()).toEqual([]);
});

test("given: invalid name for family, when: family is created, then: error is thrown", () => {
    //given
    const invalidName = "";

    //when
    const create = () => new Family({ name: invalidName, members: [user1, user2, user3], items: [] });

    //then
    expect(create).toThrow("Name is required");
});

test("given: invalid members for family, when: family is created, then: error is thrown", () => {
    //given

    //when
    const create = () => new Family({ name: "Doe", members: [], items: [] });

    //then
    expect(create).toThrow("Members are required");
});

