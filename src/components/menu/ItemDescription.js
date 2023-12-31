import { GrAdd } from 'react-icons/gr';
import { BiMinus } from 'react-icons/bi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function ItemDescription({
    name,
    description,
    price,
    image,
    maxQuantity,
    id,
    halves,
    isOpen,
    close,
}) {
    const [quantity, setQuantity] = useState(1);
    const [inOrder, setInOrder] = useState(false);

    const { cart, dispatch } = useCart();

    const changeQuantity = (change) => {
        switch (change) {
            case 'add':
                if (quantity === 0) setQuantity(1);
                else setQuantity(quantity + (halves ? 0.5 : 1));
                break;
            case 'subtract':
                if (quantity === 1) setQuantity(0);
                else setQuantity(quantity - (halves ? 0.5 : 1));
                break;
            default:
                throw new Error(
                    "Invalid changeQuantity commad: use either 'add' or 'subtract'"
                );
        }
    };

    useEffect(() => {
        if (id == null) return;

        const item = cart.items.find((cartItem) => cartItem.id === id);

        if (item) {
            setInOrder(true);
            setQuantity(item.quantity);
        } else {
            setInOrder(false);
            setQuantity(1);
        }
    }, [id]);

    const addItem = () => {
        if (inOrder)
            dispatch({ type: 'setQuantity', id, newQuantity: quantity });
        else
            dispatch({
                type: 'addItem',
                item: {
                    id,
                    quantity,
                    price,
                    image,
                    description,
                    name,
                    maxQuantity,
                    halves,
                },
            });
    };

    if (!isOpen) return;

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
                <p dir='rtl' className='text-xl font-semibold'>
                    {name}
                </p>
                <p className='text-[#8b5cf6] font-medium py-2'>
                    {price.toFixed(2)} ₪
                </p>
                <p dir='rtl' className='text-gray-500 text-sm'>
                    {description}
                </p>
            </div>

            <div className='flex p-3'>
                <div className='flex mr-2 border rounded-md overflow-hidden shadow'>
                    <button
                        disabled={inOrder ? quantity === 0 : quantity === 1}
                        onClick={() => changeQuantity('subtract')}
                        className={
                            'flex items-center justify-center px-3 bg-gray-200 hover:bg-gray-300 disabled:bg-slate-100 transition'
                        }
                    >
                        <BiMinus size={14} />
                    </button>
                    <span className='flex justify-center items-center w-10 text-sm'>
                        {quantity}
                    </span>
                    <button
                        disabled={quantity === maxQuantity}
                        onClick={() => changeQuantity('add')}
                        className='flex items-center justify-center px-3 bg-gray-200 hover:bg-gray-300 disabled:bg-slate-100 transition'
                    >
                        <GrAdd size={14} />
                    </button>
                </div>

                <button
                    onClick={() => {
                        addItem();
                        close();
                    }}
                    className='flex justify-between p-3 w-ful bg-[#8b5cf6] flex-1 rounded-md shadow-lg text-white transition text-sm'
                >
                    <p>
                        {quantity > 0 && `${(quantity * price).toFixed(2)} ₪`}
                    </p>
                    <p className='font-semibold '>
                        {inOrder
                            ? quantity === 0
                                ? 'מחק פריט'
                                : 'עדכן פריט'
                            : 'הוסף להזמנה'}
                    </p>
                </button>
            </div>
        </div>
    );
}
