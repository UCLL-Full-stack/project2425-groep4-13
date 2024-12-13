import FamiliesOverviewTable from "@components/families/FamiliesOverviewTable";
import FamiliesSearchBar from "@components/families/FamiliesSearchBar";
import FamilySignup from "@components/families/FamilySignup";
import RegisterFamilyWindow from "@components/families/RegisterFamilyWindow";
import Header from "@components/header";
import FamilyService from "@services/FamilyService";
import { Family } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Families: React.FC = () => {
    const [family, setFamily] = useState<Family | null>(null); // is null als de user nog geen family heeft
    const [currentStep, setCurrentStep] = useState<String>(); // om te weten in welke stap de user zit

    const getFamily = async () => {
        if (localStorage.getItem("loggedInUser") === null) { return; } // als er nog geen user ingelogd is

        const loggedInUserEmail = JSON.parse(localStorage.getItem("loggedInUser")!).email;

        const response = await FamilyService.getFamilyByMemberEmail(loggedInUserEmail);
        if (response.status === 200) { // als succesvolle fetch, dan zit de user dus in een family
            const json: Family = await response.json();
            setFamily(json);
        } else { // dan zit de user niet in een familie
            setFamily(null);
        }
    }

    // use effect die moet runnen wanneer de pagina voor het eerst geopend wordt
    // moet zo met 2 aparte useEffects want setFamily gebeurt niet instant, maar die variabele is wel nodig om de pagina te renderen
    useEffect(() => {
        getFamily();
    }, []);

    // use effect die update als de "family" state variabele verandert, dus nadat die wordt gefetched
    useEffect(() => {
        localStorage.setItem("Family", JSON.stringify(family));

        // als user al een familie heeft, dan zijn alle stappen gedaan
        if (family !== null) {
            if (localStorage.getItem("loggedInUser") !== null) {
                if (JSON.parse(localStorage.getItem("loggedInUser")!).role == "pending") { // als de user nog pending is is in die familie
                    setCurrentStep("PendingFamilyApproval")
                } else { // als de user al geaccepteerd is in de family
                    setCurrentStep("InFamily")
                }
            }
        } else {
            setCurrentStep("FamilySignup")
        }
    }, [family]);

    // functies om de currentStep aan te passen via andere components (dus die worden doorgegeven als callbacks)
    const showFamilyRegisterWindow = () => { setCurrentStep("RegisterNewFamily"); } // als user optie "register new family" kiest
    const handleFamilyRegistered = (family: Family) => { // als user een nieuwe family heeft geregisterd
        setCurrentStep("InFamily");
        setFamily(family);
    }

    const showFamilySearchWindow = () => { setCurrentStep("JoinExistingFamily"); } // als user optie "join existing family" kiest
    const handleRequestedFamilyJoin = () => { setCurrentStep("PendingFamilyApproval"); } // als user heeft een familie gejoined en dus moet wachten tot iemand hem accepteerd

    return (
        <>
            <Head>
                <title>My Family | FreshTrack</title>
            </Head>
            <Header />
            <main>
                <h1>My Family Overview</h1>

                {
                    currentStep === "FamilySignup" && <FamilySignup showFamilyRegisterWindow={showFamilyRegisterWindow} showFamilySearchWindow={showFamilySearchWindow} />
                }

                {
                    currentStep === "RegisterNewFamily" && <RegisterFamilyWindow handleFamilyRegistered={handleFamilyRegistered} />
                }

                {
                    currentStep === "JoinExistingFamily" && <FamiliesSearchBar handleRequestedFamilyJoin={handleRequestedFamilyJoin} />
                }

                {
                    currentStep === "PendingFamilyApproval" && <p>Please wait until the family owner accepts your request to join their family. Refresh the page to check again.</p>
                }

                {/* <div className="centered">
                    <button className="colored-button" onClick={openRegisterFamilyPrompt}>Add New Family</button>
                </div>
                {registerFamilyPromptOpen === true && <RegisterFamilyWindow closeRegisterFamilyPopup={closeRegisterFamilyPrompt}></RegisterFamilyWindow>} */}
            </main>
            {/* <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Lecturers</h1>
                <section>
                    <h2>Lecturers overview</h2>
                </section>
                {
                    lecturers && <LecturerOverviewTable lecturers={lecturers} selectLecturer={setSelectedLecturer} />
                }
                {
                    selectedLecturer &&
                    <>
                        <h2>Courses taught by {selectedLecturer && `${selectedLecturer.user.firstName} ${selectedLecturer.user.lastName}`}</h2>
                        <CourseOverviewTable lecturer={selectedLecturer} />
                    </>

                }
            </main> */}
        </>
    );
};

export default Families;