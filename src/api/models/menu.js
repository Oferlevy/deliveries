import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
    sections: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'MenuSection' }],
        default: [],
        required: true,
    },
});

const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema);
export default Menu;
