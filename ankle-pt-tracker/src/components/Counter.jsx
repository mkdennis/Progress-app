import { useState, useEffect } from 'react';
import { getCounterDays, resetCounter, checkAndIncrementCounter } from '../utils/supabaseStorage';

function Counter() {
  const [days, setDays] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCounter = async () => {
      await checkAndIncrementCounter();
      const counterDays = await getCounterDays();
      setDays(counterDays);
      setIsLoading(false);
    };
    loadCounter();
  }, []);

  const handleReset = () => {
    setShowConfirm(true);
  };

  const confirmReset = async () => {
    await resetCounter();
    setDays(0);
    setShowConfirm(false);
  };

  const cancelReset = () => {
    setShowConfirm(false);
  };

  return (
    <div className="w-full">
      {/* Main Counter Display */}
      <div className="retro-panel">
        <div className="text-center space-y-6">
          <h2 className="text-[0.5rem] sm:text-xs text-retro-primary uppercase tracking-wider">
            Days Since Last Ankle Roll
          </h2>

          {/* Big Number Display */}
          <div className="py-4">
            <span className="text-6xl sm:text-8xl text-retro-primary text-shadow-glow tabular-nums">
              {isLoading ? '--' : days}
            </span>
          </div>

          {/* Status Message */}
          {days > 0 && !isLoading && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-retro-secondary">*</span>
              <p className="text-[0.5rem] text-retro-success">
                {days === 1 ? '1 day strong!' : `${days} days strong!`}
              </p>
              <span className="text-retro-secondary">*</span>
            </div>
          )}
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-6 text-center space-y-3">
        <button
          onClick={handleReset}
          className="retro-btn retro-btn-danger"
        >
          Reset Counter
        </button>
        <p className="text-[0.4rem] text-retro-muted">
          (Hope you don't need this!)
        </p>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="retro-panel max-w-md w-full">
            <h3 className="text-xs text-retro-danger mb-4 text-center">
              ! WARNING !
            </h3>
            <p className="text-[0.5rem] text-retro-primary mb-6 text-center leading-relaxed">
              Did you roll your ankle? This will reset the counter to 0.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={cancelReset}
                className="retro-btn"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="retro-btn retro-btn-danger"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Counter;
