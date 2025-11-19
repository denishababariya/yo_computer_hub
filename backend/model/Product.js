const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  category: {
    type: String,
    required: true
  },
  // Single main image
  image: {
    type: String,
    required: true
  },
  // Multiple images for gallery
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  // Video support
  videos: [{
    url: {
      type: String,
      required: true
    },
    title: String,
    type: {
      type: String,
      enum: ['youtube', 'vimeo', 'direct', 'demo'],
      default: 'direct'
    },
    thumbnail: String
  }],
  stock: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: Date
  }],
  specifications: {
    type: Object,
    default: {}
  },
  // Category with parent support
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  tags: [String],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
