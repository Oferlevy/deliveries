// import getTodaysInfo from '@/api/todaysInfo';
import Link from 'next/link';

export default function ConfirmationPage() {
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

// export async function getStaticProps() {
//     const todaysInfo = await getTodaysInfo();

//     return {
//         props: { todaysInfo },
//     };
// }
