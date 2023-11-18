import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';

export default function MenuModal({ children, isOpen, close }) {
    // disables scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);

    return (
        <div
            aria-hidden={!isOpen}
            className={`fixed inset-0 z-50 flex justify-center items-center ${
                isOpen ? '' : 'pointer-events-none'
            }`}
        >
            <div
                className={`fixed inset-0 bg-black ${
                    isOpen ? 'opacity-50' : 'opacity-0'
                } transition-opacity ease-in-out`}
                onClick={close}
            />

            <div
                className={`absolute mx-auto inset-x-0 bottom-0 rounded-t-2xl max-h-[95%] overflow-scroll shadow-xl xs:rounded-b-2xl xs:bottom-auto xs:max-w-md ${
                    isOpen ? '' : 'opacity-0 translate-y-full xs:translate-y-20'
                } transition-all ease-in-out`}
            >
                {children}

                <button
                    onClick={close}
                    className='absolute bg-gray-200 hover:bg-gray-300 top-3 right-3 rounded-full p-1 transition-colors'
                >
                    <IoMdClose size={28} />
                </button>
            </div>
        </div>
    );
}
