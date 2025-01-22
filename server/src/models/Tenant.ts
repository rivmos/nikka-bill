import mongoose from "mongoose";
const { Schema, Document } = mongoose;

interface ITenant extends Document {
  name: string;
  subscriptionPlan: string;
  maxUsers:number;
  createdAt: Date;
  updatedAt: Date;
}

const tenantSchema = new Schema<ITenant>({
    name: { type: String, required: true },
    subscriptionPlan: { type: String, enum: ["free", "pro", "enterprise"], default: "free" },
    maxUsers: { type: Number, default: 10 }
  }, { timestamps: true });

const Tenant = mongoose.model<ITenant>('Tenant', tenantSchema);

export default Tenant;