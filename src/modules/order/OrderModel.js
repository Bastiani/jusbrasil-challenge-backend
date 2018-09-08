import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const OrderItem = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: 'Product',
      description: 'Product ordered',
      required: true,
      index: true,
    },
    qty: {
      type: Number,
      required: true,
      default: 1,
    },
    total: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
  },
);

const Schema = new mongoose.Schema(
  {
    orderItems: {
      type: [OrderItem],
      ref: 'OrderItem',
      description: 'Products ordered',
      required: true,
      index: true,
    },
    qty: {
      type: Number,
      required: true,
      default: 1,
    },
    total: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Order',
  },
);

export default mongoose.model('Order', Schema);
