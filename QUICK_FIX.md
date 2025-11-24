# Fix E11000 Duplicate Key Error

## ❌ Error
```
E11000 duplicate key error collection: yo_computer_hub.categories index: slug_1 dup key: { slug: null }
```

## ✅ Solution

### Step 1: Clean Database
```bash
cd backend
node cleanDatabase.js
```

**Expected Output:**
```
✓ Connected to MongoDB
✓ Dropped categories collection
✓ Dropped products collection
✓ Dropped users collection
✓ Dropped orders collection
✓ Dropped contacts collection

✅ Database cleaned successfully!
Now run: node seedDatabase.js
```

### Step 2: Seed Database
```bash
node seedDatabase.js
```

**Expected Output:**
```
✓ Connected to MongoDB
✓ Created 9 categories
✓ Created 10 products
✓ Created 3 users
✓ Created 3 orders
✓ Created 3 contacts

✅ Database seeded successfully!
```

### Step 3: Restart Backend
```bash
npm start
```

**Expected Output:**
```
Server running on port 9000
MongoDB connected successfully
```

---

## 🎯 What This Does

1. **cleanDatabase.js** - Removes old indexes and collections
2. **seedDatabase.js** - Creates fresh data with correct schema
3. Fixes the slug index issue by recreating collections

---

## ✅ Verify It Works

1. Open browser: `http://localhost:3000/admin`
2. Go to Products tab
3. Click "+ Add Product"
4. Category dropdown should show all 9 categories
5. Select a category and create a product
6. Product should appear in the table with category name

---

## 📋 Complete Setup

```bash
# Terminal 1: Clean and seed
cd backend
node cleanDatabase.js
node seedDatabase.js

# Terminal 2: Start backend
npm start

# Terminal 3: Start frontend
cd frontend
npm start

# Open browser
http://localhost:3000/admin
```

---

**Status**: ✅ Ready to Fix
