import { useState, useCallback } from 'react';
import { generateAIResponse } from '../utils/aiResponseGenerator';
import { initialChatMessages } from '../data/mockData';

export const useChat = (selectedClient, clients, processedDocuments) => {
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async () => {
    if (!currentMessage.trim() || !selectedClient) return;

    const newMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: currentMessage
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse = generateAIResponse(
        currentMessage, 
        selectedClient, 
        clients, 
        processedDocuments
      );
      
      const botResponse = {
        id: chatMessages.length + 2,
        type: 'bot',
        message: aiResponse
      };
      
      setChatMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsLoading(false);
      setCurrentMessage('');
    }
  }, [currentMessage, selectedClient, clients, processedDocuments, chatMessages.length]);

  const handleQuickAction = useCallback(async (action) => {
    if (!selectedClient) return;
    
    setCurrentMessage('');
    
    const newMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: action
    };
    setChatMessages(prev => [...prev, newMessage]);
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const aiResponse = generateAIResponse(
        action, 
        selectedClient, 
        clients, 
        processedDocuments
      );
      
      const botResponse = {
        id: chatMessages.length + 2,
        type: 'bot',
        message: aiResponse
      };
      
      setChatMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedClient, clients, processedDocuments, chatMessages.length]);

  return {
    chatMessages,
    currentMessage,
    setCurrentMessage,
    sendMessage,
    handleQuickAction,
    isLoading
  };
};
