import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    client_id: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    invoice_number: { type: String, unique: true, required: true },
    status: { type: String, enum: ['draft', 'sent', 'paid', 'overdue'], default: 'draft' },
    issue_date: { type: Date, required: true },
    due_date: { type: Date, required: true },
    total_amount: { type: Number, required: true },
    notes: String,
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema)

export default Invoice;
