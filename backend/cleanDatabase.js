const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

async function cleanDatabase() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✓ Connected to MongoDB');

    // Drop the entire categories collection to remove old indexes
    await mongoose.connection.collection('categories').drop();
    console.log('✓ Dropped categories collection');

    // Drop other collections if needed
    try {
      await mongoose.connection.collection('products').drop();
      console.log('✓ Dropped products collection');
    } catch (e) {
      console.log('Products collection not found');
    }

    try {
      await mongoose.connection.collection('users').drop();
      console.log('✓ Dropped users collection');
    } catch (e) {
      console.log('Users collection not found');
    }

    try {
      await mongoose.connection.collection('orders').drop();
      console.log('✓ Dropped orders collection');
    } catch (e) {
      console.log('Orders collection not found');
    }

    try {
      await mongoose.connection.collection('contacts').drop();
      console.log('✓ Dropped contacts collection');
    } catch (e) {
      console.log('Contacts collection not found');
    }

    console.log('\n✅ Database cleaned successfully!');
    console.log('Now run: node seedDatabase.js');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error cleaning database:', error.message);
    process.exit(1);
  }
}

cleanDatabase();
