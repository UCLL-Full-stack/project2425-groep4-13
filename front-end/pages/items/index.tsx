import Header from "@components/header";
import ItemsOverviewTable from "@components/items/ItemsOverviewTable";
import ItemService from "@services/ItemService";
import { ItemGroup, Item } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";


const Items: React.FC = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [groupedItems, setGroupedItems] = useState<ItemGroup[]>([]); // gegroepeerd op product

    const getItemsOfFamily = async () => {
        if (localStorage.getItem("loggedInUser") === null) { return; } // als er nog geen user ingelogd is
        if (localStorage.getItem("Family") === null) { return; } // als er nog geen family is

        const response = await ItemService.getItemsByFamilyNameOrderedByDate(localStorage.getItem("Family")!);
        if (response.status === 200) { // als succesvolle fetch
            const json: Item[] = await response.json();
            setItems(json);

            // lijst van grouped items maken
            const grouped: { [productName: string]: ItemGroup } = {};


            // ook de groups van items maken
            json.forEach((item) => {
                if (!grouped[item.product.name]) { //als er nog geen group voor deze product is
                    grouped[item.product.name] = {
                        product: item.product,
                        firstExpirationDate: item.expirationDate,
                        items: [item]
                    }
                } else { // als er wel al een is
                    // dan deze item toevoegen in de item lijst van die groep
                    // en checken of hij een eerdere expirationdate heeft
                    grouped[item.product.name].items.push(item);

                    if (item.expirationDate < grouped[item.product.name].firstExpirationDate) {
                        grouped[item.product.name].firstExpirationDate = item.expirationDate;
                    }
                }
            })

            setGroupedItems(Object.values(grouped)); // de grouped dictionary als array opslagen
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

                {/* <input
                    type="checkbox"
                    id="group-by-product"
                    checked={groupByProduct}  // checkbox verbinden aan de state variabele
                    onChange={toggleGroupByProduct}
                />
                <label htmlFor="group-by-product">Group by product</label> */}


                <ItemsOverviewTable itemGroups={groupedItems} />
            </main>

        </>
    );
}

export default Items;