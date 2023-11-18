import connectDB from '@/api/mongoHandler';
import MenuItem from '@/api/models/menuItem';
import Today from '@/api/models/today';
import Menu from '@/api/models/menu';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/authSession';

export default withIronSessionApiRoute(editMenuRoute, sessionOptions);

async function editMenuRoute(req, res) {
    const { menu, modifiedItems } = req.body;

    console.log(modifiedItems);
    console.log(menu);

    await connectDB();
    const today = await Today.findOne();

    await modifiedItems.forEach(async (item) => {
        await MenuItem.findByIdAndUpdate(item.id, item);
    });

    const items = menu.sections
        .map((section) => section.items)
        .flat(1)
        .map((item) => item.id);
    await Menu.findByIdAndUpdate(today.menu, { $set: { items } });

    return res.status(200).end();
}
