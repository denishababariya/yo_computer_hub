import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAPI from '../services/adminAPI';
import '../styles/z_admin.css';
import AdminProducts from './AdminProducts';
import AdminUsers from './AdminUsers';
import AdminOrders from './AdminOrders';
import AdminContacts from './AdminContacts';
import AdminCategories from './AdminCategories';
import { FaUsers } from 'react-icons/fa6';
import { AiFillDashboard } from "react-icons/ai";
import { RiContactsBook3Fill } from "react-icons/ri";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { AiFillProduct } from "react-icons/ai";
import { GiCash } from "react-icons/gi";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardStats();
    }
  }, [activeTab]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getDashboardStats();
      setDashboardStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      if (error.status === 401 || error.status === 403) {
        alert('Your session expired or you lack admin access. Please login again.');
        navigate('/login');
        return;
      }
      alert('Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z_admin_container">
      <div className="z_admin_wrapper">
        {/* Header */}
        <div className="z_admin_header">
          <h1 className="z_admin_title">Admin Dashboard</h1>
          <div className="z_admin_breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Admin</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="z_admin_nav_tabs">
          <button
            className={`z_admin_nav_tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <AiFillDashboard /> Dashboard
          </button>
          <button
            className={`z_admin_nav_tab ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <BiSolidCategoryAlt /> Categories
          </button>
          <button
            className={`z_admin_nav_tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <AiFillProduct /> Products
          </button>
          <button
            className={`z_admin_nav_tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers /> Users
          </button>
          <button
            className={`z_admin_nav_tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <AiFillSafetyCertificate /> Orders
          </button>
          <button
            className={`z_admin_nav_tab ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            <RiContactsBook3Fill /> Contacts
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <DashboardTab stats={dashboardStats} loading={loading} />
        )}

        {/* Products Tab */}
        {activeTab === 'products' && <AdminProducts />}

        {/* Users Tab */}
        {activeTab === 'users' && <AdminUsers />}

        {/* Orders Tab */}
        {activeTab === 'orders' && <AdminOrders />}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && <AdminContacts />}

        {/* Categories Tab */}
        {activeTab === 'categories' && <AdminCategories />}
      </div>
    </div>
  );
};

// Dashboard Tab Component
const DashboardTab = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="z_admin_empty_state">
        <div className="z_admin_spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="z_admin_empty_state">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Grid */}
      <div className="z_admin_stats_grid">

        {/* Total Products */}
        <div className="z_admin_stat_card">
          <div className="z_admin_stat_top">
            <div className="z_admin_stat_icon text-light"><AiFillProduct /></div>
            <div className="z_admin_stat_label">Total Products</div>
          </div>
          <h3 className="z_admin_stat_value">{stats.totalProducts}</h3>
        </div>

        {/* Total Users */}
        <div className="z_admin_stat_card">
          <div className="z_admin_stat_top">
            <div className="z_admin_stat_icon text-light"><FaUsers /></div>
            <div className="z_admin_stat_label">Total Users</div>
          </div>
          <h3 className="z_admin_stat_value">{stats.totalUsers}</h3>
        </div>

        {/* Total Orders */}
        <div className="z_admin_stat_card">
          <div className="z_admin_stat_top">
            <div className="z_admin_stat_icon text-light"><AiFillSafetyCertificate /></div>
            <div className="z_admin_stat_label">Total Orders</div>
          </div>
          <h3 className="z_admin_stat_value">{stats.totalOrders}</h3>
        </div>

        {/* Total Contacts */}
        <div className="z_admin_stat_card">
          <div className="z_admin_stat_top">
            <div className="z_admin_stat_icon text-light"><RiContactsBook3Fill /></div>
            <div className="z_admin_stat_label">Total Contacts</div>
          </div>
          <h3 className="z_admin_stat_value">{stats.totalContacts}</h3>
        </div>

        {/* Total Revenue */}
        <div className="z_admin_stat_card">
          <div className="z_admin_stat_top">
            <div className="z_admin_stat_icon text-light"><GiCash /></div>
            <div className="z_admin_stat_label">Total Revenue</div>
          </div>
          <h3 className="z_admin_stat_value">
            ₹{stats.totalRevenue.toLocaleString()}
          </h3>
        </div>

      </div>


      {/* Recent Orders */}
      <div className="z_admin_table_wrapper">
        <div className="z_admin_table_header">
          <h3 className="z_admin_table_title">Recent Orders</h3>
        </div>
        {stats.recentOrders && stats.recentOrders.length > 0 ? (
          <table className="z_admin_table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 8)}</td>
                  <td>{order.userId}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    <span className={`z_admin_status_badge z_admin_status_${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="z_admin_empty_state">
            <p>No recent orders</p>
          </div>
        )}
      </div>

      {/* Recent Products */}
      <div className="z_admin_table_wrapper">
        <div className="z_admin_table_header">
          <h3 className="z_admin_table_title">Recent Products</h3>
        </div>
        {stats.recentProducts && stats.recentProducts.length > 0 ? (
          <table className="z_admin_table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="z_admin_empty_state">
            <p>No recent products</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
