import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2 } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('hire-me@anshumat.org');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    
    if (!isLogin && cleanPassword !== confirmPassword.trim()) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (cleanEmail && cleanPassword) {
      setLoading(true);
      
      const res = isLogin ? await login(cleanEmail, cleanPassword) : await signup(cleanEmail, cleanPassword);
      
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
        <h2 className="text-3xl font-bold text-[#0f2e53] mb-2">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
        <p className="text-slate-500">
          {isLogin ? 'Sign in to continue your application' : 'Start your secure passport journey'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#0f2e53] mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0f2e53] focus:border-[#0f2e53] outline-none transition-all font-medium text-slate-800"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0f2e53] mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0f2e53] focus:border-[#0f2e53] outline-none transition-all font-medium text-slate-800"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-semibold text-[#0f2e53] mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0f2e53] focus:border-[#0f2e53] outline-none transition-all font-medium text-slate-800"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
        )}
        
        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 text-center">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={!email || !password || (!isLogin && !confirmPassword) || loading}
          className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-md text-lg font-bold text-white bg-[#0f2e53] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (isLogin ? 'Sign In' : 'Sign Up')}
        </button>

        <div className="text-center pt-2">
          <p className="text-sm text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMsg('');
                if (isLogin) setEmail(''); // clear default mock email on signup
                else setEmail('hire-me@anshumat.org'); // restore default
              }}
              className="font-bold text-[#0f2e53] hover:text-blue-700 hover:underline transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
