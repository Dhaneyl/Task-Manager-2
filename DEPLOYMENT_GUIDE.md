# Deployment Guide - Task Manager Full-Stack App

This guide will walk you through deploying your Task Manager application using free hosting services.

## Deployment Stack
- **Frontend**: Vercel (Free)
- **Backend**: Render (Free)
- **Database**: MongoDB Atlas (Free - 512MB)

---

## Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Choose the **Free Shared Cluster** (M0 Sandbox)

### 1.2 Create a Database Cluster
1. Click **"Build a Database"**
2. Choose **"Shared"** (Free tier)
3. Select a **Cloud Provider & Region** (choose closest to your users)
4. Cluster Name: `task-manager` (or any name you prefer)
5. Click **"Create Cluster"** (takes 3-5 minutes)

### 1.3 Create Database User
1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `taskmanager`
5. Password: Click **"Autogenerate Secure Password"** and **SAVE IT**
6. User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 1.4 Whitelist IP Addresses
1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Go to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://taskmanager:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual database user password
6. Add database name before `?`: `...mongodb.net/taskmanager?retryWrites...`
7. **SAVE THIS CONNECTION STRING** - you'll need it later

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to https://render.com/
2. Sign up with GitHub (recommended)

### 2.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository (`Task-Manager-2`)
3. Configure the service:
   - **Name**: `task-manager-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 2.3 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string from Step 1.5 |
| `JWT_SECRET` | Generate random string (e.g., use https://randomkeygen.com/) |
| `CORS_ORIGIN` | `*` (temporary, we'll update this after frontend deployment) |

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Once deployed, you'll see a URL like: `https://task-manager-backend-xxxx.onrender.com`
4. **SAVE THIS URL** - you'll need it for the frontend

### 2.5 Test Backend
Visit: `https://your-backend-url.onrender.com/api/auth/me`
You should see: `{"message":"No token provided"}`
This confirms the backend is working!

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Update API URL in Frontend
Before deploying, we need to update the API URL:

1. Open `src/services/api.ts`
2. Find the line: `baseURL: 'http://localhost:5000/api'`
3. Replace with: `baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'`

### 3.2 Create Vercel Account
1. Go to https://vercel.com/signup
2. Sign up with GitHub

### 3.3 Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your `Task-Manager-2` repository
3. Configure project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.4 Add Environment Variables
Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://your-backend-url.onrender.com/api` |

(Use the backend URL from Step 2.4)

### 3.5 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://your-app.vercel.app`
4. **SAVE THIS URL**

---

## Step 4: Update CORS Settings

Now that we have the frontend URL, we need to update the backend CORS settings:

1. Go back to **Render Dashboard**
2. Select your **task-manager-backend** service
3. Go to **"Environment"**
4. Update `CORS_ORIGIN` from `*` to your Vercel URL: `https://your-app.vercel.app`
5. Click **"Save Changes"**
6. Backend will automatically redeploy

---

## Step 5: Test Your Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Register a new account
3. Create some tasks
4. Test all features

---

## Important Notes

### Free Tier Limitations

#### Render (Backend)
- **Spins down after 15 minutes of inactivity**
- First request after inactivity takes 30-60 seconds to "wake up"
- 750 hours/month free (enough for one app running 24/7)

#### Vercel (Frontend)
- 100GB bandwidth/month
- 100 deployments/day
- No sleep/spin-down issues

#### MongoDB Atlas
- 512MB storage
- Shared RAM and vCPU
- Good for ~1000-2000 tasks

### Custom Domain (Optional)
Both Vercel and Render support custom domains for free!

---

## Troubleshooting

### Backend won't start
- Check environment variables are set correctly
- Check build logs in Render dashboard
- Verify MongoDB connection string is correct

### Frontend can't connect to backend
- Check `VITE_API_URL` is set in Vercel
- Verify CORS_ORIGIN is set correctly in Render
- Check browser console for errors

### Database connection issues
- Verify IP whitelist includes 0.0.0.0/0
- Check MongoDB user password is correct
- Ensure connection string includes database name

### App is slow to load
- This is normal for Render's free tier after inactivity
- Consider upgrading to paid tier ($7/month) for always-on service

---

## Updating Your App

### Frontend Updates
```bash
git add .
git commit -m "Update frontend"
git push origin main
```
Vercel will auto-deploy in 2-3 minutes.

### Backend Updates
```bash
git add .
git commit -m "Update backend"
git push origin main
```
Render will auto-deploy in 5-10 minutes.

---

## Production Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with secure password
- [ ] Network access allows 0.0.0.0/0
- [ ] Backend deployed to Render
- [ ] All backend environment variables set
- [ ] Frontend deployed to Vercel
- [ ] VITE_API_URL set in Vercel
- [ ] CORS_ORIGIN updated in Render with Vercel URL
- [ ] Test registration and login
- [ ] Test creating/editing/deleting tasks
- [ ] Test all features (categories, priorities, calendar, etc.)

---

## Cost Summary

| Service | Free Tier | Upgrade Cost |
|---------|-----------|--------------|
| MongoDB Atlas | 512MB | $9/month for 2GB |
| Render | 750 hrs/month | $7/month for always-on |
| Vercel | 100GB bandwidth | $20/month for Pro |

**Total Monthly Cost: $0** (with free tiers)

---

## Support

If you encounter issues:
1. Check the deployment logs in Render/Vercel dashboards
2. Verify all environment variables are set correctly
3. Check browser console for frontend errors
4. Ensure MongoDB Atlas is accepting connections

---

## Next Steps

After successful deployment:
1. Share your app URL with others!
2. Monitor usage in dashboards
3. Set up custom domain (optional)
4. Consider backups for MongoDB data
5. Monitor performance and errors

Congratulations on deploying your full-stack app! 🎉
