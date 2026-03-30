import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // 🔐 Email Verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      default: null,
    },

    // 🔐 Password Reset
    resetToken: {
      type: String,
      default: null,
    },

    resetTokenExpiry: {
      type: Date,
      default: null,
    },

    // 📊 Login History
    loginHistory: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);


// 🔥 PASSWORD HASH (AUTO BEFORE SAVE)
import bcrypt from "bcryptjs";

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});


const User = mongoose.model("User", userSchema);

export default User;