import Order from '@/api/models/order';
import Today from '@/api/models/today';

function formatMessage(req) {
    const cart = JSON.parse(req.body.cart);

    const data = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        paymentMethod: req.body.paymentMethod,
        ...cart,
    };

    if (req.body.number) {
        cart.number = req.body.number;
    }

    const message = data.message === '' ? '\n' : `הערות: ${data.message}\n\n`;
    const items = data.items
        .map((item) => `${item.name} - ${item.quantity}`)
        .join('\n');

    return `free trial\n\n${data.name}\nמספר טלפון: ${data.phoneNumber}\n\n${
        data.price
    } ש״ח\nשיטת תשלום: ${data.paymentMethod}\n${
        cart.number ? `מספר: ${cart.number}\n` : ''
    }${message}${items}`;
}

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(400).json({
            error: 'Invalid HTTP method. Only POST requests are allowed.',
        });

    const cart = JSON.parse(req.body.cart);
    const items = cart.items.map((item) => `${item.name} - ${item.quantity}`);

    const order = await Order.create({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        price: cart.price,
        paymentMethod: req.body.paymentMethod,
        paymentNumber: req.body.number,
        message: cart.message || undefined,
        items,
    });

    await Today.findOneAndUpdate(
        {},
        {
            $push: { orders: order },
        }
    );

    res.redirect(302, '/confirmation');
}
