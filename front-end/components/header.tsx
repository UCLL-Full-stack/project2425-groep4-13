import Link from 'next/link';
import { useEffect, useState } from 'react';


const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const [family, setFamily] = useState<string | null>(null);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
        setFamily(localStorage.getItem("Family"));
    }, []);

    const handleClick = () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("Family");
        setLoggedInUser(null);
        setFamily(null);
    };

    return (
        <header className="p-2 m-6 bg-lightgray rounded shadow-md">
            <nav className="nav flex justify-center">
                <Link href="/" className="m-4 py-3 font-sans text-darkgreen text-xl font-weight-700 font-bold hover:underline">
                    HOME
                </Link>
                <Link href="/families" className="m-4 py-3 font-sans text-darkgreen text-xl font-weight-700 font-bold hover:underline">
                    MY FAMILIES
                </Link>
                {loggedInUser && (
                    <span className='m-4 py-3 font-sans text-darkgreen text-xl font-weight-700 font-bold'>
                        {JSON.parse(loggedInUser).fullname}</span>
                )}
                {!loggedInUser && (
                    <Link href="/login" className="m-4 p-3 font-sans text-darkgreen text-xl font-weight-700 font-bold border-2 border-darkgreen rounded-full hover:text-lightgreen hover:border-lightgreen">
                        LOG IN
                    </Link>
                )}
                {loggedInUser && (
                    <Link href="/login" className="m-4 p-3 font-sans text-darkgreen text-xl font-weight-700 font-bold border-2 border-darkgreen rounded-full hover:text-lightgreen hover:border-lightgreen"
                        onClick={handleClick}>
                        LOG OUT
                    </Link>
                )}
                {!loggedInUser && (
                    <Link href="/register" className="m-4 p-3 font-sans text-darkgreen text-xl font-weight-700 font-bold border-2 border-darkgreen rounded-full hover:text-lightgreen hover:border-lightgreen">
                        Register
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;