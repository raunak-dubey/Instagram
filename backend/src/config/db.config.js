import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDb is Connected Successfully')
    } catch (error) {
        console.error('Connection Failed', error)
    }
}

export default connectDb;