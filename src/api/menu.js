import connectDB from '@/api/mongoHandler';

import Menu from '@/api/models/menu';
import Today from '@/api/models/today';
import MenuItem from '@/api/models/menuItem';

export default async function getMenu(withEmptySections = false) {
    await connectDB();

    const today = await Today.findOne().lean();

    const data = await Menu.findById(today.menu)
        .populate({
            path: 'items',
            select: '-_id -__v',
            options: {
                projection: {
                    id: { $toString: '$_id' },
                    name: 1,
                    price: 1,
                    image: 1,
                    section: 1,
                    halves: 1,
                    description: 1,
                    maxQuantity: 1,
                },
            },
        })
        .select('-_id -__v')
        .lean();

    const menu = {
        day: today.day,
        sections: data.sections
            .map((section) => ({
                name: section,
                items: data.items.filter((item) => item.section === section),
            }))
            .filter((section) => withEmptySections || section.items.length > 0),
    };

    return menu;
}
