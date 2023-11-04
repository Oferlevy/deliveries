import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function PaymentNumberDescription({
    name,
    image,
    description,
    close,
}) {
    const [number, setNumber] = useState(0);
    const [inOrder, setInOrder] = useState(false);

    const { cart, dispatch } = useCart();

    useEffect(() => {
        const paymentNumber = cart.paymentNumber?.number;

        if (paymentNumber) {
            setInOrder(true);
            setNumber(paymentNumber);
        } else {
            setInOrder(false);
            setNumber('');
        }
    }, []);

    const addNumber = () => {
        if (!inOrder && !number) return;

        const paymentNumber = number === '' ? null : parseInt(number);
        dispatch({
            type: 'setPaymentNumber',
            name,
            image,
            description,
            number: paymentNumber,
        });
        close();
    };

    return (
        <div className='w-full bg-white'>
            <div className='relative w-full pt-[60%] overflow-hidden'>
                <Image
                    src={image}
                    alt={name}
                    fill={true}
                    className='object-cover'
                />
            </div>

            <div className='text-right px-3 py-4'>
                <p className='text-xl font-semibold'>{name}</p>
                <p className='text-gray-500 text-sm pb-5'>{description}</p>
            </div>

            <div className='flex p-3'>
                <div className='flex mr-2 border rounded-md overflow-hidden shadow'>
                    <input
                        type='number'
                        value={number}
                        onChange={(event) => setNumber(event.target.value)}
                        className='w-44 text-center text-sm'
                    />
                </div>

                <button
                    onClick={addNumber}
                    className='p-3 w-full bg-[#8b5cf6] rounded-md shadow-lg text-white font-semibold transition text-sm'
                >
                    {inOrder
                        ? number === ''
                            ? 'מחק מספר'
                            : 'עדכן מספר'
                        : 'הוסף להזמנה'}
                </button>
            </div>
        </div>
    );
}
