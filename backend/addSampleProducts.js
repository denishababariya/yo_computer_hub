const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./model/Product');

const sampleProducts = [
  {
    name: 'Gaming Laptop Pro',
    description: 'High-performance gaming laptop with RTX 4090, perfect for gaming and video editing',
    price: 1999,
    originalPrice: 2499,
    category: 'Laptop',
    image: 'https://via.placeholder.com/300x200?text=Gaming+Laptop+Pro',
    stock: 15,
    rating: 4.8,
    specifications: {
      processor: 'Intel i9 13th Gen',
      ram: '32GB DDR5',
      storage: '1TB NVMe SSD',
      gpu: 'RTX 4090',
      display: '17.3" 4K 144Hz',
      battery: '6 hours'
    }
  },
  {
    name: 'Desktop Gaming PC',
    description: 'Ultimate gaming desktop with high specs, perfect for competitive gaming',
    price: 2299,
    originalPrice: 2799,
    category: 'Desktop',
    image: 'https://via.placeholder.com/300x200?text=Gaming+Desktop',
    stock: 8,
    rating: 4.7,
    specifications: {
      processor: 'Intel i9 K series',
      ram: '64GB DDR5',
      storage: '2TB NVMe SSD',
      gpu: 'RTX 4080',
      motherboard: 'ASUS ROG',
      power: '1200W'
    }
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with customizable buttons and RGB lighting',
    price: 79,
    originalPrice: 99,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x200?text=Gaming+Mouse',
    stock: 50,
    rating: 4.5,
    specifications: {
      dpi: '20000',
      buttons: '8 Programmable',
      wireless: 'Yes - 2.4GHz',
      battery: '70 hours'
    }
  },
  {
    name: '4K Gaming Monitor',
    description: '32-inch 4K 144Hz gaming monitor with HDR support',
    price: 599,
    originalPrice: 799,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x200?text=4K+Monitor',
    stock: 12,
    rating: 4.6,
    specifications: {
      size: '32 inch',
      resolution: '4K (3840x2160)',
      refreshRate: '144Hz',
      responseTime: '1ms',
      hdr: 'Yes'
    }
  },
  {
    name: 'Ultrabook Laptop',
    description: 'Thin and light laptop for professionals, weighs only 2.5 lbs',
    price: 1299,
    originalPrice: 1599,
    category: 'Laptop',
    image: 'https://via.placeholder.com/300x200?text=Ultrabook',
    stock: 20,
    rating: 4.4,
    specifications: {
      processor: 'Intel i7 13th Gen',
      ram: '16GB LPDDR5',
      storage: '512GB SSD',
      display: '13.3" OLED 2.8K',
      weight: '2.5 lbs',
      battery: '20 hours'
    }
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical keyboard with Cherry MX switches and aluminum frame',
    price: 149,
    originalPrice: 199,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x200?text=Mechanical+Keyboard',
    stock: 25,
    rating: 4.7,
    specifications: {
      switches: 'Cherry MX Brown',
      layout: 'Full Size',
      rgb: 'Per Key',
      wireless: 'Yes',
      battery: '50 hours'
    }
  },
  {
    name: 'Professional Workstation Desktop',
    description: 'High-end workstation for 3D rendering, video editing, and CAD',
    price: 3499,
    originalPrice: 4299,
    category: 'Desktop',
    image: 'https://via.placeholder.com/300x200?text=Workstation',
    stock: 5,
    rating: 4.9,
    specifications: {
      processor: 'Intel Xeon W9',
      ram: '256GB DDR5',
      storage: '4TB NVMe SSD',
      gpu: 'RTX 6000 Ada',
      power: '1600W'
    }
  },
  {
    name: 'Budget Gaming Laptop',
    description: 'Affordable gaming laptop for casual gamers and students',
    price: 799,
    originalPrice: 999,
    category: 'Laptop',
    image: 'https://via.placeholder.com/300x200?text=Budget+Gaming+Laptop',
    stock: 30,
    rating: 4.2,
    specifications: {
      processor: 'AMD Ryzen 5',
      ram: '8GB DDR4',
      storage: '256GB SSD',
      gpu: 'RTX 3050',
      display: '15.6" 144Hz',
      battery: '8 hours'
    }
  },
  {
    name: 'USB-C Gaming Dock',
    description: 'Multi-port gaming dock with Ethernet and HDMI outputs',
    price: 129,
    originalPrice: 169,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x200?text=Gaming+Dock',
    stock: 40,
    rating: 4.3,
    specifications: {
      ports: '7 (USB, HDMI, Ethernet)',
      power: '100W USB-C',
      supports: '4K @60Hz',
      compatible: 'Mac & Windows'
    }
  },
  {
    name: 'RGB Gaming Headset',
    description: 'Wireless gaming headset with noise-canceling microphone',
    price: 199,
    originalPrice: 279,
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x200?text=Gaming+Headset',
    stock: 22,
    rating: 4.6,
    specifications: {
      driver: '50mm',
      frequency: '20-40000Hz',
      microphone: 'Noise Canceling',
      wireless: 'Yes - 2.4GHz',
      battery: '30 hours'
    }
  }
];

async function addProducts() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✓ Connected to MongoDB');
    
    console.log('Clearing existing products...');
    const deleted = await Product.deleteMany({});
    console.log(`✓ Deleted ${deleted.deletedCount} old products`);
    
    console.log('Adding sample products...');
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✓ Added ${inserted.length} sample products!`);
    
    console.log('\n📊 Products added:');
    inserted.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.name} - $${p.price} (${p.category})`);
    });
    
    console.log('\n✅ Sample data added successfully!');
    console.log('You can now refresh the Shop page to see products.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run
console.log('🚀 Starting sample data insertion...\n');
addProducts();
