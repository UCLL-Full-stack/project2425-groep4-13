import { Product } from '../model/product';
import database from './database';

// const getAllProducts = async (): Promise<Product[]> => {

// }

const getProductById = async ({id}: {id: number}): Promise<Product | null> => {
    try {
        const productPrisma = await database.product.findUnique({
            where: {id},
        })
        return productPrisma ? Product.from(productPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

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

const createProduct = async (product: Product): Promise<Product> => {
    try {
        const productPrisma = await database.product.create({
            data: {
                name: product.getName(),
            },
        });
        return Product.from(productPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getProductById,
    getProductByName,
    createProduct,
}