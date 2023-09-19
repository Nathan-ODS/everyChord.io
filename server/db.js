/* eslint-disable semi */
import mongoose from 'mongoose';

const URI = 'mongodb+srv://nathanoliveiradasilvapro:Sarah24124378@everychord.1laki5b.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'

async function connectDB () {
  mongoose.connect(URI);

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  db.on('error', (err) => {
    console.error('MongoDB connection error', err);
  });

  db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });

  // Gracefully handle database disconnection on application termination
  process.on('SIGINT', async () => {
    await db.close()

    process.exit(0)
  });
}

export default connectDB
