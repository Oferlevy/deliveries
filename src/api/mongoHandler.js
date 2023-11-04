import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('No Mongo URI in .env. add MONGODB_URI field to env file');
}

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
        });
    } catch (err) {
        console.error(err.message);
        process.exit(-1);
    }
}
