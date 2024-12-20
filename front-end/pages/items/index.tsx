import Header from "@components/header";
import ItemsOverviewTable from "@components/items/ItemsOverviewTable";
import ItemService from "@services/ItemService";
import { Item } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";


const Items: React.FC = () => {

    const [items, setItems] = useState<Item[]>([]);

    const getItemsOfFamily = async () => {
        if (localStorage.getItem("loggedInUser") === null) { return; } // als er nog geen user ingelogd is
        if (localStorage.getItem("Family") === null) { return; } // als er nog geen family is

        const response = await ItemService.getItemsByFamilyNameOrderedByDate();
        if (response.status === 200) { // als succesvolle fetch
            const json = await response.json();
            setItems(json);
        }
    }

    useEffect(() => {
        getItemsOfFamily();
    }, []);

    return (
        <>
            <Head>
                <title>Items | FreshTrack</title>
            </Head>
            <Header />
            <main>
                <h1 className="font-sans text-darkgreen text-3xl underline font-weight-700 font-bold">
                    Items</h1>
                <ItemsOverviewTable items={items} />
            </main>

        </>
    );
}

export default Items;