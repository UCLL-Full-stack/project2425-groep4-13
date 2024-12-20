import { Item } from "@types";

const getItemsByFamilyName = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/item", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }  
    );
}

const registerItem = async (item: Item) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/item", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
}

const ItemService = {
    getItemsByFamilyName,
    registerItem,
};

export default ItemService;