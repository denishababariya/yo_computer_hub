// Complete Sample Data Format for Products and Categories

// ============ CATEGORIES ============
const categories = [
  {
    name: "Graphics Cards",
    slug: "graphics-cards",
    description: "High-performance GPU components for gaming and professional work",
    image: "https://example.com/category-gpu.jpg",
    icon: "🎮",
    parent: null,
    isActive: true,
    order: 1
  },
  {
    name: "Processors",
    slug: "processors",
    description: "CPU processors for gaming and workstations",
    image: "https://example.com/category-cpu.jpg",
    icon: "⚡",
    parent: null,
    isActive: true,
    order: 2
  },
  {
    name: "Memory",
    slug: "memory",
    description: "RAM and storage components",
    image: "https://example.com/category-memory.jpg",
    icon: "💾",
    parent: null,
    isActive: true,
    order: 3
  },
  {
    name: "High-End GPUs",
    slug: "high-end-gpus",
    description: "Premium NVIDIA RTX 40 series cards",
    image: "https://example.com/category-rtx40.jpg",
    icon: "⭐",
    parent: null, // Will be updated with parent category ID
    isActive: true,
    order: 1
  }
];

// ============ PRODUCTS WITH MULTIPLE IMAGES & VIDEOS ============
const products = [
  {
    // ===== GRAPHICS CARD =====
    name: "NVIDIA GeForce RTX 4090",
    description: "The world's fastest desktop GPU. Built for ultimate gaming performance and demanding professional applications. Features 16,384 CUDA cores, 24GB of GDDR6X memory, and up to 575W power consumption.",
    price: 1599,
    originalPrice: 1999,
    category: "Graphics Cards",
    image: "https://example.com/rtx4090-main.jpg",
    images: [
      {
        url: "https://example.com/rtx4090-front.jpg",
        alt: "RTX 4090 Front View",
        isPrimary: true
      },
      {
        url: "https://example.com/rtx4090-side.jpg",
        alt: "RTX 4090 Side View",
        isPrimary: false
      },
      {
        url: "https://example.com/rtx4090-top.jpg",
        alt: "RTX 4090 Top View",
        isPrimary: false
      },
      {
        url: "https://example.com/rtx4090-rgb.jpg",
        alt: "RTX 4090 RGB Lighting",
        isPrimary: false
      },
      {
        url: "https://example.com/rtx4090-connector.jpg",
        alt: "RTX 4090 Power Connectors",
        isPrimary: false
      }
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=3d_4h0nnG0w",
        title: "RTX 4090 Performance Review - 4K Gaming Tests",
        type: "youtube",
        thumbnail: "https://i.ytimg.com/vi/3d_4h0nnG0w/hqdefault.jpg"
      },
      {
        url: "https://www.youtube.com/watch?v=WrVmNDjVWf0",
        title: "RTX 4090 Unboxing and First Look",
        type: "youtube",
        thumbnail: "https://i.ytimg.com/vi/WrVmNDjVWf0/hqdefault.jpg"
      },
      {
        url: "https://example.com/rtx4090-demo.mp4",
        title: "Interactive 360 Product Demo",
        type: "direct",
        thumbnail: "https://example.com/demo-thumb.jpg"
      },
      {
        url: "https://vimeo.com/123456789",
        title: "Professional Setup Showcase",
        type: "vimeo",
        thumbnail: "https://vimeo.com/thumb.jpg"
      }
    ],
    stock: 100,
    rating: 4.8,
    reviews: [
      {
        user: "John Gamer",
        rating: 5,
        comment: "Amazing performance! Can run any game at 4K.",
        date: new Date()
      },
      {
        user: "Pro Designer",
        rating: 5,
        comment: "Excellent for CUDA rendering and machine learning.",
        date: new Date()
      }
    ],
    specifications: {
      memory: "24GB GDDR6X",
      memoryInterface: "384-bit",
      memoryClock: "21 Gbps",
      memoryBandwidth: "960 GB/s",
      cudaCores: 16384,
      tensorCores: 512,
      rtCores: 568,
      boostClock: "2.52 GHz",
      maxPower: "575W",
      connectors: "3x DP 1.4a, 1x HDMI 2.1",
      maxResolution: "7680 x 4320",
      architecture: "Ada"
    },
    tags: ["gpu", "nvidia", "rtx-40", "gaming", "professional", "4090", "high-end"],
    isFeatured: true,
    isBestSeller: true
  },

  {
    // ===== PROCESSOR =====
    name: "Intel Core i9-13900K",
    description: "13th generation Intel Core i9 processor with 24 cores (8 Performance + 16 Efficiency cores). Perfect for gaming, streaming, and content creation. 5.8 GHz max turbo frequency.",
    price: 549,
    originalPrice: 699,
    category: "Processors",
    image: "https://example.com/i9-13900k-main.jpg",
    images: [
      {
        url: "https://example.com/i9-13900k-front.jpg",
        alt: "i9-13900K Front",
        isPrimary: true
      },
      {
        url: "https://example.com/i9-13900k-back.jpg",
        alt: "i9-13900K Back",
        isPrimary: false
      },
      {
        url: "https://example.com/i9-13900k-package.jpg",
        alt: "Retail Package",
        isPrimary: false
      }
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=cpu-review-123",
        title: "Intel i9-13900K Full Review and Benchmarks",
        type: "youtube",
        thumbnail: "https://i.ytimg.com/vi/cpu-review-123/hqdefault.jpg"
      },
      {
        url: "https://example.com/i9-install.mp4",
        title: "Installation Guide",
        type: "direct",
        thumbnail: "https://example.com/install-thumb.jpg"
      }
    ],
    stock: 50,
    rating: 4.7,
    specifications: {
      cores: 24,
      performanceCores: 8,
      efficiencyCores: 16,
      threads: 32,
      baseClock: "3.0 GHz",
      maxTurboClock: "5.8 GHz",
      cache: "36 MB",
      tdp: "125W",
      socket: "LGA1700",
      process: "7nm"
    },
    tags: ["cpu", "intel", "i9", "gaming", "workstation", "13th-gen"],
    isFeatured: true,
    isBestSeller: false
  },

  {
    // ===== MEMORY/RAM =====
    name: "Corsair Vengeance RGB Pro 32GB (2x16GB) DDR5",
    description: "High-performance DDR5 RAM with RGB lighting. Optimized for latest Intel and AMD platforms. Includes comprehensive software for RGB customization.",
    price: 249,
    originalPrice: 349,
    category: "Memory",
    image: "https://example.com/corsair-32gb-main.jpg",
    images: [
      {
        url: "https://example.com/corsair-32gb-front.jpg",
        alt: "Front View",
        isPrimary: true
      },
      {
        url: "https://example.com/corsair-32gb-side.jpg",
        alt: "Side View RGB",
        isPrimary: false
      },
      {
        url: "https://example.com/corsair-32gb-installed.jpg",
        alt: "Installed in System",
        isPrimary: false
      },
      {
        url: "https://example.com/corsair-32gb-glow.jpg",
        alt: "RGB Glow",
        isPrimary: false
      }
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=ram-review-456",
        title: "Corsair Vengeance RGB Pro DDR5 Review",
        type: "youtube",
        thumbnail: "https://i.ytimg.com/vi/ram-review-456/hqdefault.jpg"
      },
      {
        url: "https://example.com/corsair-rgb-setup.mp4",
        title: "RGB Setup and Configuration",
        type: "direct",
        thumbnail: "https://example.com/rgb-setup-thumb.jpg"
      }
    ],
    stock: 200,
    rating: 4.6,
    specifications: {
      capacity: "32GB",
      modules: "2x16GB",
      type: "DDR5",
      speed: "5600MHz",
      cl: "CAS 28",
      voltage: "1.20V",
      color: "Black",
      lighting: "RGB",
      warranty: "Lifetime"
    },
    tags: ["ram", "ddr5", "corsair", "gaming", "rgb"],
    isFeatured: false,
    isBestSeller: true
  },

  {
    // ===== ANOTHER GPU MODEL =====
    name: "NVIDIA GeForce RTX 4080",
    description: "High-performance desktop GPU with 16GB GDDR6X memory. Excellent for gaming and professional work at 1440p and 4K resolutions.",
    price: 1199,
    originalPrice: 1399,
    category: "Graphics Cards",
    image: "https://example.com/rtx4080-main.jpg",
    images: [
      {
        url: "https://example.com/rtx4080-front.jpg",
        alt: "RTX 4080 Front",
        isPrimary: true
      },
      {
        url: "https://example.com/rtx4080-angle.jpg",
        alt: "RTX 4080 Angle",
        isPrimary: false
      },
      {
        url: "https://example.com/rtx4080-compare.jpg",
        alt: "RTX 4080 vs 4090 Size Comparison",
        isPrimary: false
      }
    ],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=rtx4080-review",
        title: "RTX 4080 Review - Value vs 4090",
        type: "youtube",
        thumbnail: "https://i.ytimg.com/vi/rtx4080-review/hqdefault.jpg"
      },
      {
        url: "https://example.com/rtx4080-gameplay.mp4",
        title: "4K Gameplay Footage",
        type: "direct",
        thumbnail: "https://example.com/gameplay-thumb.jpg"
      }
    ],
    stock: 75,
    rating: 4.7,
    specifications: {
      memory: "16GB GDDR6X",
      memoryBandwidth: "576 GB/s",
      cudaCores: 10240,
      boostClock: "2.505 GHz",
      maxPower: "320W",
      memoryInterface: "256-bit"
    },
    tags: ["gpu", "nvidia", "rtx-40", "4080", "gaming"],
    isFeatured: true,
    isBestSeller: true
  }
];

