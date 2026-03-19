import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, RefreshCw, Search, ShieldCheck, ArrowRight, FileCheck2, Camera, Mail } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => {
    navigate(user ? '/dashboard' : '/login');
  };

  return (
    <div className="w-full flex flex-col bg-slate-50 font-sans">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[550px] overflow-hidden">
        {/* Background Image Setup */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-right md:bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1544468266-ba9bc60cd8ba?auto=format&fit=crop&q=80&w=2000')`,
            backgroundPosition: 'center 30%'
          }}
        >
          {/* Gradient overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 h-full flex flex-col justify-center">
          <div className="max-w-xl">
            {/* Tagline Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-[#1e3a8a] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 relative">
              <span className="w-1.5 h-1.5 bg-[#1e3a8a] rounded-full mr-2 opacity-60"></span>
              Official Bureau of Consular Affairs
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-[#0f2e53] leading-[1.1] mb-6 tracking-tight">
              A simpler path <br/> to the world.
            </h1>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-10 max-w-md font-medium">
              Navigate the complexity of international travel with ease. Secure, streamlined passport services for every citizen journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleStart}
                className="bg-white/95 backdrop-blur-sm border border-slate-100 hover:border-blue-200 hover:shadow-lg p-6 rounded-2xl flex flex-col items-start text-left transition-all group flex-1"
              >
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0f2e53] text-sm mb-1">Apply for a New Passport</h3>
                <p className="text-xs text-slate-500">First-time applicants and children</p>
              </button>

              <button className="bg-white/95 backdrop-blur-sm border border-slate-100 hover:border-orange-200 hover:shadow-lg p-6 rounded-2xl flex flex-col items-start text-left transition-all group flex-1">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0f2e53] text-sm mb-1">Renew Your Passport</h3>
                <p className="text-xs text-slate-500">Adult renewals and name changes</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tracking Card */}
          <div className="md:col-span-2 bg-slate-100 rounded-[2rem] p-10 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden group">
            <div className="relative z-10 max-w-sm">
              <h2 className="text-3xl font-bold text-[#0f2e53] mb-4">Track Your Status Real-Time</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                No more guessing. Get precise updates at every milestone—from application receipt to mailing.
              </p>
              <button className="bg-[#0f2e53] hover:bg-blue-800 px-6 py-3 rounded-xl text-white font-semibold shadow-sm transition-colors text-sm">
                Check Status Now
              </button>
            </div>
            {/* Background decorative search icon */}
            <div className="absolute right-[-20%] top-[-20%] md:right-8 md:top-auto md:relative opacity-10 group-hover:opacity-20 transition-opacity">
              <Search className="w-64 h-64 text-slate-600" strokeWidth={1} />
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-[#0f2e53] rounded-[2rem] p-10 flex flex-col justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-5xl font-black mb-2 tracking-tighter">4.8M</h2>
              <h3 className="text-xl font-bold mb-3">Passports Issued</h3>
              <p className="text-blue-200 text-sm leading-relaxed">Processed with precision and security in the last fiscal year.</p>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-[#b45309] rounded-[2rem] p-10 flex flex-col justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
            <div className="relative z-10">
              <ShieldCheck className="w-8 h-8 opacity-80 mb-6" />
              <h3 className="text-xl font-bold mb-3">Secure Processing</h3>
              <p className="text-orange-100 text-sm leading-relaxed">State-of-the-art encryption and identity verification protocols.</p>
            </div>
          </div>

          {/* Urgent Card */}
          <div className="md:col-span-2 bg-[#f3f4f6] rounded-[2rem] flex flex-col md:flex-row items-center border border-slate-200/50 overflow-hidden group">
            <div className="w-full md:w-1/2 p-10 bg-[#fde6ce] h-full flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              {/* Illustration Placeholder - Using a stylized box to simulate the UI graphic */}
              <div className="relative w-48 h-48 bg-white/50 backdrop-blur rounded-2xl border-4 border-white/80 shadow-xl overflow-hidden flex items-center justify-center">
                 <div className="w-16 h-16 bg-[#b45309] rounded-full opacity-20 absolute top-4 left-4"></div>
                 <div className="w-24 h-24 bg-[#0f2e53] rounded-full opacity-10 absolute bottom-[-10px] right-[-10px]"></div>
                 <span className="font-bold text-slate-400">Illustration</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-10 pb-12 md:pb-10">
              <h3 className="text-2xl font-bold text-[#0f2e53] mb-4">Traveling Soon?</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Expedited processing is available for those with urgent travel plans. Check current wait times and availability.
              </p>
              <a href="#" className="inline-flex items-center text-[#0f2e53] font-bold text-sm hover:text-blue-600 transition-colors">
                View Urgent Requirements <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Modern Citizen Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-[#0f2e53] mb-4">The Modern Citizen Journey</h2>
        <div className="w-16 h-1 bg-[#b45309] mx-auto rounded-full mb-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-200 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
              <FileCheck2 className="w-8 h-8 text-[#0f2e53]" />
            </div>
            <h3 className="text-lg font-bold text-[#0f2e53] mb-3">Prepare</h3>
            <p className="text-sm text-slate-500 px-4 leading-relaxed">
              Gather your evidence of citizenship and identity documents based on your specific path.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-200 rounded-3xl flex items-center justify-center mb-6 shadow-sm relative">
              {/* Added a small connector line for large screens */}
              <div className="hidden md:block absolute top-1/2 left-[-100%] w-full h-[2px] bg-slate-200 -z-10"></div>
              <Camera className="w-8 h-8 text-[#0f2e53]" />
            </div>
            <h3 className="text-lg font-bold text-[#0f2e53] mb-3">Capture</h3>
            <p className="text-sm text-slate-500 px-4 leading-relaxed">
              Take a high-quality photo that meets all official specifications for biometric accuracy.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-200 rounded-3xl flex items-center justify-center mb-6 shadow-sm relative">
              <div className="hidden md:block absolute top-1/2 left-[-100%] w-full h-[2px] bg-slate-200 -z-10"></div>
              <Mail className="w-8 h-8 text-[#0f2e53]" />
            </div>
            <h3 className="text-lg font-bold text-[#0f2e53] mb-3">Submit</h3>
            <p className="text-sm text-slate-500 px-4 leading-relaxed">
              Mail your renewal form or visit an authorized acceptance facility for new applications.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
