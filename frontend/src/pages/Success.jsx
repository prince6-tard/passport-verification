import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Download, Share2, Mail, Home, FileText } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const { application } = useApplication();
  const { user } = useAuth();

  const handleDownload = () => {
    // Simulate PDF download
    alert('Application receipt PDF is downloading...');
  };

  const handleShare = () => {
    alert(`Application ID ${application?.id} copied to clipboard!`);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <div className="mb-8 flex justify-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12" />
        </div>
      </div>
      
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Application Submitted!</h1>
      <p className="text-xl text-slate-600 mb-8">
        Thank you, {user?.name?.split(' ')[0]}. Your passport application has been successfully submitted.
      </p>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 text-left mb-8 relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10"></div>
        <div className="absolute top-6 right-8 text-blue-200 z-0">
          <FileText className="w-16 h-16 opacity-50" />
        </div>

        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 relative z-10">Application Reference ID</h3>
        <p className="text-3xl font-black text-blue-600 mb-8 relative z-10 font-mono tracking-wider">{application?.id || 'APP492018'}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-8 relative z-10">
          <button onClick={handleDownload} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all group">
            <Download className="w-6 h-6 mb-2 text-slate-400 group-hover:text-blue-600" />
            <span className="font-semibold text-sm">Download Receipt</span>
          </button>
          
          <button onClick={handleShare} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all group">
            <Share2 className="w-6 h-6 mb-2 text-slate-400 group-hover:text-blue-600" />
            <span className="font-semibold text-sm">Copy App ID</span>
          </button>

          <button onClick={() => alert('Receipt emailed!')} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all group">
            <Mail className="w-6 h-6 mb-2 text-slate-400 group-hover:text-blue-600" />
            <span className="font-semibold text-sm">Email Receipt</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors"
        >
          <Home className="w-5 h-5 mr-3" />
          Return to Dashboard
        </button>
      </div>

    </div>
  );
};

export default Success;
