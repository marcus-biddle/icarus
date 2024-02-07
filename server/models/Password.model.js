import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  password: {
    type: String,
    required: true,
  },
});

const Password = mongoose.model('Password', passwordSchema);

export default Password;
