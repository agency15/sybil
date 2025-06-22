import React from 'react';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import QuickActions from './QuickActions';

const ChatSection = ({
  chatMessages,
  currentMessage,
  setCurrentMessage,
  onSendMessage,
  onQuickAction,
  selectedClient,
  isLoading
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100 text-gray-800">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-500">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about client's brand, target audience, meeting notes..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!selectedClient || isLoading}
          />
          <button
            onClick={onSendMessage}
            disabled={!selectedClient || !currentMessage.trim() || isLoading}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        
        {/* Quick Actions */}
        <QuickActions 
          onQuickAction={onQuickAction}
          disabled={!selectedClient || isLoading}
        />
        
        {!selectedClient && (
          <p className="text-sm text-gray-500 mt-2">Please select a client to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default ChatSection;
