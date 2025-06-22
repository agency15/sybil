import React from 'react';

const quickActionsList = [
  "What's their target audience?",
  "Show brand guidelines",
  "Meeting summary",
  "Generate ICP"
];

const QuickActions = ({ onQuickAction, disabled }) => {
  return (
    <div className="mt-4 pt-4 border-t bg-gray-50 rounded-lg p-3">
      <p className="text-xs text-gray-500 mb-2">Quick Actions:</p>
      <div className="flex flex-wrap gap-2">
        {quickActionsList.map((action, index) => (
          <button
            key={index}
            onClick={() => onQuickAction(action)}
            disabled={disabled}
            className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
