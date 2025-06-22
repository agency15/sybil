import React, { useState } from 'react';
import { Plus, Lock, Eye, EyeOff, Trash2, Copy } from 'lucide-react';
import { generateId, formatDate } from '../../utils/helpers';

const CredentialsSection = () => {
  const [credentials, setCredentials] = useState([]);
  const [showPasswords, setShowPasswords] = useState({});

  const addCredential = () => {
    const newCredential = {
      id: generateId(),
      platform: '',
      username: '',
      password: '',
      notes: '',
      lastUpdated: new Date().toISOString()
    };
    setCredentials([...credentials, newCredential]);
  };

  const updateCredential = (id, updates) => {
    setCredentials(prev => prev.map(cred => 
      cred.id === id 
        ? { ...cred, ...updates, lastUpdated: new Date().toISOString() }
        : cred
    ));
  };

  const deleteCredential = (id) => {
    if (window.confirm('Are you sure you want to delete this credential?')) {
      setCredentials(prev => prev.filter(cred => cred.id !== id));
    }
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${type} copied to clipboard!`);
    } catch (err) {
      alert(`Failed to copy ${type.toLowerCase()}`);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Client Logins & Credentials</h2>
        <button
          onClick={addCredential}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Add Credential</span>
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Lock className="text-yellow-600 mt-1" size={20} />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
            <p className="text-sm text-yellow-700 mt-1">
              This information is stored locally in your browser. For production use, consider using a secure credential management system.
            </p>
          </div>
        </div>
      </div>
      
      {credentials.length > 0 ? (
        <div className="space-y-4">
          {credentials.map((credential) => (
            <div key={credential.id} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Platform */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Meta Ads, Google Analytics"
                    value={credential.platform}
                    onChange={(e) => updateCredential(credential.id, { platform: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username/Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Username or email"
                      value={credential.username}
                      onChange={(e) => updateCredential(credential.id, { username: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {credential.username && (
                      <button
                        onClick={() => copyToClipboard(credential.username, 'Username')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        title="Copy username"
                      >
                        <Copy size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords[credential.id] ? 'text' : 'password'}
                      placeholder="Password"
                      value={credential.password}
                      onChange={(e) => updateCredential(credential.id, { password: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                      {credential.password && (
                        <button
                          onClick={() => copyToClipboard(credential.password, 'Password')}
                          className="text-gray-400 hover:text-gray-600"
                          title="Copy password"
                        >
                          <Copy size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => togglePasswordVisibility(credential.id)}
                        className="text-gray-400 hover:text-gray-600"
                        title={showPasswords[credential.id] ? 'Hide password' : 'Show password'}
                      >
                        {showPasswords[credential.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <input
                    type="text"
                    placeholder="Additional notes or instructions"
                    value={credential.notes}
                    onChange={(e) => updateCredential(credential.id, { notes: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Last updated: {formatDate(credential.lastUpdated)}
                </div>
                <button
                  onClick={() => deleteCredential(credential.id)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center space-x-1 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Lock size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No credentials stored yet</p>
          <p className="text-sm">Click "Add Credential" to store client login information</p>
        </div>
      )}
    </div>
  );
};

export default CredentialsSection;
