const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

function formatMessage(req) {
    const cart = JSON.parse(req.body.cart);

    const data = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        paymentMethod: req.body.paymentMethod,
        ...cart,
    };

    if (req.body.number) {
        cart.number = req.body.number;
    }

    const message = data.message === '' ? '\n' : `הערות: ${data.message}\n\n`;
    const items = data.items
        .map((item) => `${item.name} - ${item.quantity}`)
        .join('\n');

    return `free trial\n\n${data.name}\nמספר טלפון: ${data.phoneNumber}\n\n${
        data.price
    } ש״ח\nשיטת תשלום: ${data.paymentMethod}\n${
        cart.number ? `מספר: ${cart.number}\n` : ''
    }${message}${items}`;
}

export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(400).json({
            error: 'Invalid HTTP method. Only POST requests are allowed.',
        });

    client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: '+972539351838',
            body: formatMessage(req),
        })
        .catch((err) => console.log(err));

    const urlCart = new URLSearchParams(req.body.cart).toString().slice(0, -1);
    res.redirect(302, '/confirmation?cart=' + urlCart);
}
