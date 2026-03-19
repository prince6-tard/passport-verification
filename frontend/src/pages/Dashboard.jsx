import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';
import { Plus, FileText, ChevronRight, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { createDraft } = useApplication();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      if (user?.id) {
        const res = await fetch(`http://localhost:5000/api/applications?userId=${user.id}`);
        const data = await res.json();
        setApplications(data.applications || []);
      }
      setLoading(false);
    };
    fetchApps();
  }, [user]);

  const handleStartNew = async () => {
    const app = await createDraft('fresh');
    if (app) {
      navigate('/apply/intro');
    }
  };

  const handleResume = (appId) => {
    // Navigate based on status... for simplicity, go to form
    navigate('/apply/form');
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return '';
    const date = new Date(isoStr);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
  };

  if (loading) return <div className="p-8 text-center text-slate-500 flex justify-center mt-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Hello, {user?.name?.split(' ')[0] || 'Applicant'} 👋</h1>
          <p className="text-slate-600">Welcome to your passport dashboard</p>
        </div>
        <button 
          onClick={handleStartNew}
          className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Start New Application
        </button>
      </div>

      <h2 className="text-xl font-semibold text-slate-900 mb-6 border-b border-slate-200 pb-2">Your Applications</h2>

      {applications.length === 0 ? (
        <div className="bg-white border text-center p-12 rounded-2xl shadow-sm border-slate-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <p className="text-lg font-medium text-slate-900">No applications yet</p>
          <p className="text-slate-500 mb-6">Start your first passport application today</p>
          <button 
            onClick={handleStartNew}
            className="text-blue-600 font-medium hover:underline text-lg"
          >
            Create Application →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between sm:items-center gap-4 cursor-pointer group" onClick={() => handleResume(app.id)}>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mr-4 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Fresh Passport Application</h3>
                  <div className="flex items-center text-sm text-slate-500 mt-1 gap-3">
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium text-xs uppercase tracking-wide">
                      {app.status}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      Last saved: {formatDate(app.lastSaved)}
                    </span>
                    <span>ID: {app.id}</span>
                  </div>
                </div>
              </div>
              <button className="text-blue-600 font-medium group-hover:bg-blue-50 p-3 rounded-xl transition-colors sm:self-center flex items-center justify-center">
                Resume <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
