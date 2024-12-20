import { ItemGroup } from "@types";
import { useState } from "react";
import ItemRow from "./ItemRow";

type Props = {
    itemGroup: ItemGroup;
    itemGroupIndex: number;
}

const ItemGroupRow: React.FC<Props> = ({ itemGroup, itemGroupIndex }: Props) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    }

    return (
        <>
            <tr key={itemGroupIndex} onClick={toggleCollapse} className="w-full hover:bg-mediumgray">
                {
                    collapsed
                        ? (
                            <>
                                <td className="underline">{itemGroup.product.name}</td>
                                <td></td>
                                <td>{new Date(itemGroup.firstExpirationDate).toLocaleDateString()}</td>
                                <td>OPEN</td>
                            </>
                        )
                        : (
                            <>
                                <td colSpan={4}> {/* Breedte innemen van alle kolommen */}
                                    <table className='w-full table-fixed mt-1'>
                                        {/* geen thead nodig omdat die al boven staat van de andere table */}
                                        <tbody className="outline outline-2 outline-gray-400 hover:bg-gray-200 rounded-sm">
                                            {/* een rij die de itemgroup nog steeds voorstelt */}
                                            <tr>
                                                <td className="underline">{itemGroup.product.name}</td>
                                                <td></td>
                                                <td></td>
                                                <td>CLOSE</td>
                                            </tr>
                                            {itemGroup.items.map((item, index) => (
                                                <ItemRow item={item} itemIndex={index} />
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </>
                        )
                }




            </tr>
        </>
    )
}

export default ItemGroupRow;