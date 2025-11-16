# Deploy Flora Spa Website to Render

This guide will help you deploy your Flora Spa website to Render.

## Prerequisites

1. A GitHub account
2. A Render account (sign up at https://render.com - free tier available)
3. Your project files ready

## Step-by-Step Deployment Guide

### Step 1: Push Your Code to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it: `flora-spa-website`
   - Make it public (or private if you have a paid GitHub account)
   - Don't initialize with README (you already have one)

2. **Initialize Git in your project folder:**
   ```bash
   cd C:\Users\venka\Desktop\spa
   git init
   git add .
   git commit -m "Initial commit - Flora Spa website"
   ```

3. **Connect to GitHub and push:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/flora-spa-website.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Deploy on Render

1. **Sign in to Render:**
   - Go to https://render.com
   - Sign in with your GitHub account (recommended)

2. **Create a New Static Site:**
   - Click "New +" button
   - Select "Static Site"

3. **Connect Your Repository:**
   - Select "Connect GitHub"
   - Authorize Render to access your GitHub account
   - Select your repository: `flora-spa-website`

4. **Configure Your Site:**
   - **Name:** `flora-spa` (or any name you prefer)
   - **Branch:** `main`
   - **Root Directory:** Leave empty (or use `.` if needed)
   - **Build Command:** Leave empty (no build needed)
   - **Publish Directory:** Leave empty (or use `.`)

5. **Click "Create Static Site"**

6. **Wait for Deployment:**
   - Render will automatically deploy your site
   - This usually takes 1-2 minutes
   - You'll get a URL like: `https://flora-spa.onrender.com`

### Step 3: Custom Domain (Optional)

1. In your Render dashboard, go to your static site
2. Click on "Settings"
3. Scroll to "Custom Domains"
4. Add your domain (e.g., `floraspa.com`)
5. Follow the DNS instructions provided by Render

### Step 4: Update Video Path (Important)

Since you're using a local video file, you have two options:

**Option A: Upload Video to Cloud Storage**
1. Upload your video to:
   - Cloudinary (free tier available)
   - AWS S3
   - Google Cloud Storage
   - Or any CDN
2. Update the video `src` in `index.html` with the new URL

**Option B: Use Online Video**
- Keep the Pexels video URLs as fallback
- The online videos will work on Render

### Step 5: Verify Deployment

1. Visit your Render URL
2. Test all features:
   - Navigation
   - Service cards
   - Booking form
   - WhatsApp integration
   - Call buttons

## Important Notes

### File Structure
Make sure your project has this structure:
```
spa/
├── index.html
├── styles.css
├── script.js
├── package.json
├── render.yaml
├── README.md
└── .gitignore
```

### Video Files
- Large video files (>100MB) should be hosted externally
- Use CDN or cloud storage for videos
- Update video paths in `index.html` before deploying

### Environment Variables
If you need to change settings without redeploying:
1. Go to Render dashboard
2. Select your site
3. Go to "Environment" tab
4. Add environment variables if needed

## Troubleshooting

### Site Not Loading
- Check the build logs in Render dashboard
- Ensure `index.html` is in the root directory
- Verify all file paths are correct

### Video Not Playing
- Video files must be hosted online (not local)
- Check video URLs are accessible
- Use CDN for better performance

### WhatsApp Not Working
- Verify phone number format in `script.js`
- Test on actual mobile device
- Check browser console for errors

## Updating Your Site

After making changes:

1. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Update website"
   git push
   ```

2. **Render will automatically redeploy:**
   - Render watches your GitHub repository
   - Changes are deployed automatically
   - Usually takes 1-2 minutes

## Render Free Tier Limits

- **Bandwidth:** 100 GB/month
- **Builds:** Unlimited
- **Custom domains:** Supported
- **SSL:** Automatic (HTTPS)

## Support

- Render Documentation: https://render.com/docs
- Render Support: https://render.com/support

---

**Your website will be live at:** `https://your-site-name.onrender.com`

Enjoy your deployed Flora Spa website! 🌸

