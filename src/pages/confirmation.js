import getTodaysInfo from '@/api/todaysInfo';
import { useState, useEffect } from 'react';

export default function ConfirmationPage({ todaysInfo }) {
    const [cart, setCart] = useState({});

    useEffect(() => {
        try {
            const { cart: cartString } = Object.fromEntries(
                new URLSearchParams(window.location.search)
            );

            setCart(JSON.parse(cartString));
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <div>{JSON.stringify(todaysInfo)}</div>
            <div>{JSON.stringify(cart)}</div>
        </>
    );
}

export async function getStaticProps() {
    const todaysInfo = await getTodaysInfo();

    return { props: { todaysInfo } };
}
