const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./model/Product');
const Category = require('./model/Category');
const User = require('./model/User');
const Order = require('./model/Order');
const Contact = require('./model/Contact');

const mongoUrl = process.env.MONGO_URL;

// Sample Categories
const sampleCategories = [
  { name: 'Processors', description: 'CPU processors for computers', icon: '⚙️' },
  { name: 'Motherboards', description: 'Computer motherboards', icon: '🖥️' },
  { name: 'RAM', description: 'Memory modules', icon: '💾' },
  { name: 'Storage', description: 'SSDs and HDDs', icon: '💿' },
  { name: 'Graphics Cards', description: 'GPU graphics cards', icon: '🎮' },
  { name: 'Power Supply', description: 'PSU power supplies', icon: '⚡' },
  { name: 'Cooling', description: 'CPU and case cooling', icon: '❄️' },
  { name: 'Cases', description: 'Computer cases', icon: '📦' },
  { name: 'Peripherals', description: 'Keyboards, mice, monitors', icon: '🖱️' }
];

// Sample Products
const sampleProducts = [
  {
    name: 'Intel Core i9-13900K',
    description: 'High-performance 13th gen Intel processor with 24 cores',
    price: 589,
    originalPrice: 699,
    image: 'https://via.placeholder.com/400?text=Intel+Core+i9',
    stock: 15,
    rating: 4.8,
    tags: ['processor', 'intel', 'gaming', 'workstation']
  },
  {
    name: 'AMD Ryzen 9 7950X',
    description: 'AMD Ryzen 9 7950X 16-core processor',
    price: 699,
    originalPrice: 799,
    image: 'https://via.placeholder.com/400?text=AMD+Ryzen+9',
    stock: 12,
    rating: 4.7,
    tags: ['processor', 'amd', 'gaming', 'workstation']
  },
  {
    name: 'ASUS ROG STRIX Z790-E',
    description: 'Premium Z790 motherboard for Intel 13th gen',
    price: 449,
    originalPrice: 549,
    image: 'https://via.placeholder.com/400?text=ASUS+Z790',
    stock: 8,
    rating: 4.6,
    tags: ['motherboard', 'asus', 'z790', 'intel']
  },
  {
    name: 'Corsair Vengeance RGB Pro 32GB DDR4',
    description: '32GB DDR4 RAM with RGB lighting',
    price: 129,
    originalPrice: 159,
    image: 'https://via.placeholder.com/400?text=Corsair+RAM',
    stock: 25,
    rating: 4.5,
    tags: ['ram', 'corsair', 'ddr4', 'rgb']
  },
  {
    name: 'Samsung 990 Pro 2TB NVMe SSD',
    description: 'High-speed 2TB NVMe SSD storage',
    price: 199,
    originalPrice: 249,
    image: 'https://via.placeholder.com/400?text=Samsung+SSD',
    stock: 20,
    rating: 4.7,
    tags: ['ssd', 'samsung', 'nvme', 'storage']
  },
  {
    name: 'NVIDIA RTX 4090',
    description: 'Flagship NVIDIA graphics card',
    price: 1599,
    originalPrice: 1799,
    image: 'https://via.placeholder.com/400?text=RTX+4090',
    stock: 5,
    rating: 4.9,
    tags: ['gpu', 'nvidia', 'rtx', 'gaming']
  },
  {
    name: 'Corsair RM1000x 1000W Gold PSU',
    description: '1000W 80+ Gold certified power supply',
    price: 199,
    originalPrice: 249,
    image: 'https://via.placeholder.com/400?text=Corsair+PSU',
    stock: 18,
    rating: 4.6,
    tags: ['psu', 'corsair', 'power', '1000w']
  },
  {
    name: 'Noctua NH-D15 CPU Cooler',
    description: 'Premium dual-tower CPU cooler',
    price: 99,
    originalPrice: 119,
    image: 'https://via.placeholder.com/400?text=Noctua+Cooler',
    stock: 22,
    rating: 4.8,
    tags: ['cooler', 'noctua', 'cpu', 'cooling']
  },
  {
    name: 'LIAN LI LANCOOL 205 Case',
    description: 'Compact mid-tower PC case',
    price: 59,
    originalPrice: 79,
    image: 'https://via.placeholder.com/400?text=LIAN+LI+Case',
    stock: 30,
    rating: 4.4,
    tags: ['case', 'lian', 'li', 'compact']
  },
  {
    name: 'Logitech MX Master 3S Mouse',
    description: 'Premium wireless mouse',
    price: 99,
    originalPrice: 129,
    image: 'https://via.placeholder.com/400?text=Logitech+Mouse',
    stock: 35,
    rating: 4.7,
    tags: ['mouse', 'logitech', 'wireless', 'peripheral']
  }
];

// Sample Users
const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    phone: '9876543210'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john123',
    phone: '9123456789'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'jane123',
    phone: '9234567890'
  }
];

// Sample Orders
const createSampleOrders = (userIds) => [
  {
    userId: userIds[1],
    items: [
      {
        productId: 'prod_001',
        productName: 'Intel Core i9-13900K',
        price: 589,
        quantity: 1,
        image: 'https://via.placeholder.com/400?text=Intel+Core+i9'
      }
    ],
    totalAmount: 589,
    shippingAddress: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9123456789',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    orderStatus: 'pending'
  },
  {
    userId: userIds[2],
    items: [
      {
        productId: 'prod_002',
        productName: 'Corsair RAM 32GB',
        price: 129,
        quantity: 2,
        image: 'https://via.placeholder.com/400?text=Corsair+RAM'
      }
    ],
    totalAmount: 258,
    shippingAddress: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9234567890',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001'
    },
    orderStatus: 'shipped'
  },
  {
    userId: userIds[1],
    items: [
      {
        productId: 'prod_003',
        productName: 'Samsung SSD 2TB',
        price: 199,
        quantity: 1,
        image: 'https://via.placeholder.com/400?text=Samsung+SSD'
      }
    ],
    totalAmount: 199,
    shippingAddress: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9123456789',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    orderStatus: 'delivered'
  }
];

// Sample Contacts
const sampleContacts = [
  {
    name: 'Michael Johnson',
    company: 'Tech Corp',
    email: 'michael@techcorp.com',
    phone: '9111111111',
    message: 'Interested in bulk orders for our company',
    status: 'new'
  },
  {
    name: 'Sarah Williams',
    company: 'Digital Solutions',
    email: 'sarah@digitalsol.com',
    phone: '9222222222',
    message: 'Need custom configuration for our office',
    status: 'read'
  },
  {
    name: 'Robert Brown',
    company: 'IT Services',
    email: 'robert@itservices.com',
    phone: '9333333333',
    message: 'Question about warranty and support',
    status: 'replied'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✓ Connected to MongoDB');

    // Seed Categories
    const categories = await Category.insertMany(sampleCategories);
    console.log(`✓ Created ${categories.length} categories`);

    // Seed Products with category references
    const productsWithCategory = sampleProducts.map((product, index) => ({
      ...product,
      categoryId: categories[index % categories.length]._id
    }));
    const products = await Product.insertMany(productsWithCategory);
    console.log(`✓ Created ${products.length} products`);

    // Seed Users
    const users = await User.insertMany(sampleUsers);
    console.log(`✓ Created ${users.length} users`);

    // Seed Orders
    const orders = await Order.insertMany(createSampleOrders(users.map(u => u._id)));
    console.log(`✓ Created ${orders.length} orders`);

    // Seed Contacts
    const contacts = await Contact.insertMany(sampleContacts);
    console.log(`✓ Created ${contacts.length} contacts`);

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
