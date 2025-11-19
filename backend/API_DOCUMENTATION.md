# API ENDPOINTS & POSTMAN COLLECTION GUIDE

## Base URL
```
http://localhost:5000/api
```

---

## 📦 PRODUCT ENDPOINTS

### 1. Get All Products
**GET** `/products`

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category name
- `categoryId` - Filter by category ID
- `search` - Search in name/description/tags
- `sort` - Sort by: `price-low`, `price-high`, `newest`, `rating`

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "12345abc",
      "name": "RTX 4090 Graphics Card",
      "description": "High performance GPU",
      "price": 1500,
      "originalPrice": 1800,
      "category": "Graphics Cards",
      "image": "https://example.com/gpu.jpg",
      "images": [
        {
          "url": "https://example.com/gpu1.jpg",
          "alt": "Front view",
          "isPrimary": true
        },
        {
          "url": "https://example.com/gpu2.jpg",
          "alt": "Side view",
          "isPrimary": false
        }
      ],
      "videos": [
        {
          "url": "https://youtube.com/watch?v=xyz",
          "title": "RTX 4090 Review",
          "type": "youtube",
          "thumbnail": "https://youtube.com/img/xyz.jpg"
        },
        {
          "url": "https://example.com/demo-video.mp4",
          "title": "Product Demo",
          "type": "direct",
          "thumbnail": "https://example.com/thumb.jpg"
        }
      ],
      "stock": 50,
      "rating": 4.5,
      "isFeatured": true,
      "isBestSeller": true,
      "tags": ["gpu", "nvidia", "gaming"],
      "specifications": {
        "memory": "24GB GDDR6X",
        "memoryBandwidth": "960 GB/s",
        "maxPower": "575W"
      },
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

---

### 2. Get Featured Products
**GET** `/products/featured`

**Response:** Returns 6 featured products with all details

---

### 3. Get Best Sellers
**GET** `/products/best-sellers`

**Response:** Returns 6 best-selling products with all details

---

### 4. Get Product by ID
**GET** `/products/:id`

**URL Example:** `/products/12345abc`

**Response:** Single product with all details (images, videos, specifications)

---

### 5. Create Product (Admin)
**POST** `/products`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "RTX 4090 Graphics Card",
  "description": "High performance GPU for gaming and professional work",
  "price": 1500,
  "originalPrice": 1800,
  "category": "Graphics Cards",
  "categoryId": "cat_12345",
  "image": "https://example.com/gpu-main.jpg",
  "images": [
    {
      "url": "https://example.com/gpu1.jpg",
      "alt": "Front view",
      "isPrimary": true
    },
    {
      "url": "https://example.com/gpu2.jpg",
      "alt": "Top view",
      "isPrimary": false
    },
    {
      "url": "https://example.com/gpu3.jpg",
      "alt": "Side view",
      "isPrimary": false
    }
  ],
  "videos": [
    {
      "url": "https://www.youtube.com/watch?v=3VT6h9TpX9c",
      "title": "RTX 4090 Full Review",
      "type": "youtube",
      "thumbnail": "https://i.ytimg.com/vi/3VT6h9TpX9c/hqdefault.jpg"
    },
    {
      "url": "https://example.com/demo.mp4",
      "title": "Product Demo Video",
      "type": "direct",
      "thumbnail": "https://example.com/thumb.jpg"
    },
    {
      "url": "https://vimeo.com/12345",
      "title": "Vimeo Demo",
      "type": "vimeo",
      "thumbnail": "https://vimeo.com/thumb.jpg"
    }
  ],
  "stock": 50,
  "specifications": {
    "memory": "24GB GDDR6X",
    "memoryBandwidth": "960 GB/s",
    "maxPower": "575W",
    "cuda_cores": 16384,
    "boost_clock": "2.52 GHz"
  },
  "tags": ["gpu", "nvidia", "gaming", "professional"],
  "isFeatured": true,
  "isBestSeller": true
}
```

**Response:** Returns created product with ID

---

### 6. Update Product (Admin)
**PUT** `/products/:id`

**URL Example:** `/products/12345abc`

**Headers:**
```
Content-Type: application/json
```

**Request Body:** (Same as Create, only update fields you need)
```json
{
  "price": 1400,
  "stock": 45,
  "rating": 4.8
}
```

---

### 7. Add Image to Product
**POST** `/products/:id/images`

**URL Example:** `/products/12345abc/images`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "url": "https://example.com/gpu-new-angle.jpg",
  "alt": "Bottom view",
  "isPrimary": false
}
```

