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
        <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
            {/* <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
                {' '}
                Courses App
            </a> */}
            <nav className="nav justify-content-center">
                <Link href="/" className="current nav-link px-4 fs-5 theme-colors-darkgreen">
                    HOME
                </Link>
                <Link href="/families" className="nav-link px-4 fs-5 theme-colors-darkgreen">
                    MY FAMILIES
                </Link>
                {!loggedInUser && (
                    <Link href="/login" className="rounded-outline-button">
                        LOG IN
                    </Link>
                )}
                {loggedInUser && (
                    <Link href="/login" className="rounded-outline-button" onClick={handleClick}>
                        LOG OUT
                    </Link>
                )}
                {!loggedInUser && (
                    <Link href="/register" className="rounded-outline-button">
                        Register
                    </Link>
                )}
                {loggedInUser && (
                    <Link href="/profile" className="rounded-outline-button">
                        {JSON.parse(loggedInUser).fullname}
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;