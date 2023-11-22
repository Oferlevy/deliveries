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
                        sizes='32rem'
                        className='object-cover'
                    />
                </div>

                <div className='flex flex-col flex-1 text-right pl-1 overflow-hidden'>
                    <p dir='rtl' className='text-sm font-semibold py-1'>
                        {name}
                    </p>
                    <p dir='rtl' className='flex-1 text-gray-500 text-xs'>
                        {description}
                    </p>
                    {price >= 0 && (
                        <p className='text-[#8b5cf6] text-sm pb-1'>
                            {price.toFixed(2)} ₪
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
