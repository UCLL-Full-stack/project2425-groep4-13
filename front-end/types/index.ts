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