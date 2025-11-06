# Geopolymer Solutions - Contact Form

A modern, responsive single-page web application for collecting contact information at conventions. Built with React (Vite) and Supabase for secure data storage.

## Features

✨ **Clean, Professional Design**
- Responsive layout that works on all devices
- Light/Dark theme toggle
- Modern UI with smooth animations

📝 **Smart Form**
- Full Name, Company, Phone, Email, and Comments fields
- Real-time field validation
- Form validation with clear error messages
- Disabled submit button during submission

💾 **Secure Data Storage**
- Built-in Supabase integration
- Database table with timestamps
- Real-time data sync

👁️ **Admin View**
- View all submitted contacts in a table
- Real-time updates as new submissions come in
- Sortable and filterable contact list

## Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- A **Supabase** account - [Sign up free](https://supabase.com)

## Setup Instructions

### 1. Clone or Extract the Project

```bash
cd GPS\ Form
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project" and follow the setup wizard
3. Note your **Project URL** and **Anon Key**

#### Create the Contacts Table
1. In the Supabase dashboard, go to **SQL Editor**
2. Click "New Query" and paste this SQL:

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

-- Create an index for faster queries
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserts from anonymous users (for form submissions)
CREATE POLICY "Allow public inserts" ON contacts FOR INSERT
  WITH CHECK (true);

-- Create a policy to allow reading all contacts (for admin view)
CREATE POLICY "Allow public reads" ON contacts FOR SELECT
  USING (true);
```

3. Click "RUN" to execute the query

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Open `.env.local` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from the Supabase dashboard.

### 5. Run the Development Server

```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:5173`

## Project Structure

```
GPS Form/
├── src/
│   ├── components/
│   │   ├── ContactForm.jsx       # Main form component
│   │   ├── ContactForm.css
│   │   ├── ContactsList.jsx      # Admin view component
│   │   ├── ContactsList.css
│   │   ├── Alert.jsx             # Alert/Toast component
│   │   └── Alert.css
│   ├── pages/
│   │   └── (for future routing)
│   ├── utils/
│   │   └── supabaseClient.js    # Supabase configuration
│   ├── App.jsx                   # Main app component
│   ├── App.css                   # App styling with theme variables
│   ├── main.jsx                  # Entry point
│   └── index.css
├── public/                       # Static assets
├── index.html                    # HTML template
├── package.json
├── vite.config.js               # Vite configuration
├── .env.example                 # Environment variables template
├── .gitignore
└── README.md
```

## Usage

### Collecting Contact Information

1. Open the application in your browser
2. Fill out the form with visitor information:
   - **Full Name** (required)
   - **Company** (optional)
   - **Email Address** (required, must be valid)
   - **Phone Number** (required)
   - **Comments/Notes** (optional)
3. Click **Submit**
4. You'll see a success message if the submission was successful
5. The form will automatically clear for the next visitor

### Viewing Submitted Contacts

The contacts list is displayed at the bottom of the page and:
- Shows all submitted contacts with their information
- Updates in real-time as new submissions come in
- Allows clicking on email addresses and phone numbers for quick contact

### Theme Toggle

Click the sun/moon icon (☀️/🌙) in the header to switch between light and dark themes. Your preference is automatically saved.

## Building for Production

To create a production build:

```bash
npm run build
```

This will generate an optimized build in the `dist/` folder ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel settings
4. Deploy automatically on each push

### Netlify
1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify settings

### Other Platforms
The `dist/` folder can be deployed to any static hosting service (AWS S3, GitHub Pages, etc.)

## API Reference

### ContactForm Component

Submits contact information to Supabase.

**Props:**
- `onSubmitSuccess(message, type)` - Callback when form is submitted (success or error)

### ContactsList Component

Displays all submitted contacts with real-time updates.

**Features:**
- Real-time subscription to new inserts
- Error handling and retry functionality
- Responsive table layout

## Customization

### Change Company Name
Edit `src/App.jsx` and update the title and subtitle:

```jsx
<h1 className="app-title">Your Company Name</h1>
<p className="app-subtitle">Your Subtitle</p>
```

### Modify Form Fields
Edit `src/components/ContactForm.jsx` to add, remove, or modify fields.

### Change Colors
Edit `src/App.css` and update the CSS variables for `light` and `dark` themes:

```css
:root[data-theme='light'] {
  --primary-color: #3b82f6;
  /* ...more colors... */
}
```

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure you have `.env.local` file in the project root
- Verify the values are correct from your Supabase dashboard
- Restart the development server after updating `.env.local`

### Form submissions not being saved
1. Check the browser console (F12) for error messages
2. Verify the Supabase table was created correctly
3. Check that Row Level Security policies allow inserts
4. Ensure your `VITE_SUPABASE_ANON_KEY` has permission to insert records

### Real-time updates not working
- Verify Supabase real-time is enabled for the `contacts` table
- Check your internet connection
- Look for errors in the browser console

## Security Notes

⚠️ **Important**: The `VITE_SUPABASE_ANON_KEY` is exposed in the browser. For production:

1. Enable Row Level Security (RLS) on your Supabase tables
2. Configure policies to restrict access appropriately
3. Consider adding rate limiting for form submissions
4. Monitor your Supabase usage to prevent abuse

## Support

For issues or questions:
1. Check the [Supabase documentation](https://supabase.com/docs)
2. Check the [Vite documentation](https://vitejs.dev)
3. Review error messages in the browser console (F12)

## License

© 2025 Geopolymer Solutions. All rights reserved.

---

**Last Updated:** November 5, 2025
