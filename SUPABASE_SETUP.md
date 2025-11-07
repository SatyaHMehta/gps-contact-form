# 🔧 Supabase Database Setup

Your deployed site is blank because the database table doesn't exist yet. Follow these steps:

---

## Step 1: Go to Supabase Dashboard

Go to: https://supabase.com/dashboard

---

## Step 2: Create the Database Table

1. Click on your project
2. Click **"SQL Editor"** (left sidebar)
3. Click **"New Query"**
4. Paste this SQL code:

```sql
CREATE TABLE contacts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT NOT NULL,
  comments TEXT
);
```

5. Click **"Run"** (blue play button)
6. You should see: "Success. No rows returned"

---

## Step 3: Enable Row Level Security

1. Go to **"Authentication"** → **"Policies"** (left sidebar)
2. Click on **"contacts"** table
3. Under **"Auth"**, click **"Enable RLS"**
4. Click **"New Policy"**
5. Select **"For SELECT"** 
6. Click **"Get Started"**
7. Change the policy to:
   - Name: `Enable select for all users`
   - USING expression: `true`
8. Click **"Save"**

---

## Step 4: Create INSERT Policy

1. Click **"New Policy"** again
2. Select **"For INSERT"**
3. Click **"Get Started"**
4. Change the policy to:
   - Name: `Enable insert for all users`
   - WITH CHECK expression: `true`
5. Click **"Save"**

---

## Step 5: Verify Environment Variables

Make sure your Vercel deployment has these variables set:

**In Vercel Dashboard:**
1. Go to your project settings
2. Click **"Environment Variables"**
3. Verify you have:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon public key

If missing, add them now and **redeploy**.

---

## Step 6: Redeploy Your Site

After adding environment variables:

1. Go to Vercel dashboard
2. Go to **"Deployments"**
3. Click the **three dots** on the latest deployment
4. Click **"Redeploy"**
5. Wait 1-2 minutes for it to redeploy

---

## Step 7: Test Your Site

1. Visit your deployed URL
2. Refresh the page (Ctrl+F5 or Cmd+Shift+R)
3. You should now see the contact form! ✅
4. Fill out the form and submit
5. Go to `/admin` (password: GPS2025)
6. You should see your submission in the table

---

## Troubleshooting

### "Still blank after redeploying"
- [ ] Check browser console for errors (F12)
- [ ] Check Vercel logs (Deployments → click deployment → Logs)
- [ ] Make sure environment variables are set correctly
- [ ] Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### "Form submits but nothing appears in admin"
- [ ] Make sure Row Level Security policies are enabled
- [ ] Check Supabase table has data (SQL Editor → run `SELECT * FROM contacts;`)
- [ ] Verify VITE_SUPABASE_ANON_KEY is correct

### "Still having issues?"
Check these:
1. Environment variables are set in Vercel
2. Database table exists in Supabase
3. RLS policies are enabled
4. You're using correct anon key (not service_role key)

---

## Quick Reference

**Supabase Project URL**: Settings → API → Project URL  
**Anon Public Key**: Settings → API → anon public key  
**Service Role Key**: Settings → API → service_role key (❌ DON'T use this!)

---

## After This Works

Your site will:
- ✅ Show the contact form
- ✅ Accept submissions
- ✅ Display submissions in admin dashboard
- ✅ Show full comments in modals
- ✅ Work on mobile

You're almost there! Just do these Supabase steps and you'll be live! 🚀
