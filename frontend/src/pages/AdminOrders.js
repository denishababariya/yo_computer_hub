import React, { useState, useEffect } from "react";
import adminAPI from "../services/adminAPI";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import DModal from "../components/DModal";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("update");
  const [modalMessage, setModalMessage] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAllOrders();
      const list = data.orders || [];
      setOrders(list);
      setTotalPages(Math.ceil(list.length / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FRONTEND FILTER
  const filteredOrders = statusFilter
    ? orders.filter((o) => o.orderStatus === statusFilter)
    : orders;

  // ✅ PAGINATION AFTER FILTER
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
    setTotalPages(Math.ceil(filteredOrders.length / ITEMS_PER_PAGE));
  }, [statusFilter, orders]);

  // ✅ OPEN CONFIRMATION MODAL ON CHANGE
  const handleStatusSelect = (orderId, newStatus) => {
    setSelectedOrder(orderId);
    setSelectedStatus(newStatus);
    setModalType("update");
    setModalMessage("Are you sure you want to update this order status?");
    setShowModal(true);
  };

  // ✅ CONFIRM UPDATE
  const confirmUpdate = async () => {
    try {
      await adminAPI.updateOrderStatus(selectedOrder, selectedStatus);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === selectedOrder
            ? { ...order, orderStatus: selectedStatus }
            : order
        )
      );

      setModalType("success");
      setModalMessage("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      setShowModal(false);
    }
  };

  return (
    <div className="z_admin_table_wrapper">
      <div className="z_admin_table_header">
        <h3 className="z_admin_table_title">Orders Management</h3>

        <select
          className="z_admin_form_select"
          style={{ width: "200px" }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="z_admin_empty_state">
          <div className="z_admin_spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : paginatedOrders.length > 0 ? (
        <>
          <table className="z_admin_table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Change Status</th>
              </tr>
            </thead>

            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 8)}</td>
                  <td>{order.userId}</td>
                  <td>₹{order.totalAmount}</td>

                  <td>
                    <span
                      className={`z_admin_status_badge z_admin_status_${order.orderStatus}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <select
                      className="z_admin_form_select"
                      style={{ width: "150px" }}
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusSelect(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="z_admin_pagination">
            <button
              className="z_admin_pagination_btn"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <FaChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`z_admin_pagination_btn ${
                  p === page ? "active" : ""
                }`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}

            <button
              className="z_admin_pagination_btn"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      ) : (
        <div className="z_admin_empty_state">
          <p>No orders found</p>
        </div>
      )}

      {/* ✅ MODAL */}
      <DModal
        show={showModal}
        type={modalType}
        title={modalType === "success" ? "Success" : "Confirm Update"}
        message={modalMessage}
        onClose={() => setShowModal(false)}
        onConfirm={modalType === "update" ? confirmUpdate : () => setShowModal(false)}
      />
    </div>
  );
};

export default AdminOrders;
