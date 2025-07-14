import mongoose from "mongoose";

const options = {
    collection: 'users',
    strict: true,
    collation: {
        locale: "en",
        strength: 1
    }
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    enum: ["Pizza", "Pasta", "Bebida", "Postre"], // añade más si quieres
    required: true
  },
  imageUrl: String,
  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true }, options);

export const Product = mongoose.model('Product', productSchema);