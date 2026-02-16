const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    _id: ObjectId,
    policyNumber: {
        type: String,
        unique: true,
        index: true,
        required: true,
        // Often immutable after creation to avoid audit headaches
        immutable: true,
        trim: true
    },

    insuredName: {
        type: String,
        required: true,
        trim: true
    },
    insuredType: { type: String, enum: ["INDIVIDUAL", "CORPORATE"], required: true },
    lineOfBusiness: { type: String, enum: ["HEALTH", "MOTOR", "LIFE", "PROPERTY"], required: true },
    sumInsured: {
        type: Number,
        required: true,
        min: [0, "sumInsured cannot be negative"]
    },
    premium: {
        type: Number,
        required: true,
        min: [0, "premium cannot be negative"]
    },
    retentionLimit: Number,
    status: { type: String, enum: ["DRAFT", "ACTIVE", "SUSPENDED", "EXPIRED"], default: "DRAFT" },
    effectiveFrom: {
        type: Date,
        required: true
    },
    effectiveTo: {
        type: Date,
        required: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // createdAt: Date,
    // updatedAt: Date
}, { timestamps: true })



/**
 * Optional: Pre-save hook to auto-generate policyNumber
 * If you want the server to create one when missing.
 * Alternatively, do this in your service layer for clearer control.
 */
policySchema.pre('validate', async function (next) {
    if (!this.policyNumber) {
        // Example placeholder generator: replace with your real sequence/format.
        // You might maintain a counters collection for sequential IDs.
        const yyyy = new Date().getFullYear();
        this.policyNumber = `POL-${yyyy}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    }
    next();
});

// Helpful compound index for common queries (optional)
policySchema.index({ lineOfBusiness: 1, status: 1 });
policySchema.index({ effectiveFrom: 1, effectiveTo: 1 });

module.exports = mongoose.model("Policy", policySchema);
