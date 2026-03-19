import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';
import { Calendar as CalendarIcon, MapPin, Clock, ChevronRight, Check } from 'lucide-react';

const DATES = [
  { id: 1, date: 'Mon, 12 Oct', available: true },
  { id: 2, date: 'Tue, 13 Oct', available: true },
  { id: 3, date: 'Wed, 14 Oct', available: false },
  { id: 4, date: 'Thu, 15 Oct', available: true },
  { id: 5, date: 'Fri, 16 Oct', available: true },
];

const SLOTS = [
  '09:30 AM', '10:00 AM', '11:15 AM', '02:00 PM', '03:30 PM', '04:15 PM'
];

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const { submitApplication, application } = useApplication();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Final submit sets status to submitted
    if (application?.id) {
      await submitApplication(application.id);
    }
    setLoading(false);
    navigate('/apply/success');
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4 border-none">Book Appointment</h1>
        <p className="text-lg text-slate-600">Select a convenient date and time for document verification.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          {/* Passport Seva Kendra Selection (Mocked) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Selected Passport Seva Kendra
            </h3>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="font-bold text-slate-900">PSK Mumbai (Lower Parel)</p>
              <p className="text-sm text-slate-600 mt-1">Trade Point Building, Lower Parel West, Mumbai, 400013</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
              Select Date
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {DATES.map(d => (
                <button
                  key={d.id}
                  disabled={!d.available}
                  onClick={() => setSelectedDate(d.id)}
                  className={`min-w-[100px] p-4 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center shrink-0 ${
                    !d.available ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed opacity-50' :
                    selectedDate === d.id ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-lg leading-tight">{d.date.split(',')[1]}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider mt-1">{d.date.split(',')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-top-4">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Select Time Slot
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {SLOTS.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSlot(s)}
                    className={`py-3 rounded-xl border text-center font-semibold transition-all ${
                      selectedSlot === s ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white sticky top-24 p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Appointment Summary</h3>
            
            <div className="space-y-6 flex-1 mb-6">
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">Location</p>
                <p className="text-slate-900 font-medium flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-slate-400"/>
                  PSK Mumbai (Lower Parel)
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">Date</p>
                <p className="text-slate-900 font-medium flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2 text-slate-400"/>
                  {selectedDate ? DATES.find(d => d.id === selectedDate).date : 'Not selected'}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">Time</p>
                <p className="text-slate-900 font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-slate-400"/>
                  {selectedSlot || 'Not selected'}
                </p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!selectedDate || !selectedSlot || loading}
              className="w-full py-4 mt-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex items-center justify-center shadow-lg shadow-green-600/20 disabled:opacity-50 disabled:shadow-none transition-all"
            >
              {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : (
                <>Confirm & Submit <Check className="w-5 h-5 ml-2" /></>
              )}
            </button>
            <p className="text-xs text-center text-slate-500 mt-4">By clicking submit, you agree to the Terms & Conditions.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AppointmentBooking;
