import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { TerminalText } from './TerminalText';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const isSportPage = location.pathname === '/sceance-sport';

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/subscription');
  };

  const handleAutoEntreprise = () => {
    navigate('/ecommerce');
  };

  return (
    <header
      className={`${isSportPage ? 'bg-white' : 'bg-black'} p-6 flex items-center justify-between`}
      style={{
        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out'
      }}
    >
      <Logo />
      <Navigation />
      <TerminalText />
    </header>
  );
}