import { Item } from "../model/item";
import familyDb from "../repository/family.db";
import itemDb from "../repository/item.db"
import productDb from "../repository/product.db";
import {ItemInput} from "../types";


const getAllItems = async (): Promise<Item[]> => itemDb.getallItems();

const getAllItemsOrderByDate = async (): Promise<Item[]> => itemDb.getAllItemsOrderByDate();

const getItemsByFamilyOrderByDate = async ({familyName}: {familyName: string}): Promise<Item[]> => {
    if (!familyName) {
        throw new Error("Family name is required.");
    }

    const family = await familyDb.getFamilyByName({name: familyName});
    if (!family || !family.getId()) throw new Error("No family with this name found.")

    return await itemDb.getFamilyItemsOrderByDate({familyId: family.getId()!});
};


const createItem = async ({
    product: productInput,
    amount,
    expirationDate,
}: ItemInput): Promise<Item> => {
    if (!productInput) throw new Error("Item is required.");
    if (!amount) throw new Error("Amount is required.");
    if (!expirationDate) throw new Error("Expiration date is required.");

    if (!productInput.id) throw new Error("Product ID is required.");
    const databaseProduct = await productDb.getProductById({ id: productInput.id! });

    // als dat product niet bestaat
    if (!databaseProduct) throw new Error(`Product with ID ${productInput.id} not found.`);

    const item = new Item({
        product: databaseProduct!,
        amount,
        expirationDate,
    });

    return await itemDb.createItem(item);
}


export default {
    getAllItems,
    createItem,
    getAllItemsOrderByDate,
    getItemsByFamilyOrderByDate,
}