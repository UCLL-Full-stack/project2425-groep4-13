import Header from "@/components/header";
import Head from "next/head";

const Families: React.FC = () => {
    return (
        <>
            <Head>
                <title>My Families</title>
            </Head>
            <Header />
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