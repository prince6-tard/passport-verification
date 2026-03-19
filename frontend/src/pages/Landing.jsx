import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle2, Clock, ShieldCheck, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full mt-10">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
          Passport Application <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Simplified.
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A clean, guided, and transparent way to apply for your passport. 
          No confusing forms, no anxiety. Just step-by-step guidance.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center justify-center group"
          >
            Start Your Application
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl font-semibold text-lg transition-all">
            Track Existing Application
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left pt-12 border-t border-slate-100">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Step-by-Step Guidance</h3>
            <p className="text-slate-600 leading-relaxed">
              We break down the complex form into bite-sized pieces so you never feel overwhelmed.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Auto-Save Progress</h3>
            <p className="text-slate-600 leading-relaxed">
              Your application is saved continuously. Leave and come back anytime without losing work.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Easy Appointments</h3>
            <p className="text-slate-600 leading-relaxed">
              Book your document verification slot easily with our smart calendar integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
