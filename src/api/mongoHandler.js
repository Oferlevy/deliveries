import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('No Mongo URI in .env. add MONGODB_URI field to env file');
}

let connected = false;

export default async function connect() {
    if (connected) return;

    mongoose.connect(process.env.MONGODB_URI);
    connected = true;
}
