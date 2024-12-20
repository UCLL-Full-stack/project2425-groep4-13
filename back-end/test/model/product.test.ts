import { Product } from "../../model/product";


const name = "cheese";

test("given: valid values for product, when: product is created, then: product is created with those values", () => {
    //given

    //when
    const product = new Product({name: name});

    //then
    expect(product.getName()).toEqual(name);
});

test("given: invalid name for product, when: product is created, then: error is thrown", () => {
    //given

    //when
    const create = () => new Product({name: ""});

    //then
    expect(create).toThrow("Name is required");
});
