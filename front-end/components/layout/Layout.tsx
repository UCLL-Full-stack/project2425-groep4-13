import React from "react";
import { Lexend } from "next/font/google";
const lexend = Lexend({ subsets: ["latin"], variable: "--font-sans" });

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {

    return (
        <div className={`${lexend.className}`}>
            <main className='w-full max-w-3xl mx-auto'>{children}</main>
        </div>
    );
}
