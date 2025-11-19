# MyAccount Integration Testing Guide

## Prerequisites
- Backend running on `http://localhost:9000`
- Frontend running on `http://localhost:3000`
- MongoDB connected and running
- User registered and logged in

## Testing Checklist

### 1. Backend API Testing (Using Postman or cURL)

#### Test User Profile Endpoint
```bash
# Get Profile
GET http://localhost:9000/api/users/profile/USER_ID

# Update Profile
PUT http://localhost:9000/api/users/profile/USER_ID
Body: {
  "name": "Updated Name",
  "phone": "+91 98765 43210",
  "dob": "1998-05-12",
  "gender": "Male"
}
```

#### Test Orders Endpoint
```bash
# Get Orders
GET http://localhost:9000/api/users/orders/USER_ID
```

#### Test Addresses Endpoint
```bash
# Get All Addresses
GET http://localhost:9000/api/users/addresses/USER_ID

# Add Address
POST http://localhost:9000/api/users/addresses/USER_ID
Body: {
  "name": "Home",
  "address": "203, Sunrise Avenue, Ahmedabad",
  "phone": "+91 98765 43210"
}

# Update Address
PUT http://localhost:9000/api/users/addresses/USER_ID/ADDRESS_ID
Body: {
  "name": "Office",
  "address": "2nd Floor, Tech Park",
  "phone": "+91 91234 56789"
}

# Delete Address
DELETE http://localhost:9000/api/users/addresses/USER_ID/ADDRESS_ID
```

#### Test Complete Account Data
```bash
# Get All Data
GET http://localhost:9000/api/users/account/USER_ID
```

### 2. Frontend Component Testing

#### Test Profile Tab
- [ ] Navigate to MyAccount page
- [ ] Verify profile data loads from backend
- [ ] Click "Edit Profile" button
- [ ] Modify profile fields (name, phone, dob, gender)
- [ ] Click "Save" button
- [ ] Verify success alert appears
- [ ] Refresh page and confirm changes persisted
- [ ] Click camera icon to upload avatar
- [ ] Verify avatar updates

#### Test Orders Tab
- [ ] Click "MY ORDER" tab
- [ ] Verify orders load from backend
- [ ] Check order ID, date, status display correctly
- [ ] Verify order items and total amount show
- [ ] If no orders, verify "No orders yet" message

#### Test Address Book Tab
- [ ] Click "ADDRESS BOOK" tab
- [ ] Verify existing addresses load from backend
- [ ] Click "Add New Address" button
- [ ] Fill in address form (name, address, phone)
- [ ] Click "Add Address" button
- [ ] Verify success alert and new address appears in list
- [ ] Click "Edit" on an address
- [ ] Modify address details
- [ ] Click "Update Address" button
- [ ] Verify changes reflected in list
- [ ] Click "Delete" on an address
- [ ] Verify success alert and address removed from list

### 3. Error Handling Testing

#### Test Missing userId
- [ ] Clear localStorage
- [ ] Navigate to MyAccount
- [ ] Verify fallback to 'demo-user-id'
- [ ] Check console for errors

#### Test Network Errors
- [ ] Stop backend server
- [ ] Navigate to MyAccount
- [ ] Verify error handling (console logs, no crashes)
- [ ] Restart backend and refresh

#### Test Invalid Data
- [ ] Try to add address with empty fields
- [ ] Verify validation alert appears
- [ ] Try to update profile with invalid data
- [ ] Verify error handling

### 4. Data Persistence Testing

#### Profile Updates
- [ ] Update profile
- [ ] Refresh page
- [ ] Verify changes persisted in database

#### Address Operations
- [ ] Add address
- [ ] Refresh page
- [ ] Verify address still exists
- [ ] Delete address
- [ ] Refresh page
- [ ] Verify address removed

### 5. UI/UX Testing

#### Responsive Design
- [ ] Test on desktop (1920px)
- [ ] Test on tablet (768px)
- [ ] Test on mobile (375px)
- [ ] Verify all elements display correctly

#### Loading States
- [ ] Verify loading indicator shows while fetching
- [ ] Verify data displays after loading completes

#### Tab Navigation
- [ ] Click between tabs
- [ ] Verify correct content displays
- [ ] Verify state persists when switching tabs

### 6. Integration Testing

#### Complete User Journey
1. Register new user
2. Store userId in localStorage
3. Navigate to MyAccount
4. Verify profile loads
5. Edit profile and save
6. Add new address
7. Edit address
8. Delete address
9. View orders
10. Logout

## Expected Results

### Successful Profile Update
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user_id",
    "name": "Updated Name",
    "email": "user@example.com",
    "phone": "+91 98765 43210",
    "dob": "1998-05-12",
    "gender": "Male",
    "avatar": "https://..."
  }
}
```

### Successful Address Add
```json
{
  "success": true,
  "message": "Address added successfully",
  "data": [
    {
      "_id": "addr_id",
      "name": "Home",
      "address": "203, Sunrise Avenue",
      "phone": "+91 98765 43210",
      "isDefault": true
    }
  ]
}
```

### Successful Orders Fetch
```json
{
  "success": true,
  "data": [
    {
      "id": "ORD123456",
      "date": "2024-05-01",
      "status": "Delivered",
      "items": [...],
      "total": "₹52,000"
    }
  ]
}
```

## Troubleshooting

### Issue: userId not found
**Solution**: Ensure user is logged in and userId is stored in localStorage

### Issue: CORS errors
**Solution**: Check backend CORS configuration in server.js

### Issue: Data not updating
**Solution**: 
- Check browser console for errors
- Verify backend is running
- Check MongoDB connection
- Verify user ID is correct

### Issue: Addresses not showing
**Solution**:
- Verify addresses exist in MongoDB
- Check if user has addresses array in schema
- Verify API response format

## Performance Testing

### Load Testing
- [ ] Test with 100 addresses
- [ ] Test with 1000 orders
- [ ] Verify UI remains responsive

### API Response Time
- [ ] Profile fetch: < 200ms
- [ ] Orders fetch: < 500ms
- [ ] Addresses fetch: < 300ms
- [ ] Complete data fetch: < 1000ms

## Security Testing

### Input Validation
- [ ] Test XSS prevention with special characters
- [ ] Test SQL injection attempts
- [ ] Verify sensitive data not exposed in logs

### Authentication
- [ ] Verify userId validation
- [ ] Test unauthorized access
- [ ] Verify JWT token handling (if implemented)

## Sign-off

- [ ] All tests passed
- [ ] No console errors
- [ ] Data persists correctly
- [ ] UI responsive on all devices
- [ ] Error handling works
- [ ] Ready for production

---

**Test Date**: ___________
**Tester**: ___________
**Status**: ___________
