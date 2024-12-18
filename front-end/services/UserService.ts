import { User } from "@types";

const loginUser = (email: string, password: string) => {
    const user = { email, password };
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const registerUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const UserService = {
    loginUser,
    registerUser,
};

export default UserService;
