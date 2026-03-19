import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useApplication } from '../context/ApplicationContext';
import { Info, AlertTriangle, ArrowRight, Camera } from 'lucide-react';

const steps = [
  { id: 'personal', title: 'Personal', desc: 'Identity and legal names' },
  { id: 'contact', title: 'Contact', desc: 'Address and details' },
  { id: 'emergency', title: 'Emergency', desc: 'Designated contacts' },
  { id: 'review', title: 'Review', desc: 'Verify information' }
];

const ApplicationForm = () => {
  const { application, autoSave } = useApplication();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const { register, handleSubmit, watch, reset, getValues } = useForm({
    defaultValues: application?.data || {}
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (application?.id) {
        const timeoutId = setTimeout(() => {
          autoSave(application.id, getValues());
        }, 1500);
        return () => clearTimeout(timeoutId);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, application, autoSave, getValues]);

  useEffect(() => {
    if (application?.data) {
      reset(application.data);
    }
  }, [application?.id, reset]);

  const onSubmit = async (data) => {
    if (application?.id) {
      await autoSave(application.id, data);
    }
    
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/apply/documents');
    }
  };

  const handleDiscard = () => {
    navigate('/dashboard');
  };

  const currentCitizenship = watch('citizenshipStatus');

  const renderPersonalStep = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-extrabold text-[#0f2e53] mb-8 pb-4 border-b border-slate-100">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 mb-8">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Given Names</label>
          <input 
            {...register('givenName', { required: true })} 
            className="block w-full px-4 py-3 bg-slate-100 text-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder-slate-400 font-medium border border-transparent focus:border-blue-500"
            placeholder="e.g. Jonathan David" 
          />
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Must match your birth certificate exactly.</p>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Surname</label>
          <input 
            {...register('surname')} 
            className="block w-full px-4 py-3 bg-slate-100 text-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder-slate-400 font-medium border border-transparent focus:border-blue-500"
            placeholder="e.g. Anderson" 
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Date of Birth</label>
          <input 
            type="date" 
            {...register('dateOfBirth')} 
            className="block w-full px-4 py-3 bg-slate-100 text-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder-slate-400 font-medium border border-transparent focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Place of Birth</label>
          <input 
            {...register('placeOfBirth')} 
            className="block w-full px-4 py-3 bg-slate-100 text-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder-slate-400 font-medium border border-transparent focus:border-blue-500"
            placeholder="City, Country"
          />
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Citizenship Status</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <label className={`flex items-center justify-center p-3 rounded-xl border text-sm font-bold cursor-pointer transition-all ${currentCitizenship === 'birth' ? 'bg-blue-50/50 border-blue-200 text-[#0f2e53]' : 'bg-slate-100 border-transparent text-slate-500 hover:bg-slate-200'}`}>
            <input type="radio" value="birth" {...register('citizenshipStatus')} className="hidden" />
            <div className={`w-3 h-3 rounded-full mr-3 border-2 ${currentCitizenship === 'birth' ? 'border-[#0f2e53] bg-[#0f2e53]' : 'border-slate-300 bg-slate-200'}`}></div>
            By Birth
          </label>
          
          <label className={`flex items-center justify-center p-3 rounded-xl border text-sm font-bold cursor-pointer transition-all ${currentCitizenship === 'naturalization' ? 'bg-blue-50/50 border-blue-200 text-[#0f2e53]' : 'bg-slate-100 border-transparent text-slate-500 hover:bg-slate-200'}`}>
            <input type="radio" value="naturalization" {...register('citizenshipStatus')} className="hidden" />
            <div className={`w-3 h-3 rounded-full mr-3 border-2 ${currentCitizenship === 'naturalization' ? 'border-[#0f2e53] bg-[#0f2e53]' : 'border-slate-300 bg-slate-200'}`}></div>
            Naturalization
          </label>
          
          <label className={`flex items-center justify-center p-3 rounded-xl border text-sm font-bold cursor-pointer transition-all ${currentCitizenship === 'descent' ? 'bg-blue-50/50 border-blue-200 text-[#0f2e53]' : 'bg-slate-100 border-transparent text-slate-500 hover:bg-slate-200'}`}>
            <input type="radio" value="descent" {...register('citizenshipStatus')} className="hidden" />
            <div className={`w-3 h-3 rounded-full mr-3 border-2 ${currentCitizenship === 'descent' ? 'border-[#0f2e53] bg-[#0f2e53]' : 'border-slate-300 bg-slate-200'}`}></div>
            Descent
          </label>
        </div>
      </div>

      <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-2xl p-8 flex flex-col items-center justify-center text-center mb-8 hover:border-blue-300 transition-colors">
        <div className="w-12 h-12 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center mb-4">
          <Camera className="w-5 h-5" />
        </div>
        <h4 className="font-bold text-[#0f2e53] mb-1">Identity Photo</h4>
        <p className="text-xs text-slate-500 mb-4">Drag and drop or browse for a high-resolution portrait.</p>
        <button type="button" className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg text-sm transition-colors">
          Select File
        </button>
      </div>

      <div className="bg-red-50 text-red-800 p-4 rounded-xl flex items-center text-sm font-medium border border-red-100 mb-8">
        <AlertTriangle className="w-5 h-5 text-red-600 mr-3 shrink-0" />
        Verify that the "Given Names" match your legal passport exactly.
      </div>
    </div>
  );

  const renderPlaceholderStep = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[400px] flex items-center justify-center text-slate-400">
      <p className="text-lg font-medium">Please complete the Personal section first.</p>
    </div>
  );

  return (
    <div className="w-full bg-slate-50 font-sans pb-32">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="mb-12">
          <div className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-widest mb-4">
            Application Form
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#0f2e53] leading-tight mb-4 tracking-tight">
            Complete your passport <br/> application.
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Please provide accurate personal details as they appear on your legal documents. This ensures your application is processed without delays.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4 shrink-0">
            <div className="space-y-6">
              {steps.map((step, idx) => {
                const isActive = idx === currentStepIndex;
                const isCompleted = idx < currentStepIndex;
                return (
                  <div key={step.id} className="flex items-start cursor-pointer group" onClick={() => setCurrentStepIndex(idx)}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                      isActive ? 'bg-[#0f2e53] text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-slate-300'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="ml-4 mt-1">
                      <h3 className={`font-bold transition-colors ${isActive ? 'text-[#0f2e53]' : 'text-slate-700'}`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Help Widget */}
            <div className="mt-12 bg-slate-100 rounded-2xl p-6 border border-slate-200">
              <div className="w-8 h-8 bg-[#0f2e53] text-white rounded-full flex items-center justify-center mb-4">
                <Info className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-[#0f2e53] mb-2">Need help?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Most applicants complete this section in 5 minutes. Prepare your birth certificate or identity card for reference.
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div className="w-full lg:w-3/4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
              
              {currentStepIndex === 0 ? renderPersonalStep() : renderPlaceholderStep()}

              {/* Form Footer Actions */}
              <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="text-sm font-bold text-[#0f2e53] hover:text-blue-700 transition-colors order-3 md:order-1"
                >
                  Discard Draft
                </button>

                <div className="flex w-full md:w-auto gap-4 order-1 md:order-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (application?.id) autoSave(application.id, getValues());
                    }}
                    className="flex-1 md:flex-none px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-sm transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="flex-1 md:flex-none px-6 py-3 bg-[#0f2e53] hover:bg-blue-800 text-white rounded-xl font-bold text-sm flex items-center justify-center shadow-md shadow-blue-900/10 transition-colors"
                  >
                    Save & Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
              
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
