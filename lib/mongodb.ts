import mongoose from 'mongoose';

/**
 * Global type declaration for cached mongoose connection
 * This prevents TypeScript errors when accessing global.mongoose
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

/**
 * MongoDB connection string from environment variables
 * Throws an error if MONGODB_URI is not defined
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Cache the database connection to prevent creating multiple connections
 * during development due to Next.js hot reloading
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes and returns a cached MongoDB connection using Mongoose
 * 
 * @returns Promise that resolves to a Mongoose Connection object
 * 
 * Connection behavior:
 * - In development: Caches connection globally to survive hot reloads
 * - In production: Reuses existing connection if available
 * - Prevents connection exhaustion by reusing a single connection
 */
async function connectToDatabase(): Promise<mongoose.Connection> {
  // Return existing connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection promise if one doesn't exist
  if (!cached.promise) {
    const options: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable command buffering for better error handling
    };

    cached.promise = mongoose
      .connect(MONGODB_URI as string, options)
      .then((mongooseInstance) => {
        return mongooseInstance.connection;
      });
  }

  try {
    // Wait for connection to establish and cache it
    cached.conn = await cached.promise;
  } catch (error) {
    // Clear the promise on error so next call can retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
