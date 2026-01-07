import { useState, useEffect } from 'react';
import { getCounterDays, resetCounter, checkAndIncrementCounter } from '../utils/storage';

function Counter() {
  const [days, setDays] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    // Check and increment counter on load
    checkAndIncrementCounter();
    setDays(getCounterDays());
  }, []);

  const handleReset = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    resetCounter();
    setDays(0);
    setShowConfirm(false);
  };

  const cancelReset = () => {
    setShowConfirm(false);
  };

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-8 shadow-sm">
        <div className="text-center space-y-4">
          <h2 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">
            Days Since Last Ankle Roll
          </h2>
          <div className="text-8xl font-bold text-emerald-600 tabular-nums">
            {days}
          </div>
          {days > 0 && (
            <p className="text-emerald-600 text-sm">
              {days === 1 ? '1 day strong!' : `${days} days strong!`} Keep it up! 💪
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Reset Counter
        </button>
        <p className="text-xs text-gray-500 mt-2">
          (Hope you don't need this! 🤞)
        </p>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Reset Counter?
            </h3>
            <p className="text-gray-600 mb-6">
              Did you roll your ankle? This will reset the counter to 0.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelReset}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
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