---

### 8. Add Video to Product
**POST** `/products/:id/videos`

**URL Example:** `/products/12345abc/videos`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "url": "https://www.youtube.com/watch?v=abc123",
  "title": "Unboxing RTX 4090",
  "type": "youtube",
  "thumbnail": "https://i.ytimg.com/vi/abc123/hqdefault.jpg"
}
```

**Video Types:**
- `youtube` - YouTube video link
- `vimeo` - Vimeo video link
- `direct` - Direct MP4/video file URL
- `demo` - Product demo video

---

### 9. Delete Image from Product
**DELETE** `/products/:id/images/:imageIndex`

**URL Example:** `/products/12345abc/images/1`

---

### 10. Delete Video from Product
**DELETE** `/products/:id/videos/:videoIndex`

**URL Example:** `/products/12345abc/videos/0`

---

### 11. Delete Product (Admin)
**DELETE** `/products/:id`

**URL Example:** `/products/12345abc`

---

## 📂 CATEGORY ENDPOINTS

### 1. Get All Categories
**GET** `/products/categories/all`

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "cat_123",
      "name": "Graphics Cards",
      "slug": "graphics-cards",
      "description": "GPU components",
      "image": "https://example.com/cat-gpu.jpg",
      "icon": "🎮",
      "parent": null,
      "isActive": true,
      "order": 1,
      "createdAt": "2025-01-15T10:30:00Z"
    },
    {
      "_id": "cat_124",
      "name": "High-End GPUs",
      "slug": "high-end-gpus",
      "description": "Premium GPU options",
      "image": "https://example.com/cat-premium.jpg",
      "icon": "⭐",
      "parent": "cat_123",
      "isActive": true,
      "order": 1,
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ]
}
```

---

### 2. Get Category by ID
**GET** `/products/categories/:id`

**URL Example:** `/products/categories/cat_123`

---

### 3. Create Category
**POST** `/products/categories`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Graphics Cards",
  "slug": "graphics-cards",
  "description": "High-performance GPU components for gaming and professional work",
  "image": "https://example.com/category-gpu.jpg",
  "icon": "🎮",
  "parent": null,
  "order": 1
}
```

**For Sub-Category (with parent):**
```json
{
  "name": "RTX 40 Series",
  "slug": "rtx-40-series",
  "description": "NVIDIA RTX 40 series graphics cards",
  "image": "https://example.com/rtx40.jpg",
  "icon": "⭐",
  "parent": "cat_123",
  "order": 1
}
```

---

### 4. Update Category
**PUT** `/products/categories/:id`

**URL Example:** `/products/categories/cat_123`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Category Name",
  "order": 2,
  "isActive": true
}
```

---

### 5. Delete Category
**DELETE** `/products/categories/:id`

**URL Example:** `/products/categories/cat_123`

---

## 📋 POSTMAN SAMPLE DATA

