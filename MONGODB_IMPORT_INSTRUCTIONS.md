# MongoDB Import Instructions - ObjectId Format

## Files Ready for Import

✅ `database/categories.json` - 10 categories with ObjectId format
✅ `database/products.json` - 30 products with ObjectId format

---

## ID Format

Both files use MongoDB Extended JSON format with `$oid`:

```json
{
  "_id": {
    "$oid": "691d65502cfe2fe4776a1175"
  },
  "name": "Processors"
}
```

When imported to MongoDB, this will display as:
```
ObjectId('691d65502cfe2fe4776a1175')
```

---

## Import Methods

### Method 1: MongoDB Compass (Recommended)

1. Open **MongoDB Compass**
2. Connect to your MongoDB instance
3. Select database: `yo_computer_hub`
4. Right-click on **categories** collection → **Import Data**
5. Select `database/categories.json`
6. Click **Import**
7. Repeat for **products** collection with `database/products.json`

### Method 2: Command Line (mongoimport)

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

### Method 3: MongoDB Shell

```bash
# Connect to MongoDB
mongosh

# Use database
use yo_computer_hub

# Import categories
db.categories.insertMany(
  // Paste contents of categories.json array here
)

# Import products
db.products.insertMany(
  // Paste contents of products.json array here
)
```

---

## Verification

After import, verify the data:

```bash
# Check categories count
db.categories.countDocuments()
# Expected: 10

# Check products count
db.products.countDocuments()
# Expected: 30

# View a category
db.categories.findOne()
# Should show: { "_id": ObjectId("691d65502cfe2fe4776a1175"), ... }

# View a product
db.products.findOne()
# Should show: { "_id": ObjectId("691d65502cfe2fe4776a1180"), "category": ObjectId("691d65502cfe2fe4776a1175"), ... }

# Check category references
db.products.countDocuments({ category: ObjectId("691d65502cfe2fe4776a1175") })
# Expected: 4 (Processors category)
```

---

## Category IDs

| Category | ObjectId |
|----------|----------|
| Processors | 691d65502cfe2fe4776a1175 |
| Motherboards | 691d65502cfe2fe4776a1176 |
| RAM Memory | 691d65502cfe2fe4776a1177 |
| Storage Drives | 691d65502cfe2fe4776a1178 |
| Graphics Cards | 691d65502cfe2fe4776a1179 |
| Power Supplies | 691d65502cfe2fe4776a117a |
| Cooling Systems | 691d65502cfe2fe4776a117b |
| Cases | 691d65502cfe2fe4776a117c |
| Peripherals | 691d65502cfe2fe4776a117d |
| Monitors | 691d65502cfe2fe4776a117e |

---

## Product Count by Category

- Processors: 4 products
- Motherboards: 2 products
- RAM Memory: 2 products
- Storage Drives: 2 products
- Graphics Cards: 4 products
- Power Supplies: 2 products
- Cooling Systems: 2 products
- Cases: 2 products
- Peripherals: 3 products
- Monitors: 3 products

**Total: 30 products**

---

## API Usage After Import

### Get Products by Category
```bash
GET /api/products?category=691d65502cfe2fe4776a1175
# Returns all processor products
```

### Get Single Product
```bash
GET /api/products/691d65502cfe2fe4776a1180
# Returns Intel Core i9-13900K
```

---

## Troubleshooting

### Issue: "Invalid JSON"
**Solution**: Ensure JSON files are valid. Check for syntax errors.

### Issue: "Collection already exists"
**Solution**: Drop existing collections first:
```bash
db.categories.drop()
db.products.drop()
```

### Issue: "Connection refused"
**Solution**: Ensure MongoDB is running:
```bash
mongod
```

### Issue: "ObjectId format error"
**Solution**: The `$oid` format is correct. MongoDB will automatically convert it.

---

## Next Steps

1. ✅ Files created with ObjectId format
2. Import categories.json
3. Import products.json
4. Verify data in MongoDB
5. Test API endpoints
6. Update frontend to use new IDs

---

**Status**: ✅ READY FOR IMPORT
**Date**: November 19, 2025
**Format**: MongoDB Extended JSON with $oid
