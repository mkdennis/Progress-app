import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import DailyWorkout from '../components/DailyWorkout';

function Home() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-sm sm:text-lg text-retro-primary text-shadow-glow uppercase text-center sm:text-left">
          Ankle PT Tracker
        </h1>
        <Link
          to="/reflections"
          className="retro-btn"
        >
          Reflections {'>'}
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
