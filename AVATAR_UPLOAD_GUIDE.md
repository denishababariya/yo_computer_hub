# Avatar Upload Feature - Implementation Guide

## Overview
Avatar/profile picture upload with file explorer and backend persistence.

---

## How It Works

### User Flow
1. Click camera icon on profile picture
2. File explorer opens (image files only)
3. Select an image file
4. Image converts to base64 format
5. Image displays immediately in UI
6. Image saves to backend database
7. Success message appears

---

## Frontend Implementation

### Camera Click Handler
**File**: `frontend/src/pages/MyAccount.js` (lines 137-179)

```javascript
const handleCameraClick = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageData = event.target.result;
        
        // Update both profile states
        setEditProfile({ ...editProfile, avatar: imageData });
        setProfile({ ...profile, avatar: imageData });
        
        // Save to backend
        try {
          const updatedProfileData = {
            ...profile,
            avatar: imageData
          };
          const response = await userAPI.updateProfile(userId, updatedProfileData);
          if (response.success) {
            alert('Profile picture updated successfully');
          }
        } catch (error) {
          console.error('Error updating avatar:', error);
          alert('Failed to update profile picture');
        }
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
};
```

**Features**:
- Creates hidden file input
- Accepts only image files
- Validates file size (max 5MB)
- Converts to base64 format
- Updates UI immediately
- Saves to backend
- Shows success/error alerts

### Camera Button
**File**: `frontend/src/pages/MyAccount.js` (lines 273-283)

```javascript
<div className="z_profile_avatar_wrap">
  <img src={profile.avatar} alt="Profile" className="z_profile_avatar" />
  <button 
    className="z_profile_camera_icon" 
    onClick={handleCameraClick}
    title="Change Profile Picture"
    type="button"
  >
    <FaCamera size={20} />
  </button>
</div>
```

---

## Backend Implementation

### User Model
**File**: `backend/model/User.js` (lines 52-55)

```javascript
avatar: {
  type: String,
  default: 'https://randomuser.me/api/portraits/men/32.jpg'
}
```

- Stores avatar as base64 string
- Default avatar provided
- Accepts any image format

### Update Profile Endpoint
**Endpoint**: `PUT /api/users/profile/:userId`

**Request**:
```json
{
  "avatar": "data:image/jpeg;base64,..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { "avatar": "data:image/jpeg;base64,..." }
}
```

---

## API Integration

**File**: `frontend/src/services/userAPI.js`

```javascript
export const updateProfile = async (userId, profileData) => {
  try {
    const response = await api.put(`/users/profile/${userId}`, profileData);
    return response;
  } catch (error) {
    throw error;
  }
};
```

---

## Testing Steps

### Test Avatar Upload
1. Navigate to MyAccount page
2. Click camera icon on profile picture
3. Select an image file (JPG, PNG, etc.)
4. Verify image displays immediately
5. Check success alert appears
6. Refresh page - image should persist
7. Check database - avatar should be stored

### Test File Validation
1. Try uploading file > 5MB
2. Verify error alert appears
3. Try uploading non-image file
4. Verify file explorer filters to images only

### Test Error Handling
1. Stop backend server
2. Try uploading image
3. Verify error alert appears
4. Verify image still displays in UI
5. Start backend and try again

---

## Data Flow

```
User clicks camera icon
    ↓
File explorer opens (image/* filter)
    ↓
User selects image file
    ↓
File size validation (max 5MB)
    ↓
FileReader converts to base64
    ↓
Update profile state (UI updates immediately)
    ↓
userAPI.updateProfile() calls backend
    ↓
Backend saves to MongoDB
    ↓
Success alert shown
    ↓
Image persists on refresh
```

---

## File Size Limits

- **Max Size**: 5MB
- **Recommended**: < 2MB for faster uploads
- **Formats**: JPG, PNG, GIF, WebP, etc.

---

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| "Image size should be less than 5MB" | File too large | Select smaller image |
| "Failed to update profile picture" | Backend error | Check backend logs |
| Image not persisting | API failed | Verify backend running |

---

## localStorage & Database

### localStorage
- Avatar stored in `profile.avatar` state
- Persists during session
- Cleared on logout

### MongoDB
- Avatar stored as base64 string in `User.avatar`
- Persists permanently
- Retrieved on login

---

## Performance Notes

- ✅ Base64 encoding adds ~33% size overhead
- ✅ Large images may slow down API
- ✅ Consider image compression for production
- ✅ Consider cloud storage (S3, Cloudinary) for scalability

---

## Future Enhancements

- [ ] Image compression before upload
- [ ] Image cropping tool
- [ ] Multiple image formats support
- [ ] Cloud storage integration (S3, Cloudinary)
- [ ] Image optimization
- [ ] Drag-and-drop upload
- [ ] Progress bar for large files

---

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

**Status**: ✅ COMPLETE
**Version**: 1.0.0
**Last Updated**: November 19, 2025
