import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Camera, CheckSquare, HelpCircle, ArrowRight, UserCheck, DollarSign, MapPin } from 'lucide-react';

const AppIntro = () => {
  const navigate = useNavigate();

  // State to track selected items required to reach 100%
  const [citizenship, setCitizenship] = useState(null); // 'birth_cert' | 'consular'
  const [identity, setIdentity] = useState(null); // 'dl' | 'naturalization' | 'gov_id'
  const [photoReady, setPhotoReady] = useState(false);

  // Calculate progress
  // Required groups: 1. Citizenship, 2. Identity, 3. Photo
  let completedCount = 0;
  if (citizenship) completedCount++;
  if (identity) completedCount++;
  if (photoReady) completedCount++;

  const progressPercentage = Math.round((completedCount / 3) * 100);
  const isReady = completedCount === 3;

  return (
    <div className="w-full bg-slate-50 font-sans pb-32">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-block px-3 py-1 bg-blue-100 text-[#1e3a8a] text-xs font-bold uppercase tracking-widest rounded-full mb-6 relative">
            Application Preparation
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-[#0f2e53] leading-none mb-2 tracking-tight">
            Required Documents
          </h1>
          <h1 className="text-5xl md:text-6xl font-black text-slate-400 leading-none tracking-tight mb-6">
            Checklist
          </h1>
          
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            To process your new passport application efficiently, ensure you have original copies of the following documents. Digital copies are not accepted at the interview.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Column 1: Citizenship & Identity */}
          <div className="space-y-6">
            
            {/* Citizenship Card */}
            <div className="bg-slate-100/50 border border-slate-200 p-8 rounded-[2rem]">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 text-[#0f2e53] rounded-xl flex items-center justify-center mr-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#0f2e53]">Proof of Citizenship</h2>
              </div>

              <div className="space-y-4">
                <label className={`flex items-start p-5 rounded-2xl border-2 cursor-pointer transition-all ${citizenship === 'birth_cert' ? 'border-[#0f2e53] bg-white shadow-sm' : 'border-slate-100 bg-white hover:border-blue-200'}`}>
                  <input 
                    type="radio" 
                    name="citizenship" 
                    checked={citizenship === 'birth_cert'}
                    onChange={() => setCitizenship('birth_cert')}
                    className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" 
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-[#0f2e53] flex items-center">
                      U.S. Birth Certificate <HelpCircle className="w-4 h-4 text-slate-400 ml-2" />
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Original or certified physical copy.</p>
                  </div>
                </label>

                <label className={`flex items-start p-5 rounded-2xl border-2 cursor-pointer transition-all ${citizenship === 'consular' ? 'border-[#0f2e53] bg-white shadow-sm' : 'border-slate-100 bg-white hover:border-blue-200'}`}>
                  <input 
                    type="radio" 
                    name="citizenship" 
                    checked={citizenship === 'consular'}
                    onChange={() => setCitizenship('consular')}
                    className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" 
                  />
                  <div className="ml-4">
                    <h3 className="font-bold text-[#0f2e53] flex items-center">
                      Consular Report of Birth Abroad <HelpCircle className="w-4 h-4 text-slate-400 ml-2" />
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Required if born outside the United States to U.S. parents.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Identity Card */}
            <div className="bg-slate-200 border border-slate-300/50 p-8 rounded-[2rem]">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-slate-300 text-slate-700 rounded-xl flex items-center justify-center mr-4">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-700">Proof of Identity</h2>
              </div>

              <div className="space-y-4">
                {['Valid Driver\'s License', 'Certificate of Naturalization', 'Current Government ID'].map((idType, index) => (
                  <label key={index} className={`flex items-center p-4 rounded-xl cursor-pointer transition-all ${identity === idType ? 'bg-white shadow-sm font-bold text-[#0f2e53]' : 'bg-slate-100 hover:bg-white text-slate-700 font-semibold'}`}>
                    <input 
                      type="radio" 
                      name="identity" 
                      checked={identity === idType}
                      onChange={() => setIdentity(idType)}
                      className="w-5 h-5 text-slate-700 focus:ring-slate-500 border-gray-300 mr-4" 
                    />
                    {idType}
                  </label>
                ))}
              </div>
            </div>
            
          </div>

          {/* Column 2: Photo & Fees */}
          <div className="space-y-6">
            
            {/* Passport Photo */}
            <div className="bg-[#eeece8] border border-[#e2dfd9] p-8 rounded-[2rem]">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e0ded8] text-[#8c4331] rounded-xl flex items-center justify-center mr-4">
                  <Camera className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#8c4331]">Passport Photo</h2>
              </div>

              <label className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all bg-white mb-4 ${photoReady ? 'border-[#8c4331] shadow-sm' : 'border-transparent hover:border-orange-200'}`}>
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    checked={photoReady}
                    onChange={(e) => setPhotoReady(e.target.checked)}
                    className="mt-1 w-5 h-5 text-[#8c4331] rounded-sm focus:ring-[#8c4331] border-gray-300 mr-4" 
                  />
                  <div>
                    <h3 className="font-bold text-[#0f2e53]">Color Photo (2×2 inch)</h3>
                    <p className="text-sm text-slate-500 mt-2 mb-4 leading-relaxed">
                      Taken within the last 6 months, white background, no glasses.
                    </p>
                    <button className="text-[10px] font-bold tracking-widest text-[#8c4331] uppercase hover:underline">
                      View Photo Guide
                    </button>
                  </div>
                </div>
              </label>

              <div className="bg-[#fcdbc7] text-[#8c4331] p-4 rounded-xl flex items-start">
                <MapPin className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold">Available at most post offices and pharmacies.</p>
              </div>
            </div>

            {/* Application Fees */}
            <div className="bg-[#0f2e53] text-white p-8 rounded-[2rem]">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center mr-4">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">Application Fees</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
                  <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-2">Passport Book</p>
                  <p className="text-4xl font-black mb-4">$130</p>
                  <p className="text-xs text-blue-100 leading-relaxed opacity-80">
                    Payable via check or money order to "U.S. Department of State."
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-2">Execution Fee</p>
                    <p className="text-4xl font-black mb-4">$35</p>
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed opacity-80 mt-2">
                    Payable to the acceptance facility (Post Office, Clerk of Court).
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-6 left-0 right-0 z-50 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between border border-slate-100">
          
          <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg mr-4 transition-colors ${
              isReady ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-[#0f2e53]'
            }`}>
              {isReady ? <CheckSquare className="w-6 h-6" /> : `${progressPercentage}%`}
            </div>
            <div>
              <h4 className="font-bold text-[#0f2e53]">
                {isReady ? "All set!" : "Almost ready!"}
              </h4>
              <p className="text-sm text-slate-500">
                {isReady ? "You have all the required documents." : "Check all boxes to unlock the next step."}
              </p>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button 
              className="px-6 py-4 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold flex-1 md:flex-none transition-colors"
              onClick={() => navigate('/dashboard')}
            >
              Save for Later
            </button>
            <button 
              className={`px-8 py-4 rounded-xl font-bold flex items-center justify-center flex-1 md:flex-none transition-all ${
                isReady ? 'bg-[#0f2e53] hover:bg-blue-800 text-white shadow-lg' : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
              disabled={!isReady}
              onClick={() => navigate('/apply/form')}
            >
              Start Application <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default AppIntro;
