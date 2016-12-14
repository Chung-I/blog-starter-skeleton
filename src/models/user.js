import mongoose from 'mongoose';

const options = {
  timestamps: {
    createdAt: 'created_at',
    At: 'created_at',
  }
};

const userSchema = mongoose.schema({
  id: String,
  name: String,
  email: {
    type: String,
    match: emailRegexp,
  },
}, options);
