import { useState } from 'react';
import { Button } from './ui';

/**
 * Stress Assessment Form Component
 * Collects user data for stress level prediction
 */
const StressForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    Your_Academic_Stage: '',
    Peer_pressure: '',
    Academic_pressure_from_your_home: '',
    Study_Environment: '',
    Coping_Strategy: '',
    Bad_Habits: '',
    Academic_Competition: ''
  });

  const [errors, setErrors] = useState({});

  const academicStages = ['undergraduate', 'high school', 'post-graduate'];
  const studyEnvironments = ['Peaceful', 'Noisy', 'disrupted'];
  const copingStrategies = [
    'Analyze the situation and handle it with intellect',
    'Social support (friends, family)',
    'Emotional breakdown (crying a lot)'
  ];
  const badHabitsOptions = ['Yes', 'No', 'prefer not to say'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.Your_Academic_Stage) {
      newErrors.Your_Academic_Stage = 'Please select your academic stage';
    }
    if (!formData.Peer_pressure || formData.Peer_pressure < 1 || formData.Peer_pressure > 5) {
      newErrors.Peer_pressure = 'Please enter a value between 1 and 5';
    }
    if (!formData.Academic_pressure_from_your_home || formData.Academic_pressure_from_your_home < 1 || formData.Academic_pressure_from_your_home > 5) {
      newErrors.Academic_pressure_from_your_home = 'Please enter a value between 1 and 5';
    }
    if (!formData.Study_Environment) {
      newErrors.Study_Environment = 'Please select your study environment';
    }
    if (!formData.Coping_Strategy) {
      newErrors.Coping_Strategy = 'Please select your coping strategy';
    }
    if (!formData.Bad_Habits) {
      newErrors.Bad_Habits = 'Please select an option';
    }
    if (!formData.Academic_Competition || formData.Academic_Competition < 1 || formData.Academic_Competition > 5) {
      newErrors.Academic_Competition = 'Please enter a value between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        Peer_pressure: Number(formData.Peer_pressure),
        Academic_pressure_from_your_home: Number(formData.Academic_pressure_from_your_home),
        Academic_Competition: Number(formData.Academic_Competition)
      });
    }
  };

  // Common input styles
  const inputBaseStyles = `
    w-full px-4 py-3 rounded-xl
    bg-white/50 dark:bg-dark-800/50
    border-2 transition-all duration-300
    text-dark-800 dark:text-dark-100
    focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
  `;

  const inputErrorStyles = 'border-red-300 dark:border-red-500/50';
  const inputNormalStyles = 'border-dark-200 dark:border-dark-600';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Academic Stage */}
      <div className="space-y-2">
        <label 
          htmlFor="Your_Academic_Stage"
          className="flex items-center gap-2 text-sm font-medium text-dark-700 dark:text-dark-300"
        >
          <span className="text-lg">🎓</span>
          Academic Stage
        </label>
        <select
          id="Your_Academic_Stage"
          name="Your_Academic_Stage"
          value={formData.Your_Academic_Stage}
          onChange={handleChange}
          className={`${inputBaseStyles} ${errors.Your_Academic_Stage ? inputErrorStyles : inputNormalStyles}`}
        >
          <option value="">Select your academic stage</option>
          {academicStages.map(stage => (
            <option key={stage} value={stage} className="capitalize">{stage}</option>
          ))}
        </select>
        {errors.Your_Academic_Stage && (
          <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.Your_Academic_Stage}
          </p>
        )}
      </div>

      {/* Peer Pressure */}
      <div className="space-y-2">
        <label 
          htmlFor="Peer_pressure"
          className="flex items-center gap-2 text-sm font-medium text-dark-700 dark:text-dark-300"
        >
          <span className="text-lg">👥</span>
          Peer Pressure
          <span className="text-xs text-dark-400 dark:text-dark-500 ml-auto">(1-5)</span>
        </label>
        <input
          type="number"
          id="Peer_pressure"
          name="Peer_pressure"
          min="1"
          max="5"
          value={formData.Peer_pressure}
          onChange={handleChange}
          placeholder="Rate from 1 to 5"
          className={`${inputBaseStyles} ${errors.Peer_pressure ? inputErrorStyles : inputNormalStyles}`}
        />
        {errors.Peer_pressure && (
          <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.Peer_pressure}
          </p>
        )}
      </div>

      {/* Academic Pressure from Home */}
      <div className="space-y-2">
        <label 
          htmlFor="Academic_pressure_from_your_home"
          className="flex items-center gap-2 text-sm font-medium text-dark-700 dark:text-dark-300"
        >
          <span className="text-lg">🏠</span>
          Academic Pressure from Home
          <span className="text-xs text-dark-400 dark:text-dark-500 ml-auto">(1-5)</span>
        </label>
        <input
          type="number"
          id="Academic_pressure_from_your_home"
          name="Academic_pressure_from_your_home"
          min="1"
          max="5"
          value={formData.Academic_pressure_from_your_home}
          onChange={handleChange}
          placeholder="Rate from 1 to 5"
          className={`${inputBaseStyles} ${errors.Academic_pressure_from_your_home ? inputErrorStyles : inputNormalStyles}`}
        />
        {errors.Academic_pressure_from_your_home && (
          <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.Academic_pressure_from_your_home}
          </p>
        )}
      </div>

      {/* Study Environment */}
      <div className="space-y-2">
        <label 
          htmlFor="Study_Environment"
          className="flex items-center gap-2 text-sm font-medium text-dark-700 dark:text-dark-300"
        >
          <span className="text-lg">📚</span>
          Study Environment
        </label>
        <select
          id="Study_Environment"
          name="Study_Environment"
          value={formData.Study_Environment}
          onChange={handleChange}
          className={`${inputBaseStyles} ${errors.Study_Environment ? inputErrorStyles : inputNormalStyles}`}
        >
          <option value="">Select your study environment</option>
          {studyEnvironments.map(env => (
            <option key={env} value={env}>{env}</option>
          ))}
        </select>
        {errors.Study_Environment && (
          <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.Study_Environment}
          </p>
        )}
      </div>

      {/* Coping Strategy */}
      <div className="space-y-2">
        <label 
          htmlFor="Coping_Strategy"
          className="flex items-center gap-2 text-sm font-medium text-dark-700 dark:text-dark-300"
        >
          <span className="text-lg">🧘</span>
          Coping Strategy
        </label>
        <select
          id="Coping_Strategy"
          name="Coping_Strategy"
          value={formData.Coping_Strategy}
          onChange={handleChange}
          className={`${inputBaseStyles} ${errors.Coping_Strategy ? inputErrorStyles : inputNormalStyles}`}
        >
          <option value="">Select your coping strategy</option>
          {copingStrategies.map(strategy => (
            <option key={strategy} value={strategy}>{strategy}</option>
          ))}
        </select>
        {errors.Coping_Strategy && (
          <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.Coping_Strategy}
          </p>
        )}
      </div>

      {/* Bad Habits */}
      <div className="space-y-2">
        <label 
          htmlFor="Bad_Habits"
          className="flex items-center gap-2 text-sm font-medium text-dark-700 dark:text-dark-300"
        >
          <span className="text-lg">🚭</span>
          Bad Habits (smoking, drinking daily)
        </label>
        <select
          id="Bad_Habits"
          name="Bad_Habits"
          value={formData.Bad_Habits}
          onChange={handleChange}
          className={`${inputBaseStyles} ${errors.Bad_Habits ? inputErrorStyles : inputNormalStyles}`}
        >
          <option value="">Select an option</option>
          {badHabitsOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.Bad_Habits && (
          <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.Bad_Habits}
          </p>
        )}
      </div>

      {/* Academic Competition */}
      <div className="space-y-2">
        <label 
          htmlFor="Academic_Competition"
          className="flex items-center gap-2 text-sm font-medium text-dark-700 dark:text-dark-300"
        >
          <span className="text-lg">🏆</span>
          Academic Competition Level
          <span className="text-xs text-dark-400 dark:text-dark-500 ml-auto">(1-5)</span>
        </label>
        <input
          type="number"
          id="Academic_Competition"
          name="Academic_Competition"
          min="1"
          max="5"
          value={formData.Academic_Competition}
          onChange={handleChange}
          placeholder="Rate from 1 to 5"
          className={`${inputBaseStyles} ${errors.Academic_Competition ? inputErrorStyles : inputNormalStyles}`}
        />
        {errors.Academic_Competition && (
          <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.Academic_Competition}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isLoading}
          leftIcon={
            !isLoading && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )
          }
        >
          {isLoading ? 'Analyzing...' : 'Analyze Stress Level'}
        </Button>
      </div>
    </form>
  );
};

export default StressForm;
