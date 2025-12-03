import mongoose from "mongoose";

const MONGODB_URI = (typeof process !== 'undefined' && process.env) ? process.env.MONGODB_URI : '';

if (!MONGODB_URI) {
  // In a real backend, we would throw an error. 
  // For this frontend demo, we warn to avoid crashing the UI.
  console.warn("Please define MONGODB_URI in your .env file");
}

// Global caching to avoid re-connecting on every request (Next.js hot reload)
let cached = (globalThis as any)._mongoose;

if (!cached) {
  cached = (globalThis as any)._mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    console.warn("Cannot connect to Database: MONGODB_URI is not defined.");
    return null;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}