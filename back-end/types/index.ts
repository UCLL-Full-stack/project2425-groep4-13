type Role = 'owner' | 'parent' | 'child' | 'pending';

type UserInput = {
    id?: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
};

type FamilyInput = {
    id?: number;
    name: string;
    members: UserInput[];
    items: ItemInput[];
};

// DTO voor als een user een family wil joinen
type JoinFamilyInput = {
    family: FamilyInput;
    user: UserInput;
}

type AddItemInput = {
    family: FamilyInput;
    item: ItemInput;
}

type ProductInput = {
    id?: number;
    name: string;
}

type ItemInput = {
    id?: number;
    product: ProductInput;
    amount: number;
    expirationDate: Date;
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
    ProductInput,
    ItemInput,
    AddItemInput,
};