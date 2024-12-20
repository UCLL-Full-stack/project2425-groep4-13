import { Item } from "@types";

type Props = {
    items: Item[];
}

const ItemsOverviewTable: React.FC<Props> = ({ items }: Props) => {
    return (
        <>
            {items &&
                <div className="bg-neutral-200 border-2 border-mediumgray rounded shadow-md p-5 text-center">
                    <table className='w-full table-fixed mt-5'>
                        <thead className='bg-darkgreen text-whitesmoke w-full'>
                            <tr className=''>
                                <th scope="col" className='w-1/3'>Name</th>
                                <th scope="col" className='w-1/3'>Amount</th>
                                <th scope="col" className='w-1/3'>Expiration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, itemIndex) => (
                                <tr key={itemIndex} onClick={() => { }} role="button">
                                    <td>{item.product.name}</td>
                                    <td>{item.amount}</td>
                                    <td>{new Date(item.expirationDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
}

export default ItemsOverviewTable;