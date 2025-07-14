import mongoose from "mongoose";

const options = {
    collection: 'users',
    strict: true,
    collation: {
        locale: "en",
        strength: 1
    }
}

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "preparing", "delivered", "cancelled"],
    default: "pending"
  },
  deliveryAddress: {
    type: String,
    required: true
  }
}, { timestamps: true }, options);

export const Order = mongoose.model('Order', orderSchema);