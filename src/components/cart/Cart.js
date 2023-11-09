import { useCart } from '@/contexts/CartContext';
import { useEffect, useState } from 'react';

import CartContent from '@/components/cart/CartContent';
import EditMessage from '@/components/cart/EditMessage';
import PlaceOrder from '@/components/cart/PlaceOrder';

export default function Cart() {
    const { dispatch } = useCart();
    const [message, setMessage] = useState('');
    const [currentView, setCurrentView] = useState('content');

    useEffect(() => {
        if (currentView !== 'content') return;

        dispatch({ type: 'setMessage', message });
    }, [currentView]);

    return (
        <div className='bg-white h-[38rem] max-h-[85vh]'>
            <CartContent
                message={message}
                isVisible={currentView === 'content'}
                setCurrentView={setCurrentView}
            />

            <EditMessage
                setMessage={setMessage}
                isVisible={currentView === 'editMessage'}
                setCurrentView={setCurrentView}
            />

            <PlaceOrder
                isVisible={currentView === 'makeOrder'}
                setCurrentView={setCurrentView}
            />
        </div>
    );
}
