# Login & Logout Functionality Guide

## Overview
Complete authentication flow with login and logout functionality integrated across the application.

---

## Backend Implementation

### Logout Endpoint
**File**: `backend/route/authRoutes.js`

```javascript
// Logout
router.post('/logout', async (req, res) => {
  try {
    // Logout is primarily handled on frontend by removing token
    // Backend just confirms the logout action
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

**Endpoint**: `POST /api/auth/logout`

---

## Frontend Implementation

### 1. Auth Utilities (`frontend/src/utils/auth.js`)

Functions for managing authentication state:

```javascript
// Store token
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Store user data
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Get user data
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Remove user data
export const removeUser = () => {
  localStorage.removeItem('user');
};

// Complete logout
export const logout = () => {
  removeToken();
  removeUser();
};

// Check if authenticated
export const isAuthenticated = () => {
  return !!getToken();
};
```

### 2. API Service (`frontend/src/services/api.js`)

Added logout API:

```javascript
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout', {}),  // NEW
  getProfile: (userId) => api.get(`/auth/profile/${userId}`),
  updateProfile: (userId, data) => api.put(`/auth/profile/${userId}`, data)
};
```

### 3. Login Page (`frontend/src/pages/Login.js`)

Login functionality with userId storage:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await authAPI.login(formData);
    if (response.success) {
      setToken(response.token);
      setUser(response.user);
      // Store userId for MyAccount page
      localStorage.setItem('userId', response.user.id);
      navigate('/');
      window.location.reload();
    } else {
      setError(response.message || 'Login failed');
    }
  } catch (err) {
    setError(err.message || 'Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

**Key Features**:
- Email and password validation
- Error handling with user alerts
- Loading state during login
- Stores token, user data, and userId
- Redirects to home page on success

### 4. Navbar Component (`frontend/src/components/Navbar.js`)

Logout button in profile dropdown:

```javascript
const handleLogout = async () => {
  try {
    // Call logout API
    await authAPI.logout();
    
    // Clear local auth data
    logoutAuth();
    
    // Close dropdown
    setShowProfileDropdown(false);
    
    // Redirect to login
    navigate('/login');
  } catch (error) {
    console.error('Logout error:', error);
    // Even if API fails, clear local data and redirect
    logoutAuth();
    navigate('/login');
  }
};
```

**Features**:
- Calls backend logout API
- Clears all local storage data
- Closes profile dropdown
- Redirects to login page
- Handles API failures gracefully

### 5. MyAccount Component (`frontend/src/pages/MyAccount.js`)

Logout button in account navigation:

```javascript
{showLogout && (
  <div className="z_logout_modal_bg">
    <div className="z_logout_modal">
      <div className="z_logout_modal_title">Are you sure you want to logout?</div>
      <div className="z_logout_modal_actions">
        <button 
          className="z_logout_btn z_logout_confirm" 
          onClick={async () => {
            try {
              // Call logout API
              await authAPI.logout();
              
              // Clear local auth data
              logoutAuth();
              
              // Redirect to login
              navigate('/login');
            } catch (error) {
              console.error('Logout error:', error);
              // Even if API fails, clear local data and redirect
              logoutAuth();
              navigate('/login');
            }
          }}
        >
          Logout
        </button>
        <button className="z_logout_btn z_logout_cancel" onClick={() => setShowLogout(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}
```

**Features**:
- Confirmation modal before logout
- Calls backend logout API
- Clears all authentication data
- Redirects to login page
- Graceful error handling

---

## Data Flow

### Login Flow
```
User enters email & password
    ↓
Click "Login" button
    ↓
handleSubmit() validates form
    ↓
authAPI.login(formData) calls backend
    ↓
Backend validates credentials
    ↓
Backend returns token and user data
    ↓
setToken() stores token in localStorage
    ↓
setUser() stores user data in localStorage
    ↓
localStorage.setItem('userId', user.id)
    ↓
navigate('/') redirects to home
    ↓
window.location.reload() refreshes page
```

### Logout Flow (Navbar)
```
User clicks profile icon
    ↓
Profile dropdown opens
    ↓
User clicks "Logout"
    ↓
handleLogout() executes
    ↓
authAPI.logout() calls backend
    ↓
Backend confirms logout
    ↓
logoutAuth() clears localStorage
    ↓
navigate('/login') redirects to login
```

### Logout Flow (MyAccount)
```
User clicks "LOG OUT" in sidebar
    ↓
Confirmation modal appears
    ↓
User clicks "Logout" button
    ↓
handleLogout() executes
    ↓
authAPI.logout() calls backend
    ↓
Backend confirms logout
    ↓
logoutAuth() clears localStorage
    ↓
navigate('/login') redirects to login
```

---

## localStorage Structure

### After Login
```javascript
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    id: "user_id_123",
    name: "Jay Patel",
    email: "jay@example.com"
  },
  userId: "user_id_123"
}
```

### After Logout
```javascript
{
  // All items removed
}
```

---

## API Endpoints

### Login
```
POST /api/auth/login
Body: {
  "email": "user@example.com",
  "password": "password123"
}

Response: {
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

### Logout
```
POST /api/auth/logout
Headers: {
  "Authorization": "Bearer jwt_token_here"
}

Response: {
  "success": true,
  "message": "Logout successful"
}
```

---

## Error Handling

### Login Errors
- **Missing fields**: "Please provide email and password"
- **Invalid credentials**: "Invalid credentials"
- **User not found**: "Invalid credentials"
- **Server error**: "Login failed. Please try again."

### Logout Errors
- **API failure**: Clears local data anyway and redirects
- **Network error**: Gracefully handles and redirects
- **Token expired**: Auto-redirects to login

---

## Security Features

### Frontend
- Token stored in localStorage (can be enhanced with httpOnly cookies)
- User data stored as JSON string
- Token included in Authorization header for API calls
- Auto-logout on 401 Unauthorized response

### Backend
- JWT token with 7-day expiration
- Password hashing with bcrypt
- Input validation on all endpoints
- Secure token generation

---

## Testing Checklist

### Login Testing
- [ ] Register new user
- [ ] Login with correct credentials
- [ ] Verify token stored in localStorage
- [ ] Verify userId stored in localStorage
- [ ] Verify redirect to home page
- [ ] Try login with wrong password
- [ ] Try login with non-existent email
- [ ] Verify error messages display

### Logout Testing (Navbar)
- [ ] Click profile icon
- [ ] Click "Logout" button
- [ ] Verify logout API called
- [ ] Verify localStorage cleared
- [ ] Verify redirect to login page
- [ ] Verify token removed
- [ ] Verify user data removed

### Logout Testing (MyAccount)
- [ ] Navigate to MyAccount
- [ ] Click "LOG OUT" in sidebar
- [ ] Verify confirmation modal appears
- [ ] Click "Logout" button
- [ ] Verify logout API called
- [ ] Verify localStorage cleared
- [ ] Verify redirect to login page

### Session Management
- [ ] Login and refresh page
- [ ] Verify still logged in
- [ ] Logout and refresh page
- [ ] Verify redirected to login
- [ ] Test with expired token
- [ ] Verify auto-redirect to login

---

## File References

### Backend
- `backend/route/authRoutes.js` - Auth endpoints including logout
- `backend/model/User.js` - User schema with password hashing

### Frontend
- `frontend/src/utils/auth.js` - Auth utility functions
- `frontend/src/services/api.js` - API client with logout endpoint
- `frontend/src/pages/Login.js` - Login page component
- `frontend/src/components/Navbar.js` - Navbar with logout
- `frontend/src/pages/MyAccount.js` - MyAccount with logout

---

## Future Enhancements

- [ ] Implement refresh token mechanism
- [ ] Add "Remember me" functionality
- [ ] Implement session timeout
- [ ] Add two-factor authentication
- [ ] Add login history
- [ ] Add device management
- [ ] Implement OAuth login
- [ ] Add social login options

---

## Troubleshooting

### Issue: Token not persisting after refresh
**Solution**: Check if localStorage is enabled in browser

### Issue: Logout not working
**Solution**: 
- Check browser console for errors
- Verify backend is running
- Check localStorage is being cleared
- Verify redirect is working

### Issue: Still logged in after logout
**Solution**:
- Clear browser cache
- Check localStorage manually
- Verify logoutAuth() is called
- Check for cached API responses

### Issue: Login page not showing after logout
**Solution**:
- Check navigation is working
- Verify /login route exists
- Check browser history
- Clear browser cache

---

## Best Practices

1. **Always clear all auth data on logout**
   - Token
   - User data
   - userId
   - Any session-related data

2. **Handle API failures gracefully**
   - Clear local data even if API fails
   - Show user-friendly error messages
   - Redirect to login on critical errors

3. **Secure token storage**
   - Consider using httpOnly cookies
   - Never expose token in URLs
   - Include token in Authorization header

4. **Validate on every page load**
   - Check if token exists
   - Verify token is valid
   - Redirect to login if not authenticated

5. **Provide clear feedback**
   - Show loading states during login
   - Confirm logout action
   - Display error messages clearly

---

**Last Updated**: November 19, 2025
**Version**: 1.0.0
