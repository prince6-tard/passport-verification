import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useApplication } from '../context/ApplicationContext';
import { Check, ChevronRight, ChevronLeft, Save } from 'lucide-react';

const steps = [
  { id: 'personal', title: 'Personal Details' },
  { id: 'family', title: 'Family Details' },
  { id: 'address', title: 'Address & Contact' }
];

const ApplicationForm = () => {
  const { application, autoSave } = useApplication();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const currentStepInfo = steps[currentStepIndex];

  const { register, handleSubmit, watch, reset, getValues } = useForm({
    defaultValues: application?.data || {}
  });

  // Watch for changes to trigger debounced autosave
  useEffect(() => {
    const subscription = watch((value) => {
      // Debounce logic could go here, for simulation we just call autoSave
      // We pass the current values
      if (application?.id) {
        const timeoutId = setTimeout(() => {
          autoSave(application.id, getValues());
        }, 1500);
        return () => clearTimeout(timeoutId);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, application, autoSave, getValues]);

  // Load draft data when application arrives or changes
  useEffect(() => {
    if (application?.data) {
      reset(application.data);
    }
  }, [application?.id, reset]); // only on init

  const onSubmit = async (data) => {
    // Explicit save
    if (application?.id) {
      await autoSave(application.id, data);
    }
    
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Finished form
      navigate('/apply/documents');
    }
  };

  const renderPersonalStep = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Given Name (First & Middle)</label>
          <input {...register('givenName', { required: true })} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Surname</label>
          <input {...register('surname')} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Have you ever been known by other names?</label>
        <div className="flex gap-4">
          <label className="flex items-center space-x-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 flex-1">
            <input type="radio" value="yes" {...register('otherNames')} className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
            <span className="font-medium">Yes</span>
          </label>
          <label className="flex items-center space-x-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 flex-1">
            <input type="radio" value="no" {...register('otherNames')} className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
            <span className="font-medium">No</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
          <select {...register('gender')} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
          <input type="date" {...register('dateOfBirth')} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>
      </div>
    </div>
  );

  const renderFamilyStep = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Father's Full Name</label>
        <input {...register('fatherName')} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Mother's Full Name</label>
        <input {...register('motherName')} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Guardian's Full Name (if applicable)</label>
        <input {...register('guardianName')} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
      </div>
    </div>
  );

  const renderAddressStep = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">House No. and Street Name</label>
        <input {...register('streetAddress')} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Village / Town / City</label>
          <input {...register('city')} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
          <input {...register('state')} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">District</label>
          <input {...register('district')} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">PIN Code</label>
          <input type="number" {...register('pincode')} maxLength={6} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Email ID</label>
        <input type="email" {...register('email')} className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-4">
      {/* Progress Stepper */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0 pointer-events-none"></div>
          <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-500"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors duration-300 ${
                  isCompleted ? 'bg-blue-600 border-blue-600 text-white' : 
                  isCurrent ? 'bg-white border-blue-600 text-blue-600 shadow-md ring-4 ring-blue-50' : 
                  'bg-white border-slate-300 text-slate-400'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
                </div>
                <span className={`absolute top-12 text-xs font-semibold w-24 text-center transition-colors ${
                  isCurrent || isCompleted ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100 flex items-center justify-between">
          {currentStepInfo.title}
          <span className="text-sm font-medium text-slate-500 flex items-center bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
            <Save className="w-4 h-4 mr-2" />
            Auto-saving
          </span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          {currentStepIndex === 0 && renderPersonalStep()}
          {currentStepIndex === 1 && renderFamilyStep()}
          {currentStepIndex === 2 && renderAddressStep()}

          <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStepIndex(prev => prev - 1)}
              disabled={currentStepIndex === 0}
              className="px-6 py-4 flex items-center text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-0"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              {currentStepIndex === steps.length - 1 ? 'Save & Continue to Documents' : 'Save & Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default ApplicationForm;
