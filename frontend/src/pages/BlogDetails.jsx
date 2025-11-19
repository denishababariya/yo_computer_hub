import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import blog1 from "../img/blog_mouse_img.jpg";
import blog2 from "../img/blog_speaker_img.jpg";
import blog3 from "../img/blog_computer_accessories_img.jpg";
import blog8 from "../img/blog_monitor_img.jpg";
import blog6 from "../img/blog_future_computer_accessories.jpg";
import blog9 from "../img/blog_pc_performance_img.jpg";
import blog10 from "../img/blog_wfh_img.jpg";
import blog11 from "../img/blog_wireless_parts.jpg";
import blog12 from "../img/blog_desk_organization.jpg";

const blogPosts = [
  {
    id: 1,
    title: "WHY A GOOD MOUSE CAN COMPLETELY CHANGE YOUR WORK EXPERIENCE",
    date: "April 14, 2024",
    excerpt:
      "From smooth scrolling to precise tracking, the right mouse improves accuracy, reduces strain, and boosts productivity...",
    fullContent:
      "A high-quality mouse is more than just a pointing tool—it directly influences your comfort and efficiency. Adjustable DPI settings allow you to control cursor sensitivity based on your task, whether you're designing, gaming, or browsing. Ergonomic mice reduce wrist strain, preventing issues like carpal tunnel over long usage. Advanced sensors ensure smoother tracking even on glossy surfaces. Investing in the right mouse ultimately impacts your productivity, posture, and long-term health at the desk.",
    image: blog1,
    category: "Accessories",
  },
  {
    id: 2,
    title: "TOP 10 KEYBOARDS FOR FAST TYPING & LONG WORK HOURS",
    date: "April 10, 2024",
    excerpt:
      "Discover the best mechanical and membrane keyboards designed for comfort, speed, and long-lasting durability...",
    fullContent:
      "Typing for long hours requires a keyboard that balances comfort and accuracy. Mechanical keyboards are known for their tactile feedback, durable switches, and deep key travel which reduces typing fatigue. Low-profile keyboards, on the other hand, improve typing speed with minimal effort. Modern keyboards include features like hot-swappable switches, customizable RGB lighting, and detachable wrist rests. Whether you’re a coder, writer, or office worker, the right keyboard can boost productivity, reduce strain, and improve your workflow significantly.",
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
  },
  {
    id: 3,
    title: "MUST-HAVE COMPUTER ACCESSORIES FOR 2024",
    date: "April 10, 2024",
    excerpt:
      "External SSDs, ergonomic chairs, USB hubs, and more — essential accessories to upgrade your entire setup...",
    fullContent:
      "In 2024, accessories are more important than ever for personal and professional setups. External SSDs offer blazing-fast transfer speeds perfect for photographers, developers, and creators. Adjustable laptop stands improve posture while increasing airflow. Ergonomic chairs prevent back pain during long work sessions. USB hubs and docking stations efficiently expand your connectivity. These accessories together elevate comfort, productivity, and organization, making them essential for any modern workspace.",
    image: blog3,
    category: "Accessories",
  },
  {
    id: 4,
    title: "WHY GOOD DESKTOP SPEAKERS CAN TRANSFORM YOUR SETUP",
    date: "April 14, 2024",
    excerpt:
      "Clear sound, deeper bass, and a better workspace — premium speakers enhance music, meetings, and entertainment...",
    fullContent:
      "Audio plays a huge role in your daily environment. Good desktop speakers offer clean highs, rich mids, and balanced bass, making your workspace feel more engaging. Whether you're listening to music, editing videos, attending meetings, or watching movies, sound clarity affects your overall experience. Modern speakers come with Bluetooth, subwoofer units, and wide soundstage support, turning even small desks into immersive audio zones.",
    image: blog2,
    category: "Audio",
  },
  {
    id: 5,
    title: "BEST HEADSETS FOR OFFICE WORK, CALLS & DAILY USE",
    date: "April 8, 2024",
    excerpt:
      "Comfort, audio clarity, and noise-cancelling mics — here’s what makes a great headset for meetings and daily use...",
    fullContent:
      "Communication has become central to today’s hybrid work culture. A good office headset features noise-cancelling microphones that filter out background sounds, ensuring clear conversations. Comfortable ear cushions allow long usage without discomfort. Bluetooth 5.0 and 2.4 GHz wireless provide stable connections during meetings. Some models include AI-based mic filtering and multi-device pairing. Choosing the right headset improves productivity and keeps your meetings distraction-free.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    category: "Audio",
  },
  {
    id: 6,
    title: "THE FUTURE OF COMPUTER ACCESSORIES — WHAT’S COMING NEXT?",
    date: "April 1, 2024",
    excerpt:
      "AI keyboards, smart mice, wireless charging pads — here’s what to expect from next-generation accessories...",
    fullContent:
      "Computer accessories are becoming smarter and more intuitive. AI-powered keyboards may soon predict text, adapt key sensitivity, and offer personalized shortcuts. Smart mice will adjust tracking based on your hand movement, surface, and usage style. Wireless charging pads capable of handling multiple devices simultaneously will dominate desks. Expect accessories that learn your habits, reduce physical effort, and provide seamless cross-device connectivity.",
    image: blog6,
    category: "Tech News",
  },
  {
    id: 7,
    title: "HOW TO BUILD YOUR FIRST PC — ACCESSORIES YOU REALLY NEED",
    date: "April 5, 2024",
    excerpt:
      "Before assembling your PC, here are the must-have accessories — keyboard, mouse, cables, cooling, and more...",
    fullContent:
      "Building your first PC requires more than just parts. Essential accessories like magnetic screwdrivers, anti-static wristbands, cable ties, and thermal paste ensure a clean and safe build. After assembling, you need a reliable keyboard, mouse, cooling systems, and cable-management tools to optimize performance. Proper lighting, dust filters, and maintenance kits keep your PC clean and efficient for years.",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop",
    category: "Tutorial",
  },
  {
    id: 8,
    title: "MONITOR SETTINGS THAT REDUCE EYE STRAIN & IMPROVE CLARITY",
    date: "April 3, 2024",
    excerpt:
      "Simple adjustments to brightness, contrast, and refresh rate can make your daily screen time much more comfortable...",
    fullContent:
      "Eye strain is one of the most common issues for computer users. Correcting brightness, enabling blue-light filters, and increasing contrast can significantly reduce fatigue. Higher refresh rates (120Hz–165Hz) make motion smoother, lowering stress on the eyes. Using proper viewing distance and adjusting color temperature to warmer tones during night hours helps as well. These small tweaks improve clarity and comfort for long screen sessions.",
    image: blog8,
    category: "Hardware",
  },
  {
    id: 9,
    title: "9 WAYS TO BOOST PC PERFORMANCE WITHOUT NEW PARTS",
    date: "March 28, 2024",
    excerpt:
      "Cable management, storage optimization, cleaning components — small accessories can instantly improve performance...",
    fullContent:
      "Not all performance improvements require expensive upgrades. Cleaning dust from fans and components improves cooling. Using cable ties and proper routing enhances airflow. SSD optimization tools and storage cleanup can boost boot times. Replacing thermal paste on CPUs or GPUs improves temperatures. These maintenance steps allow your PC to perform better without spending on new hardware.",
    image: blog9,
    category: "Tutorial",
  },
  {
    id: 10,
    title: "BEST BUDGET ACCESSORIES FOR WORK FROM HOME SETUPS",
    date: "March 25, 2024",
    excerpt:
      "Laptop stands, webcams, microphones, and desk mats — affordable accessories that make your home office professional...",
    fullContent:
      "A productive work-from-home setup doesn’t need to be expensive. Adjustable laptop stands improve posture, desk mats add comfort, and entry-level microphones enhance voice clarity. HD webcams improve video quality for online calls. Affordable LED desk lamps reduce eye strain during night work. These budget items make home offices more comfortable, modern, and efficient.",
    image: blog10,
    category: "Accessories",
  },
  {
    id: 11,
    title: "ARE WIRELESS MICE & KEYBOARDS RELIABLE IN 2024?",
    date: "March 22, 2024",
    excerpt:
      "Modern wireless accessories provide long battery life, strong connectivity, and lag-free performance — here’s what to know...",
    fullContent:
      "Wireless technology has improved drastically. Modern wireless keyboards and mice offer near zero-latency performance, making them suitable even for gaming. Bluetooth 5.0 and 2.4 GHz receivers ensure stable connectivity. Most devices now include weeks—or even months—of battery life. This guide explains when to choose wireless over wired and what factors affect reliability and performance.",
    image: blog11,
    category: "Hardware",
  },
  {
    id: 12,
    title: "BEST DESK ORGANIZATION ACCESSORIES FOR A CLEAN WORKSPACE",
    date: "March 20, 2024",
    excerpt:
      "Cable organizers, monitor stands, desk trays — keep your setup clean, efficient, and productivity-focused...",
    fullContent:
      "A clean workspace helps you think better and work faster. Cable clips and sleeves prevent wire tangling. Desk trays keep everyday items accessible. Monitor risers free up desk space while improving posture. Vertical laptop stands help with airflow and create a minimalistic aesthetic. These organization accessories make your workflow smoother and keep distractions away.",
    image: blog12,
    category: "Accessories",
  },
];

