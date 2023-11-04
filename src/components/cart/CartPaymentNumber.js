import Image from 'next/image';

export default function CartPaymentNumber({
    name,
    number,
    description,
    image,
}) {
    return (
        <div className='flex justify-between h-[6.25rem] py-2 overflow-hidden'>
            <div className='w-32 relative rounded-lg overflow-hidden'>
                <Image
                    src={image}
                    alt={name}
                    fill={true}
                    className='object-cover'
                />
            </div>

            <div className='flex flex-col flex-1 pl-2 overflow-hidden'>
                <div className='flex flex-col flex-1 justify-between text-right px-2 py-0.5'>
                    <p className='text-sm font-medium'>{name}</p>
                    <p className='pb-0.5 text-sm font-light text-gray-600 truncate'>
                        {description}
                    </p>
                </div>

                <div className='flex justify-between border-t py-0.5'>
                    <div className='mt-1 w-20 border rounded-md overflow-hidden shadow'>
                        <input
                            type='number'
                            // value={number}
                            // onChange={(event) => setNumber(event.target.value)}
                            className='w-20 text-center text-sm'
                        />
                    </div>

                    <button className='text-sm px-4 text-center border rounded-md overflow-hidden shadow bg-gray-100 hover:bg-gray-200 transition-colors'>
                        מחק
                    </button>
                </div>
            </div>
        </div>
    );
}
