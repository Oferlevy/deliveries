import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/lib/authSession';

export default function withSsrAuth(getServerSideProps, redirect) {
    return withIronSessionSsr(async ({ req, res }) => {
        const user = req.session.user;

        if (!user) {
            res.setHeader('location', '/auth/login?redirect=' + redirect);
            res.statusCode = 302;
            res.end();

            return {
                props: {},
            };
        }

        const result = await getServerSideProps();
        return result;
    }, sessionOptions);
}
