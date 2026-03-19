import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const ApplicationContext = createContext();

export const useApplication = () => useContext(ApplicationContext);

export const ApplicationProvider = ({ children }) => {
  const { user } = useAuth();
  const [application, setApplication] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, saving, saved, error
  const [lastSaved, setLastSaved] = useState(null);

  const fetchApplication = useCallback(async (appId) => {
    const res = await fetch(`http://localhost:5000/api/applications/${appId}`);
    const data = await res.json();
    if (data.application) {
      setApplication(data.application);
      setLastSaved(data.application.lastSaved);
    }
  }, []);

  const createDraft = async (type = 'fresh') => {
    const res = await fetch('http://localhost:5000/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id, type })
    });
    const data = await res.json();
    if (data.application) {
      setApplication(data.application);
      setLastSaved(data.application.lastSaved);
      return data.application;
    }
  };

  const autoSave = useCallback(async (appId, formData) => {
    setSyncStatus('saving');
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData })
      });
      const data = await res.json();
      if (data.application) {
        setApplication(data.application);
        setLastSaved(data.application.lastSaved);
        setSyncStatus('saved');
      }
    } catch (e) {
      setSyncStatus('error');
    }
  }, []);

  const submitApplication = async (appId) => {
    const res = await fetch(`http://localhost:5000/api/applications/${appId}/submit`, {
      method: 'POST'
    });
    return await res.json();
  };

  return (
    <ApplicationContext.Provider value={{
      application, 
      setApplication,
      syncStatus, 
      lastSaved, 
      fetchApplication, 
      createDraft, 
      autoSave,
      submitApplication
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};
