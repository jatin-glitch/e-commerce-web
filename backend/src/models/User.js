import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    googleId: { type: String, unique: true, sparse: true },
    avatar: { type: String },
  },
  { timestamps: true },
);

userSchema.pre("save", async function() {
  if (!this.isModified("password") || !this.password) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

