import { IoMdArrowBack } from 'react-icons/io';

export default function EditMessage({ setMessage, isVisible, setCurrentView }) {
    return (
        <div
            className={`absolute p-4 w-full h-full transition-all ${
                isVisible ? '' : 'opacity-0 pointer-events-none translate-x-10'
            }`}
        >
            <button
                onClick={() => setCurrentView('content')}
                className='absolute bg-gray-200 hover:bg-gray-300 top-3 left-3 rounded-full p-1 transition-colors'
            >
                <IoMdArrowBack size={28} />
            </button>

            <div className='flex flex-col'>
                <p className='mt-11 text-lg font-medium self-end'>
                    הוסף הערות למנה
                </p>

                <div className='mt-3'>
                    <textarea
                        placeholder='סכו״ם, רטבים, וכו...'
                        rows={4}
                        dir='rtl'
                        onChange={(event) => setMessage(event.target.value)}
                        className='text-right w-full
                         p-2.5 resize-none outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 hover:ring-blue-500 hover:ring-1 hover:border-blue-500
                         focus:ring-blue-500 focus:ring-1 focus:border-blue-500 transition-all'
                    />
                </div>
            </div>

            <div className='absolute inset-x-3 bottom-3'>
                <button
                    onClick={() => setCurrentView('content')}
                    className='bg-[#8b5cf6] w-full
                        py-3 px-4 mt-2 rounded-md shadow-lg text-white font-semibold text-center transition'
                >
                    אישור
                </button>
            </div>
        </div>
    );
}
