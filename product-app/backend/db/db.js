import mongoose from 'mongoose';

export const connectDB = async () => {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined in environment variables');
    }

    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};