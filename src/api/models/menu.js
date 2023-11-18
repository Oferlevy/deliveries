import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    items: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'MenuItem' }],
        default: [],
        required: true,
    },
    sections: {
        type: [String],
        required: true,
    },
});

const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema);
export default Menu;
