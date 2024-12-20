export type Family = {
    name: string,
    members: User[],
};

export type User = {
    email?: string,
    firstName?: string,
    lastName?: string,
    password?: string,
    role?: string,
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};

export type Product = {
    name: string,
}

export type Item = {
    product: Product,
    amount: number,
    expirationDate: Date,
}

// type voor een groep items met zelfde product
export type ItemGroup = {
    product: Product,
    firstExpirationDate: Date,
    items: Item[],
}