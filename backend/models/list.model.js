// TODO

import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  filter: {
    type: String,
    required: true,
  },
  responseCode: [{
    type: String,
    required: true,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const List = mongoose.model('List', listSchema);

export default List;
