# MongoDB 500 Collection Limit - Solution Guide

## Problem
```
Error: cannot create a new collection -- already using 500 collections of 500
```

This means your MongoDB instance has reached the maximum collection limit.

---

## Quick Fix (Recommended)

### Option 1: Use MongoDB Atlas (Cloud - BEST)
**Advantages:**
- No collection limits
- Free tier available (512MB storage)
- Professional hosting
- Automatic backups

**Steps:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update backend `.env`:
```
MONGO_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/yo_computer_hub
```
6. Restart backend

### Option 2: Clean Local MongoDB (Quick)

**Steps:**

1. **Backup important data** (users, products, orders)

2. **Open MongoDB Compass** or use mongo shell

3. **Run cleanup script:**
```javascript
// Drop database and recreate
use yo_computer_hub
db.dropDatabase()
```

4. **Restart backend:**
```bash
cd backend
npm start
```

5. **Re-create data:**
   - Register new user
   - Add products via API
   - Create test orders

### Option 3: Delete Unused Collections Only

1. **Open MongoDB Compass**

2. **Connect to database**

3. **Identify and delete test/temp collections:**
   - Right-click collection → Delete
   - Keep: `users`, `products`, `orders`

4. **Check remaining collections:**
```javascript
use yo_computer_hub
db.getCollectionNames()
```

---

## Prevention (For Future)

### Use Single Collection for Multiple Data Types
```javascript
// Instead of separate collections, use one with type field
db.entities.insertOne({
  type: 'user',
  id: '123',
  name: 'John',
  // ... user data
})

db.entities.insertOne({
  type: 'product',
  id: '456',
  name: 'Laptop',
  // ... product data
})
```

### Create Index on Type Field
```javascript
db.entities.createIndex({ type: 1 })
```

---

## Recommended Solution

**Use MongoDB Atlas:**

### Step 1: Create Account
```
1. Visit https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account with email
4. Create organization
```

### Step 2: Create Cluster
```
1. Click "Create a Deployment"
2. Choose "Free" tier
3. Select region (closest to you)
4. Click "Create"
5. Wait ~3-5 minutes
```

### Step 3: Get Connection String
```
1. Click "Connect"
2. Choose "Drivers"
3. Select Node.js
4. Copy connection string
5. Replace password with your password
```

### Step 4: Update .env
```env
PORT=9000
MONGO_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/yo_computer_hub?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Step 5: Restart Backend
```bash
cd backend
npm start
```

---

## MongoDB Compass - Visual Cleanup

### Delete Collections Manually:
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select `yo_computer_hub` database
4. View all collections
5. Right-click unnecessary collections → Delete Collection
6. Keep only: `users`, `products`, `orders`

---

## Verify Collections Are Clean

**Check in MongoDB Compass:**
```
yo_computer_hub
├── users (documents: X)
├── products (documents: Y)
├── orders (documents: Z)
```

**Or in mongo shell:**
```javascript
use yo_computer_hub
db.getCollectionNames()  // Should show only 3 collections
```

---

## If Using Local MongoDB

### Delete All and Start Fresh
```bash
# Windows
mongod --dbpath "C:\data\db" --wiredTigerCacheSizeGB 1

# Then in another terminal
mongo
use yo_computer_hub
db.dropDatabase()
exit
```

### Then restart backend
```bash
cd backend
npm start
```

---

## After Fixing

### 1. Test Registration
```
POST http://localhost:9000/api/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### 2. Should get response
```json
{
  "success": true,
  "token": "eyJ...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

### 3. Check MongoDB
- New user should appear in `users` collection
- No new collections should be created

---

## Why This Happened

Possible causes:
1. Old test collections not cleaned up
2. Multiple database connections creating collections
3. Development/testing creating temp collections
4. Session collections from previous runs

---

## Best Practice Going Forward

1. **Use MongoDB Atlas** for development/production
2. **Limit to 3-4 main collections:**
   - users
   - products
   - orders
   - (optional) reviews
3. **Don't create temp collections** during testing
4. **Use documents with type fields** instead of separate collections
5. **Regular cleanup** of test data

---

## Support

**Still having issues?**

1. Check MongoDB version: `mongod --version`
2. Check MongoDB service status
3. Try MongoDB Atlas (recommended)
4. Clear all collections and start fresh
5. Check backend logs for errors

---

## Quick Command Reference

```javascript
// Count total collections
use yo_computer_hub
db.getCollectionNames().length

// List all collections
db.getCollectionNames()

// Drop entire database (WARNING: data loss)
db.dropDatabase()

// Drop specific collection
db.collectionName.drop()

// Check collection size
db.collectionName.stats()
```

---

**Recommended: Use MongoDB Atlas to avoid this issue permanently!**
