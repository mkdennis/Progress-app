# Supabase Setup Instructions

## Important: Run the Database Schema

Before using the app, you need to create the database tables in your Supabase project.

### Steps:

1. **Open your Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project: `qvonnfyzagccvfxtzcyv`

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Schema**
   - Copy the entire contents of `supabase-schema.sql`
   - Paste it into the SQL Editor
   - Click "Run" (or press Cmd/Ctrl + Enter)

4. **Verify Tables Were Created**
   - Click on "Table Editor" in the left sidebar
   - You should see three new tables:
     - `user_settings`
     - `exercise_completions`
     - `weekly_reflections`

### What This Creates

The schema sets up:
- **Tables**: For storing counter data, exercise completions, and weekly reflections
- **Row Level Security (RLS)**: Ensures users can only see and modify their own data
- **Indexes**: For better query performance
- **Triggers**: To automatically update timestamps

### Anonymous Authentication

The app uses Supabase anonymous authentication, which means:
- No login or signup required
- Each browser/device gets a unique anonymous user ID
- Your data is tied to this anonymous user
- Data persists across sessions on the same device

### Troubleshooting

If you see errors in the app:
1. Make sure you ran the SQL schema
2. Check that all three tables exist in your Supabase dashboard
3. Verify that Row Level Security is enabled on all tables
4. Check the browser console for specific error messages

### Data Privacy

- All data is stored securely in your Supabase project
- Row Level Security ensures data isolation between users
- Only you (via your Supabase admin) can access the raw database
