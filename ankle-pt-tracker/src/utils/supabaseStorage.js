import { supabase, getCurrentUserId } from '../lib/supabase';

// Counter functions
export const getCounterDays = async () => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return 0;

    const { data, error } = await supabase
      .from('user_settings')
      .select('counter_days')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching counter:', error);
      return 0;
    }

    return data?.counter_days || 0;
  } catch (err) {
    console.error('Error in getCounterDays:', err);
    return 0;
  }
};

export const setCounterDays = async (days) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return;

    const { error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: userId,
        counter_days: days,
        counter_date: new Date().toISOString(),
        last_check_date: new Date().toISOString().split('T')[0]
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Error setting counter:', error);
    }
  } catch (err) {
    console.error('Error in setCounterDays:', err);
  }
};

export const resetCounter = async () => {
  await setCounterDays(0);
};

export const getCounterDate = async () => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return new Date();

    const { data, error } = await supabase
      .from('user_settings')
      .select('counter_date')
      .eq('user_id', userId)
      .single();

    if (error) return new Date();
    return data?.counter_date ? new Date(data.counter_date) : new Date();
  } catch (err) {
    return new Date();
  }
};

export const checkAndIncrementCounter = async () => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return;

    const { data: settings } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    const today = new Date().toISOString().split('T')[0];
    const lastCheckDate = settings?.last_check_date;

    if (lastCheckDate !== today) {
      const currentDays = settings?.counter_days || 0;
      await setCounterDays(currentDays + 1);
    }
  } catch (err) {
    console.error('Error in checkAndIncrementCounter:', err);
  }
};

// Exercise completion functions
export const toggleExercise = async (exerciseId, date = new Date().toISOString().split('T')[0]) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return false;

    // Check if already exists
    const { data: existing } = await supabase
      .from('exercise_completions')
      .select('*')
      .eq('user_id', userId)
      .eq('exercise_id', exerciseId)
      .eq('completion_date', date)
      .single();

    if (existing) {
      // Toggle completion
      const newState = !existing.completed;
      const { error } = await supabase
        .from('exercise_completions')
        .update({ completed: newState })
        .eq('id', existing.id);

      if (error) console.error('Error updating exercise:', error);
      return newState;
    } else {
      // Create new completion
      const { error } = await supabase
        .from('exercise_completions')
        .insert({
          user_id: userId,
          exercise_id: exerciseId,
          completion_date: date,
          completed: true
        });

      if (error) console.error('Error inserting exercise:', error);
      return true;
    }
  } catch (err) {
    console.error('Error in toggleExercise:', err);
    return false;
  }
};

export const isExerciseCompleted = async (exerciseId, date = new Date().toISOString().split('T')[0]) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return false;

    const { data, error } = await supabase
      .from('exercise_completions')
      .select('completed')
      .eq('user_id', userId)
      .eq('exercise_id', exerciseId)
      .eq('completion_date', date)
      .single();

    if (error) return false;
    return data?.completed || false;
  } catch (err) {
    return false;
  }
};

export const getTodayCompletion = async () => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return {};

    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('exercise_completions')
      .select('*')
      .eq('user_id', userId)
      .eq('completion_date', today);

    if (error) return {};

    const completion = {};
    data?.forEach(item => {
      completion[item.exercise_id] = item.completed;
    });

    return completion;
  } catch (err) {
    return {};
  }
};

export const getAllExerciseCompletionsForDay = async (date = new Date().toISOString().split('T')[0]) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return {};

    const { data, error } = await supabase
      .from('exercise_completions')
      .select('*')
      .eq('user_id', userId)
      .eq('completion_date', date);

    if (error) {
      console.error('Error fetching exercise completions:', error);
      return {};
    }

    const completion = {};
    data?.forEach(item => {
      completion[item.exercise_id] = item.completed;
    });

    return completion;
  } catch (err) {
    console.error('Error in getAllExerciseCompletionsForDay:', err);
    return {};
  }
};

// Weekly reflection functions
export const getWeeklyReflections = async () => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return [];

    const { data, error } = await supabase
      .from('weekly_reflections')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reflections:', error);
      return [];
    }

    return data?.map(reflection => ({
      weekNumber: reflection.week_number,
      date: reflection.created_at,
      weekEnding: reflection.week_ending,
      howDidAnkleFeel: reflection.how_did_ankle_feel,
      easiestExercises: reflection.easiest_exercises,
      hardestExercises: reflection.hardest_exercises,
      painOrDiscomfort: reflection.pain_or_discomfort,
      overallProgress: reflection.overall_progress,
      additionalNotes: reflection.additional_notes
    })) || [];
  } catch (err) {
    console.error('Error in getWeeklyReflections:', err);
    return [];
  }
};

export const addWeeklyReflection = async (reflection) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return;

    const { error } = await supabase
      .from('weekly_reflections')
      .insert({
        user_id: userId,
        week_number: reflection.weekNumber,
        week_ending: reflection.weekEnding || new Date().toISOString(),
        how_did_ankle_feel: reflection.howDidAnkleFeel,
        easiest_exercises: reflection.easiestExercises,
        hardest_exercises: reflection.hardestExercises,
        pain_or_discomfort: reflection.painOrDiscomfort,
        overall_progress: reflection.overallProgress,
        additional_notes: reflection.additionalNotes
      });

    if (error) {
      console.error('Error adding reflection:', error);
    }
  } catch (err) {
    console.error('Error in addWeeklyReflection:', err);
  }
};

// Helper functions
export const checkAndResetDailyExercises = async () => {
  // No-op for Supabase version - exercises are date-based
  return;
};

export const getCurrentWeekNumber = (startDate = new Date('2026-01-06')) => {
  const now = new Date();
  const diffTime = Math.abs(now - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7) + 1;
};

export const getMondayOfCurrentWeek = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(today.setDate(diff));
};

export const isEndOfWeek = () => {
  return new Date().getDay() === 0;
};
