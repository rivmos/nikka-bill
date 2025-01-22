import mongoose, { Document, Schema } from "mongoose";

interface IBlacklistedToken extends Document {
    token: string;
    expiryDate: Date;
}

const blacklistedTokenSchema = new Schema<IBlacklistedToken>({
    token: String,
    expiryDate: Date,
});

const BlacklistedToken = mongoose.model<IBlacklistedToken>('BlacklistedToken', blacklistedTokenSchema);

export default BlacklistedToken;