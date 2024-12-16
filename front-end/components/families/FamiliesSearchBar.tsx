// om te zoeken naar bestaande families om er een te joinen

import FamilyService from '@/services/FamilyService';
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

        const response = await FamilyService.getFamilyByName(currentSearchTerm || "thiswillneverbeneeded"); // ervoor zorgen dat er een valide string wordt doorgegeven, maar door de if statement hierboven is dat zoizo

        if (response.status === 200) { // als er een familie is gevonden met die naam
            result = true;
        } else if (response.status === 401) { // als er een fout is
            setError("Something went wrong fetching families with this name");
            result = false;
        } else {
            setError("Family with this name does not exist");
            result = false;
        }

        return result;
    }

    const searchFamily = async () => {
        if (!validate()) {
            return;
        }

        const response = await FamilyService.getFamilyByName(currentSearchTerm || "thiswillneverbeneeded");
        if (response.status === 200) {
            const family = await response.json();
        } else {
            setError("Something went wrong fetching families");
            return;
        }

        handleRequestedFamilyJoin();
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