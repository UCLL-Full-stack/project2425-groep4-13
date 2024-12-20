import { Item } from '../model/item';
import { Product } from '../model/product';
import database from './database';
import productDb from './product.db';

const getItemById = async ({ id }: { id: number }): Promise<Item | null> => {
    try {
        const itemPrisma = await database.item.findUnique({
            where: { id },
            include: { product: true },
        });

        return itemPrisma ? Item.from(itemPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getallItems = async (): Promise<Item[]> => {
    try {
        const itemsPrisma = await database.item.findMany({
            include: {
                product: true,
            }
        });

        return itemsPrisma.map((itemPrisma) => Item.from(itemPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllItemsOrderByDate = async (): Promise<Item[]> => {
    try {
        const itemsPrisma = await database.item.findMany({
            orderBy: {
                expirationDate: 'asc', // afdalend sorteren op expiration date
            },
            include: {
                product: true,
            }
        });
        return itemsPrisma.map((itemPrisma) => Item.from(itemPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

// const getAllItemsOrderByDateGroupByProduct = async (): Promise<Item[]> => {
//     try {
//         const groupedItems = await database.item.groupBy({
//             by: ['productId'],  // groeperen op product id
//             _min: {
//                 expirationDate: true,  // als expiration date het item die het snelst slecht wordt
//             },
//             orderBy: {
//                 _min: {
//                     expirationDate: 'asc', // afdalend sorteren op expiration date
//                 },
//             },
//         });

//         const groupedItemsWithProductPrisma = await Promise.all(
//             groupedItems.map(async (group) => {
//                 // product fetchen
//                 const product = productDb.getProductById({id: group.productId})

//                  // Return the grouped item with product details
//                  return {
//                     productId: group.productId,
//                     expirationDate: group._min.expirationDate,  // Earliest expiration date
//                     product: Product.from(product),
//                 };
//             })
//         );
//         return groupedItemsWithProductPrisma.map((groupedItemWithProductPrisma) => Item.from(groupedItemWithProductPrisma));
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// }


const createItem = async(item: Item): Promise<Item> => {
    try {
        const itemPrisma = await database.item.create({
            data: {
                product: {
                    connect: { id: item.getProduct().getId() }
                },
                amount: item.getAmount(),
                expirationDate: item.getExpirationDate(),
            },
            include: {
                product: true,
            }
        });
        return Item.from(itemPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getItemById,
    getallItems,
    getAllItemsOrderByDate,
    createItem,
}