import React, { useEffect, useState } from 'react';
import { useApplication } from '../context/ApplicationContext';
import { CheckCircle2, RotateCw, AlertCircle } from 'lucide-react';

const AutoSaveIndicator = () => {
  const { syncStatus, lastSaved } = useApplication();
  const [displayTime, setDisplayTime] = useState('');

  useEffect(() => {
    if (lastSaved) {
      const date = new Date(lastSaved);
      setDisplayTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [lastSaved]);

  if (syncStatus === 'idle' && !lastSaved) return null;

  return (
    <div className="flex items-center text-sm ml-4 transition-all duration-300">
      {syncStatus === 'saving' && (
        <span className="flex items-center text-slate-500">
          <RotateCw className="w-4 h-4 mr-2 animate-spin" />
          Saving draft...
        </span>
      )}
      {syncStatus === 'saved' && (
        <span className="flex items-center text-green-600">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Draft saved at {displayTime}
        </span>
      )}
      {syncStatus === 'error' && (
        <span className="flex items-center text-red-500">
          <AlertCircle className="w-4 h-4 mr-2" />
          Error saving draft
        </span>
      )}
    </div>
  );
};

export default AutoSaveIndicator;
