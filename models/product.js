const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the product"],
      minlength: 3,
    },

    description: {
      type: String,
      required: [true, "Please provide a description for the product"],
      minlength: 5,
      maxlength: 70,
    },

    price: {
      type: Number,
      required: [true, "Please provide a price for the product"],
    },

    category: {
      type: String,
      required: [true, "Please provide a category for the product"],
    },

    stock: {
      type: Number,
      required: [true, "Please provide a stock for the product"],
    },

    rating: {
      type: Number,
    },

    isFeatured: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
