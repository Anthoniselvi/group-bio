import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error(
    "Please define the MONGO_URL environment variable inside .env.local"
  );
}

// Use a separate function to initialize the connection
async function connectToDatabase() {
  try {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const connection = await mongoose.connect(MONGO_URL, opts);

    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Rethrow the error for handling elsewhere in your application
  }
}

// Export the connectToDatabase function
export { connectToDatabase };
