import getOrders from '@/api/orders';
import axios from 'axios';
import withSsrAuth from '@/lib/withSsrAuth';

export default function OrdersPage({ orders }) {
    const changeStatus = (status, id) => {
        axios
            .post('/api/order/change-status', {
                id,
                status,
            })
            .then(window.location.reload())
            .catch((err) => console.log(err));
    };

    return (
        <div className='h-full flex flex-col px-2'>
            <p className='text-xl font-medium text-center mt-4 mb-2'>
                הזמנות פעילות
            </p>

            <ul className='divide-y flex-1 overflow-auto'>
                {orders.map((order, index) => (
                    <li key={index} className='w-full py-2 text-right'>
                        <p>שם - {order.name}</p>
                        <p className='mb-2'>מספר טלפון - {order.phoneNumber}</p>

                        <p>מחיר - ₪ {order.price}</p>
                        <p>שיטת תשלום - {order.paymentMethod}</p>
                        {order.paymentNumber && (
                            <p>מספר - {order.paymentNumber}</p>
                        )}

                        <ul className='mt-2'>
                            {order.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        {order.message && <p>הערות - {order.message}</p>}

                        <select
                            value={order.status || 'שולמה'}
                            onChange={(event) =>
                                changeStatus(event.target.value, order.id)
                            }
                            dir='rtl'
                            className='px-3 py-2 w-full text-sm text-gray-700 bg-transparent border-b-2 appearance-none focus:outline-none focus:ring-0'
                        >
                            <option value='התקבלה'>התקבלה</option>
                            <option value='שולמה'>שולמה</option>
                            <option value='בהכנה'>בהכנה</option>
                            <option value='נמסרה'>נמסרה</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const getServerSideProps = withSsrAuth(async () => {
    const orders = await getOrders();

    return {
        props: { orders },
    };
}, '/crew/orders');
