import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { authApi } from '../../services/auth';
import logo from '../../image/logo.png';

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  return password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password);
};

export const AuthForm = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserEmail, setHasPaid, selectedPlan } = useAuth();
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      general: ''
    });
  }, [isLogin]);

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      general: ''
    };

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Adresse email invalide';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(prev => ({ ...prev, general: '' }));

    if (!validateForm()) {
      console.log('Form validation failed', errors);
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        console.log('Attempting login for:', formData.email);
        const response = await authApi.login(formData.email, formData.password);
        console.log('Login successful', response);
        setIsAuthenticated(true);
        setUserEmail(formData.email);
        setHasPaid(response.user.hasPaid);

        if (response.user.hasPaid) {
          navigate('/loading');
        } else {
          navigate('/subscription');
        }
      } else {
        console.log('Attempting registration for:', formData.email);
        if (!selectedPlan) {
          console.log('No plan selected, navigating to /subscription');
          navigate('/subscription');
          return;
        }

        const response = await authApi.register(formData.email, formData.password);
        console.log('Registration successful', response);
        setIsAuthenticated(true);
        setUserEmail(formData.email);
        setHasPaid(false);

        // Redirect to the specific link after successful registration
        window.location.href = 'https://buy.stripe.com/test_14k3dRectcHMd2M5kk';
      }
    } catch (error) {
      console.error('Error during authentication', error);
      let errorMessage = 'Une erreur est survenue. Veuillez réessayer.';

      if (error.response?.status === 401) {
        errorMessage = 'Email ou mot de passe incorrect';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setErrors(prev => ({ ...prev, general: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '', general: '' }));
  };

  return (
    <div className="w-full max-w-md p-8 rounded-lg backdrop-blur-sm mb-40">
      <div className="flex flex-col items-center text-center mb-14">
        <img src={logo} alt="Minima Logo" className="h-40 w-40" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {isLogin ? 'Connexion' : 'Inscription'}
      </h2>

      {errors.general && (
        <div className="mb-6 p-3 bg-red-500 text-white rounded">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-2 bg-transparent border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-white focus:outline-none`}
            disabled={isLoading}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full px-4 py-2 bg-transparent border ${errors.password ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-white focus:outline-none`}
            disabled={isLoading}
            required
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full px-4 py-2 bg-transparent border ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'} rounded-lg text-white focus:border-white focus:outline-none`}
              disabled={isLoading}
              required
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 border border-white text-white font-medium transition-colors rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black'}`}
        >
          {isLoading
            ? 'Chargement...'
            : isLogin
              ? 'Se connecter'
              : "S'inscrire"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="w-full text-sm text-white/80 hover:text-white mt-4"
        disabled={isLoading}
      >
        {isLogin
          ? "Pas encore de compte ? S'inscrire"
          : 'Déjà un compte ? Se connecter'}
      </button>
    </div>
  );
};
