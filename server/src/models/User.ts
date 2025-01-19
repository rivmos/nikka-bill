const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'super'], default: 'user' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;