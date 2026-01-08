import { useState, useEffect } from 'react';
import { getExercisesForDay, getAllExerciseIdsForDay } from '../data/exercises';
import { toggleExercise, getAllExerciseCompletionsForDay, checkAndResetDailyExercises } from '../utils/supabaseStorage';

function ExerciseCard({ exercise, isCompleted, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer border-2 p-4 transition-all duration-200 ${
        isCompleted
          ? 'border-retro-success bg-retro-success/10'
          : 'border-retro-secondary hover:border-retro-primary'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Retro Checkbox */}
        <div className={`retro-checkbox ${isCompleted ? 'checked' : ''}`} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4
              className={`text-[0.5rem] ${
                isCompleted ? 'text-retro-success line-through' : 'text-retro-primary'
              }`}
            >
              {exercise.name}
            </h4>
            {exercise.tag && (
              <span className="flex-shrink-0 text-[0.4rem] px-2 py-1 border border-retro-accent text-retro-accent">
                {exercise.tag}
              </span>
            )}
          </div>

          <p className="text-[0.45rem] text-retro-primary/70 mt-2">{exercise.details}</p>

          {exercise.description && (
            <p className="text-[0.4rem] text-retro-muted mt-2 whitespace-pre-line leading-relaxed">
              {exercise.description}
            </p>
          )}

          {exercise.cues && exercise.cues.length > 0 && (
            <div className="mt-2 space-y-1">
              {exercise.cues.map((cue, idx) => (
                <p key={idx} className="text-[0.4rem] text-retro-accent">
                  {'>'} {cue}
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await checkAndResetDailyExercises();
      await loadExercises();
    };
    init();
  }, []);

  const loadExercises = async () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setCurrentDay(dayNames[dayOfWeek]);

    const todayExercises = getExercisesForDay(dayOfWeek);
    setExercises(todayExercises);

    // Load completion state from Supabase
    const completion = await getAllExerciseCompletionsForDay();
    setCompletionState(completion);
    setIsLoading(false);
  };

  const handleToggle = async (exerciseId) => {
    const newState = await toggleExercise(exerciseId);
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
      {/* Header Panel - Like the reference image PROGRESS screen */}
      <div className="retro-panel">
        <div className="text-center mb-6">
          <h2 className="text-sm sm:text-base text-retro-primary text-shadow-glow uppercase">
            Today's Workout
          </h2>
          <p className="text-[0.5rem] text-retro-muted mt-2">{currentDay}</p>
        </div>

        {/* Progress Display - Like reference image */}
        <div className="flex items-center gap-4">
          <span className="text-retro-secondary text-xs">*</span>
          <div className="flex-1">
            <div className="retro-progress-track">
              <div
                className="retro-progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <span className="text-retro-primary text-[0.6rem] min-w-[60px] text-right">
            {completed} / {total}
          </span>
        </div>

        {/* Completion Message */}
        {completed === total && total > 0 && (
          <div className="mt-6 text-center">
            <p className="text-[0.5rem] text-retro-success text-shadow-glow animate-pulse-slow">
              * ALL EXERCISES COMPLETED! *
            </p>
          </div>
        )}
      </div>

      {/* Exercise Sections */}
      {exercises.map((section, sectionIdx) => (
        <div key={sectionIdx} className="retro-panel">
          <div className="mb-4">
            <h3 className="text-[0.6rem] text-retro-primary uppercase">{section.title}</h3>
            {section.note && (
              <p className="text-[0.4rem] text-retro-muted mt-2">{section.note}</p>
            )}
            {section.goal && (
              <p className="text-[0.45rem] text-retro-accent mt-2">
                {'>'} Goal: {section.goal}
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

      {/* Rest Day Message */}
      {exercises.length === 0 && !isLoading && (
        <div className="retro-panel text-center py-8">
          <p className="text-[0.5rem] text-retro-muted">
            No exercises scheduled for today.
          </p>
          <p className="text-[0.6rem] text-retro-primary mt-4">
            * REST DAY *
          </p>
        </div>
      )}
    </div>
  );
}

export default DailyWorkout;
