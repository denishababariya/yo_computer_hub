const express = require('express');
const router = express.Router();
const Product = require('../model/Product');
const Category = require('../model/Category');

// ============ PRODUCT ROUTES ============

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { category, categoryId, search, sort, limit = 10, page = 1 } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }
    if (categoryId) {
      filter.categoryId = categoryId;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    let query = Product.find(filter).populate('categoryId');

    if (sort === 'price-low') {
      query = query.sort({ price: 1 });
    } else if (sort === 'price-high') {
      query = query.sort({ price: -1 });
    } else if (sort === 'newest') {
      query = query.sort({ createdAt: -1 });
    } else if (sort === 'rating') {
      query = query.sort({ rating: -1 });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(filter);
    const products = await query.skip(skip).limit(parseInt(limit));

    res.json({ 
      success: true, 
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(6).populate('categoryId');
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get best sellers
router.get('/best-sellers', async (req, res) => {
  try {
    const products = await Product.find({ isBestSeller: true }).limit(6).populate('categoryId');
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get product by ID with all details
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categoryId');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create product (Admin)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      categoryId,
      image,
      images,
      videos,
      stock,
      specifications,
      tags,
      isFeatured,
      isBestSeller
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, price, and categoryId are required'
      });
    }

    // Verify category exists
    const categoryObj = await Category.findById(categoryId);
    if (!categoryObj) {
      return res.status(400).json({ success: false, message: 'Invalid categoryId' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      originalPrice: originalPrice || price,
      // store both reference and category name for convenience
      category: categoryObj.name,
      categoryId,
      image,
      images: images || [],
      videos: videos || [],
      stock,
      specifications: specifications || {},
      tags: tags || [],
      isFeatured: isFeatured || false,
      isBestSeller: isBestSeller || false
    });

    const savedProduct = await newProduct.save();
    const populatedProduct = await savedProduct.populate('categoryId');

    res.status(201).json({ success: true, data: populatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update product (Admin)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('categoryId');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add image to product
router.post('/:id/images', async (req, res) => {
  try {
    const { url, alt, isPrimary } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.images.push({ url, alt, isPrimary: isPrimary || false });
    const savedProduct = await product.save();
    
    res.json({ success: true, data: savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add video to product
router.post('/:id/videos', async (req, res) => {
  try {
    const { url, title, type, thumbnail } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.videos.push({ url, title, type: type || 'direct', thumbnail });
    const savedProduct = await product.save();
    
    res.json({ success: true, data: savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete image from product
router.delete('/:id/images/:imageIndex', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.images.splice(req.params.imageIndex, 1);
    const savedProduct = await product.save();
    
    res.json({ success: true, data: savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete video from product
router.delete('/:id/videos/:videoIndex', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.videos.splice(req.params.videoIndex, 1);
    const savedProduct = await product.save();
    
    res.json({ success: true, data: savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete product (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ CATEGORY ROUTES ============

// Get all categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get category by ID
router.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create category
router.post('/categories', async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const newCategory = new Category({
      name,
      description: description || '',
      image: image || ''
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({ success: true, data: savedCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update category
router.put('/categories/:id', async (req, res) => {
  try {
    const update = (({ name, description, image }) => ({ name, description, image }))(req.body);
    const category = await Category.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete category
router.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;module.exports = router;