function BlogDetails() {
  const { id } = useParams(); // Get the post ID from the URL
  const post = blogPosts.find((p) => p.id === parseInt(id)); // Find the matching post

  if (!post) {
    return (
      <>
        <div className="x_blog_dark_theme">
          <Container className="py-5" style={{ minHeight: "100vh" }}>
            <h2 className="text-center text-white">Post Not Found 😥</h2>
            <p className="text-center">
              <Link to="/blog" className="x_read_more_link">
                Go Back to Blog
              </Link>
            </p>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="x_blog_dark_theme x_blog_details">
        <Container
          className="py-5 x_blog_dark_theme"
          style={{ minHeight: "100vh" }}
        >
          <Link to="/blog" className="x_read_more_link mb-4 d-inline-block">
            <i className="bi bi-arrow-left me-1"></i> Back to All Posts
          </Link>

          <div className="p-4 x_blog_card">
            <h1 className="display-4 fw-bold mb-4">{post.title}</h1>
            <p className="text-muted mb-4 small">
              <span
                className="x_card_category_badge"
                style={{ position: "static", marginRight: "10px" }}
              >
                {post.category}
              </span>
              Posted on {post.date}
            </p>

            <div className="mb-4">
              <img
                src={post.image}
                alt={post.title}
                className="img-fluid rounded shadow-lg"
                style={{
                  maxHeight: "500px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <p className="lead" style={{ color: "var(--text-light)" }}>
              **{post.excerpt}**
            </p>

            <hr style={{ borderColor: "var(--border-gray)" }} />

            {/* Display the new full content */}
            <p
              style={{
                color: "var(--text-light)",
                fontSize: "1.1rem",
                lineHeight: "1.8",
              }}
            >
              {/* Using a placeholder for full content or you'd fetch it from an API */}
              {post.fullContent ||
                "This is where the extended, detailed content of the blog post would go. For this example, we are using the 'fullContent' field in the data array."}
            </p>
            <p
              style={{
                color: "var(--text-light)",
                fontSize: "1.1rem",
                lineHeight: "1.8",
              }}
            >
              A detailed analysis of the graphics, sound design, and the overall
              player experience would follow here, using the dark theme's gray
              and blue accents for a modern look.
            </p>
            <p
              style={{
                color: "var(--text-light)",
                fontSize: "1.1rem",
                lineHeight: "1.8",
              }}
            >
              Explore expert guides, product reviews, and the latest updates in
              computer accessories.
            </p>
            <p
              style={{
                color: "var(--text-light)",
                fontSize: "1.1rem",
                lineHeight: "1.8",
              }}
            >
              Stay informed with hands-on testing, honest recommendations, and
              smart insights that help you upgrade your setup with confidence.
              From essential peripherals to advanced tech gear, we bring clarity
              to every purchase.
            </p>
            <p
              style={{
                color: "var(--text-light)",
                fontSize: "1.1rem",
                lineHeight: "1.8",
              }}
            >
              Your trusted source for smarter, easier, and more efficient tech
              decisions.
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}

export default BlogDetails;