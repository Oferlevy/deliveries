import Today from '@/api/models/today';
import connectDB from '@/api/mongoHandler';

export default async function getTodaysInfo() {
    await connectDB();

    const today = Today.findOne().select('-_id -__v -menu').lean();

    return today;
}
