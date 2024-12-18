import FamiliesOverviewTable from "@/components/families/FamiliesOverviewTable";
import FamiliesSearchBar from "@/components/families/FamiliesSearchBar";
import FamilySignup from "@/components/families/FamilySignup";
import RegisterFamilyWindow from "@/components/families/RegisterFamilyWindow";
import Header from "@/components/header";
import FamilyService from "@/services/FamilyService";
import { Family } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Families: React.FC = () => {
    const [family, setFamily] = useState<Family | null>(null); // is null als de user nog geen family heeft
    const [currentStep, setCurrentStep] = useState<String>(); // om te weten in welke stap de user zit

    const getFamily = async () => {
        const response = await FamilyService.getFamilyByMemberEmail("mike.doe@ucll.be");
        if (response.status === 200) { // als succesvolle fetch, dan zit de user dus in een family
            const json: Family = await response.json();
            setFamily(json);
        } else { // dan zit de user niet in een familie
            console.log("status is:");
            console.log(response.status);
            setFamily(null);
        }
    }

    // use effect die moet runnen wanneer de pagina voor het eerst geopend wordt
    // moet zo met 2 aparte useEffects want setFamily gebeurt niet instant, maar die variabele is wel nodig om de pagina te renderen
    useEffect(() => {
        console.log("this running");
        getFamily();
    }, []);

    // use effect die update als de "family" state variabele verandert, dus nadat die wordt gefetched
    useEffect(() => {
        localStorage.setItem("Family", JSON.stringify(family));

        // als user al een familie heeft, dan zijn alle stappen gedaan
        if (family !== null) {
            // hier checken of user status "===" pending, dan zit die nog niet echt helemaal in de familie
            setCurrentStep("PendingFamilyApproval")
            // setCurrentStep("InFamily")
        } else {
            setCurrentStep("FamilySignup")
        }
    }, [family]);

    // functies om de currentStep aan te passen via andere components (dus die worden doorgegeven als callbacks)
    const showFamilyRegisterWindow = () => { setCurrentStep("RegisterNewFamily") } // als user optie "register new family" kiest
    const handleFamilyRegistered = () => { setCurrentStep("InFamily"); } // als user een nieuwe family heeft geregisterd

    const showFamilySearchWindow = () => { setCurrentStep("JoinExistingFamily") } // als user optie "join existing family" kiest
    const handleRequestedFamilyJoin = () => { setCurrentStep("PendingFamilyApproval") } // als user heeft een familie gejoined en dus moet wachten tot iemand hem accepteerd

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