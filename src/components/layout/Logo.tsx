import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { useAuth } from '../../App';
import SettingsModal from './SettingsModal';
import logo from '../../image/logo.png';

export function Logo() {
  const location = useLocation();
  const { setIsAuthenticated } = useAuth();
  const isSportPage = location.pathname === '/sceance-sport';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleLogoClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    setShowSettings(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <div className="relative">
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleLogoClick();
          }}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-24 w-24"
          /><span className="text-xl font-normal mt-10">Minima</span>
        </div>
        {isDropdownOpen && (
          <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg p-4 z-50">
            <button
              onClick={handleSettingsClick}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-gray-700 transition-colors rounded-lg hover:bg-gray-50"
            >
              <Settings size={18} />
              <span>Paramètres</span>
            </button>
          </div>
        )}
      </div>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}
