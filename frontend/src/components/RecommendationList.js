/**
 * Recommendation List Component
 * Displays personalized recommendations based on stress analysis
 */
const RecommendationList = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center">
          <span className="text-xl">💡</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-dark-800 dark:text-white">
            Recommendations & Guidance
          </h3>
          <p className="text-sm text-dark-500 dark:text-dark-400">
            Personalized tips for you
          </p>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="
              flex gap-4 p-4 rounded-xl
              bg-dark-50 dark:bg-dark-800/50
              border border-dark-100 dark:border-dark-700
              hover:border-primary-200 dark:hover:border-primary-800
              transition-all duration-300
              animate-slide-up
            "
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Number Badge */}
            <div className="
              flex-shrink-0 w-8 h-8 rounded-lg
              bg-gradient-to-br from-primary-500 to-secondary-500
              flex items-center justify-center
              text-white font-bold text-sm
              shadow-soft
            ">
              {index + 1}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              {/* Ayat/Quote Section */}
              {rec.ayat && (
                <div className="flex items-start gap-2">
                  <span className="text-lg flex-shrink-0">📖</span>
                  <p className="text-dark-700 dark:text-dark-200 italic leading-relaxed">
                    "{rec.ayat}"
                  </p>
                </div>
              )}

              {/* Advice Section */}
              {rec.advice && (
                <div className="flex items-start gap-2">
                  <span className="text-lg flex-shrink-0">💬</span>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                    {rec.advice}
                  </p>
                </div>
              )}

              {/* Handle case where recommendation is just a string */}
              {typeof rec === 'string' && (
                <div className="flex items-start gap-2">
                  <span className="text-lg flex-shrink-0">💬</span>
                  <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                    {rec}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
