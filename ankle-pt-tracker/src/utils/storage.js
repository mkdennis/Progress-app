// LocalStorage keys
const KEYS = {
  COUNTER_DATE: 'ankle_pt_counter_date',
  COUNTER_DAYS: 'ankle_pt_counter_days',
  EXERCISE_COMPLETION: 'ankle_pt_exercise_completion',
  WEEKLY_REFLECTIONS: 'ankle_pt_weekly_reflections',
  LAST_CHECK_DATE: 'ankle_pt_last_check_date'
};

// Counter functions
export const getCounterDays = () => {
  const days = localStorage.getItem(KEYS.COUNTER_DAYS);
  return days ? parseInt(days, 10) : 0;
};

export const setCounterDays = (days) => {
  localStorage.setItem(KEYS.COUNTER_DAYS, days.toString());
  localStorage.setItem(KEYS.COUNTER_DATE, new Date().toISOString());
};

export const resetCounter = () => {
  setCounterDays(0);
};

export const getCounterDate = () => {
  const date = localStorage.getItem(KEYS.COUNTER_DATE);
  return date ? new Date(date) : new Date();
};

// Check if we need to increment the counter (new day)
export const checkAndIncrementCounter = () => {
  const lastCheck = localStorage.getItem(KEYS.LAST_CHECK_DATE);
  const today = new Date().toDateString();

  if (lastCheck !== today) {
    const currentDays = getCounterDays();
    setCounterDays(currentDays + 1);
    localStorage.setItem(KEYS.LAST_CHECK_DATE, today);
  }
};

// Exercise completion functions
export const getExerciseCompletion = () => {
  const data = localStorage.getItem(KEYS.EXERCISE_COMPLETION);
  return data ? JSON.parse(data) : {};
};

export const setExerciseCompletion = (completionData) => {
  localStorage.setItem(KEYS.EXERCISE_COMPLETION, JSON.stringify(completionData));
};

export const toggleExercise = (exerciseId, date = new Date().toDateString()) => {
  const completion = getExerciseCompletion();

  if (!completion[date]) {
    completion[date] = {};
  }

  completion[date][exerciseId] = !completion[date][exerciseId];
  setExerciseCompletion(completion);

  return completion[date][exerciseId];
};

export const isExerciseCompleted = (exerciseId, date = new Date().toDateString()) => {
  const completion = getExerciseCompletion();
  return completion[date]?.[exerciseId] || false;
};

export const getTodayCompletion = () => {
  const today = new Date().toDateString();
  const completion = getExerciseCompletion();
  return completion[today] || {};
};

// Reset daily exercises at midnight
export const checkAndResetDailyExercises = () => {
  const lastCheck = localStorage.getItem(KEYS.LAST_CHECK_DATE);
  const today = new Date().toDateString();

  if (lastCheck && lastCheck !== today) {
    // New day detected, but we keep the historical data
    // The daily exercises will show as unchecked for the new day automatically
    localStorage.setItem(KEYS.LAST_CHECK_DATE, today);
  } else if (!lastCheck) {
    localStorage.setItem(KEYS.LAST_CHECK_DATE, today);
  }
};

// Weekly reflection functions
export const getWeeklyReflections = () => {
  const data = localStorage.getItem(KEYS.WEEKLY_REFLECTIONS);
  return data ? JSON.parse(data) : [];
};

export const addWeeklyReflection = (reflection) => {
  const reflections = getWeeklyReflections();
  reflections.push({
    ...reflection,
    date: new Date().toISOString(),
    weekEnding: reflection.weekEnding || new Date().toISOString()
  });
  localStorage.setItem(KEYS.WEEKLY_REFLECTIONS, JSON.stringify(reflections));
};

// Get week number based on start date (Monday as start of week)
export const getCurrentWeekNumber = (startDate = new Date('2026-01-06')) => {
  // Start date should be a Monday
  const now = new Date();
  const diffTime = Math.abs(now - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7) + 1;
};

// Get the Monday of current week
export const getMondayOfCurrentWeek = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(today.setDate(diff));
};

// Check if it's the end of the week (Sunday)
export const isEndOfWeek = () => {
  return new Date().getDay() === 0; // Sunday
};
