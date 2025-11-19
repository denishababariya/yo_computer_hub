# MyAccount Backend & Frontend Integration Guide

## Overview
This document explains the complete integration of the MyAccount page with backend APIs for user profile management, order history, and address book functionality.

---

## Backend Setup

### 1. Updated User Model (`backend/model/User.js`)
Extended the User schema to include:
- **Profile Fields**: `dob`, `gender`, `avatar`
- **Address Book**: Embedded `addresses` array with schema containing `name`, `address`, `phone`, `isDefault`

```javascript
const addressSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  isDefault: Boolean,
  createdAt: Date
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  dob: String,
  gender: String,
  avatar: String,
  addresses: [addressSchema],
  // ... other fields
});
```

### 2. New User Controller (`backend/controller/userController.js`)
Provides CRUD operations for:
- **Profile**: `getUserProfile()`, `updateUserProfile()`
- **Orders**: `getUserOrders()`
- **Addresses**: `getUserAddresses()`, `addAddress()`, `updateAddress()`, `deleteAddress()`
- **Complete Data**: `getCompleteAccountData()` - fetches all user data in one call

### 3. New User Routes (`backend/route/userRoutes.js`)
Endpoints:
```
GET    /api/users/profile/:userId           - Get user profile
PUT    /api/users/profile/:userId           - Update user profile
GET    /api/users/orders/:userId            - Get user orders
GET    /api/users/addresses/:userId         - Get all addresses
POST   /api/users/addresses/:userId         - Add new address
PUT    /api/users/addresses/:userId/:addressId - Update address
DELETE /api/users/addresses/:userId/:addressId - Delete address
GET    /api/users/account/:userId           - Get complete account data
```

### 4. Server Registration (`backend/server.js`)
User routes registered at `/api/users` path:
```javascript
const userRoutes = require('./route/userRoutes');
app.use('/api/users', userRoutes);
```

---

## Frontend Setup

### 1. API Service (`frontend/src/services/userAPI.js`)
Provides fetch wrapper functions for all backend endpoints:
- `getProfile(userId)`
- `updateProfile(userId, profileData)`
- `getOrders(userId)`
- `getAddresses(userId)`
- `addAddress(userId, addressData)`
- `updateAddress(userId, addressId, addressData)`
- `deleteAddress(userId, addressId)`
- `getCompleteAccountData(userId)`

### 2. MyAccount Component (`frontend/src/pages/MyAccount.js`)
Updated to:
- Fetch user data on component mount using `useEffect`
- Get `userId` from `localStorage` (set during login)
- Call `userAPI.getCompleteAccountData()` to fetch profile, orders, and addresses
- Update profile with `userAPI.updateProfile()`
- Manage addresses with add/edit/delete operations
- Display fetched data instead of dummy data

#### Key State Variables:
```javascript
const [profile, setProfile] = useState(initialProfile);
const [editProfile, setEditProfile] = useState(initialProfile);
const [orders, setOrders] = useState([]);
const [addresses, setAddresses] = useState([]);
const [loading, setLoading] = useState(false);
const userId = localStorage.getItem('userId') || 'demo-user-id';
```

#### Key Functions:
- `fetchUserData()` - Fetches all user data on mount
- `handleEditSave()` - Updates profile via API
- `handleSaveAddress()` - Adds or updates address via API
- `handleDeleteAddress()` - Deletes address via API

---

## Data Flow

### 1. Profile Tab
```
Component Mount
    ↓
useEffect calls fetchUserData()
    ↓
userAPI.getCompleteAccountData(userId)
    ↓
Backend returns { profile, orders, addresses }
    ↓
setProfile() updates state
    ↓
UI renders profile data
```

### 2. Edit Profile
```
User clicks "Edit Profile"
    ↓
Modal opens with form
    ↓
User changes fields
    ↓
handleEditChange() updates editProfile state
    ↓
User clicks "Save"
    ↓
handleEditSave() calls userAPI.updateProfile()
    ↓
Backend updates user in MongoDB
    ↓
Response updates profile state
    ↓
UI refreshes with new data
```

### 3. Address Management
```
User clicks "Add New Address"
    ↓
Modal opens with empty form
    ↓
User fills address details
    ↓
handleSaveAddress() calls userAPI.addAddress()
    ↓
Backend adds address to user.addresses array
    ↓
Response returns updated addresses array
    ↓
setAddresses() updates state
    ↓
UI renders new address in list
```

---

## API Response Format

### Get Complete Account Data
```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "user_id",
      "name": "Jay Patel",
      "email": "jay@example.com",
      "phone": "+91 98765 43210",
      "dob": "1998-05-12",
      "gender": "Male",
      "avatar": "https://...",
      "address": "203, Sunrise Avenue"
    },
    "orders": [
      {
        "id": "ORD123456",
        "date": "2024-05-01",
        "status": "Delivered",
        "items": [
          {
            "name": "HP Laptop",
            "price": "₹45,000",
            "image": "https://..."
          }
        ],
        "total": "₹52,000"
      }
    ],
    "addresses": [
      {
        "_id": "addr_id",
        "name": "Home",
        "address": "203, Sunrise Avenue",
        "phone": "+91 98765 43210",
        "isDefault": true
      }
    ]
  }
}
```

---

## Setup Instructions

### Backend
1. Ensure MongoDB is running
2. Update `.env` with `MONGO_URL` and `JWT_SECRET`
3. Run `npm install` in backend folder
4. Start server: `npm start` (runs on port 9000)

### Frontend
1. Ensure backend is running on `http://localhost:9000`
2. Update auth routes to store `userId` in localStorage on login:
   ```javascript
   localStorage.setItem('userId', user.id);
   ```
3. Run frontend: `npm start` (runs on port 3000)

### Testing
1. Register/Login a user
2. Navigate to MyAccount page
3. Verify profile data loads
4. Test edit profile functionality
5. Test add/edit/delete address operations
6. Check orders display

---

## Error Handling
All API calls include try-catch blocks with:
- Console error logging
- User-friendly alert messages
- Loading state management

---

## Future Enhancements
- Add image upload for avatar
- Implement pagination for orders
- Add order tracking/details view
- Add address validation
- Implement default address selection
- Add profile picture upload to cloud storage

---

## File References
- Backend Model: `backend/model/User.js`
- Backend Controller: `backend/controller/userController.js`
- Backend Routes: `backend/route/userRoutes.js`
- Backend Server: `backend/server.js`
- Frontend API Service: `frontend/src/services/userAPI.js`
- Frontend Component: `frontend/src/pages/MyAccount.js`
