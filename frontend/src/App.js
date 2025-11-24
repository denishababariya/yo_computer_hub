import './App.css';
import './styles/x_main.css';
import './styles/z_style.css';
import './styles/z_prdDetails.css';
import './styles/z_admin.css';

import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import AppFooter from './components/Footer';
import Home from './pages/Home';
import HomeMain from './pages/HomeMain';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Product360Viewer from './pages/Product360Viewer';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import ComputerAccessoriesSlider from './pages/ComputerAccessoriesSlider';
import "../src/styles/x_app.css";
import "../src/components/home/HeroSlide.css";
import CategoryTab from './components/CategoryTab';
import MyAccount from './pages/MyAccount';
import AboutUs from './pages/AboutUs';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import HelpCenter from './pages/HelpCenter';
import BlogDetails from './pages/BlogDetails';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <CategoryTab />
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/360" element={<Product360Viewer />} />
          <Route path="/term" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/ComputerAccessoriesSlider" element={<ComputerAccessoriesSlider />} />
          <Route path="/account" element={<MyAccount />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="*" element={<HomeMain />} />

        </Routes>
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
