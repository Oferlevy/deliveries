import mongoose from 'mongoose';

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
});

const Today = mongoose.models.Today || mongoose.model('Today', todaySchema);
export default Today;
