import connectDB from '@/api/mongoHandler';
import Today from './models/today';

export default async function getOrders() {
    await connectDB();

    const data = await Today.findOne()
        .select('orders -_id')
        .populate({
            path: 'orders',
            select: '-_id -__v',

            options: {
                projection: {
                    id: { $toString: '$_id' },
                    name: 1,
                    phoneNumber: 1,
                    price: 1,
                    paymentMethod: 1,
                    paymentNumber: 1,
                    message: 1,
                    items: 1,
                    status: 1,
                },
            },
        })
        .lean();

    return data.orders;
}
