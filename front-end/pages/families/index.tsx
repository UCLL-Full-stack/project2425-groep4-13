import FamiliesOverviewTable from "@/components/families/FamiliesOverviewTable";
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
        const response = await FamilyService.getFamilyByMemberEmail("john.doe@ucll.be");
        const json = await response.json();
        setFamily(json);
        localStorage.setItem("Family", JSON.stringify({ family }));
    }

    // functies om de currentStep aan te passen via andere components (dus die worden doorgegeven als callbacks)
    const handleFamilyRegistered = () => { setCurrentStep("InFamily"); } // als user een nieuwe family heeft geregisterd
    const showFamilyRegisterWindow = () => { setCurrentStep("RegisterNewFamily") } // als user optie "register new family" kiest
    const showFamilySearchWindow = () => { setCurrentStep("JoinExistingFamily") } // als user optie "join existing family" kiest

    useEffect(() => {
        getFamily();

        // als user al een familie heeft, dan zijn alle stappen gedaan
        if (family !== null) {
            setCurrentStep("InFamily")
        } else {
            setCurrentStep("FamilySignup")
        }
    }, []);

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
                    currentStep === "JoinExistingFamily" && 
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