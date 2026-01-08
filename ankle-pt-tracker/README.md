# Ankle PT Progress Tracker

A minimalistic, modern web app to track your ankle physical therapy progress with cloud sync.

## Features

- **Days Since Last Ankle Roll Counter**: Track your injury-free days with automatic daily increments
- **Daily Workout Checklist**: Interactive to-do list interface for your daily PT exercises
- **Weekly Reflections**: Record thoughts, notes, and progress assessments each week
- **Cloud Sync**: Data synced to Supabase - access from any device
- **Anonymous Auth**: No login required - just start using it
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

**⚠️ IMPORTANT**: Before running the app, you must set up the database tables.

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.

**Quick version:**
1. Go to your Supabase SQL Editor
2. Copy and run the contents of `supabase-schema.sql`
3. Verify the three tables were created

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173

### 4. Build for Production

```bash
npm run build
```

## Exercise Schedule

- **Daily (5-7 min)**: Joint awareness exercises (every day)
- **Mon/Wed/Fri (15-20 min)**: Stability + reaction exercises
- **Tue/Thu (5-10 min)**: Knee + chain protection exercises

## Technology Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Anonymous Auth
- **Deployment**: Vercel

## How It Works

### Anonymous Authentication
- Each browser/device gets a unique anonymous user ID
- No signup or login required
- Your data persists across sessions on the same device
- Data is private and isolated using Row Level Security

### Cloud Sync
- All data automatically syncs to Supabase
- Access your progress from any device
- Changes sync in real-time
- Automatic backup - never lose your progress

## Data Storage

All data is stored in Supabase:
- **user_settings**: Counter data and preferences
- **exercise_completions**: Daily exercise check-offs
- **weekly_reflections**: Weekly reflection entries

Row Level Security ensures your data is private and only accessible by you.

## Project Structure

```
ankle-pt-tracker/
├── src/
│   ├── components/
│   │   ├── Counter.jsx          # Counter with reset button
│   │   └── DailyWorkout.jsx     # Exercise checklist
│   ├── pages/
│   │   ├── Home.jsx              # Main page
│   │   └── WeeklyReflections.jsx # Reflections page
│   ├── data/
│   │   └── exercises.js          # PT routine data
│   ├── lib/
│   │   └── supabase.js           # Supabase client
│   ├── utils/
│   │   └── supabaseStorage.js    # Data access functions
│   └── App.jsx                   # Router setup
├── supabase-schema.sql           # Database schema
└── SUPABASE_SETUP.md            # Setup instructions
```

## Deployment

The app is configured for Vercel deployment with proper routing support.

The `vercel.json` files ensure:
- Client-side routing works correctly
- Build runs from subdirectory
- All routes redirect to index.html for React Router

## Troubleshooting

### App shows "Loading..." forever
- Make sure you ran the database schema in Supabase
- Check browser console for errors
- Verify your Supabase project URL and anon key

### Data not saving
- Verify tables were created in Supabase
- Check that Row Level Security policies are active
- Look for errors in browser console

### Build fails
- Make sure all dependencies are installed: `npm install`
- Check that Tailwind CSS v4 and @tailwindcss/postcss are installed
- Verify Node version is 18+

## License

Personal use project - feel free to adapt for your own PT tracking needs!
