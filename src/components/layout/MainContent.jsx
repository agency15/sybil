import React from 'react';
import { Settings } from 'lucide-react';

const MainContent = ({ children, selectedClient, activeSection }) => {
  const showClientPrompt = !selectedClient && activeSection !== 'chat';

  if (showClientPrompt) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <Settings size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">Please select a client</p>
            <p className="text-sm">Choose a client from the sidebar to view their information</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {activeSection === 'chat' ? (
        children
      ) : (
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default MainContent;
