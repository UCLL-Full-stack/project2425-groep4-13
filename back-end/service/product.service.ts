import { Product } from "../model/product";
import productDb from "../repository/product.db";
import { ProductInput } from "../types";

// functie om te checken of een product bestaat
// indien ja, dat product returnen
// indien nee, null returnen
const checkAndGetProductByName = async (name: string): Promise <Product | null> => {
    const product = await productDb.getProductByName({name: name.toLowerCase()});
    if(product) {
        return product;
    } else {
        return null;
    }
}

const createProduct = async({name,}: ProductInput): Promise<Product> => {
    if(!name) throw new Error("Product name is required.");

    const existingProduct = await productDb.getProductByName({name: name.toLowerCase()});
    if (existingProduct) throw new Error(`Product with name ${name} already exists.`);

    const product = new Product({
        name,
    })

    return productDb.createProduct(product);
}

export default {
    checkAndGetProductByName,
    createProduct,
}