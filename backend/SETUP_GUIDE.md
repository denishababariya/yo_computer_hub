# 🚀 COMPLETE SETUP GUIDE - Products with Images & Videos

## 📋 WHAT'S NEW

✅ **Multiple Images per Product** - Array of images with alt text and primary flag
✅ **Video Support** - YouTube, Vimeo, Direct MP4, and Demo videos
✅ **Category Management** - Create, update, and organize categories
✅ **Advanced Filtering** - Search, pagination, sorting
✅ **RESTful API** - Complete CRUD operations
✅ **MongoDB Schema** - Properly structured models

---

## 🔧 SETUP STEPS

### Step 1: Update Dependencies
```bash
cd backend
npm install
```

No new packages needed - using existing dependencies.

### Step 2: Database Models
Already updated:
- `model/Product.js` - Now supports images array and videos array
- `model/Category.js` - New category model for organization

### Step 3: API Routes
Already updated:
- `route/productRoutes.js` - Complete endpoints for products and categories

### Step 4: Start Server
```bash
node server.js
# or
npm start
```

Expected output:
```
Server running on port 5000
MongoDB connected
```

---

## 📤 POSTMAN SETUP

### Option 1: Import JSON Collection
1. Open Postman
2. Click **Import** (top-left)
3. Select **POSTMAN_COLLECTION.json** from backend folder
4. All endpoints will be ready to use

### Option 2: Set Environment Variables
1. Create new Environment in Postman
2. Add variables:
   - `BASE_URL` = `http://localhost:5000/api`
   - `PRODUCT_ID` = (will be auto-filled)
   - `CATEGORY_ID` = (will be auto-filled)

---

## 🧪 TESTING WORKFLOW

### 1️⃣ CREATE CATEGORY
```
POST: http://localhost:5000/api/products/categories

Body:
{
  "name": "Graphics Cards",
  "slug": "graphics-cards",
  "description": "GPU components",
  "image": "https://example.com/gpu.jpg",
  "icon": "🎮",
  "parent": null,
  "order": 1
}

Response saves: CATEGORY_ID
```

### 2️⃣ CREATE PRODUCT (with images & videos)
```
POST: http://localhost:5000/api/products

Body:
{
  "name": "NVIDIA RTX 4090",
  "description": "Best gaming GPU",
  "price": 1599,
  "originalPrice": 1999,
  "category": "Graphics Cards",
  "categoryId": "CATEGORY_ID_HERE",
  "image": "https://example.com/main.jpg",
  "images": [
    {
      "url": "https://example.com/img1.jpg",
      "alt": "Front View",
      "isPrimary": true
    },
    {
      "url": "https://example.com/img2.jpg",
      "alt": "Top View",
      "isPrimary": false
    },
    {
      "url": "https://example.com/img3.jpg",
      "alt": "Side View",
      "isPrimary": false
    }
  ],
  "videos": [
    {
      "url": "https://www.youtube.com/watch?v=xyz",
      "title": "RTX 4090 Review",
      "type": "youtube",
      "thumbnail": "https://i.ytimg.com/vi/xyz/hqdefault.jpg"
    },
    {
      "url": "https://example.com/demo.mp4",
      "title": "Product Demo",
      "type": "direct",
      "thumbnail": "https://example.com/thumb.jpg"
    }
  ],
  "stock": 100,
  "specifications": {
    "memory": "24GB GDDR6X",
    "cudaCores": 16384,
    "maxPower": "575W"
  },
  "tags": ["gpu", "nvidia", "rtx"],
  "isFeatured": true,
  "isBestSeller": true
}

Response saves: PRODUCT_ID
```

### 3️⃣ GET ALL PRODUCTS
```
GET: http://localhost:5000/api/products?page=1&limit=10

Query Options:
- ?search=RTX
- ?category=Graphics%20Cards
- ?sort=price-low (or price-high, newest, rating)
- ?categoryId=CATEGORY_ID

Response: Returns products with pagination
```

### 4️⃣ GET PRODUCT BY ID
```
GET: http://localhost:5000/api/products/PRODUCT_ID

Response: Complete product with all images and videos
```

### 5️⃣ ADD MORE IMAGES (OPTIONAL)
```
POST: http://localhost:5000/api/products/PRODUCT_ID/images

Body:
{
  "url": "https://example.com/new-image.jpg",
  "alt": "New angle",
  "isPrimary": false
}
```

### 6️⃣ ADD MORE VIDEOS (OPTIONAL)
```
POST: http://localhost:5000/api/products/PRODUCT_ID/videos

Body:
{
  "url": "https://www.youtube.com/watch?v=abc123",
  "title": "Unboxing Video",
  "type": "youtube",
  "thumbnail": "https://i.ytimg.com/vi/abc123/hqdefault.jpg"
}

Supported types: youtube, vimeo, direct, demo
```

