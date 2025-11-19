# 🎯 QUICK REFERENCE CARD

## 📌 POSTMAN QUICK COMMANDS

### Add Category
```
POST http://localhost:5000/api/products/categories
{
  "name": "Graphics Cards",
  "slug": "graphics-cards",
  "description": "GPU components",
  "image": "https://example.com/gpu.jpg",
  "icon": "🎮"
}
```
**Response**: Copy `_id` → Save as CATEGORY_ID

---

### Add Product (Full)
```
POST http://localhost:5000/api/products
{
  "name": "NVIDIA RTX 4090",
  "description": "High-performance GPU",
  "price": 1599,
  "originalPrice": 1999,
  "category": "Graphics Cards",
  "categoryId": "{{CATEGORY_ID}}",
  "image": "https://example.com/gpu-main.jpg",
  "images": [
    {"url": "https://example.com/gpu1.jpg", "alt": "Front", "isPrimary": true},
    {"url": "https://example.com/gpu2.jpg", "alt": "Side", "isPrimary": false},
    {"url": "https://example.com/gpu3.jpg", "alt": "Top", "isPrimary": false}
  ],
  "videos": [
    {"url": "https://youtube.com/watch?v=xyz", "title": "Review", "type": "youtube", "thumbnail": "thumb.jpg"},
    {"url": "https://example.com/demo.mp4", "title": "Demo", "type": "direct", "thumbnail": "demo-thumb.jpg"}
  ],
  "stock": 100,
  "specifications": {"memory": "24GB", "cores": 16384},
  "tags": ["gpu", "nvidia", "rtx"],
  "isFeatured": true,
  "isBestSeller": true
}
```
**Response**: Copy `_id` → Save as PRODUCT_ID

---

### Get All Products
```
GET http://localhost:5000/api/products?page=1&limit=10&sort=newest
```

### Get Single Product
```
GET http://localhost:5000/api/products/{{PRODUCT_ID}}
```

### Add Image
```
POST http://localhost:5000/api/products/{{PRODUCT_ID}}/images
{
  "url": "https://example.com/gpu-new.jpg",
  "alt": "New angle",
  "isPrimary": false
}
```

### Add Video
```
POST http://localhost:5000/api/products/{{PRODUCT_ID}}/videos
{
  "url": "https://youtube.com/watch?v=abc123",
  "title": "Unboxing",
  "type": "youtube",
  "thumbnail": "https://i.ytimg.com/vi/abc123/hqdefault.jpg"
}
```

### Delete Image
```
DELETE http://localhost:5000/api/products/{{PRODUCT_ID}}/images/0
```

### Delete Video
```
DELETE http://localhost:5000/api/products/{{PRODUCT_ID}}/videos/0
```

### Update Product
```
PUT http://localhost:5000/api/products/{{PRODUCT_ID}}
{
  "price": 1499,
  "stock": 95,
  "rating": 4.8
}
```

---

## 📊 DATA FORMATS

### Image Object
```json
{
  "url": "https://example.com/image.jpg",
  "alt": "Product view description",
  "isPrimary": true/false
}
```

### Video Object
```json
{
  "url": "https://youtube.com/watch?v=ID",
  "title": "Video Title",
  "type": "youtube|vimeo|direct|demo",
  "thumbnail": "https://example.com/thumb.jpg"
}
```

### Specification Object
```json
{
  "memory": "24GB GDDR6X",
  "cudaCores": 16384,
  "maxPower": "575W",
  "boostClock": "2.52 GHz"
}
```

---

## 🎨 FRONTEND COMPONENTS

### ImageGallery Usage
```jsx
<ImageGallery 
  images={product.images} 
  productName={product.name}
/>
```

### VideoGallery Usage
```jsx
<VideoGallery 
  videos={product.videos} 
  productName={product.name}
/>
```

---

## 🔑 Environment Variables

In Postman set:
- `BASE_URL` = `http://localhost:5000/api`
- `PRODUCT_ID` = (Auto-filled from responses)
- `CATEGORY_ID` = (Auto-filled from responses)

---

## ✅ VERIFICATION CHECKLIST

- [ ] Backend running on port 5000
- [ ] MongoDB connected
- [ ] Postman collection imported
- [ ] Category created (save ID)
- [ ] Product created (save ID)
- [ ] Images visible in product detail
- [ ] Videos embed properly
- [ ] Search working
- [ ] Pagination working
- [ ] Frontend components created
- [ ] API endpoints integrated

---

## 🎯 TYPICAL WORKFLOW

1. Create Category
2. Create Product (with images array, videos array)
3. Add more images via `/images` endpoint
4. Add more videos via `/videos` endpoint
5. Test in browser with ProductDetails component
6. Test search and filters
7. Verify image gallery
8. Verify video playback

---

## 🔗 IMPORTANT URLs

- Backend: `http://localhost:5000`
- API Base: `http://localhost:5000/api`
- Products: `http://localhost:5000/api/products`
- Categories: `http://localhost:5000/api/products/categories/all`

---

## 💾 DATABASE MODELS

**Product**: name, description, price, category, images[], videos[], stock, rating, specifications, tags

**Category**: name, slug, description, icon, parent (for hierarchy), isActive

---

## 🚀 START HERE

1. Read: `SETUP_GUIDE.md`
2. Import: `POSTMAN_COLLECTION.json`
3. Create: First category
4. Create: First product with images/videos
5. Read: `FRONTEND_INTEGRATION.md`
6. Code: ImageGallery and VideoGallery components
7. Test: All features in browser

---

**All documentation is in `/backend/` folder** 📁
