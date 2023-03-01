const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required : true,
        enum: ["Mr", "Mrs", "Miss"],
        trim: true
    },
    userName: { type: String ,  required : true},
    email: { type: String, unique: true, required : true},
    password: { type:String, required : true,},
    phone: {
        type: String,
        unique: true,
        required : true,
        trim: true
    },
    
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;

