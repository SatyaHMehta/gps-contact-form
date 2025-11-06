# Quick Start Guide - Geopolymer Solutions Contact Form

## 5-Minute Setup

### Step 1: Install Node.js (if not already installed)
- Download from https://nodejs.org/
- Install with default settings
- Verify: Open terminal and run `node --version`

### Step 2: Get Supabase Credentials
1. Go to https://supabase.com and sign up (free account)
2. Create a new project (name it "GPS-Contact-Form" or similar)
3. Wait for the project to be created (2-3 minutes)
4. Go to **Settings → API** and copy:
   - `Project URL` (looks like: `https://xxxxx.supabase.co`)
   - `anon public` key (looks like: `eyJhbGc...`)

### Step 3: Create the Database Table
1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Paste this code:

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

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public reads" ON contacts FOR SELECT USING (true);
```

4. Click **RUN**

### Step 4: Setup the React App
1. Open terminal and navigate to the project:
   ```bash
   cd "GPS Form"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file (copy from `.env.example`):
   ```bash
   cp .env.example .env.local
   ```

4. Edit `.env.local` and paste your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 5: Run the App
```bash
npm run dev
```

✅ Your app is now running at `http://localhost:5173`

## Features You Get

- 📝 Contact form with validation
- 💾 Data automatically saved to Supabase
- 📱 Fully responsive design
- 🌙 Dark/Light theme toggle
- 👁️ Admin view with contact list
- 🔄 Real-time updates

## Testing the Form

1. Fill out a form entry with test data
2. Click Submit
3. You should see a green success message
4. The contact appears in the table below
5. Check Supabase dashboard to confirm data was saved

## Common Issues

**"Module not found" error**
- Run `npm install` again
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` once more

**"Missing Supabase environment variables"**
- Create `.env.local` file (not `.env`)
- Check you copied the values correctly
- Restart the dev server (`Ctrl+C` then `npm run dev`)

**No data appearing in Supabase**
- Check your RLS policies are enabled (see Step 3)
- Check the browser console for error messages (F12)
- Verify your API key is correct

## Next Steps

- Customize company name in `src/App.jsx`
- Add your logo to `public/` folder
- Change colors in `src/App.css`
- Deploy to Vercel or Netlify

## Need Help?

1. Check the full README.md in the project folder
2. Check Supabase docs: https://supabase.com/docs
3. Check Vite docs: https://vitejs.dev/guide/

---

**Ready to go!** 🚀
