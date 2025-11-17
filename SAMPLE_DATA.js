// Sample data to populate MongoDB
// Use MongoDB Compass or mongo shell to insert these documents

// Sample Products
db.products.insertMany([
  {
    name: "ROG STRIX G16 Gaming Laptop",
    description: "High-performance gaming laptop with RTX 4090 graphics and 16th Gen Intel Core i9",
    price: 1299.99,
    originalPrice: 1599.99,
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1588872657361-811581cc669d?q=80&w=800&auto=format&fit=crop",
    stock: 15,
    rating: 4.8,
    reviews: [
      {
        user: "John Doe",
        rating: 5,
        comment: "Excellent gaming laptop! Very fast and reliable.",
        date: new Date()
      }
    ],
    specifications: {
      "GPU": "NVIDIA RTX 4090",
      "CPU": "Intel Core i9-13900K",
      "RAM": "32GB DDR5",
      "Storage": "1TB NVMe SSD",
      "Display": "16 inch FHD 165Hz"
    }
  },
  {
    name: "Corsair K95 RGB Platinum Mechanical Keyboard",
    description: "Premium mechanical gaming keyboard with Cherry MX switches and dynamic RGB lighting",
    price: 199.99,
    originalPrice: 249.99,
    category: "KEYBOARDS",
    image: "https://images.unsplash.com/photo-1587829191301-c1521f2f0d1d?q=80&w=800&auto=format&fit=crop",
    stock: 50,
    rating: 4.7,
    reviews: [],
    specifications: {
      "Switch": "Cherry MX Mechanical",
      "Lighting": "Per-Key RGB",
      "Connection": "USB 2.0",
      "Layout": "Full Size 104-key",
      "Material": "Aircraft-grade Aluminum"
    }
  },
  {
    name: "SteelSeries Rival 600 Gaming Mouse",
    description: "Dual-sensor gaming mouse with 12000 CPI and exceptional accuracy",
    price: 79.99,
    originalPrice: 99.99,
    category: "MOUSE",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800&auto=format&fit=crop",
    stock: 100,
    rating: 4.6,
    reviews: [],
    specifications: {
      "DPI": "100-12000",
      "Polling Rate": "1000Hz",
      "Sensor": "Dual TrueMove Pro",
      "Weight": "96g",
      "Connection": "Wired USB"
    }
  },
  {
    name: "HyperX Cloud Alpha Gaming Headset",
    description: "Professional gaming headset with 7.1 surround sound and noise-canceling microphone",
    price: 129.99,
    originalPrice: 159.99,
    category: "HEADSETS",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    stock: 75,
    rating: 4.5,
    reviews: [],
    specifications: {
      "Audio": "7.1 Surround Sound",
      "Driver": "50mm",
      "Impedance": "64 Ohm",
      "Frequency": "20Hz - 20kHz",
      "Cable": "3.5mm or USB"
    }
  },
  {
    name: "ASUS ProArt PA328QV 4K Monitor",
    description: "Professional 4K monitor with 99% Adobe RGB coverage for gaming and creative work",
    price: 699.99,
    originalPrice: 899.99,
    category: "MONITORS",
    image: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=80&w=800&auto=format&fit=crop",
    stock: 20,
    rating: 4.9,
    reviews: [],
    specifications: {
      "Resolution": "4K (3840x2160)",
      "Panel": "IPS",
      "Refresh Rate": "60Hz",
      "Response Time": "5ms",
      "Color Accuracy": "99% Adobe RGB"
    }
  },
  {
    name: "Blue Yeti USB Microphone",
    description: "Premium USB microphone with 4 recording patterns and real-time monitoring",
    price: 89.99,
    originalPrice: 119.99,
    category: "MICROPHONES",
    image: "https://images.unsplash.com/photo-1590080876352-cd381e90460e?q=80&w=800&auto=format&fit=crop",
    stock: 60,
    rating: 4.4,
    reviews: [],
    specifications: {
      "Polar Patterns": "4 (Cardioid, Omnidirectional, Bidirectional, Stereo)",
      "Frequency Response": "20Hz - 20kHz",
      "Sample Rate": "48kHz",
      "Connection": "USB 2.0",
      "Color": "Black/Silver"
    }
  },
  {
    name: "Corsair RM1000x Power Supply",
    description: "1000W fully modular 80+ Gold certified power supply for high-end gaming PCs",
    price: 179.99,
    originalPrice: 249.99,
    category: "POWER",
    image: "https://images.unsplash.com/photo-1567518776592-23435add3e1d?q=80&w=800&auto=format&fit=crop",
    stock: 40,
    rating: 4.8,
    reviews: [],
    specifications: {
      "Wattage": "1000W",
      "Certification": "80+ Gold",
      "Modularity": "Fully Modular",
      "Connectors": "PCIe x2, 24-pin ATX",
      "Warranty": "10 years"
    }
  },
  {
    name: "Razer Base Station Chroma RGB Hub",
    description: "Customizable RGB hub to control all Razer peripherals",
    price: 39.99,
    category: "ACCESSORIES",
    image: "https://images.unsplash.com/photo-1518633776532-ab7ae4986db5?q=80&w=800&auto=format&fit=crop",
    stock: 80,
    rating: 4.3,
    reviews: [],
    specifications: {
      "RGB Zones": "12 independent zones",
      "Connection": "USB 3.0",
      "Compatibility": "All Razer RGB devices",
      "Software": "Razer Synapse 3"
    }
  }
]);

// Sample Users (passwords are hashed in real implementation)
db.users.insertMany([
  {
    name: "Admin User",
    email: "admin@yo-computer-hub.com",
    password: "hashedpassword123", // In real usage, use bcrypt
    phone: "+1234567890",
    address: "123 Gaming Lane",
    city: "Tech City",
    state: "TC",
    zipCode: "12345",
    createdAt: new Date()
  },
  {
    name: "Test User",
    email: "test@example.com",
    password: "hashedpassword123",
    phone: "+0987654321",
    address: "456 Computer Ave",
    city: "Digital Town",
    state: "DT",
    zipCode: "54321",
    createdAt: new Date()
  }
]);

// Sample Orders
db.orders.insertMany([
  {
    userId: ObjectId("userId_here"), // Replace with actual user ID
    items: [
      {
        productId: ObjectId("productId_here"),
        productName: "ROG STRIX G16 Gaming Laptop",
        price: 1299.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1588872657361-811581cc669d?q=80&w=800"
      },
      {
        productId: ObjectId("productId_here"),
        productName: "Corsair K95 RGB Platinum Mechanical Keyboard",
        price: 199.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1587829191301-c1521f2f0d1d?q=80&w=800"
      }
    ],
    totalAmount: 1499.98,
    shippingAddress: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      address: "123 Gaming Lane",
      city: "Tech City",
      state: "TC",
      zipCode: "12345"
    },
    orderStatus: "pending",
    paymentStatus: "pending",
    paymentMethod: "cod",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Instructions:
// 1. Open MongoDB Compass or use mongo shell
// 2. Connect to: mongodb://localhost:27017/yo_computer_hub
// 3. Paste the code above in appropriate collections
// 4. Replace ObjectId placeholders with actual IDs after insertion
// 5. For local testing, you can use sample data as is
