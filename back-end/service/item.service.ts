import { Item } from "../model/item";
import itemDb from "../repository/item.db"
import productDb from "../repository/product.db";
import {ItemInput} from "../types";


const getAllItems = async (): Promise<Item[]> => itemDb.getallItems();

// hier nog een get items by family functie denk ik
// of dat in family service?

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
}