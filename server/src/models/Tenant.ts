const mongoose = require('mongoose');
const { Schema } = mongoose;

const tenantSchema = new Schema({
    name: { type: String, required: true },
    subscriptionPlan: { type: String, enum: ["free", "pro", "enterprise"], default: "free" },
    maxUsers: { type: Number, default: 10 }
  }, { timestamps: true });

const Tenant = mongoose.model('Tenant', tenantSchema);
export default Tenant;