import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Clock, FileMinus, ArrowRight } from 'lucide-react';

const AppIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Before we begin</h1>
        <p className="text-lg text-slate-600">Here's a quick overview of what you'll need.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
        
        <div className="p-8 flex items-start">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 mr-6">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Time Required: ~10 mins</h3>
            <p className="text-slate-600 leading-relaxed">
              Don't worry if you need to leave. Your progress is auto-saved continuously. 
              You can always resume from your dashboard.
            </p>
          </div>
        </div>

        <div className="p-8 flex items-start">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 mr-6">
            <FileMinus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Documents to keep handy</h3>
            <ul className="space-y-3 mt-4 text-slate-700 font-medium">
              <li className="flex items-center"><CheckSquare className="w-5 h-5 text-blue-500 mr-3 shrink-0" /> Aadhaar Card (for Address & ID proof)</li>
              <li className="flex items-center"><CheckSquare className="w-5 h-5 text-blue-500 mr-3 shrink-0" /> 10th Marksheet (for ECR/Non-ECR proof)</li>
              <li className="flex items-center"><CheckSquare className="w-5 h-5 text-blue-500 mr-3 shrink-0" /> PAN Card</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="mt-10 flex justify-end">
        <button 
          onClick={() => navigate('/apply/form')}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all flex items-center"
        >
          I'm Ready, Let's Go
          <ArrowRight className="ml-2 w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default AppIntro;
