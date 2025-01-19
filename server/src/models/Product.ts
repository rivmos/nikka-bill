import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    tax_rate: { type: Number, default: 0.0 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
