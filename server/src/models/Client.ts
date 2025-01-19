import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: String,
    phone: String,
    address: String,
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
