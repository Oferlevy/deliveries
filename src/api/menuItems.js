import connectDB from '@/api/mongoHandler';
import MenuItem from '@/api/models/menuItem';

export default async function getMenuItems() {
    await connectDB();

    const items = await MenuItem.find(null, {
        id: { $toString: '$_id' },
        _id: 0,
        name: 1,
        price: 1,
        image: 1,
        section: 1,
        halves: 1,
        description: 1,
        maxQuantity: 1,
    }).lean();

    return items;
}
