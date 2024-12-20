import ItemService from "@services/ItemService";
import { useState } from "react";
import { Product } from '@types';

const AddItemWindow: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [itemName, setItemName] = useState<string>("");
    const [itemAmount, setItemAmount] = useState<number>(0);
    const [itemExpirationDate, setItemExpirationDate] = useState<string>("");

    const validate = async () => {
        let result = true;
        setError(null);

        if (!itemName) {
            setError("Name is required.")
            result = false;
        }

        if (!itemAmount) {
            setError("Amount is required.")
            result = false;
        }

        if (!itemExpirationDate) {
            setError("Expiration date is required.")
            result = false;
        }

        return result;
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const familyName = localStorage.getItem("Family");
        if (!familyName) {
            return;
        }

        const product = {
            name: itemName,
        };

        const item = {
            product: product,
            amount: itemAmount,
            expirationDate: new Date(itemExpirationDate), // string naar Date converteren
        };

        try {
            // eerst item aanmaken
            const registeredItemResponse = await ItemService.registerItem(item);
            const registeredItem = await registeredItemResponse.json(); // Get the response from the API

            if (registeredItem && registeredItem.id) {
                // en nu al meteen aan familie toevoegen
                await ItemService.addItemToFamily(familyName, registeredItem);
            } else {
                setError("Failed to register the item.");
            }

            const result = await ItemService.addItemToFamily(familyName, item);

        } catch (error) {
            // Handle any errors that occur
            console.error("Error adding item to family:", error);
            setError("Failed to add item to the family.");
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="bg-whitesmoke border-2 border-mediumgray rounded shadow-md p-5 text-center">
                {error && (
                    <div className="text-red mb-4">{error}</div>
                )}

                <label
                    htmlFor="nameInput"
                    className="font-sans text-lg font-bold text-darkgreen"
                >
                    Name
                </label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="nameInput"
                        type="text"
                        value={itemName}
                        onChange={(event) => setItemName(event.target.value)}
                        className="border border-darkgreen p-2 border-solid rounded-md w-2/4"
                    />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="itemAmount"
                        className="font-sans text-lg font-bold text-darkgreen"
                    >
                        Amount
                    </label>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="itemAmount"
                            type="number"
                            value={itemAmount}
                            onChange={(event) => setItemAmount(Number(event.target.value))}
                            className="border border-darkgreen p-2 border-solid rounded-md w-2/4"
                            min={1}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="itemExpirationDate"
                        className="font-sans text-lg font-bold text-darkgreen"
                    >
                        Expiration Date
                    </label>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="itemExpirationDate"
                            type="date"
                            value={itemExpirationDate}
                            onChange={(event) => setItemExpirationDate(event.target.value)}
                            className="border border-darkgreen p-2 border-solid rounded-md w-2/4"
                        />
                    </div>
                </div>






                <button
                    className="mt-4 py-2 px-8 bg-darkgreen text-whitesmoke font-sans font-bold text-xl rounded-full border-none hover:bg-lightgreen transition duration-100"
                    type="submit"
                >
                    Add
                </button>
            </form>
        </>
    );
}

export default AddItemWindow;