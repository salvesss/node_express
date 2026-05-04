import * as dotenv from 'dotenv';
dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = Number(process.env.PORT) || 4000;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret-key';
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || 'your-mongo-db-connection-string';
export { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY };
