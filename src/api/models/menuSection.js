import mongoose from 'mongoose';

const menuSectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    items: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'MenuItem' }],
        default: [],
        required: true,
    },
    halves: {
        type: Boolean,
        default: false,
        required: true,
    },
});

const MenuSection =
    mongoose.models.MenuSection ||
    mongoose.model('MenuSection', menuSectionSchema);
export default MenuSection;
