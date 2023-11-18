import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    halves: {
        type: Boolean,
        default: false,
        required: true,
    },
    description: String,
    maxQuantity: Number,
});

const MenuItem =
    mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;
