import { sessionOptions } from '@/lib/authSession';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req, res) {
    req.session.destroy();
    res.send({ ok: true });
}
