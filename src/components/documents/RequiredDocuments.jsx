import React from 'react';
import { FileText, Copy } from 'lucide-react';
import { requiredDocuments } from '../../data/requiredDocuments';

const RequiredDocuments = () => {
  const handleCopyAll = async () => {
    const checklist = `REQUIRED DOCUMENTS CHECKLIST\n\n${Object.entries(requiredDocuments).map(([key, section]) => 
      `${section.title.toUpperCase()}\n${section.items.map(item => `• ${item}`).join('\n')}`
    ).join('\n\n')}`;
    
    try {
      await navigator.clipboard.writeText(checklist);
      alert('Complete documents checklist copied to clipboard!');
    } catch (err) {
      alert('Failed to copy checklist. Please try again.');
    }
  };

  const handleCopySection = async (section) => {
    const sectionItems = section.items.map(item => `• ${item}`).join('\n');
    const sectionText = `${section.title.toUpperCase()}\n${sectionItems}`;
    
    try {
      await navigator.clipboard.writeText(sectionText);
      alert(`${section.title} checklist copied!`);
    } catch (err) {
      alert('Failed to copy section. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Required Documents & Assets</h2>
        <button
          onClick={handleCopyAll}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2 transition-colors"
        >
          <Copy size={20} />
          <span>Copy Checklist</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(requiredDocuments).map(([key, section]) => (
          <div key={key} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium mb-4 text-gray-800">{section.title}</h3>
            <div className="space-y-2 mb-4">
              {section.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-4 h-4 border-2 border-gray-300 rounded mt-1"></div>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => handleCopySection(section)}
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                Copy Section
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">How to Use This Checklist</h3>
        <div className="space-y-2 text-blue-800 text-sm">
          <p>• Send this checklist to clients before your discovery meeting</p>
          <p>• Use it as a reference during client onboarding calls</p>
          <p>• Check off items as you receive them to track progress</p>
          <p>• Copy individual sections for targeted requests</p>
        </div>
      </div>
    </div>
  );
};

export default RequiredDocuments;
