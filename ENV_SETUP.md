# Environment Variables Reference

## What Are Environment Variables?

Environment variables are secure settings that don't get published to GitHub. They contain sensitive information like API keys.

## Setup Instructions

### 1. Create `.env.local` File

In the root of the `GPS Form` folder, create a new file named:
```
.env.local
```

⚠️ **Important Notes:**
- The filename is `.env.local` (with a dot at the beginning)
- It's NOT `.env` and NOT `.env.example`
- It should be in the root directory (same level as `package.json`)
- This file is in `.gitignore` (won't be pushed to GitHub)

### 2. Add Your Supabase Credentials

Copy and paste this into `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here-very-long-string
```

### 3. Replace With Real Values

#### Finding Your Project URL

1. Log in to https://supabase.com
2. Select your project
3. Go to **Settings** (bottom left)
4. Click **API** tab
5. Copy the **Project URL**
   - It looks like: `https://xyzabc123.supabase.co`
6. Paste it into `.env.local`

#### Finding Your Anon Key

1. In same **Settings → API** page
2. Under "Project API keys"
3. Find the **"anon public"** key
4. Copy the long string (starts with `eyJ...`)
5. Paste it into `.env.local`

### 4. Example `.env.local`

```env
VITE_SUPABASE_URL=https://bkrjxvcklmjdpwxnvqah.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrcmp4dmNrbG1qZHB3eG52cWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5NTQyMzAsImV4cCI6MTcxNDUzMDIzMH0.5Yv_dMhXqQxvQ3F3L2p5K8N9O0R1S2T3U4V5W6X7Y8Z
```

## Why Use Environment Variables?

1. **Security** - API keys not exposed in code
2. **Flexibility** - Different keys for development vs. production
3. **Privacy** - Secrets not pushed to GitHub
4. **Safety** - Easy to rotate/change without code changes

## What Happens When You Set These?

1. Vite reads `.env.local` during development
2. Values become available via `import.meta.env`
3. During production build, values get baked into the app
4. The app can communicate with your Supabase database

## File Contents Explained

```env
VITE_SUPABASE_URL=https://bkrjxvcklmjdpwxnvqah.supabase.co
                   ^-- VITE_ prefix means it's public
                   ^-- URL to your Supabase server
```

```env
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsI...
                       ^-- Secret key for anonymous users
                       ^-- Allows form submissions
```

## Troubleshooting

### Problem: "Cannot read property 'VITE_SUPABASE_URL' of undefined"

**Solution:**
1. Check `.env.local` file exists in root folder
2. Filename must be `.env.local` (with dot)
3. Restart dev server: `Ctrl+C` then `npm run dev`
4. Check for typos in variable names

### Problem: "Missing Supabase environment variables"

**Solution:**
1. Verify `.env.local` file exists
2. Check both variables are present
3. No extra spaces or quotes around values
4. Restart dev server

### Problem: Form doesn't save to database

**Solution:**
1. Verify environment variables are set correctly
2. Check in browser console (F12) for error messages
3. Verify Supabase table was created
4. Check RLS policies allow inserts

## Security Best Practices

✅ **DO:**
- Keep `.env.local` in `.gitignore`
- Use strong API keys
- Rotate keys regularly
- Use different keys for different environments

❌ **DON'T:**
- Commit `.env.local` to GitHub
- Share your keys
- Use keys in production with public access
- Display keys in logs

## Different Environments

### Development
Use `.env.local` with your development Supabase project

### Production
After deploying, add environment variables in:
- **Vercel:** Settings → Environment Variables
- **Netlify:** Site settings → Environment
- **AWS:** Environment variables in deployment
- **Other:** Platform-specific settings

Each platform automatically passes these during build.

## Getting Your Keys (Step by Step)

### Step 1: Log Into Supabase
1. Go to https://supabase.com
2. Click your profile
3. Select your project

### Step 2: Find Settings
1. In left sidebar, scroll to bottom
2. Click **Settings** (gear icon)
3. Click **API** tab

### Step 3: Copy URLs and Keys
- **Project URL:** Copy the big URL
- **Anon Public Key:** Copy under "Project API keys"

### Step 4: Paste Into `.env.local`
```env
VITE_SUPABASE_URL=<paste-project-url>
VITE_SUPABASE_ANON_KEY=<paste-anon-key>
```

### Step 5: Restart Dev Server
```bash
Ctrl+C
npm run dev
```

## Verifying Setup

To test if environment variables are loaded:

1. Add this to `src/App.jsx` temporarily:
```javascript
useEffect(() => {
  console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
  console.log("Has Anon Key:", !!import.meta.env.VITE_SUPABASE_ANON_KEY);
}, []);
```

2. Open browser console (F12)
3. You should see:
   - Your Supabase URL
   - "Has Anon Key: true"

4. Remove the code after testing

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Named file `.env` | Rename to `.env.local` |
| Added to GitHub | Add to `.gitignore` |
| Extra spaces in value | Remove spaces |
| Quoted values | Don't use quotes |
| Wrong key (auth vs. anon) | Use the "anon public" key |
| Typo in variable name | Match exactly: `VITE_SUPABASE_URL` |

## Reference Format

Your `.env.local` should look EXACTLY like this:

```
VITE_SUPABASE_URL=https://xyzabc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

No quotes, no trailing spaces, no extra blank lines.

## Need Help?

1. Check `.env.local` exists and has correct name
2. Verify values from Supabase Settings → API
3. Restart dev server
4. Check browser console for errors (F12)
5. See SETUP_GUIDE.md for detailed instructions

---

**You're all set!** The form will now connect to your Supabase database. 🎉
