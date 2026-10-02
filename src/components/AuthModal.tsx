import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Lock, User, CheckCircle2, AlertCircle, ArrowRight, Sprout, Loader2 } from 'lucide-react';
import { signInUser, signUpUser, isSupabaseConfigured } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!isSupabaseConfigured) {
      setError('Supabase credentials are not yet configured in .env');
      return;
    }

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        const data = await signUpUser(email, password, fullName);
        if (data.user) {
          if (data.session) {
            setSuccessMsg('Account created successfully!');
            setTimeout(() => {
              onSuccess(data.user);
              onClose();
            }, 1000);
          } else {
            // Email confirmation required by Supabase settings
            setSuccessMsg('Account created! Please check your email to confirm registration.');
          }
        }
      } else {
        const data = await signInUser(email, password);
        if (data.user) {
          setSuccessMsg('Welcome back!');
          setTimeout(() => {
            onSuccess(data.user);
            onClose();
          }, 800);
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      // Demo farmer profile
      const demoUser = {
        id: 'demo-farmer-id',
        email: 'farmer@agri-intelligence.com',
        user_metadata: {
          full_name: 'Demo Agronomist'
        }
      };
      setSuccessMsg('Logged in as Demo Agronomist!');
      setTimeout(() => {
        onSuccess(demoUser);
        onClose();
      }, 700);
    } catch (err: any) {
      setError(err?.message || 'Demo sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transition-all z-10 my-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className="p-6 pb-4 bg-gradient-to-r from-agri-600/15 via-agri-500/5 to-transparent border-b border-slate-100 dark:border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-agri-700 to-agri-500 flex items-center justify-center text-white shadow-md shadow-agri-600/30">
              <Sprout className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Agri Product Intelligence
              </p>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="mt-4 flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <button
              type="button"
              onClick={() => { setMode('signin'); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${mode === 'signin'
                  ? 'bg-white dark:bg-slate-700 text-agri-700 dark:text-agri-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${mode === 'signup'
                  ? 'bg-white dark:bg-slate-700 text-agri-700 dark:text-agri-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-xl flex items-start space-x-2.5 text-xs text-rose-800 dark:text-rose-300 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-start space-x-2.5 text-xs text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{successMsg}</span>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name / Farm Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Patil / Patil Agro Farm"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium focus:ring-2 focus:ring-agri-500/40 focus:border-agri-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium focus:ring-2 focus:ring-agri-500/40 focus:border-agri-500 outline-none transition-all dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium focus:ring-2 focus:ring-agri-500/40 focus:border-agri-500 outline-none transition-all dark:text-white"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Minimum 6 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center space-x-2 py-2.5 px-4 bg-gradient-to-r from-agri-600 to-agri-700 hover:from-agri-700 hover:to-agri-800 text-white font-bold text-xs rounded-xl shadow-md shadow-agri-600/20 hover:shadow-glow transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{mode === 'signin' ? 'Sign In to Account' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Quick Demo Login Option */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="text-xs font-semibold text-agri-700 dark:text-agri-400 hover:underline cursor-pointer"
            >
              Continue as Demo Agronomist / Guest
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
