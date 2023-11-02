import Head from 'next/head';
import { CartProvider } from '@/contexts/CartContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, maximum-scale=1'
                ></meta>
            </Head>

            <CartProvider>
                <Component {...pageProps} />
            </CartProvider>
        </>
    );
}
