/**
 * Result Card Component
 * Displays stress analysis results with visual indicators
 */
const ResultCard = ({ result }) => {
  const { stress_level, stress_category } = result;

  // Get color classes based on stress category
  const getCategoryStyles = (category) => {
    switch (category?.toLowerCase()) {
      case 'low':
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-700 dark:text-green-400',
          border: 'border-green-200 dark:border-green-800',
          fill: 'bg-gradient-to-r from-green-400 to-green-500',
          glow: 'shadow-green-500/20',
        };
      case 'moderate':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          text: 'text-yellow-700 dark:text-yellow-400',
          border: 'border-yellow-200 dark:border-yellow-800',
          fill: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
          glow: 'shadow-yellow-500/20',
        };
      case 'high':
        return {
          bg: 'bg-orange-100 dark:bg-orange-900/30',
          text: 'text-orange-700 dark:text-orange-400',
          border: 'border-orange-200 dark:border-orange-800',
          fill: 'bg-gradient-to-r from-orange-400 to-orange-500',
          glow: 'shadow-orange-500/20',
        };
      case 'critical':
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-700 dark:text-red-400',
          border: 'border-red-200 dark:border-red-800',
          fill: 'bg-gradient-to-r from-red-400 to-red-500',
          glow: 'shadow-red-500/20',
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-900/30',
          text: 'text-gray-700 dark:text-gray-400',
          border: 'border-gray-200 dark:border-gray-800',
          fill: 'bg-gradient-to-r from-gray-400 to-gray-500',
          glow: 'shadow-gray-500/20',
        };
    }
  };

  // Get emoji based on category
  const getCategoryEmoji = (category) => {
    switch (category?.toLowerCase()) {
      case 'low':
        return '😊';
      case 'moderate':
        return '😐';
      case 'high':
        return '😟';
      case 'critical':
        return '😰';
      default:
        return '📊';
    }
  };

  // Calculate progress bar width (assuming scale of 1-10)
  const getProgressWidth = () => {
    return Math.min((stress_level / 10) * 100, 100);
  };

  const styles = getCategoryStyles(stress_category);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-primary-500 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-dark-800 dark:text-white">
            Your Stress Analysis
          </h3>
          <p className="text-sm text-dark-500 dark:text-dark-400">
            Based on your responses
          </p>
        </div>
      </div>

      {/* Stress Meter */}
      <div className="p-5 rounded-xl bg-dark-50 dark:bg-dark-800/50 space-y-4">
        {/* Meter Header */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-dark-600 dark:text-dark-300">
            Stress Level
          </span>
          <span className={`text-2xl font-bold ${styles.text}`}>
            {stress_level?.toFixed(2)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-4 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${styles.fill} rounded-full transition-all duration-1000 ease-out shadow-lg ${styles.glow}`}
              style={{ width: `${getProgressWidth()}%` }}
            />
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between text-xs text-dark-400 dark:text-dark-500">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
          <span>Critical</span>
        </div>
      </div>

      {/* Category Badge */}
      <div className={`
        flex items-center justify-center gap-3 p-4 rounded-xl
        ${styles.bg} ${styles.border} border-2
        animate-scale-in
      `}>
        <span className="text-4xl">{getCategoryEmoji(stress_category)}</span>
        <div className="text-center">
          <p className="text-sm text-dark-500 dark:text-dark-400">Your stress level is</p>
          <p className={`text-2xl font-bold capitalize ${styles.text}`}>
            {stress_category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
