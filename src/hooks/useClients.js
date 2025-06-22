import { useState, useCallback } from 'react';
import { generateId } from '../utils/helpers';
import { initialClients } from '../data/mockData';

export const useClients = () => {
  const [clients, setClients] = useState(initialClients);
  const [selectedClient, setSelectedClient] = useState('');

  const addClient = useCallback((clientName) => {
    if (!clientName.trim()) return false;
    
    const clientValue = clientName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    const existingClient = clients.find(client => 
      client.value === clientValue || 
      client.name.toLowerCase() === clientName.toLowerCase()
    );
    
    if (existingClient) {
      return false;
    }
    
    const newClient = {
      id: generateId(),
      name: clientName.trim(),
      value: clientValue
    };
    
    setClients(prev => [...prev, newClient]);
    return newClient;
  }, [clients]);

  const selectClient = useCallback((clientValue) => {
    setSelectedClient(clientValue);
    return true;
  }, []);

  const getSelectedClient = useCallback(() => {
    return clients.find(client => client.value === selectedClient);
  }, [selectedClient, clients]);

  return {
    clients,
    selectedClient,
    addClient,
    selectClient,
    getSelectedClient
  };
};
