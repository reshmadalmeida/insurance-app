const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },//old code to remove
    _id: ObjectId,
    username: String,
    email: String,
    passwordHash: String,
    role: { type: String, enum: ["UNDERWRITER", "CLAIMS_ADJUSTER", "REINSURANCE_ANALYST", "ADMIN"], required: true },
    permissions: [String],
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    },
    lastLoginAt: Date,
    // createdAt: Date,
    // updatedAt: Date

}, { timestamps: true })

userSchema.pre("save", async function() {
    if(!this.isModified("passwordHash")) 
        return;

    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    // next();
});

// to decrypt password for comparison
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
}
module.exports = mongoose.model("User", userSchema)