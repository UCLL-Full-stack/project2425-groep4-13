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

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
};

export { UserInput, FamilyInput, AuthenticationResponse };