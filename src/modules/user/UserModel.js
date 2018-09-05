// @flow
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      hidden: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
      description: 'Whether the user is admin or not',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'User',
  },
);

Schema.index({ name: 'text' });
Schema.index({ email: 1 }, { unique: true });

Schema.pre('save', function hashPassword(next) {
  // eslint-disable-line func-names
  // Hash the password
  if (this.isModified('password')) {
    this.encryptPassword(this.password)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(err => next(err));
  } else {
    return next();
  }
});

Schema.methods = {
  async authenticate(plainText) {
    try {
      return await bcrypt.compare(plainText, this.password);
    } catch (err) {
      return false;
    }
  },
  encryptPassword(password) {
    return bcrypt.hash(password, 8);
  },
};

export default mongoose.model('User', Schema);
