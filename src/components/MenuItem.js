import Image from 'next/image';

export default function MenuItem({ name, description, price, image }) {
    return (
        <div className='py-5 bg-white hover:bg-gray-50 transition'>
            <div className='flex justify-between w-full h-20'>
                <div className='w-32 h-full rounded-lg overflow-hidden relative'>
                    <Image
                        src={image}
                        alt={name}
                        priority={true}
                        fill={true}
                        className='object-cover'
                    />
                </div>

                <div className='flex flex-col flex-1 text-right pl-1 overflow-hidden'>
                    <p className='text-sm font-semibold pt-1'>{name}</p>
                    <p className='flex-1 text-gray-500 text-sm truncate'>
                        {description}
                    </p>
                    <p className='text-[#8b5cf6] text-sm pb-1'>{price} ₪</p>
                </div>
            </div>
        </div>
    );
}
