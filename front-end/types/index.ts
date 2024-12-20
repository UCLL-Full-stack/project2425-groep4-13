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