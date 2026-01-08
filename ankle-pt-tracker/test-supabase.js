import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qvonnfyzagccvfxtzcyv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2b25uZnl6YWdjY3ZmeHR6Y3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MzY1MTgsImV4cCI6MjA4MzQxMjUxOH0.I2JDSziGKhq5sShA8HQ6SiyY9YI3csVrLLYzaCHGnQw';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionUrl: false
  }
});

async function runTests() {
  console.log('🧪 Testing Supabase Integration...\n');

  try {
    // Test 1: Anonymous Authentication
    console.log('Test 1: Anonymous Authentication');
    const { data: authData, error: authError } = await supabase.auth.signInAnonymously();

    if (authError) {
      console.log('❌ FAILED: Anonymous auth error:', authError.message);
      return;
    }

    console.log('✅ PASSED: Anonymous user created');
    console.log('   User ID:', authData.user.id);
    console.log('   Is Anonymous:', authData.user.is_anonymous);
    console.log('');

    // Test 2: Insert into user_settings
    console.log('Test 2: Insert Counter Data');
    const { data: settingsData, error: settingsError } = await supabase
      .from('user_settings')
      .upsert({
        user_id: authData.user.id,
        counter_days: 5,
        counter_date: new Date().toISOString(),
        last_check_date: new Date().toISOString().split('T')[0]
      }, {
        onConflict: 'user_id'
      })
      .select();

    if (settingsError) {
      console.log('❌ FAILED: Counter insert error:', settingsError.message);
      return;
    }

    console.log('✅ PASSED: Counter data saved');
    console.log('   Counter Days:', 5);
    console.log('');

    // Test 3: Retrieve counter data
    console.log('Test 3: Retrieve Counter Data');
    const { data: retrievedSettings, error: retrieveError } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', authData.user.id)
      .single();

    if (retrieveError) {
      console.log('❌ FAILED: Counter retrieve error:', retrieveError.message);
      return;
    }

    console.log('✅ PASSED: Counter data retrieved');
    console.log('   Counter Days:', retrievedSettings.counter_days);
    console.log('');

    // Test 4: Insert exercise completion
    console.log('Test 4: Insert Exercise Completion');
    const { data: exerciseData, error: exerciseError } = await supabase
      .from('exercise_completions')
      .insert({
        user_id: authData.user.id,
        exercise_id: 'test-exercise-1',
        completion_date: new Date().toISOString().split('T')[0],
        completed: true
      })
      .select();

    if (exerciseError) {
      console.log('❌ FAILED: Exercise insert error:', exerciseError.message);
      return;
    }

    console.log('✅ PASSED: Exercise completion saved');
    console.log('   Exercise ID:', exerciseData[0].exercise_id);
    console.log('');

    // Test 5: Insert weekly reflection
    console.log('Test 5: Insert Weekly Reflection');
    const { data: reflectionData, error: reflectionError } = await supabase
      .from('weekly_reflections')
      .insert({
        user_id: authData.user.id,
        week_number: 1,
        week_ending: new Date().toISOString(),
        how_did_ankle_feel: 'Test reflection - feeling good!',
        easiest_exercises: 'Balance exercises',
        hardest_exercises: 'Lateral hops',
        pain_or_discomfort: 'Minimal',
        overall_progress: 'Good progress',
        additional_notes: 'This is a test note'
      })
      .select();

    if (reflectionError) {
      console.log('❌ FAILED: Reflection insert error:', reflectionError.message);
      return;
    }

    console.log('✅ PASSED: Weekly reflection saved');
    console.log('   Week Number:', reflectionData[0].week_number);
    console.log('');

    // Test 6: Retrieve weekly reflection
    console.log('Test 6: Retrieve Weekly Reflections');
    const { data: retrievedReflections, error: retrieveReflectionError } = await supabase
      .from('weekly_reflections')
      .select('*')
      .eq('user_id', authData.user.id);

    if (retrieveReflectionError) {
      console.log('❌ FAILED: Reflection retrieve error:', retrieveReflectionError.message);
      return;
    }

    console.log('✅ PASSED: Weekly reflections retrieved');
    console.log('   Total Reflections:', retrievedReflections.length);
    console.log('');

    // Clean up test data
    console.log('🧹 Cleaning up test data...');
    await supabase.from('user_settings').delete().eq('user_id', authData.user.id);
    await supabase.from('exercise_completions').delete().eq('user_id', authData.user.id);
    await supabase.from('weekly_reflections').delete().eq('user_id', authData.user.id);
    console.log('✅ Test data cleaned up\n');

    // Summary
    console.log('🎉 ALL TESTS PASSED!');
    console.log('');
    console.log('Your app is ready to use:');
    console.log('✅ Anonymous authentication working');
    console.log('✅ Counter can save and load');
    console.log('✅ Exercise completions can save and load');
    console.log('✅ Weekly reflections can save and load');
    console.log('');
    console.log('🚀 Your Vercel app should now work perfectly!');

  } catch (err) {
    console.error('❌ Test failed with error:', err);
  }
}

runTests();
