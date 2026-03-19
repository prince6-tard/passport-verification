import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, MapPin, Loader2 } from 'lucide-react';

const Setup = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    city: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProfile(formData);
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Complete Profile</h2>
        <p className="text-slate-500 text-lg">Just a few basic details before we start</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name (As per records)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="E.g., Priya Sharma"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-5 h-5" />
            </div>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Current City
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="E.g., Mumbai"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !formData.name || !formData.dob || !formData.city}
          className="w-full mt-8 flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Save & Continue'}
        </button>
      </form>
    </div>
  );
};

export default Setup;
