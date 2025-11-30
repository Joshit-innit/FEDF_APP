# FEDF-APP Deployment Guide

This guide explains how to deploy the Indian Culture Hub (MERN Stack) application so that everyone can access it online.

## Deployment Overview

Your application consists of:
- **Frontend**: React app (built as static files)
- **Backend**: Node.js/Express API
- **Database**: MongoDB

### Recommended Deployment Options

---

## Option 1: Deploy on Vercel (Frontend) + Railway (Backend) - **RECOMMENDED**
**Best for: Easy setup, free tier available, integrated services**

### Step 1: Prepare Your Code

1. **Add `.env.production` to backend:**
   ```bash
   cd backend
   cat > .env.production << 'EOF'
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string_here
   EOF
   ```

2. **Update Frontend API URL** - Edit `/frontend/src/services/api.js`:
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
   ```
   Create `/frontend/.env.production`:
   ```
   REACT_APP_API_URL=https://your-backend-railway-url.railway.app/api
   ```

### Step 2: Deploy Backend on Railway.app

1. **Sign up** at [railway.app](https://railway.app)
2. **Connect your GitHub repo** to Railway
3. **Select the backend folder** when prompted
4. **Add MongoDB:**
   - In Railway dashboard, click "Add Services" → Select "MongoDB"
   - Railway auto-generates `MONGODB_URI` environment variable
5. **Configure environment:**
   - Add `PORT=3001` in Railway dashboard
6. **Deploy** - Railway auto-deploys on every git push
7. **Copy your backend URL** from Railway dashboard (looks like: `https://your-app-backend.railway.app`)

### Step 3: Deploy Frontend on Vercel

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import your GitHub repo**
3. **Configure:**
   - Framework: Next.js / Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Add Environment Variables:**
   - `REACT_APP_API_URL` = your Railway backend URL (from Step 2.7)
5. **Deploy** - Vercel auto-deploys on git push

**Access your app:** `https://your-project.vercel.app`

---

## Option 2: Deploy on Heroku + Vercel (Free Alternative)

### Backend on Heroku:

1. **Sign up** at [heroku.com](https://heroku.com)
2. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   heroku login
   ```
3. **Create Heroku app from backend:**
   ```bash
   cd backend
   heroku create your-app-backend
   ```
4. **Add MongoDB Atlas (Free tier):**
   - Sign up at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create free cluster
   - Copy connection string
   - Add to Heroku:
     ```bash
     heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
     ```
5. **Deploy:**
   ```bash
   git push heroku main
   ```

### Frontend on Vercel (same as Option 1, Step 3)

---

## Option 3: Deploy Everything on One Server (DigitalOcean/AWS)

**Recommended Specs:** Ubuntu 20.04, 2GB RAM, $5-12/month

### Setup:

1. **Create Droplet** on DigitalOcean or EC2 instance on AWS
2. **SSH into server:**
   ```bash
   ssh root@your_server_ip
   ```
3. **Install dependencies:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo apt-get install -y mongodb-server
   sudo systemctl start mongodb
   ```
4. **Clone your repository:**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/fedf-app.git
   cd fedf-app
   ```
5. **Install dependencies:**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```
6. **Build frontend:**
   ```bash
   npm run build
   ```
7. **Setup backend with PM2 (process manager):**
   ```bash
   cd ../backend
   npm install -g pm2
   pm2 start server.js --name "fedf-backend"
   pm2 startup
   pm2 save
   ```
8. **Setup Nginx as reverse proxy:**
   ```bash
   sudo apt-get install -y nginx
   sudo nano /etc/nginx/sites-available/default
   ```
   Replace with:
   ```nginx
   server {
       listen 80 default_server;
       server_name your_domain.com www.your_domain.com;

       # Frontend static files
       location / {
           root /var/www/fedf-app/frontend/build;
           try_files $uri /index.html;
       }

       # API proxy
       location /api {
           proxy_pass http://localhost:5000/api;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
9. **Restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```
10. **Setup SSL with Certbot:**
    ```bash
    sudo apt-get install -y certbot python3-certbot-nginx
    sudo certbot --nginx -d your_domain.com
    ```

**Access:** `https://your_domain.com`

---

## Option 4: Deploy on Render (Simple & Free)

1. **Sign up** at [render.com](https://render.com)
2. **Create new Web Service**
   - Connect GitHub
   - Select backend folder
   - Build Command: `npm install && node seedData.js`
   - Start Command: `node server.js`
3. **Add MongoDB Atlas** connection string as environment variable
4. **Deploy**

**Cost:** Free tier available

---

## Database (MongoDB) Setup

### Option A: MongoDB Atlas (Cloud - Recommended)
1. Sign up at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free cluster
3. Whitelist your IPs (or use 0.0.0.0/0 for development)
4. Copy connection string
5. Use as `MONGODB_URI` in environment

### Option B: Local MongoDB (for testing)
Already configured in `backend/server.js` default: `mongodb://localhost:27017/indian-culture`

---

## Quick Deployment Checklist

- [ ] Update frontend `.env` files with production API URL
- [ ] Update backend `.env` with MongoDB connection string
- [ ] Run `npm run build` in frontend folder
- [ ] Test backend routes with `npm start` in backend
- [ ] Seed database with `node seedData.js`
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS/SSL
- [ ] Test all features (festivals, traditions, recipes, culture, comments)
- [ ] Setup monitoring/alerts (optional)

---

## Environment Variables Required

### Backend (`.env`)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
NODE_ENV=production
```

### Frontend (`.env.production`)
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## Comparison Table

| Option | Cost | Setup Time | Difficulty | Scalability |
|--------|------|-----------|------------|-------------|
| **Vercel + Railway** | Free tier | 15 mins | Easy | Good |
| **Heroku + Vercel** | Free tier | 20 mins | Easy | Limited |
| **DigitalOcean** | $5+/month | 30 mins | Medium | Excellent |
| **Render** | Free tier | 15 mins | Easy | Good |

---

## Post-Deployment Steps

1. **Test all pages:**
   - Load festivals, traditions, recipes, culture pages
   - Test language switcher
   - Test comments and emoji reactions
   - Test image loading

2. **Monitor performance:**
   - Check response times
   - Monitor database
   - Setup error tracking (Sentry, LogRocket)

3. **Backup database:**
   - Enable automated backups on MongoDB Atlas
   - Or setup cron job on self-hosted MongoDB

4. **Setup CI/CD:**
   - GitHub Actions automatically tests and deploys on push
   - Or use platform-native CI/CD (Railway, Vercel, Render)

---

## Troubleshooting

**Images not loading?**
- Check CORS settings in backend
- Verify image URLs are accessible from production server

**API calls failing?**
- Ensure `REACT_APP_API_URL` is set correctly
- Check CORS headers in Express server
- Whitelist frontend domain in backend

**Database connection error?**
- Verify MongoDB URI is correct
- Check IP whitelist on MongoDB Atlas
- Ensure network connectivity from server

**Comments not saving?**
- Currently stored in localStorage (browser-only)
- To persist: Add backend API endpoints for comments

---

## Next Steps

1. **Choose your deployment option** (Recommended: Vercel + Railway)
2. **Follow the steps** for your chosen option
3. **Test thoroughly** before sharing link with others
4. **Share your live URL** with anyone to access!

**Questions?** Check the official docs:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Railway: [railway.app/docs](https://railway.app/docs)
- Heroku: [devcenter.heroku.com](https://devcenter.heroku.com)
- Render: [render.com/docs](https://render.com/docs)
