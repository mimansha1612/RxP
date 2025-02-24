import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
  name: String,
  size: String,
  type: String,
});

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  attachments: [attachmentSchema],
});

export const Message = mongoose.model('Message', messageSchema);