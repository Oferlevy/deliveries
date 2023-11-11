import Order from '@/api/models/order';
import Today from '@/api/models/today';
import connectDB from '@/api/mongoHandler';

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(400).json({
            error: 'Invalid HTTP method. Only POST requests are allowed.',
        });

    const cart = JSON.parse(req.body.cart);
    const items = cart.items.map((item) => `${item.name} - ${item.quantity}`);

    await connectDB();
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
