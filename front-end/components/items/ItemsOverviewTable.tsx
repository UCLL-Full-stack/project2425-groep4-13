import { ItemGroup, Item } from "@types";
import ItemRow from "./ItemRow";
import ItemGroupRow from "./ItemGroupRow";

type Props = {
    // items: Item[];
    itemGroups: ItemGroup[];
}

//oké dit moet dus een table tonen
//sommige rijen kunnen een group zijn, anderen mogelijks niet
//misschien moet er dus een algemeen type die bestaat uit Product, expirationdate en amount toch? en een boolean "isGroup"
//oké ma de table component moet alle items ook kunnen hebben eigenlijk, want die kan expanden
//misschien dus gewoon de logica allemaal hier in
//groupBy wordt meegegeven als prop
//als groupBy = false, gewoon alle items tonen
//als groupBy = true, dan zou die eigenlijk een lijst moeten hebben die gesorteerd is op earliest expirationdate
//of
//anders kan alles als groep voorgesteld worden altijd
//en dan gewoon validatie hier van als lengte van items in groep == 1 of niet?
//dus er is een type "GroupedItems", met product, earliest expiration date, en dan ook een lijst van items?

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
                            {/* {itemGroups.map((itemGroup, itemGroupIndex) => (

                                itemGroup.items.length > 1
                                    ? <tr></tr>
                                    : <ItemRow item={itemGroup.items[0]} itemIndex={itemGroupIndex}>

                                //     <tr key={itemGroupIndex} onClick={() => { }} role="button">
                                //     <td>{itemGroup.product.name}</td>
                                //     <td>{itemGroup.items.length > 1 ? "" : itemGroup.items[0].amount}</td>
                                //     <td>{new Date(itemGroup.firstExpirationDate).toLocaleDateString()}</td>
                                //     <td>{itemGroup.items.length > 1 ? "EXPAND" : ""}</td>
                                // </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
}

export default ItemsOverviewTable;