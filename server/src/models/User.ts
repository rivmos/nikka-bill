import mongoose, { Schema, Document, Types } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword: string;
  role: "super" | "admin" | "user";
  tenant: Types.ObjectId; // Associated company (tenant)
  permissions: Types.ObjectId[]; // Associated company (tenant)
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true }, // Hash this in your middleware
    role: { type: String, enum: ["super", "admin", "user"], required: true },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" }, // Null for 'super'
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }], // Custom permissions
  }, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);
export default User;