import FamilyService from '@services/FamilyService';
import { Family, User } from '@types';
import React, { useState } from 'react';


type Props = {
    handleFamilyRegistered: (family: Family) => void; // handleFamilyRegistered returnt niets
}

const RegisterFamilyWindow: React.FC<Props> = ({ handleFamilyRegistered }: Props) => {
    const [error, setError] = useState<string | null>(null);
    const [familyName, setFamilyName] = useState<string>();

    const validate = async () => {
        let result = true;
        setError(null);

        if (!familyName) {
            setError("Name is required.")
            result = false;
        }

        return result;
    }

    const handleSubmitRegisterFamily = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        if (familyName === null) { return; } // familyName moet valid zijn, maar dat is normaal gezien het geval want deze functie wordt alleen gerunt als family name valid is

        // checken of die family niet al bestaat (is ook validatie maar hoeft niet voor elk karakter te runnen)
        const existingFamilyResponse = await FamilyService.checkAndGetFamilyByName(familyName!); // ervoor zorgen dat er een valide string wordt doorgegeven, maar door de if statement hierboven is dat zoizo

        if (existingFamilyResponse.status === 200) {
            const familyData = await existingFamilyResponse.json();
            if (familyData !== null) { // als die familie al bestaat
                setError("Family with this name already exists.");
            }
            return;
        }
        if (localStorage.getItem("loggedInUser") === null) { return; } // als er nog geen user ingelogd is
        const loggedInUserEmail = JSON.parse(localStorage.getItem("loggedInUser")!).email;



        const family: Family = {
            name: familyName!,
            members: [{ email: loggedInUserEmail }], // als een familie wordt aangemaakt is de user die het aangemaakt heeft voorlopig nog de enige user
        }

        const response = await FamilyService.createFamily(family);
        const data = await response.json();
        if (!response.ok) {
            // error
            setError("Something went wrong while registering family. Please try again later.");
        } else {
            // family registered succesfully
            handleFamilyRegistered(data);
        }
    }

    return (
        <>
            <div className="center-float">
                {/* <button className="close-button icon-button" onClick={closeRegisterFamilyPopup}>X</button> */}
                <h4>Register New Family</h4>
                <div className="login-form">
                    <form onSubmit={handleSubmitRegisterFamily}>
                        <label htmlFor="nameInput">
                            Family Name
                        </label>
                        <div>
                            <input
                                id="nameInput"
                                type="text"
                                onChange={(event) => { setFamilyName(event.target.value), validate() }} // ook validate opnieuw runnen zodat de error message weg gaat van zodra ze een naam typen
                            />
                        </div>
                        <button type="submit">
                            Register
                        </button>
                        {error && <p className="form-error">{error}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterFamilyWindow;