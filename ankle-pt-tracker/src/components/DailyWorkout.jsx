import { useState, useEffect } from 'react';
import { getExercisesForDay, getAllExerciseIdsForDay } from '../data/exercises';
import { toggleExercise, isExerciseCompleted, checkAndResetDailyExercises } from '../utils/storage';

function ExerciseCard({ exercise, isCompleted, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`group cursor-pointer border rounded-lg p-4 transition-all duration-200 ${
        isCompleted
          ? 'bg-emerald-50 border-emerald-300 shadow-sm'
          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-0.5">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
              isCompleted
                ? 'bg-emerald-500 border-emerald-500'
                : 'border-gray-300 group-hover:border-gray-400'
            }`}
          >
            {isCompleted && (
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4
              className={`font-medium ${
                isCompleted ? 'text-emerald-900 line-through' : 'text-gray-900'
              }`}
            >
              {exercise.name}
            </h4>
            {exercise.tag && (
              <span className="flex-shrink-0 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                {exercise.tag}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-1 font-medium">{exercise.details}</p>

          {exercise.description && (
            <p className="text-sm text-gray-500 mt-2 whitespace-pre-line">
              {exercise.description}
            </p>
          )}

          {exercise.cues && exercise.cues.length > 0 && (
            <div className="mt-2 space-y-1">
              {exercise.cues.map((cue, idx) => (
                <p key={idx} className="text-sm text-emerald-700 italic">
                  💡 {cue}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DailyWorkout() {
  const [exercises, setExercises] = useState([]);
  const [completionState, setCompletionState] = useState({});
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    checkAndResetDailyExercises();
    loadExercises();
  }, []);

  const loadExercises = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setCurrentDay(dayNames[dayOfWeek]);

    const todayExercises = getExercisesForDay(dayOfWeek);
    setExercises(todayExercises);

    // Load completion state
    const allExerciseIds = getAllExerciseIdsForDay(dayOfWeek);
    const completion = {};
    allExerciseIds.forEach(id => {
      completion[id] = isExerciseCompleted(id);
    });
    setCompletionState(completion);
  };

  const handleToggle = (exerciseId) => {
    const newState = toggleExercise(exerciseId);
    setCompletionState(prev => ({
      ...prev,
      [exerciseId]: newState
    }));
  };

  const calculateProgress = () => {
    const totalExercises = Object.keys(completionState).length;
    const completed = Object.values(completionState).filter(Boolean).length;
    return { completed, total: totalExercises };
  };

  const { completed, total } = calculateProgress();
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Today's Workout</h2>
            <p className="text-sm text-gray-500 mt-1">{currentDay}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-emerald-600">
              {completed}/{total}
            </div>
            <p className="text-xs text-gray-500">exercises</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {completed === total && total > 0 && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-emerald-700 text-sm font-medium text-center">
              🎉 All exercises completed! Great work!
            </p>
          </div>
        )}
      </div>

      {/* Exercise Sections */}
      {exercises.map((section, sectionIdx) => (
        <div key={sectionIdx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
            {section.note && (
              <p className="text-sm text-gray-600 mt-1">{section.note}</p>
            )}
            {section.goal && (
              <p className="text-sm text-emerald-700 mt-2 font-medium">
                🎯 Goal: {section.goal}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {section.exercises.map(exercise => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isCompleted={completionState[exercise.id] || false}
                onToggle={() => handleToggle(exercise.id)}
              />
            ))}
          </div>
        </div>
      ))}

      {exercises.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 shadow-sm text-center">
          <p className="text-gray-500">No exercises scheduled for today. Enjoy your rest day!</p>
        </div>
      )}
    </div>
  );
}

export default DailyWorkout;
