import mongoose from "mongoose";
const { Schema, Document } = mongoose;

interface IPermission extends Document {
  key: string,
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const permissionSchema = new Schema<IPermission>({
  key: { type: String, required: true, unique: true }, // e.g., "CREATE_INVOICE", "MANAGE_USERS"
  description: { type: String }, // Optional description for the permission
}, { timestamps: true });

const Permission = mongoose.model<IPermission>('Permission', permissionSchema);
export default Permission;