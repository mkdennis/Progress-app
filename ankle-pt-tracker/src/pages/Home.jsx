import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import DailyWorkout from '../components/DailyWorkout';

function Home() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Ankle PT Tracker</h1>
        <Link
          to="/reflections"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Weekly Reflections →
        </Link>
      </div>

      {/* Counter */}
      <Counter />

      {/* Daily Workout */}
      <DailyWorkout />
    </div>
  );
}

export default Home;
