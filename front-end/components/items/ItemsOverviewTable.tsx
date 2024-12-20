import { ItemGroup, Item } from "@types";
import ItemRow from "./ItemRow";
import ItemGroupRow from "./ItemGroupRow";

type Props = {
    itemGroups: ItemGroup[];
}

// alle items staan als ItemGroup opgeslagen
// maar sommige groups bestaan maar uit één item (als er maar 1 van die soort is)
// die worden dan anders getoond dan degenen waar er wel een groep van is

const ItemsOverviewTable: React.FC<Props> = ({ itemGroups }: Props) => {
    return (
        <>
            {itemGroups &&
                <div className="bg-neutral-200 border-2 border-mediumgray rounded shadow-md p-5 text-center">
                    <table className='w-full table-fixed mt-5'>
                        <thead className='bg-darkgreen text-whitesmoke w-full'>
                            <tr className=''>
                                <th scope="col" className='w-1/27'>Name</th>
                                <th scope="col" className='w-1/27'>Amount</th>
                                <th scope="col" className='w-1/27'>First Expiration Date</th>
                                <th scope="col" className='w-1/19'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemGroups.map((itemGroup, itemGroupIndex) => (
                                    itemGroup.items.length > 1
                                        ? <ItemGroupRow itemGroup={itemGroup} itemGroupIndex={itemGroupIndex} />
                                        : <ItemRow item={itemGroup.items[0]} itemIndex={itemGroupIndex} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
}

export default ItemsOverviewTable;