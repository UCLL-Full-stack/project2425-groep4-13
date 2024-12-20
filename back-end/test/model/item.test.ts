import { Item } from "../../model/item";
import { Product } from "../../model/product";

const product = new Product({ name: "Cheese" });
const amount = 5;
const expirationDate = new Date("2024-12-31");

test("given: valid values for item, when: item is created, then: item is created with those values", () => {
    // given

    // when
    const item = new Item({
        product: product,
        amount: amount,
        expirationDate: expirationDate,
    });

    // then
    expect(item.getProduct()).toEqual(product);
    expect(item.getAmount()).toEqual(amount);
    expect(item.getExpirationDate()).toEqual(expirationDate);
});

test("given: missing product for item, when: item is created, then: error is thrown", () => {
    // given

    // when
    const create = () =>
        new Item({
            product: null as unknown as Product,
            amount: amount,
            expirationDate: expirationDate,
        });

    // then
    expect(create).toThrow("Product is required");
});

test("given: missing amount for item, when: item is created, then: error is thrown", () => {
    // given

    // when
    const create = () =>
        new Item({
            product: product,
            amount: 0, // assuming 0 is invalid
            expirationDate: expirationDate,
        });

    // then
    expect(create).toThrow("Amount is required");
});

test("given: missing expirationDate for item, when: item is created, then: error is thrown", () => {
    // given

    // when
    const create = () =>
        new Item({
            product: product,
            amount: amount,
            expirationDate: null as unknown as Date,
        });

    // then
    expect(create).toThrow("Expiration date is required");
});

test("given: two items with the same values, when: equals is called, then: it returns true", () => {
    // given
    const item1 = new Item({
        product: product,
        amount: amount,
        expirationDate: expirationDate,
    });
    const item2 = new Item({
        product: product,
        amount: amount,
        expirationDate: expirationDate,
    });

    // when
    const result = item1.equals(item2);

    // then
    expect(result).toBe(true);
});

test("given: two items with different values, when: equals is called, then: it returns false", () => {
    // given
    const item1 = new Item({
        product: product,
        amount: amount,
        expirationDate: expirationDate,
    });
    const item2 = new Item({
        product: new Product({ name: "Milk" }), // different product
        amount: amount,
        expirationDate: expirationDate,
    });

    // when
    const result = item1.equals(item2);

    // then
    expect(result).toBe(false);
});
