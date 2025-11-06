# Project Structure Overview

```
GPS Form/
├── src/
│   ├── components/
│   │   ├── Alert.jsx              # Toast notification component
│   │   ├── Alert.css              # Alert styling
│   │   ├── ContactForm.jsx        # Main contact form
│   │   ├── ContactForm.css        # Form styling and responsive layout
│   │   ├── ContactsList.jsx       # Admin view - displays all contacts
│   │   └── ContactsList.css       # Admin table styling
│   ├── pages/
│   │   └── (reserved for future routing)
│   ├── utils/
│   │   └── supabaseClient.js      # Supabase client configuration
│   ├── App.jsx                    # Main app component (header, routing)
│   ├── App.css                    # App-level styles + theme variables
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets (images, icons, etc.)
├── index.html                     # HTML template
├── package.json                   # Project dependencies and scripts
├── vite.config.js                 # Vite build configuration
├── .env.example                   # Template for environment variables
├── .gitignore                     # Git ignore rules
├── README.md                      # Full documentation
├── QUICK_START.md                 # Quick setup guide (5 minutes)
├── SETUP_GUIDE.md                 # Detailed step-by-step setup
└── STRUCTURE.md                   # This file
```

## Key Files Explained

### Frontend Components

**App.jsx**
- Main application component
- Manages theme state (light/dark)
- Coordinates between form and alert components
- Contains header with company branding

**ContactForm.jsx**
- Handles form input and validation
- Validates: name, email, phone (required)
- Submits data to Supabase
- Shows loading state while saving
- Clears form on success

**ContactsList.jsx**
- Displays all submitted contacts
- Real-time subscription to database changes
- Sortable columns (name, company, email, phone, etc.)
- Error handling and retry functionality

**Alert.jsx**
- Toast notification component
- Shows success/error messages
- Auto-dismisses after 5 seconds
- Manually closeable

### Configuration

**supabaseClient.js**
- Initializes Supabase client
- Validates environment variables
- Exports `supabase` instance for use throughout app

**vite.config.js**
- Vite build tool configuration
- React plugin setup
- Development server settings (port 5173)

### Styling

All CSS files use CSS variables for theming:
- `:root[data-theme='light']` - Light theme colors
- `:root[data-theme='dark']` - Dark theme colors

Colors defined:
- Primary colors (buttons, links)
- Background colors
- Text colors
- Input styling
- Border colors

All styles are responsive with media queries for mobile, tablet, and desktop.

## Component Data Flow

```
App.jsx
  ├─ Alert.jsx (receives: message, type)
  ├─ ContactForm.jsx (receives: onSubmitSuccess callback)
  │  └─ submits to Supabase when form is valid
  │
  └─ ContactsList.jsx
     └─ fetches from Supabase
     └─ subscribes to real-time changes
     └─ displays in table format
```

## Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-key
```

These are prefixed with `VITE_` to be accessible in the browser during build.

## Database Schema

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY,                    -- Unique identifier
  name TEXT NOT NULL,                     -- Required
  company TEXT,                           -- Optional
  phone TEXT NOT NULL,                    -- Required
  email TEXT NOT NULL,                    -- Required
  comment TEXT,                           -- Optional
  created_at TIMESTAMP WITH TIME ZONE     -- Auto-generated
);
```

## Build & Development Scripts

From `package.json`:

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Create production build in `dist/` folder
- `npm run preview` - Preview production build locally

## Dependencies

### Production
- `react` - UI framework
- `react-dom` - React DOM rendering
- `@supabase/supabase-js` - Supabase client library

### Development
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - Vite React plugin
- `@types/react` - React TypeScript types
- `@types/react-dom` - React DOM TypeScript types

## Deployment Files

Ready to deploy to:
- **Vercel** - Just connect Git repo
- **Netlify** - Connect Git repo, set build command: `npm run build`
- **Any static host** - Deploy contents of `dist/` folder

## Customization Points

| What | Where | How |
|------|-------|-----|
| Company name | `src/App.jsx` | Change text in header |
| Form fields | `src/components/ContactForm.jsx` | Add/remove inputs |
| Colors | `src/App.css` | Modify CSS variables |
| Button text | `src/components/ContactForm.jsx` | Change submit button label |
| Supabase table | `src/utils/supabaseClient.js` | Different table name in queries |

---

Ready to start developing! 🚀
