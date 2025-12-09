import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";
if (!MONGODB_URI) throw new Error("Please set MONGODB_URI in .env.local");

let cached: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
} = (global as any).__mongoose;
if (!cached)
    cached = (global as any).__mongoose = { conn: null, promise: null };

export default async function connectDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose
        .connect(MONGODB_URI, { dbName: undefined })
        .then((m) => m);
    }
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully !")
    return cached.conn;
}

export function startSession() {
    console.log('MONGODB_URI preview:', process.env.MONGODB_URI?.slice(0, 60));
    return mongoose.startSession();
  
}
