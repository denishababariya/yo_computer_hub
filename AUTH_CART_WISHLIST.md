# Authentication & Cart/Wishlist Management

## Overview
Users can add products to their wishlist and cart **without logging in**, but must **login before checkout**.

---

## Features

### ✅ Without Login (No Authentication Required)
- ✓ Browse products in Shop
- ✓ View product details
- ✓ Add products to **wishlist**
- ✓ Add products to **cart**
- ✓ View cart and wishlist
- ✓ Update quantities in cart
- ✓ Remove items from cart/wishlist

### 🔒 Login Required (Authentication Required)
- ✗ Proceed to checkout
- ✗ Place order
- ✗ View order history
- ✗ Update order status

---

## How It Works

### Frontend (React)

#### 1. **Wishlist & Cart** (No Auth Required)
- Stored in **Redux state** (client-side)
- Persists across browser sessions
- No server communication required
- Works completely offline

**Files:**
- `src/store/wishlistSlice.js` - Wishlist Redux slice
- `src/store/cartSlice.js` - Cart Redux slice
- `src/components/ProductCard.js` - Add to wishlist/cart buttons (no auth check)

#### 2. **Checkout Page** (Auth Required)
**Before:** 
```javascript
const user = getUser();
const token = getToken();

// Redirect if not authenticated
if (!token || !user) {
  return <LoginRequired />
}
```

**Changes Made:**
- Added `useEffect` hook to check authentication on load
- If not authenticated, shows "Login Required" modal
- Displays login and register buttons
- Redirects to login page with `from: '/checkout'` state

**Files:**
- `src/pages/Checkout.js` - Auth check and redirect logic

#### 3. **Cart Page** (Shows Login Prompt)
**Changes Made:**
- Added alert message: "Please log in to proceed with checkout"
- "Checkout" button changes to "Login to Checkout" for non-authenticated users
- Users can still view and manage cart without login

**Files:**
- `src/pages/Cart.js` - Conditional checkout button

#### 4. **API Service** (Auto-injects Token)
**Changes Made:**
- Already includes token in `Authorization: Bearer <token>` header
- Added 401 error handling
- Auto-logout and redirect to login if token expires

**Files:**
- `src/services/api.js` - Updated error handling for 401

---

## Backend (Node.js + Express)

### 1. **Authentication Middleware** (NEW)
Created: `backend/middleware/auth.js`

```javascript
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'No token provided. Please login to continue.' 
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};
```

### 2. **Protected Routes** (Cart & Wishlist Routes - NO PROTECTION)
- `POST /api/cart/add` - No auth required
- `POST /api/cart/remove` - No auth required
- Cart/wishlist management is client-side only

### 3. **Protected Routes** (Order Routes - AUTH REQUIRED)
Updated: `backend/route/orderRoutes.js`

**Protected Endpoints:**
- `POST /api/orders/` - Create order (requires login)
- `GET /api/orders/user/:userId` - Get user orders (requires login)
- `GET /api/orders/:orderId` - Get order by ID (requires login)
- `PUT /api/orders/:orderId` - Update order status (requires login)
- `DELETE /api/orders/:orderId` - Delete order (requires login)

**How it works:**
```javascript
router.post('/', verifyToken, async (req, res) => {
  // Verify token
  const userId = req.body.userId;
  if (req.user.id !== userId) {
    return res.status(403).json({ 
      success: false, 
      message: 'Unauthorized: User ID mismatch' 
    });
  }
  // Process order...
});
```

---

## User Flow

### Scenario 1: Browse & Add to Cart (No Login)
```
1. User visits shop → Browse products
2. Click "Add to Wishlist" → Added to Redux state
3. Click "Add to Cart" → Added to Redux state + localStorage
4. View Cart → Shows items from Redux
5. Click "Checkout" → Redirected to login page
```

### Scenario 2: Complete Purchase (With Login)
```
1. User logs in → Token stored in localStorage
2. Browse products → Same as above
3. Add to cart → Same as above
4. Click "Checkout" → Shows checkout form
5. Fill shipping details → Sends order to backend
6. Backend receives request → Verifies JWT token
7. Backend creates order → Stores in MongoDB
8. Frontend shows success → Redirects to home
```

