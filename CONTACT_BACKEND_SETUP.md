# Contact Form Backend - CRUD Implementation

## Overview
Complete backend implementation for the Contact form with MongoDB storage and full CRUD functionality.

## Files Created

### Backend Files

#### 1. **Model** - `backend/model/Contact.js`
- Mongoose schema for contact messages
- Fields: name, company, email, phone, message, status, createdAt, updatedAt
- Email validation with regex pattern
- Status enum: 'new', 'read', 'replied'

#### 2. **Controller** - `backend/controller/contactController.js`
Functions implemented:
- `createContact()` - Create new contact message (POST)
- `getAllContacts()` - Get all messages (GET)
- `getContactById()` - Get single message by ID (GET)
- `updateContact()` - Update message status or details (PUT)
- `deleteContact()` - Delete message (DELETE)
- `getContactsByStatus()` - Filter by status (GET)

#### 3. **Routes** - `backend/route/contactRoutes.js`
Endpoints:
- `POST /api/contacts` - Create contact
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get single contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact
- `GET /api/contacts/status/:status` - Get by status

#### 4. **Server Update** - `backend/server.js`
- Added contactRoutes import
- Registered route at `/api/contacts`

### Frontend Files

#### 1. **API Service** - `frontend/src/services/contactAPI.js`
Methods:
- `createContact(contactData)` - Send form data to backend
- `getAllContacts()` - Fetch all messages
- `getContactById(id)` - Fetch single message
- `updateContact(id, updateData)` - Update message
- `deleteContact(id)` - Delete message
- `getContactsByStatus(status)` - Filter by status

#### 2. **Contact Component** - `frontend/src/pages/Contact.js`
Features:
- Form state management with React hooks
- Input validation
- Success/error message display
- Loading state during submission
- Form reset after successful submission
- Auto-clear success message after 5 seconds
- API integration with error handling

## Data Flow

### User Submits Form
1. User fills contact form (name, company, email, phone, message)
2. Clicks "Send" button
3. `handleSubmit()` validates required fields
4. `contactAPI.createContact()` sends POST request to backend
5. Backend validates and saves to MongoDB
6. Success message displayed to user
7. Form fields cleared

### Backend Processing
1. Request received at `POST /api/contacts`
2. Controller validates all required fields
3. New Contact document created in MongoDB
4. Response sent with success status and contact data

## MongoDB Schema

```javascript
{
  name: String (required),
  company: String,
  email: String (required, unique validation),
  phone: String (required),
  message: String (required),
  status: String (enum: ['new', 'read', 'replied'], default: 'new'),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

## API Response Format

### Success Response (201 Created)
```json
{
  "success": true,
  "message": "Contact message sent successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "company": "ABC Corp",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "message": "...",
    "status": "new",
    "createdAt": "2024-11-20T...",
    "updatedAt": "2024-11-20T..."
  }
}
```

### Error Response (400/500)
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## How to Use

### 1. Start Backend Server
```bash
cd backend
npm install
npm start
```
Server runs on `http://localhost:9000`

### 2. Start Frontend
```bash
cd frontend
npm start
```
Frontend runs on `http://localhost:3000`

### 3. Test Contact Form
1. Navigate to Contact page
2. Fill in form fields
3. Click Send
4. Success message appears
5. Data saved to MongoDB

## Admin Features (Backend Only)

### Get All Contacts
```bash
GET http://localhost:9000/api/contacts
```

### Get Contacts by Status
```bash
GET http://localhost:9000/api/contacts/status/new
GET http://localhost:9000/api/contacts/status/read
GET http://localhost:9000/api/contacts/status/replied
```

### Update Contact Status
```bash
PUT http://localhost:9000/api/contacts/:id
Body: { "status": "read" }
```

### Delete Contact
```bash
DELETE http://localhost:9000/api/contacts/:id
```

## Validation

### Frontend Validation
- Required fields: name, email, phone, message
- Email format validation
- Error messages displayed to user

### Backend Validation
- All required fields checked
- Email regex validation
- Status enum validation
- Duplicate email prevention

## Error Handling

### Frontend
- Try-catch blocks for API calls
- User-friendly error messages
- Loading state prevents multiple submissions
- Validation before API call

### Backend
- Input validation with error messages
- MongoDB connection error handling
- 404 responses for missing resources
- 500 responses for server errors

## Status Management

Contact messages have three statuses:
- **new** - Newly received message (default)
- **read** - Message has been read by admin
- **replied** - Response sent to user

Admin can update status via PUT endpoint.

## Future Enhancements

1. Email notifications to admin when new contact received
2. Auto-reply email to user
3. Admin dashboard to manage contacts
4. Contact categories/types
5. File attachment support
6. Rate limiting to prevent spam
7. CAPTCHA verification
