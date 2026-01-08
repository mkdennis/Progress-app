import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qvonnfyzagccvfxtzcyv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2b25uZnl6YWdjY3ZmeHR6Y3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MzY1MTgsImV4cCI6MjA4MzQxMjUxOH0.I2JDSziGKhq5sShA8HQ6SiyY9YI3csVrLLYzaCHGnQw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionUrl: false
  }
});

// Initialize anonymous session
export const initializeAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error('Error signing in anonymously:', error);
      return null;
    }
    return data.session;
  }

  return session;
};

// Get current user ID
export const getCurrentUserId = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.id || null;
};
