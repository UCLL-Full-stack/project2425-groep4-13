import {Item as ItemPrisma, Product as ProductPrisma} from '@prisma/client'
import {Product} from "./product";

export class Item {
    private id?: number;
    private product: Product;
    private amount: number;
    private expirationDate: Date;

    constructor(item: {
        id?: number,
        product: Product,
        amount: number,
        expirationDate: Date,
    }) {
        this.validate(item);

        this.id = item.id;
        this.product = item.product;
        this.amount = item.amount;
        this.expirationDate = item.expirationDate;
    }

    getId(): number | undefined {
        return this.id;
    }

    getProduct(): Product {
        return this.product;
    }

    getAmount(): number {
        return this.amount;
    }

    getExpirationDate(): Date {
        return this.expirationDate;
    }

    validate(item: {product: Product; amount: number; expirationDate: Date;}) {
        if (!item.product) {
            throw new Error("Product is required");
        }

        if (!item.amount) {
            throw new Error("Amount is required");
        }

        if (!item.expirationDate) {
            throw new Error("Expiration date is required");
        }
    }

    equals(item: Item): boolean {
        return (
            this.product === item.getProduct() &&
            this.amount === item.getAmount() &&
            this.expirationDate === item.getExpirationDate()
        );
    }

    static from({id, product, amount, expirationDate}: ItemPrisma & {product: ProductPrisma}) {
        return new Item({
            id,
            product: Product.from(product),
            amount,
            expirationDate,
        })
    }
}