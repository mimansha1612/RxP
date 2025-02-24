import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  specialization: String,
  yearOfStudy: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActive: Date,
});

export const User = mongoose.model('User', userSchema);