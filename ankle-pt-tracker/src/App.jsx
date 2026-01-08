import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { initializeAuth } from './lib/supabase'
import Home from './pages/Home'
import WeeklyReflections from './pages/WeeklyReflections'

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initializeAuth();
      setIsInitialized(true);
    };
    init();
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-retro-dark flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-retro-primary text-lg animate-pulse">
            LOADING...
          </div>
          <div className="flex justify-center gap-1">
            <span className="w-2 h-2 bg-retro-primary animate-blink" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 bg-retro-primary animate-blink" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 bg-retro-primary animate-blink" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-retro-dark relative overflow-hidden">
        {/* Decorative corner accents like in the reference */}
        <div className="fixed top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-retro-accent opacity-50 pointer-events-none" />
        <div className="fixed top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-retro-accent opacity-50 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-retro-accent opacity-50 pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-retro-accent opacity-50 pointer-events-none" />

        {/* Main content */}
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reflections" element={<WeeklyReflections />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
