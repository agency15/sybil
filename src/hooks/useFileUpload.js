import { useState, useCallback } from 'react';
import { generateId } from '../utils/helpers';
import { initialUploadedFiles, initialProcessedDocuments } from '../data/mockData';

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState(initialUploadedFiles);
  const [processedDocuments, setProcessedDocuments] = useState(initialProcessedDocuments);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = useCallback(async (files) => {
    const fileArray = Array.from(files);
    const newFiles = fileArray.map(file => ({
      id: generateId(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toLocaleString(),
      status: 'processing',
      processed: false
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setUploadedFiles(prev => prev.map(file => 
        newFiles.find(nf => nf.id === file.id) 
          ? { ...file, status: 'processed', processed: true }
          : file
      ));
      
      const newProcessedDocs = {};
      newFiles.forEach(file => {
        newProcessedDocs[file.id] = {
          id: file.id,
          name: file.name,
          type: file.type.includes('pdf') ? 'pdf' : 'document',
          content: `Processed content for ${file.name}\n\nThis document has been analyzed and is ready for AI queries.`,
          processedAt: new Date().toISOString(),
          keywords: ['processed', 'document'],
          summary: `Summary of ${file.name} - document processed successfully.`
        };
      });
      
      setProcessedDocuments(prev => ({ ...prev, ...newProcessedDocs }));
    } catch (error) {
      console.error('Error processing files:', error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const deleteFile = useCallback((fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    setProcessedDocuments(prev => {
      const updated = { ...prev };
      delete updated[fileId];
      return updated;
    });
  }, []);

  return {
    uploadedFiles,
    processedDocuments,
    isProcessing,
    handleFileUpload,
    deleteFile
  };
};
