import FamilyService from '@/services/FamilyService';
import { Family, User } from '@/types';
import React, { useState } from 'react';


type Props = {
    handleFamilyRegistered: () => void; // handleFamilyRegistered returnt niets
}

const RegisterFamilyWindow: React.FC<Props> = ({ handleFamilyRegistered }: Props) => {
    const [error, setError] = useState<string | null>(null);
    const [familyName, setFamilyName] = useState<string>();

    const validate = () => {
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
        const familyNameValid = familyName || "Family Error"; // omdat die state variabele null kan zijn moet dit, zodat typescript zeker weet dat het idd niet null is

        const loggedInUserEmail = "john.doe@ucll.be";
        // TODO dit moet vervangen door de localstorage van ingelogde user

        // const userResponse = await UserService.getFamilyByMemberEmail("john.doe@ucll.be");
        // const json = await userResponse.json();

        const loggedInUser: User = { // tijdelijk manueel user definieren
            email: "john.doe@ucll.be",
            firstName: "John",
            lastName: "Doe",
            password: "Secret123"
        }

        const family: Family = {
            name: familyNameValid,
            members: [loggedInUser], // als een familie wordt aangemaakt is de user die het aangemaakt heeft voorlopig nog de enige user
        }

        const response = await FamilyService.createFamily(family);
        const data = await response.json();
        if (!response.ok) {
            // error
            setError("Something went wrong while registering family. Please try again later.");
        } else {
            // family registered succesfully
            handleFamilyRegistered();
            console.log(data);

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