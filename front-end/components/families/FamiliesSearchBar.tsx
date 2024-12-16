// om te zoeken naar bestaande families om er een te joinen

import React, { useState } from 'react';


type Props = {
    showFamilyRegisterWindow: () => void;
    showFamilySearchWindow: () => void;
}

// de keuze om een nieuwe familie aan te maken of een al bestaande joinen
const FamiliesSearchBar: React.FC<Props> = ({ showFamilyRegisterWindow, showFamilySearchWindow }: Props) => {
    const [currentSearchTerm, setCurrentSearchTerm] = useState<string>();

    const searchFamily = () => {

    }

    return (
        <div>
            <input type="text" placeholder="Search for existing families" value={currentSearchTerm} onChange={(e) => setCurrentSearchTerm(e.target.value)} />
            <button
                onClick={handleSearch}
                style={{ padding: '8px 16px', fontSize: '16px' }}
            >
                Search
            </button>
        </div>
    )

}

export default FamiliesSearchBar;