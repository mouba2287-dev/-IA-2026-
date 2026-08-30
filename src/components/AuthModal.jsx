import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, CheckCircle2, ShieldCheck, RefreshCw, Send, Check } from 'lucide-react';

// Google Brand SVG Icon
const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');

  // Verification Step state
  const [step, setStep] = useState('auth'); // 'auth' | 'verify'
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isOpen) return null;

  // Handle standard email/password login or signup
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Launch Email Verification Step
      setStep('verify');
    } else {
      const user = {
        id: `user-${Date.now()}`,
        name: name || (email ? email.split('@')[0] : 'Membre FolioCraft'),
        email: email || 'utilisateur@demo.com',
        avatar: avatar,
        authProvider: 'email',
        isEmailVerified: true,
        loggedInAt: new Date().toISOString()
      };
      onLoginSuccess(user);
      onClose();
    }
  };

  // Handle Google OAuth Simulation
  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      const googleUser = {
        id: `google-user-${Date.now()}`,
        name: 'Alexandre Google Member',
        email: 'alexandre.google@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        authProvider: 'google',
        isEmailVerified: true,
        loggedInAt: new Date().toISOString()
      };
      onLoginSuccess(googleUser);
      onClose();
    }, 800);
  };

  // Confirm 6-digit OTP Email Code
  const handleVerifyCodeSubmit = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const user = {
        id: `user-${Date.now()}`,
        name: name || (email ? email.split('@')[0] : 'Membre FolioCraft'),
        email: email || 'utilisateur@demo.com',
        avatar: avatar,
        authProvider: 'email',
        isEmailVerified: true,
        loggedInAt: new Date().toISOString()
      };
      onLoginSuccess(user);
      setStep('auth');
      onClose();
    }, 800);
  };

  const handleCodeChange = (idx, val) => {
    if (val.length > 1) val = val[0];
    const newCode = [...verificationCode];
    newCode[idx] = val;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (val && idx < 5) {
      const nextInput = document.getElementById(`otp-input-${idx + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        {/* Top Header */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-950 via-purple-900/40 to-slate-900 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/80 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {step === 'verify'
                  ? 'Vérification de l’E-mail'
                  : isSignUp
                  ? 'Créer un compte FolioCraft'
                  : 'Connexion à votre espace'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {step === 'verify'
                  ? `Code à 6 chiffres envoyé à ${email || 'votre e-mail'}`
                  : isSignUp
                  ? 'Rejoignez des milliers de professionnels'
                  : 'Gérez et publiez vos portfolios en 1 clic'}
              </p>
            </div>
          </div>
        </div>

        {/* STEP 1: AUTH FORM */}
        {step === 'auth' ? (
          <div className="p-6 space-y-4">
            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full py-3 bg-slate-950 hover:bg-slate-800/80 border border-slate-700/80 rounded-2xl font-semibold text-xs text-slate-200 transition flex items-center justify-center gap-3 shadow-md"
            >
              {isGoogleLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
              ) : (
                <GoogleIcon className="w-4 h-4" />
              )}
              <span>Continuer avec Google</span>
            </button>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-3 text-[11px] text-slate-500 font-semibold uppercase">ou par e-mail</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jean Dupont"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
                    Choisir un Avatar
                  </label>
                  <div className="flex gap-2">
                    {[
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
                    ].map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt="Avatar option"
                        onClick={() => setAvatar(url)}
                        className={`w-10 h-10 rounded-full object-cover cursor-pointer border-2 transition ${
                          avatar === url ? 'border-indigo-500 scale-110 shadow-lg' : 'border-slate-700 opacity-60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 font-semibold text-white text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isSignUp ? 'Créer mon compte avec vérification' : 'Se connecter'}
                </button>
              </div>

              <div className="pt-3 border-t border-slate-800 text-center">
                <p className="text-xs text-slate-400">
                  {isSignUp ? 'Vous avez déjà un compte ?' : "Vous n'avez pas encore de compte ?"}{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-indigo-400 font-semibold hover:underline ml-1"
                  >
                    {isSignUp ? 'Se connecter' : 'Créer un compte'}
                  </button>
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>E-mail sécurisé & Authentification cryptée</span>
              </div>
            </form>
          </div>
        ) : (
          /* STEP 2: EMAIL VERIFICATION CODE SCREEN */
          <form onSubmit={handleVerifyCodeSubmit} className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto text-indigo-400">
                <Mail className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-300">
                Saisissez le code de confirmation envoyé à <strong className="text-indigo-400">{email}</strong>
              </p>
            </div>

            {/* 6 OTP Code Inputs */}
            <div className="flex justify-center gap-2">
              {verificationCode.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(idx, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-black bg-slate-950 border border-slate-700 rounded-xl text-indigo-400 focus:outline-none focus:border-indigo-500"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 font-bold text-white text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>Valider le code & Se connecter</span>
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep('auth')}
                className="text-xs text-slate-400 hover:text-white underline"
              >
                ← Changer d'adresse e-mail
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
