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

// DTO voor als een user een family wil joinen
type JoinFamilyInput = {
    family: FamilyInput;
    user: UserInput;
}

export { UserInput, FamilyInput, JoinFamilyInput };