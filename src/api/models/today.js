import mongoose from 'mongoose';
import '@/api/models/order';

const todaySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
    menu: {
        type: mongoose.Types.ObjectId,
        ref: 'MenuItem',
        required: true,
    },
    pickupInfo: {
        type: String,
    },
    orders: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Order' }],
        default: [],
        required: true,
    },
});

const Today = mongoose.models.Today || mongoose.model('Today', todaySchema);
export default Today;
