# Google OAuth Setup Guide

This guide will help you set up Google Sign-In functionality for your e-commerce application.

## Step 1: Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Select "Web application"
6. Add authorized redirect URIs:
   - For local development: `http://localhost:5000/api/auth/google/callback`
   - For Railway production: `https://your-backend-domain.railway.app/api/auth/google/callback`
7. Note down the **Client ID** and **Client Secret**

## Step 2: Backend Environment Variables

Add these to your Railway environment variables:

```bash
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=https://your-backend-domain.railway.app/api/auth/google/callback
CLIENT_URL=https://your-frontend-domain.vercel.app
```

## Step 3: Frontend Environment Variables

Add this to your Vercel environment variables:

```bash
VITE_API_URL=https://your-backend-domain.railway.app
```

## Step 4: Update Authorized Domains

In your Google Cloud Console, make sure these domains are added to "Authorized JavaScript origins":

- For local development: `http://localhost:5173`
- For Vercel production: `https://your-frontend-domain.vercel.app`

## Step 5: Deploy and Test

1. Deploy your backend to Railway with the new environment variables
2. Deploy your frontend to Vercel with the new environment variables
3. Test the Google Sign-In functionality on both login and register pages

## Features Implemented

- ✅ Google OAuth authentication flow
- ✅ Automatic user creation for new Google users
- ✅ Link existing accounts with Google
- ✅ Avatar support from Google profile
- ✅ Seamless integration with existing JWT system
- ✅ Error handling for failed authentication
- ✅ Responsive Google Sign-In buttons

## Security Notes

- Google OAuth credentials are stored securely in environment variables
- JWT tokens are still used for session management
- User passwords remain optional for Google-authenticated users
- All sensitive data is properly validated and sanitized
