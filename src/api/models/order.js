import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentNumber: {
        type: Number,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
    items: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        default: 'התקבלה',
        required: true,
    },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
