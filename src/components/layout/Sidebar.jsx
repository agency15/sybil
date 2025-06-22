import React from 'react';
import { Plus } from 'lucide-react';
import { sidebarSections } from '../../data/sidebarSections';

const Sidebar = ({ 
  clients, 
  selectedClient, 
  onClientChange, 
  activeSection, 
  onSectionChange, 
  onAddClient 
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Sibyl</h1>
        <p className="text-sm text-gray-500">BY AGENCY 15</p>
      </div>
      
      {/* Client Selector */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-2">
          <select
            value={selectedClient}
            onChange={(e) => onClientChange(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {clients.map((client) => (
              <option key={client.id} value={client.value}>
                {client.name}
              </option>
            ))}
          </select>
          <button
            onClick={onAddClient}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 flex items-center justify-center transition-colors"
            title="Add New Client"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {sidebarSections.map((section) => {
            const Icon = section.icon;
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm">{section.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