### Complete Product with All Fields
```json
{
  "name": "NVIDIA GeForce RTX 4090",
  "description": "The world's fastest desktop GPU. Built for ultimate gaming performance and demanding professional applications.",
  "price": 1599,
  "originalPrice": 1999,
  "category": "Graphics Cards",
  "categoryId": "64a1b2c3d4e5f6g7h8i9j0k1",
  "image": "https://example.com/rtx4090-main.jpg",
  "images": [
    {
      "url": "https://example.com/rtx4090-1.jpg",
      "alt": "RTX 4090 Front View",
      "isPrimary": true
    },
    {
      "url": "https://example.com/rtx4090-2.jpg",
      "alt": "RTX 4090 Top View",
      "isPrimary": false
    },
    {
      "url": "https://example.com/rtx4090-3.jpg",
      "alt": "RTX 4090 RGB Lighting",
      "isPrimary": false
    },
    {
      "url": "https://example.com/rtx4090-4.jpg",
      "alt": "RTX 4090 With PC",
      "isPrimary": false
    }
  ],
  "videos": [
    {
      "url": "https://www.youtube.com/watch?v=3d_4h0nnG0w",
      "title": "RTX 4090 Performance Review",
      "type": "youtube",
      "thumbnail": "https://i.ytimg.com/vi/3d_4h0nnG0w/hqdefault.jpg"
    },
    {
      "url": "https://www.youtube.com/watch?v=WrVmNDjVWf0",
      "title": "RTX 4090 Unboxing",
      "type": "youtube",
      "thumbnail": "https://i.ytimg.com/vi/WrVmNDjVWf0/hqdefault.jpg"
    },
    {
      "url": "https://example.com/rtx4090-demo.mp4",
      "title": "Product Demo - 4K Gaming",
      "type": "direct",
      "thumbnail": "https://example.com/demo-thumb.jpg"
    }
  ],
  "stock": 100,
  "rating": 4.8,
  "reviews": [
    {
      "user": "John Gamer",
      "rating": 5,
      "comment": "Amazing performance!",
      "date": "2025-01-15T10:30:00Z"
    }
  ],
  "specifications": {
    "memory": "24GB GDDR6X",
    "memoryClock": "21 Gbps",
    "memoryBandwidth": "960 GB/s",
    "maxPower": "575W",
    "cudaCores": 16384,
    "boostClock": "2.52 GHz",
    "maxDigitalResolution": "7680 x 4320",
    "displayConnectors": "3x DP 1.4a, 1x HDMI 2.1"
  },
  "tags": ["gpu", "nvidia", "rtx", "gaming", "professional", "4090"],
  "isFeatured": true,
  "isBestSeller": true,
  "createdAt": "2025-01-15T10:30:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

### Complete Category with Sub-Category
```json
{
  "name": "Components",
  "slug": "components",
  "description": "Computer hardware components",
  "image": "https://example.com/components.jpg",
  "icon": "⚙️",
  "parent": null,
  "isActive": true,
  "order": 1
}
```

---

## 🧪 TESTING FLOW

### Step 1: Create Category
```
POST /products/categories
Body: Complete category JSON above
```

### Step 2: Create Product
```
POST /products
Body: Complete product JSON with categoryId from Step 1
```

### Step 3: Get All Products
```
GET /products?page=1&limit=10
```

### Step 4: Get Product by ID
```
GET /products/:id (use ID from Step 2)
```

### Step 5: Add More Images
```
POST /products/:id/images
Body: New image object
```

### Step 6: Add Videos
```
POST /products/:id/videos
Body: Video object
```

### Step 7: Update Product
```
PUT /products/:id
Body: Updated fields
```

### Step 8: Get Featured Products
```
GET /products/featured
```

### Step 9: Search Products
```
GET /products?search=RTX&sort=price-high&category=Graphics%20Cards
```

---

## ⚠️ ERROR RESPONSES

### 400 Bad Request
```json
{
  "success": false,
  "message": "Name, description, price, and category are required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Error message details"
}
```

---

## 🔗 PAGINATION EXAMPLE

**Request:**
```
GET /products?page=2&limit=5
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 50,
    "page": 2,
    "limit": 5,
    "pages": 10
  }
}
```

---

## 📝 NOTES

1. **Images Array**: Contains multiple images with `url`, `alt` text, and `isPrimary` flag
2. **Videos Array**: Supports YouTube, Vimeo, direct MP4, and demo videos
3. **Specifications**: Flexible object for any product specs
4. **Tags**: Array for search and filtering
5. **Categories**: Support parent-child hierarchy
6. **Pagination**: Default page 1, limit 10
7. **Sorting**: By price, rating, or newest first

