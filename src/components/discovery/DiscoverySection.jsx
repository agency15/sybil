import React, { useState } from 'react';
import { Download, Target } from 'lucide-react';
import { discoveryFramework } from '../../data/discoveryFramework';

const DiscoverySection = ({ 
  selectedClient, 
  onQuickAction, 
  onSwitchToChat 
}) => {
  const [selectedDiscoverySection, setSelectedDiscoverySection] = useState('');

  const handleAskAI = (question) => {
    onQuickAction(question);
    onSwitchToChat();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Discovery Framework</h2>
        <button
          onClick={() => alert('Export functionality coming soon!')}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2 transition-colors"
        >
          <Download size={20} />
          <span>Export Report</span>
        </button>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Discovery Section
        </label>
        <select
          value={selectedDiscoverySection}
          onChange={(e) => setSelectedDiscoverySection(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a section to analyze...</option>
          {Object.entries(discoveryFramework).map(([key, section]) => (
            <option key={key} value={key}>
              {section.title}
            </option>
          ))}
        </select>
      </div>

      {selectedDiscoverySection ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium mb-4">
              {discoveryFramework[selectedDiscoverySection].title}
            </h3>
            <div className="space-y-3">
              {discoveryFramework[selectedDiscoverySection].questions.map((question, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">{question}</p>
                    <button
                      onClick={() => handleAskAI(question)}
                      disabled={!selectedClient}
                      className="text-blue-500 hover:text-blue-600 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Ask AI →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Target size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">Select a discovery section to analyze</p>
          <p className="text-sm">Choose from the framework sections above to get AI-powered insights</p>
        </div>
      )}
    </div>
  );
};

export default DiscoverySection;
