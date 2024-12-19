import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UserService from "@services/UserService";
import { useTranslation } from "next-i18next";



const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();
    const { t } = useTranslation();

    const clearErrors = () => {
        setEmailError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!email || email.trim() === "") {
            setEmailError(t("Email is required"));
            result = false;
        }

        if (!password || password.trim() === "") {
            setPasswordError(t("Password is required"));
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        const response = await UserService.loginUser(email, password)

        if (response.status === 200) {
            setStatusMessages([
                {
                    message: t("You have successfully logged in."),
                    type: "success"
                }
            ]);

            const user = await response.json();
            localStorage.setItem("loggedInUser",
                JSON.stringify({
                    token: user.token,
                    email: user.email,
                    fullname: user.fullname,
                    role: user.role,
                })
            );
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else if (response.status === 401) {
            const { errorMessage } = await response.json();
            setStatusMessages([{ message: errorMessage, type: "error" }]);
        } else {
            setStatusMessages([
                {
                    message: "An error has occurred. Please try again later.",
                    type: "error"
                }
            ]);
        }
    };

    return (
        <>
            <h3 className="font-sans text-green-700 text-3xl underline font-weight-700 font-bold">Login</h3>
            {statusMessages && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto ">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    "text-red-800": type === "error",
                                    "text-green-800": type === "success",
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit} className="bg-neutral-200 border-2 border-neutral-300 rounded shadow-md p-5 text-center">
                <label
                    htmlFor="emailInput"
                    className="font-sans text-lg font-bold text-green-700 "
                >
                    Email
                </label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="emailInput"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="border border-emerald-600 p-2 border-solid rounded-md w-2/4"
                    />
                    {emailError && <div className="text-red-800 ">{emailError}</div>}
                </div>
                <div className="mt-2">
                    <div>
                        <label
                            htmlFor="passwordInput"
                            className="font-sans text-lg font-bold text-green-700"
                        >
                            Password
                        </label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="passwordInput"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="border border-emerald-600 p-2 border-solid rounded-md w-2/4"
                        />
                        {passwordError && (
                            <div className=" text-red-800">{passwordError}</div>
                        )}
                    </div>
                </div>
                <button
                    className="mt-4 py-2 px-8 bg-green-700 text-neutral-100 font-sans font-bold text-xl rounded-full border-none hover:bg-green-500 transition duration-100"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </>
    );
};

export default Login;