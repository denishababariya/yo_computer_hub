# Admin Panel Documentation

## Overview
A fully responsive admin panel for managing products, users, orders, contacts, and categories with a modern dark theme design.

## Features

### 1. Dashboard
- **Statistics Overview**: Display total products, users, orders, contacts, and revenue
- **Recent Orders**: Shows 5 most recent orders with status
- **Recent Products**: Shows 5 most recently added products
- **Real-time Data**: All stats update in real-time from MongoDB

### 2. Products Management
- **View All Products**: Paginated list with search functionality
- **Create Products**: Add new products with name, description, price, category, stock, and image
- **Edit Products**: Modify existing product details
- **Delete Products**: Remove products from inventory
- **Search**: Real-time search by product name
- **Pagination**: Navigate through product pages

### 3. Users Management
- **View All Users**: Paginated list of registered users
- **Search Users**: Find users by name or email
- **View User Details**: Click to see detailed user information
- **Delete Users**: Remove user accounts
- **User Info**: Display name, email, phone, and join date

### 4. Orders Management
- **View All Orders**: Paginated list of all orders
- **Filter by Status**: Filter orders by pending, processing, shipped, delivered, or cancelled
- **Update Order Status**: Change order status with dropdown
- **Order Details**: View order ID, user, amount, status, and date
- **Real-time Updates**: Status changes reflect immediately

### 5. Contacts Management
- **View All Contacts**: Paginated list of contact form submissions
- **Filter by Status**: Filter by new, read, or replied
- **Update Contact Status**: Mark contacts as read or replied
- **Delete Contacts**: Remove contact submissions
- **Contact Info**: Display name, email, company, status, and date

### 6. Categories Management
- **View All Categories**: List all product categories
- **Create Categories**: Add new categories with name, description, and icon
- **Edit Categories**: Modify category details
- **Delete Categories**: Remove categories
- **Category Icons**: Support for emoji or text icons

## File Structure

### Backend Files
```
backend/
├── controller/
│   └── adminController.js      # Admin business logic
├── route/
│   └── adminRoutes.js          # Admin API routes
└── server.js                   # Updated with admin routes
```

### Frontend Files
```
frontend/src/
├── pages/
│   ├── AdminDashboard.js       # Main admin page
│   ├── AdminProducts.js        # Products management
│   ├── AdminUsers.js           # Users management
│   ├── AdminOrders.js          # Orders management
│   ├── AdminContacts.js        # Contacts management
│   └── AdminCategories.js      # Categories management
├── services/
│   └── adminAPI.js             # API service for admin
├── styles/
│   └── z_admin.css             # Admin panel styles
└── App.js                      # Updated with admin route
```

## API Endpoints

### Dashboard
- `GET /api/admin/dashboard` - Get dashboard statistics

### Products
- `GET /api/admin/products?page=1&limit=10&search=` - Get all products
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Users
- `GET /api/admin/users?page=1&limit=10&search=` - Get all users
- `DELETE /api/admin/users/:id` - Delete user

### Orders
- `GET /api/admin/orders?page=1&limit=10&status=` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status

### Contacts
- `GET /api/admin/contacts?page=1&limit=10&status=` - Get all contacts
- `PUT /api/admin/contacts/:id/status` - Update contact status
- `DELETE /api/admin/contacts/:id` - Delete contact

### Categories
- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category

## CSS Classes

All admin panel classes follow the naming convention: `z_admin_*`

### Main Classes
- `.z_admin_container` - Main container
- `.z_admin_wrapper` - Content wrapper
- `.z_admin_header` - Header section
- `.z_admin_nav_tabs` - Navigation tabs
- `.z_admin_nav_tab` - Individual tab
- `.z_admin_stats_grid` - Statistics grid
- `.z_admin_stat_card` - Stat card
- `.z_admin_table_wrapper` - Table wrapper
- `.z_admin_table` - Table element
- `.z_admin_form` - Form container
- `.z_admin_btn` - Button element
- `.z_admin_status_badge` - Status badge

### Button Classes
- `.z_admin_btn_primary` - Primary button (cyan)
- `.z_admin_btn_secondary` - Secondary button
- `.z_admin_btn_danger` - Danger button (red)
- `.z_admin_btn_success` - Success button (green)
- `.z_admin_btn_warning` - Warning button (orange)

### Status Badge Classes
- `.z_admin_status_new` - New status
- `.z_admin_status_pending` - Pending status
- `.z_admin_status_processing` - Processing status
- `.z_admin_status_completed` - Completed status
- `.z_admin_status_shipped` - Shipped status
- `.z_admin_status_delivered` - Delivered status
- `.z_admin_status_cancelled` - Cancelled status
- `.z_admin_status_read` - Read status
- `.z_admin_status_replied` - Replied status

## Responsive Design

### Breakpoints
- **Desktop** (1025px+): Full layout with all features
- **Tablet** (768px - 1024px): Adjusted layout, stacked forms
- **Mobile** (480px - 767px): Single column, mobile-optimized buttons
- **Small Mobile** (<480px): Minimal layout, touch-friendly

### Mobile Features
- Responsive tables with horizontal scroll
- Stacked form inputs
- Touch-friendly buttons
- Optimized spacing and padding
- Flexible grid layouts

## Usage

### Accessing Admin Panel
1. Navigate to `http://localhost:3000/admin`
2. Admin panel loads with dashboard tab active
3. Click tabs to switch between sections

### Adding a Product
1. Click "Products" tab
2. Click "+ Add Product" button
3. Fill in product details
4. Click "✓ Create Product"
5. Product appears in the list

### Updating Order Status
1. Click "Orders" tab
2. Select status filter if needed
3. Use dropdown in "Action" column to change status
4. Status updates immediately

### Managing Contacts
1. Click "Contacts" tab
2. Filter by status if needed
3. Update status using dropdown
4. Delete contacts using delete button

## Color Scheme

- **Background**: Dark gradient (#0f0f0f to #1a1a1a)
- **Primary Color**: Cyan (#00d4ff)
- **Secondary**: Light gray (#a9a9a9)
- **Success**: Green (#00cc44)
- **Danger**: Red (#ff4444)
- **Warning**: Orange (#ffaa00)
- **Border**: Dark gray (#333)

## Features Highlights

✅ **Fully Responsive** - Works on all screen sizes
✅ **Dark Theme** - Modern, eye-friendly design
✅ **Real-time Updates** - Instant data refresh
✅ **Pagination** - Efficient data loading
✅ **Search & Filter** - Quick data lookup
✅ **Status Management** - Easy status updates
✅ **CRUD Operations** - Full data management
✅ **Error Handling** - User-friendly error messages
✅ **Loading States** - Visual feedback during operations
✅ **Empty States** - Clear messaging when no data

## Future Enhancements

- User authentication for admin access
- Admin user roles and permissions
- Advanced analytics and charts
- Bulk operations (delete multiple items)
- Export data to CSV/Excel
- Email notifications
- Audit logs
- Product image upload
- Advanced search filters
- Dashboard widgets customization

## Troubleshooting

### Admin panel not loading
- Check if backend server is running on port 9000
- Verify MongoDB connection
- Check browser console for errors

### Data not updating
- Ensure API endpoints are correct
- Check network tab in browser DevTools
- Verify MongoDB data exists

### Styling issues
- Clear browser cache
- Ensure z_admin.css is imported in App.js
- Check for CSS conflicts

## Support

For issues or questions, check the backend logs and browser console for detailed error messages.