### 7️⃣ UPDATE PRODUCT
```
PUT: http://localhost:5000/api/products/PRODUCT_ID

Body (only changed fields):
{
  "price": 1499,
  "stock": 95,
  "rating": 4.8
}
```

### 8️⃣ DELETE IMAGE
```
DELETE: http://localhost:5000/api/products/PRODUCT_ID/images/0

Note: 0 is the index of image in array
```

### 9️⃣ DELETE VIDEO
```
DELETE: http://localhost:5000/api/products/PRODUCT_ID/videos/0

Note: 0 is the index of video in array
```

### 🔟 GET CATEGORIES
```
GET: http://localhost:5000/api/products/categories/all

Response: All active categories with parent-child relationships
```

---

## 📐 DATABASE SCHEMA

### Product Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required),
  originalPrice: Number,
  category: String (required),
  categoryId: ObjectId (ref: Category),
  image: String (required) - main image,
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  videos: [{
    url: String,
    title: String,
    type: String (youtube|vimeo|direct|demo),
    thumbnail: String
  }],
  stock: Number,
  rating: Number,
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: Date
  }],
  specifications: Object (flexible),
  tags: [String],
  isFeatured: Boolean,
  isBestSeller: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Schema
```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  slug: String (required, unique),
  description: String,
  image: String,
  icon: String,
  parent: ObjectId (ref: Category),
  isActive: Boolean,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔗 API ENDPOINTS SUMMARY

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/products` | Get all products (with filters) |
| GET | `/products/featured` | Get featured products |
| GET | `/products/best-sellers` | Get best sellers |
| GET | `/products/:id` | Get single product |
| POST | `/products` | Create product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |
| POST | `/products/:id/images` | Add image |
| DELETE | `/products/:id/images/:index` | Remove image |
| POST | `/products/:id/videos` | Add video |
| DELETE | `/products/:id/videos/:index` | Remove video |
| GET | `/products/categories/all` | Get all categories |
| GET | `/products/categories/:id` | Get category |
| POST | `/products/categories` | Create category |
| PUT | `/products/categories/:id` | Update category |
| DELETE | `/products/categories/:id` | Delete category |

---

## 💡 BEST PRACTICES

### Images
- ✅ Use high-quality images (minimum 1200x800px)
- ✅ Compress images for web (under 500KB each)
- ✅ Always provide `alt` text for accessibility
- ✅ Mark primary image with `isPrimary: true`
- ✅ Use HTTPS URLs only

### Videos
- ✅ Embed YouTube videos using full URL with video ID
- ✅ For direct videos, use MP4 format
- ✅ Always provide a thumbnail image
- ✅ Add descriptive titles
- ✅ Test video links before saving

### Categories
- ✅ Use lowercase slugs (e.g., "graphics-cards")
- ✅ Support parent-child hierarchy for sub-categories
- ✅ Add emoji icons for visual appeal
- ✅ Set proper order/sequence

### Products
- ✅ Include 3-5 different angle images
- ✅ Add 1-3 videos (review, demo, unboxing)
- ✅ Complete specifications object
- ✅ Add relevant tags for search
- ✅ Set isFeatured/isBestSeller status

---

## 🐛 TROUBLESHOOTING

### Issue: 404 Not Found
**Solution**: Check URL spelling and ensure product/category exists

### Issue: 400 Bad Request
**Solution**: Check required fields (name, description, price, category)

### Issue: Duplicate Category Name
**Solution**: Category name must be unique, use different name or slug

### Issue: Images/Videos not showing
**Solution**: Verify URLs are HTTPS and publicly accessible

### Issue: Video not embedding
**Solution**: For YouTube, use full URL with video ID: https://www.youtube.com/watch?v=VIDEO_ID

---

## 📚 FILES REFERENCE

- `API_DOCUMENTATION.md` - Complete API docs with examples
- `POSTMAN_COLLECTION.json` - Ready-to-import Postman collection
- `SAMPLE_DATA_FORMAT.js` - Sample data with all fields
- `model/Product.js` - Updated product schema
- `model/Category.js` - New category schema
- `route/productRoutes.js` - All API endpoints

---

## ✨ NEXT STEPS

1. ✅ Test all endpoints in Postman
2. ✅ Add sample data using provided format
3. ✅ Integrate frontend with new API
4. ✅ Update ProductCard component to show images/videos
5. ✅ Create image/video gallery view

---

**Ready to go! Start with creating categories and products now.** 🚀
