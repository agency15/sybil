import React, { useState, useRef } from 'react';
import { Upload, FileText, Eye, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const DocumentsSection = ({ 
  sectionTitle, 
  uploadedFiles, 
  onFileUpload, 
  onDeleteFile 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const fileInputRef = useRef(null);

  const filteredFiles = uploadedFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || 
      (filterType === 'processed' && file.processed) ||
      (filterType === 'pending' && !file.processed);
    return matchesSearch && matchesFilter;
  });

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileUpload(files);
    }
    event.target.value = '';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'processing':
        return <Clock className="text-yellow-500" size={16} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{sectionTitle}</h2>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2 transition-colors"
        >
          <Upload size={20} />
          <span>Upload Files</span>
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileUpload}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,.svg,.gif,.mp4,.mov,.mp3,.wav,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
      />
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Files</option>
          <option value="processed">Processed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      
      {filteredFiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.map((file) => (
            <div key={file.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
              <div className="flex items-start justify-between mb-3">
                <FileText className="text-blue-500 flex-shrink-0" size={24} />
                <div className="flex items-center space-x-2">
                  {getStatusIcon(file.status)}
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => onDeleteFile && onDeleteFile(file.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800 truncate mb-1">{file.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                <p className="text-xs text-gray-400">{file.uploadedAt}</p>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    file.status === 'processed' ? 'bg-green-100 text-green-800' :
                    file.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {file.status === 'processed' ? 'Processed' : 
                     file.status === 'processing' ? 'Processing...' : 'Error'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Upload size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No files uploaded yet</p>
          <p className="text-sm">Click "Upload Files" to add {sectionTitle.toLowerCase()}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentsSection;
