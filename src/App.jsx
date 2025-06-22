import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import ChatSection from './components/chat/ChatSection';
import DiscoverySection from './components/discovery/DiscoverySection';
import RequiredDocuments from './components/documents/RequiredDocuments';
import DocumentsSection from './components/documents/DocumentsSection';
import OnboardingProgress from './components/progress/OnboardingProgress';
import CredentialsSection from './components/credentials/CredentialsSection';
import Modal from './components/common/Modal';
import { useClients } from './hooks/useClients';
import { useChat } from './hooks/useChat';
import { useFileUpload } from './hooks/useFileUpload';
import { useProgress } from './hooks/useProgress';
import { Briefcase } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('chat');
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');

  // Custom hooks
  const {
    clients,
    selectedClient,
    addClient,
    selectClient,
    getSelectedClient
  } = useClients();

  const { 
    uploadedFiles, 
    processedDocuments, 
    handleFileUpload,
    deleteFile
  } = useFileUpload();

  const {
    chatMessages,
    currentMessage,
    setCurrentMessage,
    sendMessage,
    handleQuickAction,
    isLoading
  } = useChat(selectedClient, clients, processedDocuments);

  const {
    onboardingProgress,
    toggleProgressItem
  } = useProgress();

  // Handlers
  const handleAddClient = () => {
    if (newClientName.trim()) {
      const newClient = addClient(newClientName);
      if (newClient) {
        selectClient(newClient.value);
        setNewClientName('');
        setShowAddClientModal(false);
      } else {
        alert('Client already exists or invalid name');
      }
    }
  };

  const handleSwitchToChat = () => {
    setActiveSection('chat');
  };

  const handleViewQuestions = (sectionKey) => {
    setActiveSection('discovery');
  };

  const handleAskAI = (question) => {
    handleQuickAction(question);
    setActiveSection('chat');
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'chat':
        return (
          <ChatSection
            chatMessages={chatMessages}
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            onSendMessage={sendMessage}
            onQuickAction={handleQuickAction}
            selectedClient={selectedClient}
            isLoading={isLoading}
          />
        );
      
      case 'discovery':
        return (
          <DiscoverySection
            selectedClient={selectedClient}
            onQuickAction={handleQuickAction}
            onSwitchToChat={handleSwitchToChat}
          />
        );
      
      case 'documents-checklist':
        return <RequiredDocuments />;
      
      case 'documents':
      case 'brand-assets':
      case 'transcripts':
      case 'legal':
        const sectionTitles = {
          'documents': 'Brand Documents',
          'brand-assets': 'Brand Assets',
          'transcripts': 'Meeting Transcripts',
          'legal': 'Legal & Technical'
        };
        return (
          <DocumentsSection
            sectionTitle={sectionTitles[activeSection] || 'Documents'}
            uploadedFiles={uploadedFiles}
            onFileUpload={handleFileUpload}
            onDeleteFile={deleteFile}
          />
        );
      
      case 'logins':
        return <CredentialsSection />;
      
      case 'progress':
        return (
          <OnboardingProgress
            onboardingProgress={onboardingProgress}
            onToggleProgress={toggleProgressItem}
            onViewQuestions={handleViewQuestions}
            onAskAI={handleAskAI}
            selectedClient={selectedClient}
          />
        );
      
      case 'strategy':
        return (
          <div className="p-6 text-center py-12 text-gray-500">
            <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold mb-2">ICP & Strategy Module</h2>
            <p>This advanced section is under development</p>
            <p className="text-sm mt-2">Will include AI-powered ICP generation and strategic recommendations</p>
          </div>
        );
      
      default:
        return (
          <div className="p-6 text-center py-12 text-gray-500">
            <h2 className="text-xl font-semibold mb-2">Section: {activeSection}</h2>
            <p>This section is being implemented...</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      <Sidebar
        clients={clients}
        selectedClient={selectedClient}
        onClientChange={selectClient}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onAddClient={() => setShowAddClientModal(true)}
      />
      
      <MainContent 
        selectedClient={selectedClient} 
        activeSection={activeSection}
      >
        {renderContent()}
      </MainContent>

      {/* Add Client Modal */}
      <Modal
        isOpen={showAddClientModal}
        onClose={() => {
          setShowAddClientModal(false);
          setNewClientName('');
        }}
        title="Add New Client"
      >
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Name
            </label>
            <input
              type="text"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddClient()}
              placeholder="Enter client name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowAddClientModal(false);
                setNewClientName('');
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddClient}
              disabled={!newClientName.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add Client
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
