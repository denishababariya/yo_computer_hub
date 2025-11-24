const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ MongoDB connected');
  
  try {
    const db = mongoose.connection.db;
    
    // Get current indexes
    const indexInfo = await db.collection('categories').getIndexes();
    console.log('\n📋 Current indexes:', Object.keys(indexInfo));
    
    // Drop all indexes except _id_
    const indexesToDrop = Object.keys(indexInfo).filter(idx => idx !== '_id_');
    
    if (indexesToDrop.length === 0) {
      console.log('✅ No extra indexes to drop');
    } else {
      for (const idx of indexesToDrop) {
        try {
          await db.collection('categories').dropIndex(idx);
          console.log(`✅ Dropped index: ${idx}`);
        } catch (err) {
          console.log(`⚠️  Could not drop ${idx}: ${err.message}`);
        }
      }
    }
    
    // Remove duplicate null slugs
    const result = await db.collection('categories').deleteMany({ slug: null });
    console.log(`\n✅ Removed ${result.deletedCount} documents with null slug`);
    
    // Verify final state
    const finalIndexes = await db.collection('categories').getIndexes();
    const finalCount = await db.collection('categories').countDocuments();
    
    console.log('\n📊 Final state:');
    console.log(`   - Indexes: ${Object.keys(finalIndexes).join(', ')}`);
    console.log(`   - Total documents: ${finalCount}`);
    console.log('\n✅ Database cleanup completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});
