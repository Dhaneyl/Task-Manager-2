# Deployment Quick Checklist

Use this checklist to deploy your Task Manager app step-by-step.

## ✅ Pre-Deployment Checklist

- [ ] Code is committed to GitHub repository
- [ ] All features tested locally
- [ ] Environment variables documented

---

## 📦 Step 1: MongoDB Atlas (5 minutes)

- [ ] Sign up at https://www.mongodb.com/cloud/atlas/register
- [ ] Create free cluster (M0)
- [ ] Create database user (save password!)
- [ ] Add IP whitelist: 0.0.0.0/0
- [ ] Copy connection string
- [ ] Replace `<password>` in connection string
- [ ] Add database name: `.../taskmanager?retryWrites...`

**Your MongoDB URI:** `mongodb+srv://...`

---

## 🔧 Step 2: Deploy Backend to Render (10 minutes)

- [ ] Sign up at https://render.com
- [ ] Create new Web Service
- [ ] Connect GitHub repo: `Task-Manager-2`
- [ ] Configure:
  - Name: `task-manager-backend`
  - Root Directory: `backend`
  - Build: `npm install && npm run build`
  - Start: `npm start`
  - Free plan
- [ ] Add environment variables:
  - `NODE_ENV` = `production`
  - `PORT` = `5000`
  - `MONGODB_URI` = [your MongoDB URI]
  - `JWT_SECRET` = [random 32+ char string]
  - `CORS_ORIGIN` = `*`
- [ ] Click "Create Web Service"
- [ ] Wait for deployment
- [ ] Copy your backend URL

**Your Backend URL:** `https://task-manager-backend-xxxx.onrender.com`

---

## 🌐 Step 3: Deploy Frontend to Vercel (5 minutes)

- [ ] Sign up at https://vercel.com
- [ ] Import `Task-Manager-2` from GitHub
- [ ] Configure:
  - Framework: Vite
  - Build: `npm run build`
  - Output: `dist`
- [ ] Add environment variable:
  - `VITE_API_URL` = `https://[your-backend-url]/api`
  - `VITE_SOCKET_URL` = `https://[your-backend-url]`
- [ ] Click "Deploy"
- [ ] Wait for deployment
- [ ] Copy your frontend URL

**Your Frontend URL:** `https://your-app.vercel.app`

---

## 🔄 Step 4: Update CORS (2 minutes)

- [ ] Go back to Render dashboard
- [ ] Select `task-manager-backend`
- [ ] Go to Environment tab
- [ ] Update `CORS_ORIGIN`:
  - From: `*`
  - To: `https://your-app.vercel.app`
- [ ] Save (will trigger redeploy)

---

## 🧪 Step 5: Test Deployment (5 minutes)

- [ ] Visit your Vercel URL
- [ ] Register a new account
- [ ] Create a task
- [ ] Create a category
- [ ] Test calendar view
- [ ] Test notifications
- [ ] Check dark mode toggle
- [ ] Test on mobile device

---

## 🎉 Deployment Complete!

Your app is now live at: `https://your-app.vercel.app`

### Share Your Links:
- **App**: https://your-app.vercel.app
- **Backend API**: https://your-backend-url.onrender.com

---

## 📝 Important Notes

### Free Tier Limitations
- **Render**: App sleeps after 15 min of inactivity (takes 30s to wake up)
- **MongoDB**: 512MB storage limit
- **Vercel**: 100GB bandwidth/month

### Future Updates
Just push to GitHub:
```bash
git add .
git commit -m "Update app"
git push origin main
```
Both Render and Vercel will auto-deploy!

---

## 🆘 Troubleshooting

### Can't login/register?
- Check MongoDB connection string in Render
- Verify network access allows 0.0.0.0/0
- Check Render logs for errors

### Frontend errors?
- Verify `VITE_API_URL` is correct in Vercel
- Check browser console for errors
- Ensure CORS_ORIGIN matches your Vercel URL

### Slow to load first time?
- Normal for Render free tier after inactivity
- Subsequent loads will be fast

---

## 💰 Cost: $0/month

Completely free using:
- Vercel (Free tier)
- Render (Free tier)
- MongoDB Atlas (Free tier)

---

**Questions?** Check DEPLOYMENT_GUIDE.md for detailed instructions.
