import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';
import { MapPin, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';

const DATES = [
  ...Array(3).fill(null), // Blank spaces for layout (Thu, Fri, Sat, Sun before Nov 1)
  ...Array.from({length: 30}, (_, i) => i + 1)
];

const SLOTS = [
  '09:00 AM', '09:30 AM', '10:15 AM', 
  '11:00 AM', '01:30 PM', '02:45 PM'
];

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const { submitApplication, application } = useApplication();
  
  const [selectedLocation, setSelectedLocation] = useState('downtown');
  const [selectedDate, setSelectedDate] = useState(12);
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (application?.id) {
      await submitApplication(application.id);
    }
    setLoading(false);
    navigate('/apply/success');
  };

  return (
    <div className="w-full bg-slate-50 font-sans pb-32">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#0f2e53] leading-tight mb-4 tracking-tight">
            Schedule Your Appointment
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Select a convenient regional office and a time slot for your passport interview. Your security and time are our priorities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column 1: Choose a Location */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col h-full">
            <h2 className="text-xl font-bold text-[#0f2e53] mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-[#0f2e53]" />
              1. Choose a Location
            </h2>
            
            {/* Map Placeholder */}
            <div className="w-full h-80 bg-slate-200 rounded-2xl mb-6 relative overflow-hidden flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                alt="Map"
                className="w-full h-full object-cover grayscale opacity-60"
              />
              {/* Fake pins */}
              <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-[#0f2e53] rounded-full flex justify-center items-center shadow-lg border-2 border-white">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-[#0f2e53] rounded-full flex justify-center items-center shadow-lg border-2 border-white scale-125">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Location Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
              
              <button 
                onClick={() => setSelectedLocation('downtown')}
                className={`text-left p-6 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  selectedLocation === 'downtown' ? 'border-[#0f2e53] shadow-md bg-white' : 'border-transparent bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedLocation === 'downtown' ? 'text-[#1e3a8a]' : 'text-slate-500'}`}>
                      Selected Office
                    </span>
                    {selectedLocation === 'downtown' && <CheckCircle2 className="w-5 h-5 text-[#0f2e53]" />}
                  </div>
                  <h3 className={`font-bold mb-1 ${selectedLocation === 'downtown' ? 'text-[#0f2e53]' : 'text-slate-700'}`}>Downtown Regional Center</h3>
                  <p className="text-xs text-slate-500 mb-4">450 Civic Plaza, Suite 100</p>
                </div>
                <div className={`flex items-center text-xs font-semibold ${selectedLocation === 'downtown' ? 'text-[#0f2e53]' : 'text-slate-500'}`}>
                  <Clock className="w-3 h-3 mr-1.5" /> Average wait: 12 mins
                </div>
              </button>

              <button 
                onClick={() => setSelectedLocation('metro')}
                className={`text-left p-6 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  selectedLocation === 'metro' ? 'border-[#0f2e53] shadow-md bg-white' : 'border-transparent bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedLocation === 'metro' ? 'text-[#1e3a8a]' : 'text-slate-500'}`}>
                      Secondary Option
                    </span>
                    {selectedLocation === 'metro' && <CheckCircle2 className="w-5 h-5 text-[#0f2e53]" />}
                  </div>
                  <h3 className={`font-bold mb-1 ${selectedLocation === 'metro' ? 'text-[#0f2e53]' : 'text-slate-700'}`}>Metro North Bureau</h3>
                  <p className="text-xs text-slate-500 mb-4">822 Commerce Blvd</p>
                </div>
                <div className={`flex items-center text-xs font-semibold ${selectedLocation === 'metro' ? 'text-[#0f2e53]' : 'text-slate-500'}`}>
                  <Clock className="w-3 h-3 mr-1.5" /> Average wait: 45 mins
                </div>
              </button>

            </div>
          </div>


          {/* Column 2: Date & Time + Summary */}
          <div className="flex flex-col gap-8">
            
            {/* Calendar & Slots */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex-grow">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-[#0f2e53] flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-3 text-[#0f2e53]" />
                  2. Pick Date & Time
                </h2>
                <div className="flex gap-2">
                  <button className="p-1 rounded-full hover:bg-slate-100"><ChevronLeft className="w-5 h-5 text-[#0f2e53]" /></button>
                  <button className="p-1 rounded-full hover:bg-slate-100"><ChevronRight className="w-5 h-5 text-[#0f2e53]" /></button>
                </div>
              </div>

              {/* Month/Year */}
              <div className="text-center font-bold text-[#0f2e53] mb-6">November 2024</div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-y-4 gap-x-1 mb-8">
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                  <div key={day} className="text-[10px] font-bold text-slate-400 text-center">{day}</div>
                ))}
                
                {/* Simulated previous month dates */}
                <div className="text-center py-2 text-sm text-slate-300 font-medium">28</div>
                <div className="text-center py-2 text-sm text-slate-300 font-medium">29</div>
                <div className="text-center py-2 text-sm text-slate-300 font-medium">30</div>
                <div className="text-center py-2 text-sm text-slate-300 font-medium">31</div>
                
                {Array.from({length: 30}, (_, i) => i + 1).map(date => {
                  const isPast = date < 4;
                  return (
                    <button 
                      key={date}
                      disabled={isPast}
                      onClick={() => setSelectedDate(date)}
                      className={`h-10 w-10 mx-auto flex items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                        selectedDate === date 
                          ? 'bg-[#0f2e53] text-white shadow-md' 
                          : isPast 
                            ? 'text-slate-400 opacity-50 cursor-not-allowed'
                            : 'text-[#0f2e53] hover:bg-slate-100'
                      }`}
                    >
                      {date}
                    </button>
                  );
                })}
              </div>

              {/* Available Slots */}
              <div>
                <h3 className="text-sm font-bold text-[#0f2e53] mb-4 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Available Slots
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                        selectedSlot === slot 
                          ? 'bg-[#0f2e53] text-white border-[#0f2e53] shadow-md'
                          : 'bg-slate-100 text-[#0f2e53] border-transparent hover:bg-slate-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Appointment Summary Box */}
            <div className="bg-[#0f60c6] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
              {/* Decorative graphic in top right */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#0d52a8] rounded-full opacity-50"></div>
              
              <h3 className="text-lg font-bold mb-6 relative z-10">Appointment Summary</h3>
              
              <div className="space-y-4 mb-8 relative z-10 text-sm">
                <div className="flex justify-between border-b text-blue-100 border-blue-400/30 pb-3">
                  <span className="opacity-80">Location</span>
                  <span className="font-semibold">{selectedLocation === 'downtown' ? 'Downtown Regional Center' : 'Metro North Bureau'}</span>
                </div>
                <div className="flex justify-between border-b text-blue-100 border-blue-400/30 pb-3">
                  <span className="opacity-80">Date</span>
                  <span className="font-semibold">Tuesday, Nov {selectedDate}, 2024</span>
                </div>
                <div className="flex justify-between border-b text-blue-100 border-blue-400/30 pb-3">
                  <span className="opacity-80">Time Slot</span>
                  <span className="font-semibold">{selectedSlot} — {selectedSlot.replace('11:00 AM', '11:30 AM').replace('09:00 AM', '09:30 AM').replace('09:30 AM', '10:00 AM')}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#0a428a] hover:bg-[#072e61] text-white font-bold py-4 rounded-xl flex items-center justify-center transition-colors relative z-10 disabled:opacity-70"
              >
                {loading ? 'Processing...' : (
                  <>Confirm Appointment <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </button>
              
              <p className="text-[10px] text-center font-bold tracking-widest uppercase text-blue-200 mt-4 relative z-10">
                No payment required for booking
              </p>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
