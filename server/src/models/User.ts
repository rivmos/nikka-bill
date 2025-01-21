const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true }, // Hash this in your middleware
    role: { type: String, enum: ["super", "admin", "user"], required: true },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" }, // Null for 'super'
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }], // Custom permissions
  }, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;