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
    id,
    close,
}) {
    const [quantity, setQuantity] = useState(1);
    const [inOrder, setInOrder] = useState(false);

    const { cart, dispatch } = useCart();

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
                },
            });
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
                <p className='text-[#8b5cf6] font-medium pt-2 pb-2'>
                    {price} ₪
                </p>
                <p className='text-gray-500 bg-red-100 text-sm'>
                    {description}
                </p>
            </div>

            <div className='flex p-3'>
                <div className='flex mr-2 border rounded-md overflow-hidden shadow'>
                    <button
                        disabled={inOrder ? quantity === 0 : quantity === 1}
                        onClick={() => setQuantity(quantity - 1)}
                        className={`flex items-center justify-center px-3 ${
                            (inOrder ? quantity === 0 : quantity === 1)
                                ? 'bg-slate-100 text-gray-500'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }  transition`}
                    >
                        <BiMinus size={14} />
                    </button>
                    <span className='flex justify-center items-center w-10 text-sm'>
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className='flex items-center justify-center px-3 bg-gray-200 hover:bg-gray-300 transition'
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
                    <p>{quantity * price} ₪</p>
                    <p className='font-semibold '>
                        {inOrder ? 'עדכן פריט' : 'הוסף להזמנה'}
                    </p>
                </button>
            </div>
        </div>
    );
}
