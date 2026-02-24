import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button, Card } from '../components/ui';
import StressForm from '../components/StressForm';
import ResultCard from '../components/ResultCard';
import RecommendationList from '../components/RecommendationList';

/**
 * Dashboard Page Component
 * Main application page after login
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Stress assessment state
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handle stress form submission
   */
  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message || 'Failed to get prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset assessment
   */
  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen animated-bg">
      {/* Decorative floating elements */}
      <div className="float-element w-96 h-96 bg-primary-400 -top-48 -left-48 animate-float" />
      <div className="float-element w-72 h-72 bg-secondary-400 top-1/2 -right-36 animate-float-slow" />
      <div className="float-element w-64 h-64 bg-accent-400 -bottom-32 left-1/4 animate-float" />

      {/* Navigation Header */}
      <header className="relative z-20 px-6 py-4">
        <nav className="max-w-7xl mx-auto">
          <Card variant="glass" padding="sm" className="px-6">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <span className="text-xl">🧠</span>
                </div>
                <div>
                  <h1 className="font-bold text-dark-800 dark:text-white">
                    Stress Analyzer
                  </h1>
                  <p className="text-xs text-dark-500 dark:text-dark-400">
                    Student Mental Health
                  </p>
                </div>
              </div>

              {/* User info & actions */}
              <div className="flex items-center gap-4">
                {/* Dark mode toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-dark-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>

                {/* User dropdown */}
                <div className="flex items-center gap-3 pl-4 border-l border-dark-200 dark:border-dark-700">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-dark-800 dark:text-white">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-dark-500 dark:text-dark-400">
                      {user?.email}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="ml-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-800 dark:text-white mb-3">
              Welcome back, <span className="gradient-text">{user?.firstName}</span>! 👋
            </h2>
            <p className="text-dark-500 dark:text-dark-400 max-w-2xl mx-auto">
              Ready to check your stress levels? Complete the assessment below to get personalized insights and recommendations.
            </p>
          </div>

          {/* Content - Centered Form */}
          <div className="max-w-2xl mx-auto animate-slide-up">
            <Card variant="glass" padding="lg">
              {!result ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark-800 dark:text-white">
                        Stress Assessment
                      </h3>
                      <p className="text-sm text-dark-500 dark:text-dark-400">
                        Answer a few questions about your current state
                      </p>
                    </div>
                  </div>
                  <StressForm onSubmit={handleSubmit} isLoading={isLoading} />
                </>
              ) : (
                <div className="space-y-6">
                  <ResultCard result={result} />
                  <RecommendationList recommendations={result.recommendations} />
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={handleReset}
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    }
                  >
                    Take New Assessment
                  </Button>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-medium text-red-800 dark:text-red-200">{error}</p>
                      <button
                        onClick={handleReset}
                        className="text-sm text-red-600 dark:text-red-400 hover:underline mt-1"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-6 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-dark-500 dark:text-dark-400 text-sm">
            © 2025 Student Stress Analyzer. Take care of your mental health 💚
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
