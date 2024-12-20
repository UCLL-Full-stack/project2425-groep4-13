import { Item } from "../model/item";
import { Product } from "../model/product";
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

    console.log("ITEM ITEM ITEM");
    console.log(productInput);

    if (!productInput.name) throw new Error("Product name is required.");


    const databaseProduct = await productDb.getProductByName({ name: productInput.name! });
    let realDatabaseProduct;
    if (!databaseProduct) { // als er nog geen product in de database zit met die naam
        const newProduct = new Product({ name: productInput.name });

        // in database zetten
        const savedProduct = await productDb.createProduct(newProduct);

        realDatabaseProduct = savedProduct;
    } else {
        realDatabaseProduct = databaseProduct;
    }

    // als dat product niet bestaat
    if (!realDatabaseProduct) throw new Error(`Product with name ${productInput.name} not found.`);

    const item = new Item({
        product: realDatabaseProduct!,
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