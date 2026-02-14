# Quick Deployment Guide

## 🚀 Option A: Vercel (Frontend) + Render (Backend)

### Step 1: Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Select your `e-commerce-web` repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: 
     - `VITE_API_URL`: `https://your-backend-url.onrender.com/api`
6. Click "Deploy"

### Step 2: Deploy Backend to Render
1. Go to [render.com](https://render.com)
2. Sign up/login with GitHub
3. Click "New +"
4. Select "Web Service"
5. Choose your repository
6. Configure:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `MONGO_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your secure secret
     - `PORT`: 5000
     - `CLIENT_URL`: Your Vercel URL
7. Click "Create Web Service"

### Step 3: Update Frontend Environment
1. Go to your Vercel project settings
2. Update `VITE_API_URL` to your Render backend URL
3. Redeploy (automatic)

## 🌐 Option B: Netlify + Railway

### Netlify (Frontend)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `frontend/dist` folder
3. Or connect GitHub for auto-deployment

### Railway (Backend)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Configure similar to Render
4. Deploy automatically

## 📱 Option C: Vercel Full Stack (Advanced)

Using Vercel Serverless Functions for both frontend and backend.

## 🔗 After Deployment

1. **Update environment variables** with live URLs
2. **Test all features** on live site
3. **Monitor logs** for any issues
4. **Set up custom domain** (optional)

## 📊 Free Tier Limits

- **Vercel**: 100GB bandwidth/month
- **Render**: 750 hours/month free
- **Netlify**: 100GB bandwidth/month
- **Railway**: $5 credit/month free

## 🎯 Production Checklist

- [ ] MongoDB Atlas connection string
- [ ] Environment variables configured
- [ ] HTTPS URLs working
- [ ] File uploads working
- [ ] Email notifications (if needed)
- [ ] Custom domain configured
- [ ] SSL certificates active
- [ ] Error monitoring set up
