import { useState, useEffect } from 'react';
import { getWeeklyReflections, addWeeklyReflection, getCurrentWeekNumber, getMondayOfCurrentWeek } from '../utils/supabaseStorage';
import { Link } from 'react-router-dom';

function WeeklyReflections() {
  const [reflections, setReflections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    howDidAnkleFeel: '',
    easiestExercises: '',
    hardestExercises: '',
    painOrDiscomfort: '',
    overallProgress: '',
    additionalNotes: ''
  });

  useEffect(() => {
    loadReflections();
  }, []);

  const loadReflections = async () => {
    const savedReflections = await getWeeklyReflections();
    setReflections(savedReflections);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const monday = getMondayOfCurrentWeek();
    const weekNumber = getCurrentWeekNumber();

    await addWeeklyReflection({
      weekNumber,
      weekEnding: new Date().toISOString(),
      ...formData
    });

    // Reset form
    setFormData({
      howDidAnkleFeel: '',
      easiestExercises: '',
      hardestExercises: '',
      painOrDiscomfort: '',
      overallProgress: '',
      additionalNotes: ''
    });
    setShowForm(false);
    await loadReflections();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-sm sm:text-lg text-retro-primary text-shadow-glow uppercase">
            Weekly Reflections
          </h1>
          <p className="text-[0.4rem] text-retro-muted mt-2">
            Track your progress over time
          </p>
        </div>
        <Link
          to="/"
          className="retro-btn"
        >
          {'<'} Back
        </Link>
      </div>

      {/* Add New Reflection Button */}
      <div className="retro-panel">
        <button
          onClick={() => setShowForm(!showForm)}
          className={`retro-btn w-full ${showForm ? 'retro-btn-danger' : 'retro-btn-success'}`}
        >
          {showForm ? 'Cancel' : '+ New Reflection'}
        </button>
      </div>

      {/* Reflection Form */}
      {showForm && (
        <div className="retro-panel">
          <h2 className="text-[0.6rem] text-retro-primary uppercase mb-6 text-center">
            New Weekly Reflection
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[0.45rem] text-retro-primary mb-2">
                {'>'} How did your ankle feel this week?
              </label>
              <textarea
                name="howDidAnkleFeel"
                value={formData.howDidAnkleFeel}
                onChange={handleChange}
                rows={3}
                className="retro-input resize-none"
                placeholder="Describe how your ankle felt..."
              />
            </div>

            <div>
              <label className="block text-[0.45rem] text-retro-primary mb-2">
                {'>'} Which exercises were easiest?
              </label>
              <textarea
                name="easiestExercises"
                value={formData.easiestExercises}
                onChange={handleChange}
                rows={2}
                className="retro-input resize-none"
                placeholder="List exercises that felt comfortable..."
              />
            </div>

            <div>
              <label className="block text-[0.45rem] text-retro-primary mb-2">
                {'>'} Which exercises were hardest?
              </label>
              <textarea
                name="hardestExercises"
                value={formData.hardestExercises}
                onChange={handleChange}
                rows={2}
                className="retro-input resize-none"
                placeholder="List exercises that were challenging..."
              />
            </div>

            <div>
              <label className="block text-[0.45rem] text-retro-primary mb-2">
                {'>'} Any pain or discomfort to note?
              </label>
              <textarea
                name="painOrDiscomfort"
                value={formData.painOrDiscomfort}
                onChange={handleChange}
                rows={2}
                className="retro-input resize-none"
                placeholder="Describe any pain or concerns..."
              />
            </div>

            <div>
              <label className="block text-[0.45rem] text-retro-primary mb-2">
                {'>'} Overall progress assessment
              </label>
              <textarea
                name="overallProgress"
                value={formData.overallProgress}
                onChange={handleChange}
                rows={2}
                className="retro-input resize-none"
                placeholder="How do you feel about your progress?"
              />
            </div>

            <div>
              <label className="block text-[0.45rem] text-retro-primary mb-2">
                {'>'} Additional notes
              </label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows={3}
                className="retro-input resize-none"
                placeholder="Any other thoughts..."
              />
            </div>

            <button
              type="submit"
              className="retro-btn retro-btn-success w-full"
            >
              Save Reflection
            </button>
          </form>
        </div>
      )}

      {/* Past Reflections */}
      <div className="space-y-4">
        <h2 className="text-[0.6rem] text-retro-primary uppercase">
          * Past Reflections *
        </h2>

        {reflections.length === 0 && !showForm && !isLoading && (
          <div className="retro-panel text-center py-8">
            <p className="text-[0.5rem] text-retro-muted">
              No reflections yet.
            </p>
            <p className="text-[0.45rem] text-retro-primary mt-4">
              Start by adding your first weekly reflection!
            </p>
          </div>
        )}

        {reflections
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((reflection, index) => (
            <div
              key={index}
              className="retro-panel space-y-4"
            >
              <div className="flex items-center justify-between border-b border-retro-secondary pb-3">
                <h3 className="text-[0.55rem] text-retro-primary">
                  Week {reflection.weekNumber}
                </h3>
                <p className="text-[0.4rem] text-retro-muted">{formatDate(reflection.date)}</p>
              </div>

              <div className="space-y-3">
                {reflection.howDidAnkleFeel && (
                  <div>
                    <p className="text-[0.4rem] text-retro-accent">{'>'} How did your ankle feel?</p>
                    <p className="text-[0.4rem] text-retro-primary/80 mt-1 leading-relaxed">{reflection.howDidAnkleFeel}</p>
                  </div>
                )}

                {reflection.easiestExercises && (
                  <div>
                    <p className="text-[0.4rem] text-retro-accent">{'>'} Easiest exercises</p>
                    <p className="text-[0.4rem] text-retro-primary/80 mt-1 leading-relaxed">{reflection.easiestExercises}</p>
                  </div>
                )}

                {reflection.hardestExercises && (
                  <div>
                    <p className="text-[0.4rem] text-retro-accent">{'>'} Hardest exercises</p>
                    <p className="text-[0.4rem] text-retro-primary/80 mt-1 leading-relaxed">{reflection.hardestExercises}</p>
                  </div>
                )}

                {reflection.painOrDiscomfort && (
                  <div>
                    <p className="text-[0.4rem] text-retro-accent">{'>'} Pain or discomfort</p>
                    <p className="text-[0.4rem] text-retro-primary/80 mt-1 leading-relaxed">{reflection.painOrDiscomfort}</p>
                  </div>
                )}

                {reflection.overallProgress && (
                  <div>
                    <p className="text-[0.4rem] text-retro-accent">{'>'} Overall progress</p>
                    <p className="text-[0.4rem] text-retro-primary/80 mt-1 leading-relaxed">{reflection.overallProgress}</p>
                  </div>
                )}

                {reflection.additionalNotes && (
                  <div>
                    <p className="text-[0.4rem] text-retro-accent">{'>'} Additional notes</p>
                    <p className="text-[0.4rem] text-retro-primary/80 mt-1 leading-relaxed">{reflection.additionalNotes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default WeeklyReflections;
