# Deployment Guide

## Choose Your Platform

### Option 1: Vercel (Recommended - Easiest)

**Prerequisites:**
- GitHub account
- Vercel account (free)

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/GPS-Contact-Form.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to project settings
   - Click "Environment Variables"
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - You get a live URL like: `https://gps-contact-form.vercel.app`

**Automatic Deployments:**
- Every time you push to GitHub, Vercel automatically redeploys!

---

### Option 2: Netlify

**Prerequisites:**
- GitHub account
- Netlify account (free)

**Steps:**

1. **Push to GitHub** (same as Vercel)

2. **Connect to Netlify**
   - Go to https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Select GitHub
   - Choose your repository

3. **Configure Build Settings**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Click "Deploy site"

4. **Add Environment Variables**
   - Go to Site settings → Environment
   - Click "Edit variables"
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
   - Redeploy

---

### Option 3: AWS S3 + CloudFront

For organizations with AWS accounts.

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   - Create S3 bucket
   - Upload contents of `dist/` folder
   - Enable "Static website hosting"

3. **Use CloudFront** (optional)
   - Set CloudFront distribution to S3 bucket
   - Faster globally

4. **Set environment variables**
   - Create `.env.local` with Supabase credentials before building
   - These get baked into the production build

---

### Option 4: GitHub Pages

Good for testing/demos.

1. **Update package.json**
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/GPS-Contact-Form",
     ...
   }
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Update package.json scripts**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

---

## Post-Deployment

### 1. Test Your Live Site
- Fill out the form
- Verify submission appears in Supabase
- Check dark/light theme toggle works
- Test on mobile device

### 2. Update Your DNS (Optional)
If you have a custom domain:

**For Vercel:**
- In Vercel project settings → Domains
- Add your custom domain
- Follow DNS instructions

**For Netlify:**
- In Netlify site settings → Domain management
- Add custom domain
- Update DNS records

### 3. Enable HTTPS
- All platforms (Vercel, Netlify) provide free HTTPS
- Should be automatic

### 4. Monitor Your App
- Watch Supabase dashboard for submissions
- Check for errors (look at logs)

---

## Scaling Considerations

### If You Get Lots of Traffic

1. **Supabase Rate Limiting**
   - Free tier has reasonable limits
   - Upgrade to paid plan if needed
   - Monitor "Usage" in Supabase dashboard

2. **Implement Rate Limiting**
   - Add submit throttling in ContactForm.jsx
   - Use middleware on backend

3. **Cache Contacts List**
   - Reduce real-time subscription load
   - Cache data in React state

### Supabase Pricing
- **Free:** 2 million monthly active users, 500MB database
- **Pro:** Starts at $25/month, 100+ GB data

---

## Troubleshooting Deployment

### "Build failed" error
1. Check build logs in deployment platform
2. Make sure all dependencies are in `package.json`
3. Verify `.env` variables are configured
4. Test locally: `npm run build`

### "Cannot find module" in production
1. Check `package.json` has all dependencies
2. Delete `node_modules` and `package-lock.json` locally
3. Run `npm install` again
4. Push to GitHub and redeploy

### Form doesn't work after deployment
1. Check browser console (F12) for errors
2. Verify environment variables are set correctly
3. Check Supabase CORS settings (if issues)
4. Verify Supabase RLS policies are correct

### Supabase rejecting requests
1. Check if API key is correctly configured
2. Verify RLS policies allow public inserts/reads
3. Check Supabase rate limits
4. Look at Supabase "Logs" for detailed errors

---

## Custom Domain Setup

### Example: Using geopolymer.company

1. **Buy Domain**
   - GoDaddy, Namecheap, Google Domains, etc.

2. **Update DNS Records**
   
   **For Vercel:**
   - Add CNAME record pointing to: `cname.vercel-dns.com`
   - Add TXT record for verification

   **For Netlify:**
   - Add CNAME record pointing to: `[your-site].netlify.app`

3. **Update in Platform**
   - Add domain in Vercel/Netlify settings
   - Wait for DNS propagation (24-48 hours)

4. **SSL Certificate**
   - Automatic from Let's Encrypt
   - No action needed!

---

## Monitoring & Analytics

### Add Google Analytics (Optional)

1. Get tracking ID from Google Analytics
2. Add to `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### Monitor Supabase
- Go to Supabase dashboard
- Watch "Real-time" and "Usage" sections
- Check for rate limit warnings

---

## Rollback/Downtime

### Vercel
- Previous deployments automatically saved
- Click "Redeploy" on any previous deployment

### Netlify
- Previous deployments in "Deploy history"
- Click "Publish deploy" to restore

---

## Performance Optimization

### Before Production

1. **Test Build Size**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

2. **Test Performance**
   - Use Lighthouse (F12 → Lighthouse tab)
   - Aim for 90+ scores

3. **Monitor Real-time**
   ```bash
   npm run preview
   ```

---

## Backup & Security

### Backup Supabase Data
1. Use Supabase's built-in backups
2. Periodically export to CSV
3. Store backups securely

### Security Checklist
- [ ] Row Level Security (RLS) enabled
- [ ] Only public policies for inserts/reads
- [ ] No sensitive data in environment variables
- [ ] HTTPS enabled (automatic)
- [ ] Rate limiting configured
- [ ] Spam protection considered

---

## Support

If deployment fails:
1. Check platform-specific docs:
   - Vercel: https://vercel.com/docs
   - Netlify: https://docs.netlify.com
2. Review build logs for specific errors
3. Check Supabase status: https://status.supabase.com

**You're ready to go live!** 🚀
