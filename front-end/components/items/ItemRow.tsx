// component voor één rij van een echte item (dus niet van een group)

import { Item } from "@types";

type Props = {
    item: Item;
    itemIndex: number;
}

const ItemRow: React.FC<Props> = ({ item, itemIndex }: Props) => {
    return (
        <>
            <tr key={itemIndex} onClick={() => { }} role="button">
                <td>{item.product.name}</td>
                <td>{item.amount}</td>
                <td>{new Date(item.expirationDate).toLocaleDateString()}</td>
            </tr>
        </>
    )

}

export default ItemRow;