type Role = 'owner' | 'parent' | 'child' | 'pending';

type UserInput = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
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

type ProductInput = {
    name: string;
}

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
    role: string;
};

export {
    UserInput,
    FamilyInput,
    AuthenticationResponse,
    JoinFamilyInput,
    Role,
    ProductInput
};