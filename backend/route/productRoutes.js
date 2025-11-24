const express = require('express');
const router = express.Router();
const Product = require('../model/Product');
const Category = require('../model/Category');
const multer = require('multer');
const path = require('path');

// ================= MULTER CONFIG =================

// create uploads folder if not exists
const fs = require('fs');
const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// allow all file types
const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

// ================= PRODUCT ROUTES =================

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { category, categoryId, search, sort, limit = 10, page = 1 } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (categoryId) filter.categoryId = categoryId;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    let query = Product.find(filter).populate('categoryId');

    if (sort === 'price-low') query = query.sort({ price: 1 });
    else if (sort === 'price-high') query = query.sort({ price: -1 });
    else if (sort === 'newest') query = query.sort({ createdAt: -1 });
    else if (sort === 'rating') query = query.sort({ rating: -1 });

    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(filter);

    const products = await query.skip(skip).limit(parseInt(limit));

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true })
      .limit(6)
      .populate('categoryId');
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get best sellers
router.get('/best-sellers', async (req, res) => {
  try {
    const products = await Product.find({ isBestSeller: true })
      .limit(6)
      .populate('categoryId');
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get product by ID
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

// ================= CREATE PRODUCT (WITH IMAGE/VIDEO UPLOAD) =================

router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 10 }
  ]),
  async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        originalPrice,
        categoryId,
        stock,
        specifications,
        tags,
        isFeatured,
        isBestSeller
      } = req.body;

      // ====== REQUIRED FIELDS ======
      if (!name || !description || !price || !categoryId) {
        return res.status(400).json({
          success: false,
          message: 'Name, description, price, and categoryId are required'
        });
      }

      // ====== CATEGORY VALIDATION ======
      const categoryObj = await Category.findById(categoryId);
      if (!categoryObj) {
        return res.status(400).json({
          success: false,
          message: 'Invalid categoryId'
        });
      }

      // ====== MAIN IMAGE UPLOAD (REQUIRED) ======
      let mainImage = '';
      if (req.files.image && req.files.image.length > 0) {
        mainImage = `/uploads/${req.files.image[0].filename}`;
      } else {
        return res.status(400).json({
          success: false,
          message: "Main product image is required"
        });
      }

      // ====== MULTIPLE IMAGES ======
      const images = (req.files.images || []).map((file) => ({
        url: `/uploads/${file.filename}`
      }));

      // ====== VIDEOS ======
      const videos = (req.files.videos || []).map((file) => ({
        url: `/uploads/${file.filename}`
      }));

      // ====== CREATE PRODUCT OBJECT ======
      const newProduct = new Product({
        name,
        description,
        price,
        originalPrice: originalPrice || price,
        category: categoryObj.name,
        categoryId,
        image: mainImage,            // <<<<<< FIXED HERE
        images,
        videos,
        stock,
        specifications: (() => {
          try {
            return specifications ? JSON.parse(specifications) : {};
          } catch {
            return {};
          }
        })(),
        tags: (() => {
          try {
            return tags ? JSON.parse(tags) : [];
          } catch {
            return [];
          }
        })(),
        isFeatured: isFeatured === 'true',
        isBestSeller: isBestSeller === 'true'
      });

      const savedProduct = await newProduct.save();
      const populatedProduct = await savedProduct.populate('categoryId');

      res.status(201).json({ success: true, data: populatedProduct });

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);


// ================= UPDATE PRODUCT (WITH IMAGE/VIDEO UPLOAD) =================

router.put(
  '/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 10 }
  ]),
  async (req, res) => {
    try {
      let product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      // ------------------ HANDLE MAIN IMAGE ------------------
      let mainImage = product.image; // old image
      
      if (req.files.image && req.files.image.length > 0) {
        mainImage = `/uploads/${req.files.image[0].filename}`;
      }

      // ------------------ HANDLE MULTIPLE IMAGES ------------------
      let newImages = product.images; // old images

      if (req.files.images && req.files.images.length > 0) {
        const uploadedImages = req.files.images.map(f => ({
          url: `/uploads/${f.filename}`
        }));

        newImages = [...newImages, ...uploadedImages];
      }

      // ------------------ HANDLE VIDEOS ------------------
      let newVideos = product.videos;

      if (req.files.videos && req.files.videos.length > 0) {
        const uploadedVideos = req.files.videos.map(v => ({
          url: `/uploads/${v.filename}`
        }));

        newVideos = [...newVideos, ...uploadedVideos];
      }

      // ------------------ PARSE JSON FIELDS ------------------
      let tags = product.tags;
      if (req.body.tags) {
        try {
          tags = JSON.parse(req.body.tags);
        } catch {
          tags = [];
        }
      }

      let specifications = product.specifications;
      if (req.body.specifications) {
        try {
          specifications = JSON.parse(req.body.specifications);
        } catch {
          specifications = {};
        }
      }

      // ------------------ UPDATE PRODUCT ------------------
      const updatedData = {
        name: req.body.name || product.name,
        description: req.body.description || product.description,
        price: req.body.price || product.price,
        originalPrice: req.body.originalPrice || product.originalPrice,
        categoryId: req.body.categoryId || product.categoryId,
        category: req.body.category || product.category,
        stock: req.body.stock || product.stock,

        image: mainImage,
        images: newImages,
        videos: newVideos,

        tags,
        specifications,

        isFeatured: req.body.isFeatured ?? product.isFeatured,
        isBestSeller: req.body.isBestSeller ?? product.isBestSeller,
      };

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      ).populate("categoryId");

      res.json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
);


// ================= ADD IMAGE =================
router.post('/:id/images', async (req, res) => {
  try {
    const { url, alt, isPrimary } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found' });

    product.images.push({ url, alt, isPrimary: isPrimary || false });
    await product.save();

    res.json({ success: true, data: product });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ================= ADD VIDEO =================
router.post('/:id/videos', async (req, res) => {
  try {
    const { url, title, type, thumbnail } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found' });

    product.videos.push({ url, title, type: type || 'direct', thumbnail });
    await product.save();

    res.json({ success: true, data: product });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ================= DELETE IMAGE =================
router.delete('/:id/images/:imageIndex', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found' });

    product.images.splice(req.params.imageIndex, 1);
    await product.save();

    res.json({ success: true, data: product });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ================= DELETE VIDEO =================
router.delete('/:id/videos/:videoIndex', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found' });

    product.videos.splice(req.params.videoIndex, 1);
    await product.save();

    res.json({ success: true, data: product });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ================= DELETE PRODUCT =================
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found' });

    res.json({ success: true, message: 'Product deleted successfully' });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ================= CATEGORY ROUTES =================

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

    if (!category)
      return res.status(404).json({ success: false, message: 'Category not found' });

    res.json({ success: true, data: category });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create category
router.post('/categories', async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name)
      return res.status(400).json({ success: false, message: 'Name is required' });

    const newCategory = new Category({
      name,
      description: description || '',
      image: image || ''
    });

    await newCategory.save();

    res.status(201).json({ success: true, data: newCategory });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update category
router.put('/categories/:id', async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, image },
      { new: true }
    );

    if (!category)
      return res.status(404).json({ success: false, message: 'Category not found' });

    res.json({ success: true, data: category });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete category
router.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category)
      return res.status(404).json({ success: false, message: 'Category not found' });

    res.json({ success: true, message: 'Category deleted successfully' });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
