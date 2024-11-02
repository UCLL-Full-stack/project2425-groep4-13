type UserInput = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

type FamilyInput = {
    name: string;
    members: UserInput[];
};

export { UserInput, FamilyInput };