# Supabase Setup - Step-by-Step Instructions

## Part 1: Create Supabase Account & Project

### Step 1: Sign Up for Supabase
1. Go to https://supabase.com
2. Click "Sign Up" (top right)
3. Choose email signup
4. Complete the registration
5. Check your email and verify

### Step 2: Create a New Project
1. After logging in, click "New Project"
2. Fill in:
   - **Name:** GPS Contact Form (or any name)
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to your location
   - **Organization:** Create new or select existing
3. Click "Create new project"
4. **Wait 2-3 minutes** for project initialization

### Step 3: Find Your API Keys
1. Once project is created, click on the project name
2. Go to **Settings** (left sidebar, bottom)
3. Click **"API"** tab
4. You'll see:
   - **Project URL** (starts with `https://`)
   - **anon public** (your public API key)
5. **Copy both values** and save them somewhere safe

---

## Part 2: Create Database Table

### Step 1: Open SQL Editor
1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New Query"** button

### Step 2: Create Table Structure
Copy this SQL and paste it in the query editor:

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- Enable security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit forms
CREATE POLICY "Allow public inserts" ON contacts 
  FOR INSERT WITH CHECK (true);

-- Allow reading all submissions
CREATE POLICY "Allow public reads" ON contacts 
  FOR SELECT USING (true);
```

### Step 3: Execute Query
1. Click **"RUN"** button (or Ctrl+Enter)
2. You should see: "Successfully created 1 table"

### Step 4: Verify Table Creation
1. Go to **Table Editor** (left sidebar)
2. You should see "contacts" table listed
3. Click on it to see the columns

---

## Part 3: Configure the React App

### Step 1: Set Environment Variables
1. In the `GPS Form` folder, create a file named `.env.local`
   - If you can't see file extensions, enable "Show file name extensions" in View options
   - **Important:** Name is `.env.local` (not `.env`)

2. Open `.env.local` and paste:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace with values from Step 3 above:
   - Find your Project URL on the API page
   - Find your anon key on the API page

### Step 2: Install Dependencies
1. Open Terminal in the project folder
2. Run: `npm install`
3. Wait for completion (2-5 minutes)

### Step 3: Start Development Server
1. In Terminal, run: `npm run dev`
2. Browser should open to `http://localhost:5173`
3. You should see the form!

---

## Verifying Everything Works

### Test 1: Submit a Form Entry
1. Fill out all required fields
2. Click Submit
3. See green success message

### Test 2: Check Supabase Dashboard
1. Go to your Supabase project
2. Click "Table Editor"
3. Click "contacts" table
4. You should see your submitted entry!

### Test 3: Admin View
1. Scroll down in the app
2. You should see a table with contacts
3. It should show your test entry
4. Try clicking a phone number or email

---

## Troubleshooting

### Problem: "Cannot find module" error
**Solution:**
1. Delete `node_modules` folder
2. Delete `package-lock.json` file
3. Run `npm install` again

### Problem: ".env.local not found" error
**Solution:**
1. Make sure file is named `.env.local` (not `.env` or `.env.example`)
2. Make sure it's in the root of the project folder
3. Restart the dev server

### Problem: "Supabase environment variables" error
**Solution:**
1. Check `.env.local` file exists
2. Check values are pasted correctly
3. Make sure there are no extra spaces or quotes
4. Restart dev server: `Ctrl+C` then `npm run dev`

### Problem: Form submits but data doesn't appear
**Solution:**
1. Check browser console (F12 → Console tab)
2. Look for error messages
3. In Supabase, check "Authentication" settings have default role "anon"
4. Verify RLS policies were created (Check → Table Editor → contacts → Policies)

### Problem: No Admin view table visible
**Solution:**
1. Scroll down on the page
2. Table should appear below the form
3. If nothing appears, check browser console for errors
4. Make sure contacts table exists in Supabase

---

## Getting Help

1. **Supabase Documentation:** https://supabase.com/docs
2. **Vite Documentation:** https://vitejs.dev/
3. **React Documentation:** https://react.dev/
4. **Browser Console:** Press F12 to see detailed error messages

---

## Next Steps

After successful setup:
1. ✅ Customize company name (edit `src/App.jsx`)
2. ✅ Change colors (edit `src/App.css`)
3. ✅ Add your logo
4. ✅ Deploy to Vercel or Netlify
5. ✅ Share the link with your team

**You're ready to start collecting contacts!** 🎉