// ============ EXPORT FOR USE ==========
module.exports = {
  categories,
  products
};

// ============ HOW TO USE IN POSTMAN ==========
/*
1. CREATE CATEGORY FIRST:
   POST http://localhost:5000/api/products/categories
   Body: categories[0]
   Save the returned _id as CATEGORY_ID

2. UPDATE PRODUCT WITH CATEGORY ID:
   Update products to include: categoryId: "{{CATEGORY_ID}}"

3. CREATE PRODUCT:
   POST http://localhost:5000/api/products
   Body: products[0]
   Save the returned _id as PRODUCT_ID

4. ADD MORE IMAGES:
   POST http://localhost:5000/api/products/{{PRODUCT_ID}}/images
   Body: {
     "url": "new-image-url",
     "alt": "description",
     "isPrimary": false
   }

5. ADD MORE VIDEOS:
   POST http://localhost:5000/api/products/{{PRODUCT_ID}}/videos
   Body: {
     "url": "video-url",
     "title": "video-title",
     "type": "youtube|vimeo|direct|demo",
     "thumbnail": "thumb-url"
   }

6. SEARCH/FILTER:
   GET http://localhost:5000/api/products?search=RTX&sort=price-high&limit=5

7. GET WITH PAGINATION:
   GET http://localhost:5000/api/products?page=1&limit=10
*/

// ============ IMAGE SOURCES TEMPLATE ==========
/*
Replace example.com URLs with your actual image hosting:

Option 1: Local Server
http://localhost:5000/images/products/rtx4090-1.jpg

Option 2: CloudStorage (AWS S3, Firebase)
https://s3.amazonaws.com/your-bucket/rtx4090-1.jpg

Option 3: CDN (Cloudflare, CloudFront)
https://cdn.example.com/rtx4090-1.jpg

Option 4: Direct Links
https://images.shop.com/products/rtx4090-1.jpg
*/
