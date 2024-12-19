import { Product } from "../model/product";
import productDb from "../repository/product.db";

// functie om te checken of een product bestaat
// indien ja, dat product returnen
// indien nee, null returnen
const checkAndGetProductByName = async (name: string): Promise <Product | null> => {
    const product = await productDb.getProductByName({name});
    if(product) {
        return product;
    } else {
        return null;
    }
}

export default {
    checkAndGetProductByName,
}