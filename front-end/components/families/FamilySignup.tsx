import React from 'react';


type Props = {
    showFamilyRegisterWindow: () => void;
    showFamilySearchWindow: () => void;
}

// de keuze om een nieuwe familie aan te maken of een al bestaande joinen
const FamilySignup: React.FC<Props> = ({ showFamilyRegisterWindow, showFamilySearchWindow }: Props) => {
    return (
        <div>
            <button onClick={showFamilyRegisterWindow} className='colored-button'>Register New Family</button>
            <button onClick={showFamilySearchWindow} className='colored-button'>Join Existing Family</button>
        </div>
    )

}

export default FamilySignup;