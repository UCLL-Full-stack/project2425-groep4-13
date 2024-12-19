type UserInput = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
};

type FamilyInput = {
    name: string;
    members: UserInput[];
};

// DTO voor als een user een family wil joinen
type JoinFamilyInput = {
    family: FamilyInput;
    user: UserInput;
}

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
};

export { UserInput, FamilyInput, AuthenticationResponse, JoinFamilyInput };