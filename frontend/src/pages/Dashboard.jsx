import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';
import { Check, Hourglass, Calendar as CalendarIcon, Truck, Zap, Bell, CalendarCheck, FileText, Download, HelpCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { applications } = useApplication();
  const navigate = useNavigate();

  // Determine user's name for welcoming
  const firstName = user?.givenName || user?.name?.split(' ')[0] || "Alexandra";

  return (
    <div className="w-full bg-slate-50 font-sans pb-32">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black text-[#0f2e53] leading-tight mb-3 tracking-tight">
              Application Dashboard
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Welcome back, {firstName}. Your passport renewal is progressing through the final verification stages.
            </p>
          </div>
          <div className="mt-6 md:mt-0 px-5 py-3 bg-blue-100 text-[#0f2e53] font-bold rounded-xl flex items-center shadow-sm">
            <div className="w-2.5 h-2.5 bg-[#0f2e53] rounded-full mr-3 animate-pulse"></div>
            Current Status: Processing
          </div>
        </div>

        {/* Status Tracker */}
        <div className="bg-slate-100/70 border border-slate-200/60 rounded-[2.5rem] p-10 lg:p-14 mb-16">
          <div className="relative flex justify-between items-start w-full max-w-5xl mx-auto">
            
            {/* Background Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-slate-200 -z-10"></div>
            
            {/* Active Line (up to Step 2) */}
            <div className="absolute top-6 left-0 w-[40%] h-1 bg-[#0f2e53] -z-10"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#0f2e53] text-white rounded-full flex items-center justify-center mb-6 shadow-md border-[6px] border-slate-100">
                <Check className="w-5 h-5" />
              </div>
              <div className="text-center bg-slate-100/0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 1</p>
                <h3 className="font-bold text-[#0f2e53] text-lg leading-none mb-1">Submission</h3>
                <p className="text-xs text-slate-500 font-medium">Received Aug 14</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#0f2e53] text-white rounded-full flex items-center justify-center mb-6 shadow-md border-[6px] border-slate-100">
                <Hourglass className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Step 2</p>
                <h3 className="font-bold text-[#0f2e53] text-lg leading-none mb-1">Verification</h3>
                <p className="text-xs focus:text-slate-500 font-medium text-slate-500">In Progress</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center opacity-60 grayscale">
              <div className="w-12 h-12 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mb-6 border-[6px] border-slate-100">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div className="text-center relative left-[-20%] md:left-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 3</p>
                <h3 className="font-bold text-slate-400 text-lg leading-none mb-1">Appointment</h3>
                <p className="text-xs text-slate-400 font-medium">Scheduled for Sept 02</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center opacity-40 grayscale">
              <div className="w-12 h-12 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mb-6 border-[6px] border-slate-100">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-center text-right sm:text-center relative right-[-10%] sm:right-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Step 4</p>
                <h3 className="font-bold text-slate-400 text-lg leading-none mb-1">Issuance</h3>
                <p className="text-xs text-slate-400 font-medium whitespace-nowrap">Est. Sept 15</p>
              </div>
            </div>

          </div>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* Left Column: Next Steps */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-black text-[#0f2e53] mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-[#0f2e53] fill-[#0f2e53]" /> Next Steps
            </h2>

            {/* Attend Appointment Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-6">
              <div className="flex flex-col sm:flex-row gap-8">
                {/* Icon block */}
                <div className="w-full sm:w-1/3 bg-blue-100/50 rounded-2xl flex items-center justify-center aspect-video sm:aspect-square">
                  <CalendarCheck className="w-10 h-10 text-blue-700" />
                </div>
                
                {/* Text Block */}
                <div className="w-full sm:w-2/3">
                  <div className="inline-block px-3 py-1 bg-[#ffedd5] text-[#9a3412] text-[10px] font-bold uppercase tracking-widest rounded mb-4">
                    Required Action
                  </div>
                  <h3 className="text-2xl font-bold text-[#0f2e53] mb-3">Attend Appointment</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                    Your biometric enrollment is scheduled at the Central Bureau. Please arrive 15 minutes early with your reference documents.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-[#0f2e53] hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-900/10 transition-colors">
                      View Appointment
                    </button>
                    <button className="bg-white hover:bg-slate-50 text-[#0f2e53] border border-slate-200 px-6 py-3 rounded-xl font-bold text-sm transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Reference QR */}
            <div className="bg-slate-100/50 rounded-3xl p-6 border border-slate-200 flex items-center justify-between group cursor-pointer hover:bg-white transition-colors hover:shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mr-4 group-hover:border-blue-100">
                  <FileText className="w-5 h-5 text-[#0f2e53]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0f2e53]">Digital Reference QR</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Keep this ready for your appointment.</p>
                </div>
              </div>
              <Download className="w-5 h-5 text-slate-400 group-hover:text-[#0f2e53] transition-colors" />
            </div>

          </div>

          {/* Right Column: Updates */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-[#0f2e53] mb-6 flex items-center">
              <Bell className="w-6 h-6 mr-3 text-[#0f2e53] fill-[#0f2e53]" /> Updates
            </h2>

            {/* Notification List */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-6">
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase">Recent Activity</h3>
                <span className="text-xs font-bold text-[#0f2e53] cursor-pointer hover:underline">View All</span>
              </div>

              <div className="space-y-8">
                
                {/* Item 1 */}
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-red-800"></div>
                  <h4 className="font-bold text-[#0f2e53] mb-1">Payment Confirmed</h4>
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                    The application fee of $130.00 was successfully processed. Receipt #PAS-99281.
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">2 Hours Ago</p>
                </div>

                {/* Item 2 */}
                <div className="relative pl-6">
                  {/* Empty space for alignment without dot */}
                  <h4 className="font-bold text-slate-700 mb-1">Document Upload Success</h4>
                  <p className="text-sm text-slate-500 mb-3 leading-relaxed">
                    Photograph and digital signatures have been accepted into the system.
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Yesterday</p>
                </div>

                {/* Item 3 */}
                <div className="relative pl-6">
                  <h4 className="font-bold text-slate-700 mb-1">Application Initialized</h4>
                  <p className="text-sm text-slate-500 mb-3 leading-relaxed">
                    Renewal process started for passport ending in ...9021.
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aug 14, 2024</p>
                </div>

              </div>
            </div>

            {/* Assistance Widget */}
            <div className="bg-[#0f60c6] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
              {/* Question mark watermark */}
              <HelpCircle className="absolute -bottom-4 -right-4 w-40 h-40 text-blue-900/30 rotate-12" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-3">Need Assistance?</h3>
                <p className="text-sm text-blue-100 leading-relaxed mb-6 max-w-xs font-medium">
                  Our consular support team is available 24/7 to help you with your application process.
                </p>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm transition-colors border-blue-400">
                  Contact Support
                </button>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
