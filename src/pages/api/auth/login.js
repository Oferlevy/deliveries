import User from '@/api/models/user';
import connectDB from '@/api/mongoHandler';
import { sessionOptions } from '@/lib/authSession';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req, res) {
    await connectDB();

    const { username, password } = req.body;
    if (!req.body.username || !req.body.password)
        return res
            .status(400)
            .json({ error: 'Username and password were not provided!' });

    const user = await User.findOne({ username }).select('-_id -__v').lean();

    if (!user) {
        return res.status(401).json({ error: 'Username not found!' });
    }

    if (user.password !== password) {
        return res.status(401).json({ error: 'Wrong password!' });
    }

    req.session.user = user;
    await req.session.save();

    res.send({ ok: true });
}