### Scenario 3: Session Expiry
```
1. User is logged in → Token in localStorage
2. Token expires (manually removed or time-based)
3. User tries to checkout → Auth check fails
4. Redirects to login → Shows "Session expired" message
```

---

## API Request Format

### Without Authentication
```javascript
// Add to cart (client-side only)
dispatch(addToCart({ id, product, qty }));
```

### With Authentication
```javascript
// Order creation (with JWT)
const response = await fetch('http://localhost:9000/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ...' // Token included automatically
  },
  body: JSON.stringify({
    userId: user.id,
    items: cartItems,
    totalAmount,
    shippingAddress,
    paymentMethod
  })
});
```

---

## Error Handling

### Frontend Errors

#### 1. **"Login Required"** (Checkout page)
- User not authenticated
- Shows login/register buttons
- Clicking login redirects to `/login?from=/checkout`

#### 2. **"Session Expired"** (API call fails with 401)
- Token is invalid or expired
- Auto-logout and redirect to `/login`
- Shows error message

#### 3. **Cart is Empty** (Checkout)
- User has no items in cart
- Shows error and can continue shopping

### Backend Errors

#### 1. **401 Unauthorized** - No token provided
```json
{
  "success": false,
  "message": "No token provided. Please login to continue."
}
```

#### 2. **401 Unauthorized** - Invalid/expired token
```json
{
  "success": false,
  "message": "Invalid or expired token. Please login again."
}
```

#### 3. **403 Forbidden** - User ID mismatch
```json
{
  "success": false,
  "message": "Unauthorized: User ID mismatch"
}
```

---

## File Changes Summary

### Backend Files
- ✅ `backend/middleware/auth.js` - NEW - JWT verification middleware
- ✅ `backend/route/orderRoutes.js` - UPDATED - Added auth middleware to all routes

### Frontend Files
- ✅ `frontend/src/pages/Checkout.js` - UPDATED - Auth check & login redirect
- ✅ `frontend/src/pages/Cart.js` - UPDATED - Conditional checkout button
- ✅ `frontend/src/services/api.js` - UPDATED - 401 error handling

### No Changes Required
- `frontend/src/components/ProductCard.js` - Works as-is (no auth check)
- `frontend/src/store/cartSlice.js` - Works as-is (client-side)
- `frontend/src/store/wishlistSlice.js` - Works as-is (client-side)
- `backend/route/cartRoutes.js` - Works as-is (optional endpoint)

---

## Testing

### Test Case 1: Add to Cart Without Login
```
1. Clear localStorage (logout)
2. Navigate to /shop
3. Click "Add to Cart" on any product
4. Navigate to /cart
5. Verify: Product appears in cart ✓
```

### Test Case 2: Attempt Checkout Without Login
```
1. Add products to cart (without login)
2. Click "Checkout" button in cart
3. Verify: Redirected to login page ✓
4. Verify: "Login Required" message displays ✓
```

### Test Case 3: Checkout After Login
```
1. Register/Login user
2. Add product to cart
3. Navigate to /cart
4. Click "Checkout" button
5. Verify: Checkout form displays ✓
6. Verify: User data pre-filled ✓
7. Fill shipping details and submit
8. Verify: Order created in database ✓
9. Verify: Success message displays ✓
```

### Test Case 4: Invalid Token Handling
```
1. Open browser console
2. localStorage.removeItem('token')
3. Navigate to /checkout (if was on page)
4. Verify: Auto-redirects to login ✓
5. Verify: Error message shows ✓
```

---

## Summary

| Feature | Without Login | With Login |
|---------|--------------|-----------|
| Browse Shop | ✅ | ✅ |
| Add to Wishlist | ✅ | ✅ |
| Add to Cart | ✅ | ✅ |
| View Cart | ✅ | ✅ |
| Checkout | ❌ | ✅ |
| Place Order | ❌ | ✅ |
| View Orders | ❌ | ✅ |

This setup provides a seamless user experience while ensuring secure checkout!
