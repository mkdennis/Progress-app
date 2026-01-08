import { readFileSync } from 'fs';

const supabaseUrl = 'https://qvonnfyzagccvfxtzcyv.supabase.co';
const supabaseProjectRef = 'qvonnfyzagccvfxtzcyv';

// Note: This requires the service_role key with admin privileges
// The anon key cannot execute DDL statements
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable not set');
  console.log('\nPlease run the migration manually:');
  console.log('1. Go to https://supabase.com/dashboard/project/' + supabaseProjectRef);
  console.log('2. Click "SQL Editor" in the sidebar');
  console.log('3. Click "New Query"');
  console.log('4. Copy the contents of supabase-schema.sql');
  console.log('5. Paste and click "Run"');
  console.log('\nOr set your service role key and run this script:');
  console.log('export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"');
  console.log('node migrate.js');
  process.exit(1);
}

async function runMigration() {
  try {
    console.log('📖 Reading SQL schema...');
    const sql = readFileSync('./supabase-schema.sql', 'utf-8');

    console.log('🚀 Executing database migration...');

    // Use the Supabase Management API to execute SQL
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ query: sql })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Migration failed:', error);
      console.log('\n💡 Tip: Run the SQL manually in Supabase Dashboard → SQL Editor');
      process.exit(1);
    }

    console.log('✅ Migration completed successfully!');
    console.log('\n📊 Tables created:');
    console.log('  - user_settings');
    console.log('  - exercise_completions');
    console.log('  - weekly_reflections');
    console.log('\n🔒 Row Level Security policies enabled');
    console.log('🎉 Your database is ready!');

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('\n💡 Tip: Run the SQL manually in Supabase Dashboard → SQL Editor');
    process.exit(1);
  }
}

runMigration();
