# Database Setup Summary - MongoDB Import

## Files Created

### 1. Categories JSON
**File**: `database/categories.json`
- **Items**: 10 computer accessory categories
- **Size**: ~2 KB
- **Collections**: Processors, Motherboards, RAM, Storage, Graphics Cards, PSU, Cooling, Cases, Peripherals, Monitors

### 2. Products JSON
**File**: `database/products.json`
- **Items**: 30 computer accessory products
- **Size**: ~35 KB
- **Price Range**: $49 - $1599
- **Stock**: 5 - 40 units per product
- **Ratings**: 4.3 - 4.9 out of 5

### 3. Postman Collection
**File**: `database/Postman_Collection.json`
- **Requests**: 20+ API endpoints
- **Categories**: Products, Categories, Authentication, User Account
- **Ready to import into Postman**

### 4. Import Guide
**File**: `MONGODB_IMPORT_GUIDE.md`
- Complete import instructions
- Multiple import methods
- Verification steps
- Troubleshooting guide

---

## Quick Import Steps

### Step 1: Using MongoDB Compass
1. Open MongoDB Compass
2. Connect to your MongoDB
3. Select database: `yo_computer_hub`
4. Right-click collection → Import Data
5. Select `categories.json` → Import
6. Repeat for `products.json`

### Step 2: Using Command Line
```bash
# Import categories
mongoimport --uri "mongodb://localhost:27017/yo_computer_hub" \
  --collection categories \
  --file database/categories.json \
  --jsonArray

# Import products
mongoimport --uri "mongodb://localhost:27017/yo_computer_hub" \
  --collection products \
  --file database/products.json \
  --jsonArray
```

### Step 3: Verify Import
```bash
# Check categories count
db.categories.countDocuments()  # Should be 10

# Check products count
db.products.countDocuments()    # Should be 30
```

---

## Data Overview

### Categories (10)
| ID | Name | Products |
|---|---|---|
| cat_001 | Processors | 4 |
| cat_002 | Motherboards | 2 |
| cat_003 | RAM Memory | 2 |
| cat_004 | Storage Drives | 2 |
| cat_005 | Graphics Cards | 3 |
| cat_006 | Power Supplies | 2 |
| cat_007 | Cooling Systems | 2 |
| cat_008 | Cases | 2 |
| cat_009 | Peripherals | 3 |
| cat_010 | Monitors | 4 |

### Products Sample
- **Highest Price**: NVIDIA RTX 4090 - $1599
- **Lowest Price**: Seagate Barracuda 2TB - $49
- **Average Price**: ~$350
- **Average Rating**: 4.6/5
- **Total Stock**: 600+ units

---

## Using with Postman

### Import Collection
1. Open Postman
2. Click **Import** button
3. Select `database/Postman_Collection.json`
4. Collection imported with 20+ requests

### Available Endpoints
- Get All Products
- Get Products by Category
- Get Single Product
- Create Product
- Update Product
- Delete Product
- Get All Categories
- Register User
- Login User
- Logout User
- Get User Profile
- Update User Profile
- Get User Orders
- Get User Addresses
- Add/Update/Delete Address

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
  category: String,           // References categories._id
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

## Product Details

### Top 5 Most Expensive
1. NVIDIA RTX 4090 - $1599
2. NVIDIA RTX 4080 - $1199
3. AMD Radeon RX 7900 XTX - $899
4. Intel Core i9-13900K - $589
5. AMD Ryzen 9 7950X - $549

### Top 5 Most Affordable
1. Seagate Barracuda 2TB - $49
2. LIAN LI LANCOOL 205 Case - $49
3. Kingston Fury Beast 16GB DDR5 - $79
4. Razer DeathAdder V3 Mouse - $69
5. WD Black SN850X 1TB - $99

### Best Rated
1. NVIDIA RTX 4090 - 4.9/5
2. Intel Core i9-13900K - 4.8/5
3. Samsung 990 Pro 2TB - 4.8/5
4. Noctua NH-D15 Cooler - 4.8/5

---

## API Testing

### Get All Products
```
GET http://localhost:9000/api/products
```

### Get Products by Category
```
GET http://localhost:9000/api/products?category=cat_001
```

### Get Single Product
```
GET http://localhost:9000/api/products/prod_001
```

### Create Product
```
POST http://localhost:9000/api/products
Body: { name, category, price, ... }
```

---

## Verification Checklist

- [ ] MongoDB running on port 27017
- [ ] Database `yo_computer_hub` created
- [ ] Import categories.json
- [ ] Import products.json
- [ ] Verify 10 categories in database
- [ ] Verify 30 products in database
- [ ] Test API endpoints
- [ ] Import Postman collection
- [ ] Test all Postman requests

---

## File Locations

```
project/
├── database/
│   ├── categories.json
│   ├── products.json
│   └── Postman_Collection.json
├── MONGODB_IMPORT_GUIDE.md
└── DATABASE_SETUP_SUMMARY.md
```

---

## Next Steps

1. ✅ Create JSON files (DONE)
2. ✅ Create Postman collection (DONE)
3. ✅ Create import guide (DONE)
4. Import into MongoDB
5. Test API endpoints
6. Verify data in frontend
7. Add more products as needed

---

## Support

For issues:
1. Check `MONGODB_IMPORT_GUIDE.md` for troubleshooting
2. Verify MongoDB is running
3. Check file paths are correct
4. Validate JSON files
5. Check MongoDB connection string

---

**Status**: ✅ READY FOR IMPORT
**Date**: November 19, 2025
**Version**: 1.0.0
