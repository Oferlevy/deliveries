import Order from '@/api/models/order';
import Today from '@/api/models/today';
import connectDB from '@/api/mongoHandler';

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(400).json({
            error: 'Invalid HTTP method. Only POST requests are allowed.',
        });

    try {
        await connectDB();
        const order = await Order.findByIdAndUpdate(req.body.id, {
            status: req.body.status,
        });

        if (req.body.status === 'מחק') {
            await Today.findOneAndUpdate(
                {},
                {
                    $pull: { orders: order._id.toString() },
                }
            );
            await Order.deleteOne({ _id: order._id.toString() });
        }

        return res.status(200).end();
    } catch (err) {
        return res.status(500).send(err);
    }
}
