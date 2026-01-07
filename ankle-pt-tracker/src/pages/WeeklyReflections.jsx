import { useState, useEffect } from 'react';
import { getWeeklyReflections, addWeeklyReflection, getCurrentWeekNumber, getMondayOfCurrentWeek } from '../utils/storage';
import { Link } from 'react-router-dom';

function WeeklyReflections() {
  const [reflections, setReflections] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

  const loadReflections = () => {
    const savedReflections = getWeeklyReflections();
    setReflections(savedReflections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const monday = getMondayOfCurrentWeek();
    const weekNumber = getCurrentWeekNumber();

    addWeeklyReflection({
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
    loadReflections();
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weekly Reflections</h1>
          <p className="text-gray-600 mt-1">Track your progress and insights over time</p>
        </div>
        <Link
          to="/"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Add New Reflection Button */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors duration-200"
        >
          {showForm ? 'Cancel' : '+ Add Weekly Reflection'}
        </button>
      </div>

      {/* Reflection Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">New Weekly Reflection</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How did your ankle feel this week?
              </label>
              <textarea
                name="howDidAnkleFeel"
                value={formData.howDidAnkleFeel}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                placeholder="Describe how your ankle felt during exercises and daily activities..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Which exercises were easiest?
              </label>
              <textarea
                name="easiestExercises"
                value={formData.easiestExercises}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                placeholder="List exercises that felt comfortable..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Which exercises were hardest?
              </label>
              <textarea
                name="hardestExercises"
                value={formData.hardestExercises}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                placeholder="List exercises that were challenging..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Any pain or discomfort to note?
              </label>
              <textarea
                name="painOrDiscomfort"
                value={formData.painOrDiscomfort}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                placeholder="Describe any pain, discomfort, or concerns..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall progress assessment
              </label>
              <textarea
                name="overallProgress"
                value={formData.overallProgress}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                placeholder="How do you feel about your overall progress this week?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional notes
              </label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                placeholder="Any other thoughts or observations..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Save Reflection
            </button>
          </form>
        </div>
      )}

      {/* Past Reflections */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Past Reflections</h2>

        {reflections.length === 0 && !showForm && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 shadow-sm text-center">
            <p className="text-gray-500">No reflections yet. Start by adding your first weekly reflection!</p>
          </div>
        )}

        {reflections
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((reflection, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Week {reflection.weekNumber}
                  </h3>
                  <p className="text-sm text-gray-500">{formatDate(reflection.date)}</p>
                </div>
              </div>

              <div className="space-y-3">
                {reflection.howDidAnkleFeel && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">How did your ankle feel?</p>
                    <p className="text-sm text-gray-600 mt-1">{reflection.howDidAnkleFeel}</p>
                  </div>
                )}

                {reflection.easiestExercises && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Easiest exercises</p>
                    <p className="text-sm text-gray-600 mt-1">{reflection.easiestExercises}</p>
                  </div>
                )}

                {reflection.hardestExercises && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Hardest exercises</p>
                    <p className="text-sm text-gray-600 mt-1">{reflection.hardestExercises}</p>
                  </div>
                )}

                {reflection.painOrDiscomfort && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Pain or discomfort</p>
                    <p className="text-sm text-gray-600 mt-1">{reflection.painOrDiscomfort}</p>
                  </div>
                )}

                {reflection.overallProgress && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Overall progress</p>
                    <p className="text-sm text-gray-600 mt-1">{reflection.overallProgress}</p>
                  </div>
                )}

                {reflection.additionalNotes && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Additional notes</p>
                    <p className="text-sm text-gray-600 mt-1">{reflection.additionalNotes}</p>
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
