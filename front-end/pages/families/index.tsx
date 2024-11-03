import FamiliesOverviewTable from "@/components/families/FamiliesOverviewTable";
import Header from "@/components/header";
import FamilyService from "@/services/FamilyService";
import { Family } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Families: React.FC = () => {
    const [families, setFamilies] = useState<Array<Family>>([]);
    console.log("this aaa");

    const getFamilies = async () => {
        const response = await FamilyService.getFamiliesByMemberEmail("john.doe@ucll.be"); //voor nu nog tijdelijk manueel de user hier ingegeven (maar moet achteraf alleen de ingelogde user worden)
        const json = await response.json();
        setFamilies(json);
    }

    useEffect(() => {
        getFamilies();
    }, []);

    return (
        <>
            <Head>
                <title>My Families | FreshTrack</title>
            </Head>
            <Header />
            <main>
                <h1>My Families Overview</h1>
                {
                    families && <FamiliesOverviewTable families={families} />
                }
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