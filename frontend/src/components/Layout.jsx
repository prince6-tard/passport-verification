import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, User, Globe, Shield } from 'lucide-react';
import AutoSaveIndicator from './AutoSaveIndicator';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer select-none" 
              onClick={() => navigate(user ? '/dashboard' : '/')}
            >
              <span className="font-extrabold text-xl tracking-tight text-[#1e3a8a] uppercase">
                Passport Service
              </span>
            </div>
            
            {/* Center Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <span className="text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer transition-colors">Applications</span>
              <span className="text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer transition-colors">Status</span>
              <span className="text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer transition-colors">Requirements</span>
              <span className="text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer transition-colors">Help</span>
              <div className="hidden lg:block ml-4">
                <AutoSaveIndicator />
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              <span className="hidden sm:block text-sm font-bold text-[#1e3a8a] cursor-pointer hover:underline">
                Support
              </span>
              <button className="text-slate-600 hover:text-[#1e3a8a] transition-colors">
                <Bell className="w-5 h-5 fill-slate-700 text-slate-700" />
              </button>
              
              {user ? (
                <div className="flex items-center">
                  <span className="text-sm font-medium text-slate-700 mr-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    {user.name || user.phone}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <User className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full bg-slate-50">
        <Outlet />
      </main>
      
      <footer className="bg-slate-100 py-12 mt-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-extrabold text-[#1e3a8a] mb-2 uppercase text-sm tracking-wide">Passport Service</h4>
            <p className="text-xs text-slate-500 max-w-xs">
              &copy; {new Date().getFullYear()} Bureau of Consular Affairs. Official Government Service.
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-xs font-semibold text-slate-500">
            <span className="cursor-pointer hover:text-slate-800">Privacy Policy</span>
            <span className="cursor-pointer hover:text-slate-800">Terms of Service</span>
            <span className="cursor-pointer hover:text-slate-800">Accessibility</span>
            <span className="cursor-pointer hover:text-slate-800">Contact Support</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Globe className="w-5 h-5 cursor-pointer hover:text-slate-600" />
            <Shield className="w-5 h-5 cursor-pointer hover:text-slate-600" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
