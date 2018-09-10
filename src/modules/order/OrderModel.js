import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const OrderItem = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: 'Product',
      description: 'Product ordered',
      required: false,
      index: true,
    },
    qty: {
      type: Number,
      required: false,
      default: 1,
    },
    total: {
      type: Number,
      required: false,
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
      required: false,
      index: true,
    },
    qty: {
      type: Number,
      required: false,
      default: 1,
    },
    total: {
      type: Number,
      required: false,
      default: 0,
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
    collection: 'Order',
  },
);

export default mongoose.model('Order', Schema);
