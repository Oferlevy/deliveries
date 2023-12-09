import Link from 'next/link';
import { useEffect } from 'react';

export default function ConfirmationPage() {
    useEffect(() => localStorage.setItem('cart', null), []);

    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <p className='text-xl font-medium mb-2'>!הזמנתך התקבלה בהצלחה</p>
            <Link
                href={'/menu'}
                className='text-lg text-blue-500 hover:text-blue-600 transition-colors'
            >
                בחזרה לתפריט
            </Link>
        </div>
    );
}
