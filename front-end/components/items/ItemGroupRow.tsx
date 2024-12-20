import { ItemGroup } from "@types";
import { useState } from "react";

type Props = {
    itemGroup: ItemGroup;
    itemGroupIndex: number;
}

const ItemGroupRow: React.FC<Props> = ({ itemGroup, itemGroupIndex }: Props) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    return (
        <>
            <tr>HEY</tr>
        </>
    )
}

export default ItemGroupRow;