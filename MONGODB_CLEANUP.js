// MongoDB Collection Cleanup Script
// Run this in MongoDB Compass or mongo shell

// 1. Drop unnecessary collections (if they exist)
db.getCollectionNames().forEach(function(name) {
  if (name.includes('tmp') || name.includes('test') || name.includes('temp')) {
    db[name].drop();
    print('Dropped: ' + name);
  }
});

// 2. List all collections
print('Remaining collections:');
db.getCollectionNames().forEach(print);

// 3. Get collection count
print('Total collections: ' + db.getCollectionNames().length);

// 4. Optional: Drop all collections except main ones
// WARNING: Only run if you want to reset everything
// db.getCollectionNames().forEach(function(name) {
//   if (!['users', 'products', 'orders'].includes(name)) {
//     db[name].drop();
//   }
// });
