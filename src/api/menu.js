import Menu from '@/api/models/menu';
import MenuItem from '@/api/models/menuItem';
import MenuSection from '@/api/models/menuSection';
import connect from '@/api/mongoHandler';

export async function getMenu() {
    await connect();

    const menu = await Menu.findOne({})
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

    return menu;
}
