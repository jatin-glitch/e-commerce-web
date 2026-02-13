# E-commerce Deployment Guide

## Backend Deployment (Render/Railway/VPS)

### 1. Environment Variables
Set these in your hosting platform:
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Secure random string (at least 32 characters)
- `PORT`: 5000 (or your preferred port)
- `NODE_ENV`: production
- `CLIENT_URL`: Your deployed frontend URL

### 2. MongoDB Atlas Setup
1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Add your deployment IP to whitelist (0.0.0.0/0 for cloud deployment)
4. Get your connection string

### 3. Deployment Steps
```bash
# Install dependencies
cd backend
npm install

# The deployment platform will handle starting the app
```

## Frontend Deployment (Netlify/Vercel)

### 1. Environment Variables
Set these in your hosting platform:
- `VITE_API_URL`: Your deployed backend URL (e.g., https://your-app.onrender.com/api)

### 2. Build Configuration
The app is already configured for production builds.

### 3. Deployment Steps
```bash
# Install dependencies
cd frontend
npm install

# Build for production
npm run build

# Deploy the dist/ folder
```

## Authentication in Production

### JWT Configuration
- Uses HTTP-only cookies for security
- Secure flag enabled in production
- SameSite set to 'strict' in production
- 7-day token expiration

### CORS Configuration
Backend only accepts requests from your frontend domain
- Update `CLIENT_URL` environment variable
- CORS credentials enabled for cookie handling

## Security Considerations

1. **JWT Secret**: Use a strong, random string
2. **MongoDB**: Use MongoDB Atlas with authentication
3. **HTTPS**: Ensure both frontend and backend use HTTPS
4. **Environment Variables**: Never commit secrets to git
5. **Rate Limiting**: Consider adding rate limiting for production

## Testing Production Authentication

1. Register a new user account
2. Login to receive authentication cookie
3. Try adding items to cart (should redirect to login if not authenticated)
4. Test protected routes (checkout, admin panels)

## Domain Configuration

Once deployed:
1. Update `CLIENT_URL` in backend to your frontend domain
2. Update `VITE_API_URL` in frontend to your backend domain
3. Ensure both domains use HTTPS
4. Test cross-domain cookie handling
