import { GrAdd } from 'react-icons/gr';
import { BiMinus } from 'react-icons/bi';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

export default function CartItem({
    name,
    description,
    price,
    image,
    id,
    quantity,
    minQuantity = 0,
    maxQuantity,
    halves,
}) {
    const { dispatch } = useCart();

    const changeQuantity = (change) => {
        let newQuantity = 0;

        switch (change) {
            case 'add':
                newQuantity = quantity + (halves ? 0.5 : 1);
                break;
            case 'subtract':
                if (quantity === 1) newQuantity = 0;
                else newQuantity = quantity - (halves ? 0.5 : 1);
                break;
            default:
                throw new Error(
                    "Invalid changeQuantity commad: use either 'add' or 'subtract'"
                );
        }

        dispatch({ type: 'setQuantity', id, newQuantity });
    };

    return (
        <div className='flex justify-between h-[6.25rem] py-2 overflow-hidden'>
            <div className='w-32 relative rounded-lg overflow-hidden'>
                <Image
                    src={image}
                    alt={name}
                    fill={true}
                    sizes='32rem'
                    className='object-cover'
                />
            </div>

            <div className='flex flex-col flex-1 pl-2 overflow-hidden'>
                <div className='flex flex-col flex-1 justify-between text-right px-2 pt-0.5'>
                    <p dir='rtl' className='text-sm font-medium'>
                        {name}
                    </p>
                    <p
                        dir='rtl'
                        className='pb-1 text-ms font-light text-gray-500 truncate'
                    >
                        {description}
                    </p>
                </div>

                <div className='flex justify-between items-center py-0.5 border-t'>
                    <p className='text-[#8b5cf6] text-sm font-medium'>
                        {(quantity * price).toFixed(2)} ₪
                    </p>

                    <div className='flex mt-1 mb-0.5 text-center border rounded-md overflow-hidden h-6 shadow'>
                        <button
                            disabled={quantity === minQuantity}
                            onClick={() => changeQuantity('subtract')}
                            className='flex items-center justify-center w-6 bg-gray-200 hover:bg-gray-300 disabled:bg-slate-100 transition'
                        >
                            <BiMinus size={14} />
                        </button>
                        <span className='flex justify-center items-center w-7 text-sm text-[#8b5cf6] font-medium'>
                            {quantity}
                        </span>
                        <button
                            disabled={quantity === maxQuantity}
                            onClick={() => changeQuantity('add')}
                            className='flex items-center justify-center w-6 bg-gray-200 hover:bg-gray-300 disabled:bg-slate-100 transition'
                        >
                            <GrAdd size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
