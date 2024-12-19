import Header from "@components/header";
import Head from "next/head";

const Items: React.FC = () => {

    return (
        <>
            <Head>
                <title>Items | FreshTrack</title>
            </Head>
            <Header />
            <main>

            </main>
            <h1 className="font-sans text-darkgreen text-3xl underline font-weight-700 font-bold">
                Items</h1>
        </>
    );
}

export default Items;