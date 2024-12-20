import { Item } from "@types";

// const getItemsByFamilyName = async () => {
//     return await fetch(process.env.NEXT_PUBLIC_API_URL + "/item", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
// }

const getItemsByFamilyNameOrderedByDate = async (familyName: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/item/family/${familyName}/order/date`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
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

const addItemToFamily = async (familyName: string, item: Item) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/family/item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            family: { name: familyName }, // You might need to pass the family name here
            item: item, // Item details
        }),
    });
};

const ItemService = {
    // getItemsByFamilyName,
    getItemsByFamilyNameOrderedByDate,
    registerItem,
    addItemToFamily,
};

export default ItemService;