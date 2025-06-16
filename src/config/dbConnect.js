import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`MongoDB connected: ${connect.connection.host}, ${connect.connection.name}`);
        return connect;
    } catch (err) {
        console.log(err);
        process.exit(1); // Exit the process with failure
    }
};

// Export the dbConnect function to be used in other parts of the application
export default dbConnect;
// Connect to MongoDB using Mongoose


