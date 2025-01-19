import mongoose, { Schema } from "mongoose";

const invoiceItemSchema = new Schema({
    invoice_id: { type: Schema.Types.ObjectId, ref: 'Invoice', required: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    description: String,
    quantity: { type: Number, default: 1 },
    unit_price: { type: Number, required: true },
    tax_amount: { type: Number, default: 0.0 },
    line_total: { type: Number, required: true },
}, { timestamps: true });

const InvoiceItem = mongoose.model('InvoiceItem', invoiceItemSchema);

export default InvoiceItem;
