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
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: String
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Pendiente", "Preparando","En camino", "Entregado", "Cancelado"],
    default: "Pendiente"
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  selectedPayment: {
    type: String,
    required: true
  }
}, { timestamps: true }, options);

export const Order = mongoose.model('Order', orderSchema);