import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema({
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    invoice_number: { type: String, unique: true, required: true },
    status: { type: String, enum: ['draft', 'sent', 'paid', 'overdue'], default: 'draft' },
    issue_date: { type: Date, required: true },
    due_date: { type: Date, required: true },
    total_amount: { type: Number, required: true },
    notes: String,
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema)

export default Invoice;
