// om te zoeken naar bestaande families om er een te joinen

import FamilyService from '@services/FamilyService';
import { Family } from '@types';
import React, { useState } from 'react';


type Props = {
    handleRequestedFamilyJoin: () => void;
}

// de keuze om een nieuwe familie aan te maken of een al bestaande joinen
const FamiliesSearchBar: React.FC<Props> = ({ handleRequestedFamilyJoin }: Props) => {
    const [currentSearchTerm, setCurrentSearchTerm] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const validate = async () => {
        let result = true;
        setError(null);

        if (!currentSearchTerm) {
            setError("Name is required.")
            result = false;
        }

        const response = await FamilyService.checkAndGetFamilyByName(currentSearchTerm!); // maar door de if statement hierboven is currentSerachTerm altijd oké

        if (response.status === 200) {
            const familyData = await response.json();
            if (familyData !== null) { // als er een familie is gevonden met die naam
                result = true;
            } else {
                setError("Family with this name does not exist");
                result = false; // als die familie niet bestaat
            }
        } else { // als er een fout is
            setError("Something went wrong fetching families with this name");
            result = false;
        }

        return result;
    }

    const searchFamily = async () => {
        if (!validate()) {
            return;
        }


        if (localStorage.getItem("loggedInUser") === null) { setError("No user is logged in"); return; } // als er nog geen user ingelogd is
        const loggedInUserEmail = JSON.parse(localStorage.getItem("loggedInUser")!).email;


        const response = await FamilyService.getFamilyByName(currentSearchTerm || "thiswillneverbeneeded"); // dit gaat nu werken, want in validate wordt gecheckt of die familie bestaat
        if (response.status === 200) {

            const family: Family = await response.json();

            const pushResponse = await FamilyService.addUserToFamily(family, loggedInUserEmail);
            if (pushResponse.status === 200) {
                localStorage.setItem("Family", family.name);

                handleRequestedFamilyJoin();
            } else {
                setError("Something went wrong while adding user to family");
            }
        } else {
            setError("Something went wrong fetching families");
            return;
        }
    }

    return (
        <div>
            <input type="text" placeholder="Enter family name" value={currentSearchTerm} onChange={(e) => setCurrentSearchTerm(e.target.value)} />
            <button onClick={searchFamily} >
                Join Family
            </button>
            {error && <p className="form-error">{error}</p>}
        </div>
    )

}

export default FamiliesSearchBar;