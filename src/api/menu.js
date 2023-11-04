import connectDB from './mongoHandler';

import Menu from '@/api/models/menu';
import Today from '@/api/models/today';
import MenuItem from '@/api/models/menuItem';
import MenuSection from '@/api/models/menuSection';

export async function getMenu() {
    await connectDB();

    const today = await Today.findOne().lean();

    const menu = await Menu.findById(today.menu)
        .populate({
            path: 'sections',
            select: '-_id -__v',

            populate: {
                path: 'items',
                select: '-_id -__v',
                options: {
                    projection: {
                        id: { $toString: '$_id' },
                        name: 1,
                        price: 1,
                        image: 1,
                        description: 1,
                    },
                },
            },
        })
        .select('-_id -__v')
        .lean();

    menu.sections = menu.sections.filter((section) => section.items);
    menu.day = today.day;

    return menu;
}
