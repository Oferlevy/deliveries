import Order from '@/api/models/order';

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(400).json({
            error: 'Invalid HTTP method. Only POST requests are allowed.',
        });
    console.log(req.body);

    try {
        await Order.findByIdAndUpdate(req.body.id, { status: req.body.status });
        return res.status(200).end();
    } catch (err) {
        return res.status(500).send(err);
    }
}
