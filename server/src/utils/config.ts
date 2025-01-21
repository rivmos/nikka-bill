import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const JWTSECRET = process.env.JWTSECRET;

export default { PORT, MONGO_URI, JWTSECRET };