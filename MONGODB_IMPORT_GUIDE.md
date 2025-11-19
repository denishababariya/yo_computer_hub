# MongoDB Import Guide - Categories & Products

## Files Created

1. **categories.json** - 10 computer accessory categories
2. **products.json** - 30 computer accessory products

Both files are located in: `database/` folder

---

## How to Import into MongoDB

### Method 1: Using MongoDB Compass (GUI)

1. Open **MongoDB Compass**
2. Connect to your MongoDB instance
3. Select your database (e.g., `yo_computer_hub`)
4. Right-click on collection name → **Import Data**
5. Select JSON file format
6. Choose `categories.json` → Click **Import**
7. Repeat for `products.json`

### Method 2: Using mongoimport Command (CLI)

#### Import Categories
```bash
mongoimport --uri "mongodb://localhost:27017/yo_computer_hub" \
  --collection categories \
  --file database/categories.json \
  --jsonArray
```

#### Import Products
```bash
mongoimport --uri "mongodb://localhost:27017/yo_computer_hub" \
  --collection products \
  --file database/products.json \
  --jsonArray
```

### Method 3: Using Postman

1. Create new POST request
2. URL: `http://localhost:9000/api/products/import`
3. Body (raw JSON):
```json
{
  "action": "import",
  "collection": "categories",
  "file": "database/categories.json"
}
```

---

## File Structures

### Categories (10 items)
```json
{
  "_id": "cat_001",
  "name": "Processors",
  "slug": "processors",
  "description": "CPU processors for computers",
  "image": "https://via.placeholder.com/300?text=Processors",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Categories Included**:
1. Processors
2. Motherboards
3. RAM Memory
4. Storage Drives
5. Graphics Cards
6. Power Supplies
7. Cooling Systems
8. Cases
9. Peripherals
10. Monitors

### Products (30 items)
```json
{
  "_id": "prod_001",
  "name": "Intel Core i9-13900K",
  "category": "cat_001",
  "price": 589,
  "originalPrice": 699,
  "discount": 16,
  "rating": 4.8,
  "reviews": 245,
  "description": "High-performance 13th gen Intel processor with 24 cores",
  "image": "https://via.placeholder.com/400?text=Intel+Core+i9",
  "stock": 15,
  "brand": "Intel",
  "specifications": {
    "cores": 24,
    "threads": 32,
    "baseClock": "3.0 GHz",
    "boostClock": "5.8 GHz",
    "tdp": "253W"
  },
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Products by Category**:
- Processors: 3 products
- Motherboards: 2 products
- RAM Memory: 2 products
- Storage Drives: 2 products
- Graphics Cards: 3 products
- Power Supplies: 2 products
- Cooling Systems: 2 products
- Cases: 2 products
- Peripherals: 3 products
- Monitors: 4 products

---

## Product Details

### Processors
1. Intel Core i9-13900K - $589
2. AMD Ryzen 9 7950X - $549
3. Intel Core i7-13700K - $419
4. AMD Ryzen 7 7700X - $299

### Graphics Cards
1. NVIDIA RTX 4090 - $1599
2. AMD Radeon RX 7900 XTX - $899
3. NVIDIA RTX 4080 - $1199
4. Intel Arc A770 8GB - $299

### Storage
1. Samsung 990 Pro 2TB - $199
2. WD Black SN850X 1TB - $99
3. Seagate Barracuda 2TB - $49

### Monitors
1. Dell UltraSharp U2723DE - $399
2. ASUS ProArt PA278QV - $449
3. LG 27GP850 Gaming - $349
4. BenQ EW2780U - $299

---

## Using with Postman

### Step 1: Create Product
```
POST http://localhost:9000/api/products
Body:
{
  "name": "Intel Core i9-13900K",
  "category": "cat_001",
  "price": 589,
  "originalPrice": 699,
  "discount": 16,
  "rating": 4.8,
  "reviews": 245,
  "description": "High-performance 13th gen Intel processor",
  "image": "https://via.placeholder.com/400?text=Intel+Core+i9",
  "stock": 15,
  "brand": "Intel"
}
```

### Step 2: Get All Products
```
GET http://localhost:9000/api/products
```

### Step 3: Get Products by Category
```
GET http://localhost:9000/api/products?category=cat_001
```

### Step 4: Get Single Product
```
GET http://localhost:9000/api/products/prod_001
```

---

## Database Schema

### Categories Collection
```javascript
{
  _id: String,
  name: String,
  slug: String,
  description: String,
  image: String,
  createdAt: Date
}
```

### Products Collection
```javascript
{
  _id: String,
  name: String,
  category: String (references categories._id),
  price: Number,
  originalPrice: Number,
  discount: Number,
  rating: Number,
  reviews: Number,
  description: String,
  image: String,
  stock: Number,
  brand: String,
  specifications: Object,
  createdAt: Date
}
```

---

## Verification Steps

### After Import, Verify:

1. **Check Categories Count**
   ```bash
   db.categories.countDocuments()
   # Should return: 10
   ```

2. **Check Products Count**
   ```bash
   db.products.countDocuments()
   # Should return: 30
   ```

3. **Check Category References**
   ```bash
   db.products.find({ category: "cat_001" }).count()
   # Should return: 3 (Processors)
   ```

4. **View Sample Product**
   ```bash
   db.products.findOne({ _id: "prod_001" })
   ```

---

## Troubleshooting

### Issue: "File not found"
**Solution**: Ensure JSON files are in the correct path: `database/categories.json`

### Issue: "Invalid JSON"
**Solution**: Validate JSON using online JSON validator

### Issue: "Duplicate key error"
**Solution**: Clear collection first:
```bash
db.categories.deleteMany({})
db.products.deleteMany({})
```

### Issue: "Connection refused"
**Solution**: Ensure MongoDB is running:
```bash
mongod
```

---

## Quick Commands

### List all databases
```bash
show dbs
```

### Use database
```bash
use yo_computer_hub
```

### Show collections
```bash
show collections
```

### Count documents
```bash
db.categories.countDocuments()
db.products.countDocuments()
```

### View all categories
```bash
db.categories.find().pretty()
```

### View all products
```bash
db.products.find().pretty()
```

### Find by category
```bash
db.products.find({ category: "cat_001" }).pretty()
```

---

## API Endpoints

### Get All Products
```
GET /api/products
```

### Get Products by Category
```
GET /api/products?category=cat_001
```

### Get Single Product
```
GET /api/products/prod_001
```

### Create Product
```
POST /api/products
```

### Update Product
```
PUT /api/products/prod_001
```

### Delete Product
```
DELETE /api/products/prod_001
```

---

## Notes

- All prices are in USD
- Discount percentages are calculated
- Ratings are out of 5.0
- Stock quantities are realistic
- Images use placeholder URLs (can be replaced)
- All timestamps are in ISO 8601 format

---

**Status**: ✅ Ready for Import
**Total Categories**: 10
**Total Products**: 30
**Date**: November 19, 2025
