# Authentication Quick Reference

## 🔐 Login Flow

### User Action
1. Navigate to `/login`
2. Enter email and password
3. Click "Login" button

### Code Flow
```
Login.js handleSubmit()
  ↓
authAPI.login(formData)
  ↓
Backend validates credentials
  ↓
Returns token + user data
  ↓
setToken() → localStorage.token
setUser() → localStorage.user
localStorage.userId = user.id
  ↓
navigate('/') → Home page
```

### localStorage After Login
```javascript
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: '{"id":"123","name":"Jay","email":"jay@example.com"}',
  userId: "123"
}
```

---

## 🚪 Logout Flow - Option 1 (Navbar)

### User Action
1. Click profile icon (top-right)
2. Click "Logout" button

### Code Flow
```
Navbar.js handleLogout()
  ↓
authAPI.logout() → Backend
  ↓
logoutAuth() → Clear localStorage
  ↓
navigate('/login') → Login page
```

---

## 🚪 Logout Flow - Option 2 (MyAccount)

### User Action
1. Go to MyAccount page
2. Click "LOG OUT" in sidebar
3. Click "Logout" in confirmation modal

### Code Flow
```
MyAccount.js logout button
  ↓
Confirmation modal appears
  ↓
User confirms logout
  ↓
authAPI.logout() → Backend
  ↓
logoutAuth() → Clear localStorage
  ↓
navigate('/login') → Login page
```

---

## 📁 Files Modified

### Backend
- `backend/route/authRoutes.js` - Added logout endpoint

### Frontend
- `frontend/src/services/api.js` - Added logout API
- `frontend/src/pages/Login.js` - Added userId storage
- `frontend/src/components/Navbar.js` - Added logout handler
- `frontend/src/pages/MyAccount.js` - Added logout handler

---

## 🔧 Key Functions

### Auth Utils
```javascript
import { logout, setToken, setUser } from '../utils/auth';

// Login
setToken(token);
setUser(user);
localStorage.setItem('userId', user.id);

// Logout
logout(); // Clears token, user, userId
```

### API Calls
```javascript
import { authAPI } from '../services/api';

// Login
const response = await authAPI.login({ email, password });

// Logout
await authAPI.logout();
```

---

## ✅ Testing Steps

### Test Login
1. Go to `/login`
2. Enter: `test@example.com` / `password123`
3. Click "Login"
4. Should redirect to home
5. Check localStorage for token, user, userId

### Test Logout (Navbar)
1. Click profile icon (top-right)
2. Click "Logout"
3. Should redirect to login
4. Check localStorage is empty

### Test Logout (MyAccount)
1. Go to `/account`
2. Click "LOG OUT" in sidebar
3. Click "Logout" in modal
4. Should redirect to login
5. Check localStorage is empty

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Login not working | Check backend is running on port 9000 |
| Logout not working | Check browser console for errors |
| Still logged in after logout | Clear browser cache and localStorage |
| userId not found in MyAccount | Ensure userId is stored during login |
| Redirect not working | Check React Router setup |

---

## 📊 API Endpoints

### Login
```
POST http://localhost:9000/api/auth/login
Body: { "email": "user@example.com", "password": "pass123" }
Response: { "success": true, "token": "...", "user": {...} }
```

### Logout
```
POST http://localhost:9000/api/auth/logout
Headers: { "Authorization": "Bearer token_here" }
Response: { "success": true, "message": "Logout successful" }
```

---

## 🔒 Security Notes

- ✅ Token stored in localStorage (can use httpOnly cookies)
- ✅ Password hashed with bcrypt
- ✅ JWT expires in 7 days
- ✅ Token included in Authorization header
- ✅ Auto-logout on 401 Unauthorized

---

## 📝 localStorage Keys

| Key | Value | Cleared On |
|-----|-------|-----------|
| `token` | JWT token | Logout |
| `user` | User object (JSON) | Logout |
| `userId` | User ID string | Logout |

---

## 🎯 Next Steps

1. ✅ Backend logout endpoint created
2. ✅ Frontend logout API added
3. ✅ Navbar logout implemented
4. ✅ MyAccount logout implemented
5. ✅ Login stores userId
6. Test all flows
7. Deploy to production

---

**Version**: 1.0.0
**Last Updated**: November 19, 2025
