import { Product } from '../model/product';
import database from './database';

// const getAllProducts = async (): Promise<Product[]> => {

// }

const getProductByName = async ({name}: {name: string}): Promise<Product | null> => {
    try {
        const productPrisma = await database.product.findUnique({
            where: {name},
        })
        return productPrisma ? Product.from(productPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getProductByName,
}