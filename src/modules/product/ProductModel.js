import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    qty: {
      type: Number,
      required: false,
      default: 0,
    },
    picture: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Product',
  },
);

export default mongoose.model('Product', Schema);
