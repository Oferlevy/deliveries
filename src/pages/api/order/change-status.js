import Order from '@/api/models/order';
import connectDB from '@/api/mongoHandler';

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(400).json({
            error: 'Invalid HTTP method. Only POST requests are allowed.',
        });

    try {
        await connectDB();
        await Order.findByIdAndUpdate(req.body.id, { status: req.body.status });
        return res.status(200).end();
    } catch (err) {
        return res.status(500).send(err);
    }
}
