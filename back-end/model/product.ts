import {Product as ProductPrisma} from '@prisma/client'

export class Product {
    private id?: number;
    private name: string;

    constructor(product: { id?: number, name: string, }) {
        this.validate(product);

        this.id = product.id;
        this.name = product.name;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    validate(product: {name: string;}) {
        if(!product.name?.trim()) {
            throw new Error("Name is required")
        }
    }

    equals(product: Product): boolean {
        return (
            this.name === product.getName()
        );
    }

    static from({id, name}: ProductPrisma) {
        return new Product({
            id,
            name,
        });
    }
}