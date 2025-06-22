import React from 'react';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { discoveryFramework } from '../../data/discoveryFramework';
import { getProgressStats, formatDate } from '../../utils/helpers';

const OnboardingProgress = ({ 
  onboardingProgress, 
  onToggleProgress, 
  onViewQuestions, 
  onAskAI, 
  selectedClient 
}) => {
  const stats = getProgressStats(onboardingProgress);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Onboarding Progress</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {stats.completed} of {stats.total} completed
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.percentage}%` }}
            ></div>
          </div>
          <div className="text-sm font-medium text-gray-800">
            {stats.percentage}%
          </div>
        </div>
      </div>
      
      {/* Overall Progress Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">{stats.total - stats.completed}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.percentage}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
      </div>
      
      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(discoveryFramework).map(([key, section]) => {
          const progress = onboardingProgress[key];
          const isCompleted = progress?.completed || false;
          
          return (
            <div key={key} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {section.questions.length} questions in this section
                  </p>
                </div>
                <button
                  onClick={() => onToggleProgress(key)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    isCompleted 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle size={16} />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Clock size={16} />
                      <span>Pending</span>
                    </>
                  )}
                </button>
              </div>
              
              {progress?.completedAt && (
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-4">
                  <Calendar size={12} />
                  <span>Completed on {formatDate(progress.completedAt)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <button
                  onClick={() => onViewQuestions(key)}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  View Questions →
                </button>
                
                <button
                  onClick={() => onAskAI(section.questions[0])}
                  disabled={!selectedClient}
                  className="text-green-500 hover:text-green-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ask AI
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Next Steps */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Next Steps</h3>
        <div className="space-y-2">
          {Object.entries(onboardingProgress)
            .filter(([key, progress]) => !progress.completed)
            .slice(0, 3)
            .map(([key, progress]) => (
              <div key={key} className="flex items-center space-x-2 text-blue-800">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Complete {discoveryFramework[key].title}</span>
              </div>
            ))}
          {Object.values(onboardingProgress).every(p => p.completed) && (
            <div className="flex items-center space-x-2 text-green-800">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">🎉 All discovery sections completed!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingProgress;
