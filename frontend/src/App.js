import './App.css';
import './styles/x_main.css';
import './styles/z_style.css';
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
import Showmore from './pages/Showmore';
import ComputerAccessoriesSlider from './pages/ComputerAccessoriesSlider';
import CategoryTab from './components/CategoryTab';
import MyAccount from './pages/MyAccount';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <CategoryTab />
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/home" element={<Home />} />

          <Route path="/" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/360" element={<Product360Viewer />} />
          <Route path="/showmore" element={<Showmore />} />
          <Route path="/ComputerAccessoriesSlider" element={<ComputerAccessoriesSlider />} />
          <Route path="/account" element={<MyAccount />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="*" element={<HomeMain />} />

        </Routes>
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
