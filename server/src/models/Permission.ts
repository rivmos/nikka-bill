const mongoose = require('mongoose');
const { Schema } = mongoose;

const permissionSchema = new Schema({
  key: { type: String, required: true, unique: true }, // e.g., "CREATE_INVOICE", "MANAGE_USERS"
  description: { type: String }, // Optional description for the permission
}, { timestamps: true });

const Permission = mongoose.model('Permission', permissionSchema);
export default Permission;