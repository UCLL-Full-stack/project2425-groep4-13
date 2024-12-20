import { Item } from '../model/item';
import database from './database';

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
    getallItems,
    createItem,
}