export const sessionOptions = {
    cookieName: 'deliveries-auth',
    password: process.env.AUTH_COOKIE_PASSWORD,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};
