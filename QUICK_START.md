# MyAccount Integration - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Start Backend
```bash
cd backend
npm install
npm start
# Backend runs on http://localhost:9000
```

### Step 2: Start Frontend
```bash
cd frontend
npm install
npm start
# Frontend runs on http://localhost:3000
```

### Step 3: Login User
1. Register a new user or login with existing account
2. userId is automatically stored in localStorage

### Step 4: Navigate to MyAccount
1. Click on user profile/account menu
2. Navigate to MyAccount page
3. Data loads automatically from backend

---

## 📋 What Works

### Profile Tab
- ✅ View profile information
- ✅ Edit profile (name, phone, dob, gender)
- ✅ Upload avatar
- ✅ Changes persist to database

### Orders Tab
- ✅ View order history
- ✅ See order details (ID, date, status, items, total)
- ✅ Formatted order display

### Address Book Tab
- ✅ View all saved addresses
- ✅ Add new address
- ✅ Edit existing address
- ✅ Delete address
- ✅ Real-time updates

---

## 🔌 API Endpoints

### Get All User Data
```
GET http://localhost:9000/api/users/account/{userId}
```

### Profile
```
GET    http://localhost:9000/api/users/profile/{userId}
PUT    http://localhost:9000/api/users/profile/{userId}
```

### Addresses
```
GET    http://localhost:9000/api/users/addresses/{userId}
POST   http://localhost:9000/api/users/addresses/{userId}
PUT    http://localhost:9000/api/users/addresses/{userId}/{addressId}
DELETE http://localhost:9000/api/users/addresses/{userId}/{addressId}
```

### Orders
```
GET http://localhost:9000/api/users/orders/{userId}
```

---

## 🛠️ Key Files

### Backend
- `backend/model/User.js` - User schema with addresses
- `backend/controller/userController.js` - API logic
- `backend/route/userRoutes.js` - API endpoints
- `backend/server.js` - Server configuration

### Frontend
- `frontend/src/services/userAPI.js` - API client
- `frontend/src/pages/MyAccount.js` - Main component

---

## 📝 Usage Examples

### Fetch User Data
```javascript
import { userAPI } from '../services/userAPI';

const userId = localStorage.getItem('userId');
const response = await userAPI.getCompleteAccountData(userId);
console.log(response.data.profile);
console.log(response.data.orders);
console.log(response.data.addresses);
```

### Update Profile
```javascript
const updatedData = {
  name: 'New Name',
  phone: '+91 98765 43210',
  dob: '1998-05-12',
  gender: 'Male'
};
const response = await userAPI.updateProfile(userId, updatedData);
```

### Add Address
```javascript
const addressData = {
  name: 'Home',
  address: '203, Sunrise Avenue, Ahmedabad',
  phone: '+91 98765 43210'
};
const response = await userAPI.addAddress(userId, addressData);
```

### Delete Address
```javascript
const response = await userAPI.deleteAddress(userId, addressId);
```

---

## ⚠️ Troubleshooting

### Issue: "userId not found"
**Solution**: Make sure you're logged in. userId is stored in localStorage during login.

### Issue: "Cannot connect to backend"
**Solution**: 
1. Check if backend is running on port 9000
2. Verify MongoDB is connected
3. Check CORS configuration

### Issue: "Data not loading"
**Solution**:
1. Open browser console (F12)
2. Check for error messages
3. Verify userId is in localStorage
4. Check backend logs

### Issue: "Address not saving"
**Solution**:
1. Verify all fields are filled
2. Check browser console for errors
3. Verify backend is running
4. Check MongoDB connection

---

## 🧪 Quick Test

### Test Profile Update
1. Go to MyAccount → Profile tab
2. Click "Edit Profile"
3. Change name to "Test User"
4. Click "Save"
5. Should see success alert
6. Refresh page - name should persist

### Test Add Address
1. Go to MyAccount → Address Book tab
2. Click "Add New Address"
3. Fill in: Name: "Test", Address: "123 Test St", Phone: "9999999999"
4. Click "Add Address"
5. Should see success alert
6. Address appears in list

### Test Delete Address
1. Click "Delete" on any address
2. Should see success alert
3. Address removed from list

---

## 📊 Data Flow

```
User Login
    ↓
userId stored in localStorage
    ↓
Navigate to MyAccount
    ↓
useEffect triggers
    ↓
fetchUserData() called
    ↓
API: GET /api/users/account/{userId}
    ↓
Backend fetches profile, orders, addresses
    ↓
Response returned
    ↓
State updated (profile, orders, addresses)
    ↓
UI renders with data
```

---

## 🔐 Security Notes

- userId stored in localStorage (not sensitive)
- Passwords never sent to frontend
- All data validated on backend
- CORS configured for localhost
- MongoDB injection prevention in place

---

## 📱 Responsive Design

Works on:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (375px - 767px)

---

## 🎯 Next Steps

1. **Test all features** using the Quick Test section
2. **Read** MYACCOUNT_INTEGRATION_GUIDE.md for detailed info
3. **Run** TESTING_MYACCOUNT.md for comprehensive testing
4. **Deploy** when ready

---

## 📞 Support

### Documentation
- `MYACCOUNT_INTEGRATION_GUIDE.md` - Full architecture
- `TESTING_MYACCOUNT.md` - Testing checklist
- `IMPLEMENTATION_SUMMARY.md` - Complete overview

### Code Files
- Backend: `backend/controller/userController.js`
- Frontend: `frontend/src/pages/MyAccount.js`
- API Service: `frontend/src/services/userAPI.js`

---

## ✅ Checklist

- [ ] Backend running on port 9000
- [ ] Frontend running on port 3000
- [ ] User logged in
- [ ] userId in localStorage
- [ ] MyAccount page loads
- [ ] Profile data displays
- [ ] Can edit profile
- [ ] Can add address
- [ ] Can delete address
- [ ] Can view orders

**All checked? You're ready to go! 🎉**
