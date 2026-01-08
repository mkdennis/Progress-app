import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://qvonnfyzagccvfxtzcyv.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2b25uZnl6YWdjY3ZmeHR6Y3l2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzgzNjUxOCwiZXhwIjoyMDgzNDEyNTE4fQ.2Wok66iRDdYeW2R6lUlCc287sIv_-junr6ebpMbQ5lQ';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  console.log('🚀 Running database migration...\n');

  try {
    // Create user_settings table
    console.log('Creating user_settings table...');
    const { error: error1 } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS user_settings (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          counter_days INTEGER DEFAULT 0,
          counter_date TIMESTAMPTZ DEFAULT NOW(),
          last_check_date DATE DEFAULT CURRENT_DATE,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW(),
          UNIQUE(user_id)
        );

        ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

        DROP POLICY IF EXISTS "Users can view their own settings" ON user_settings;
        CREATE POLICY "Users can view their own settings" ON user_settings FOR SELECT USING (auth.uid() = user_id);

        DROP POLICY IF EXISTS "Users can insert their own settings" ON user_settings;
        CREATE POLICY "Users can insert their own settings" ON user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);

        DROP POLICY IF EXISTS "Users can update their own settings" ON user_settings;
        CREATE POLICY "Users can update their own settings" ON user_settings FOR UPDATE USING (auth.uid() = user_id);
      `
    });

    if (error1 && !error1.message.includes('does not exist')) {
      console.error('❌ Error creating user_settings:', error1);
    } else {
      console.log('✅ user_settings table created\n');
    }

    // Create exercise_completions table
    console.log('Creating exercise_completions table...');
    const { error: error2 } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS exercise_completions (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          exercise_id TEXT NOT NULL,
          completion_date DATE NOT NULL,
          completed BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW(),
          UNIQUE(user_id, exercise_id, completion_date)
        );

        ALTER TABLE exercise_completions ENABLE ROW LEVEL SECURITY;

        DROP POLICY IF EXISTS "Users can view their own exercise completions" ON exercise_completions;
        CREATE POLICY "Users can view their own exercise completions" ON exercise_completions FOR SELECT USING (auth.uid() = user_id);

        DROP POLICY IF EXISTS "Users can insert their own exercise completions" ON exercise_completions;
        CREATE POLICY "Users can insert their own exercise completions" ON exercise_completions FOR INSERT WITH CHECK (auth.uid() = user_id);

        DROP POLICY IF EXISTS "Users can update their own exercise completions" ON exercise_completions;
        CREATE POLICY "Users can update their own exercise completions" ON exercise_completions FOR UPDATE USING (auth.uid() = user_id);

        DROP POLICY IF EXISTS "Users can delete their own exercise completions" ON exercise_completions;
        CREATE POLICY "Users can delete their own exercise completions" ON exercise_completions FOR DELETE USING (auth.uid() = user_id);
      `
    });

    if (error2 && !error2.message.includes('does not exist')) {
      console.error('❌ Error creating exercise_completions:', error2);
    } else {
      console.log('✅ exercise_completions table created\n');
    }

    // Create weekly_reflections table
    console.log('Creating weekly_reflections table...');
    const { error: error3 } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS weekly_reflections (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          week_number INTEGER NOT NULL,
          week_ending TIMESTAMPTZ NOT NULL,
          how_did_ankle_feel TEXT,
          easiest_exercises TEXT,
          hardest_exercises TEXT,
          pain_or_discomfort TEXT,
          overall_progress TEXT,
          additional_notes TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        ALTER TABLE weekly_reflections ENABLE ROW LEVEL SECURITY;

        DROP POLICY IF EXISTS "Users can view their own reflections" ON weekly_reflections;
        CREATE POLICY "Users can view their own reflections" ON weekly_reflections FOR SELECT USING (auth.uid() = user_id);

        DROP POLICY IF EXISTS "Users can insert their own reflections" ON weekly_reflections;
        CREATE POLICY "Users can insert their own reflections" ON weekly_reflections FOR INSERT WITH CHECK (auth.uid() = user_id);

        DROP POLICY IF EXISTS "Users can update their own reflections" ON weekly_reflections;
        CREATE POLICY "Users can update their own reflections" ON weekly_reflections FOR UPDATE USING (auth.uid() = user_id);

        DROP POLICY IF EXISTS "Users can delete their own reflections" ON weekly_reflections;
        CREATE POLICY "Users can delete their own reflections" ON weekly_reflections FOR DELETE USING (auth.uid() = user_id);
      `
    });

    if (error3 && !error3.message.includes('does not exist')) {
      console.error('❌ Error creating weekly_reflections:', error3);
    } else {
      console.log('✅ weekly_reflections table created\n');
    }

    console.log('🎉 Migration completed successfully!');
    console.log('\n📊 Tables created:');
    console.log('  - user_settings');
    console.log('  - exercise_completions');
    console.log('  - weekly_reflections');
    console.log('\n🔒 Row Level Security policies enabled');
    console.log('\n✨ Your app should now work correctly!');

  } catch (err) {
    console.error('❌ Migration failed:', err);
    console.log('\n💡 Please run the SQL manually in Supabase Dashboard → SQL Editor');
    console.log('See supabase-schema.sql for the full schema');
    process.exit(1);
  }
}

runMigration();
