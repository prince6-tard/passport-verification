import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Phone, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('phone'); // phone -> otp
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('otp');
      }, 1000);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (otp.length === 4) {
      setLoading(true);
      const res = await login(phone);
      setLoading(false);
      
      if (res?.error) {
        setErrorMsg(res.error);
        return;
      }

      if (res?.user && !res.user.profileComplete) {
        navigate('/setup');
      } else if (res?.user) {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-slate-500">Sign in to continue your application</p>
      </div>

      {step === 'phone' ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg font-medium"
                placeholder="Enter 10 digit number"
                required
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 flex items-center">
              We'll send an OTP to this number
            </p>
          </div>
          
          <button
            type="submit"
            disabled={phone.length < 10 || loading}
            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Get OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 text-center">
              Enter the 4-digit OTP sent to <br/><span className="text-slate-900 font-bold text-lg mt-1 block">{phone}</span>
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              maxLength={4}
              className="mt-4 block w-full px-4 py-4 text-center tracking-[1em] text-2xl bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-bold text-slate-900"
              placeholder="••••"
              required
              autoFocus
            />
          </div>
          
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={otp.length < 4 || loading}
            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Verify & Login'}
          </button>
          
          <div className="text-center mt-4">
            <button 
              type="button" 
              onClick={() => setStep('phone')}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Change phone number
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
