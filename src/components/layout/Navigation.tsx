import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const isSportPage = location.pathname === '/sceance-sport';

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const baseClass = `px-4 py-2 transition-all duration-300 ease-in-out rounded-[20px] ${isSportPage
    ? 'hover:bg-black hover:text-white hover:border hover:border-black'
    : 'hover:bg-white hover:text-black hover:border hover:border-white'
    }`;

  const activeClass = isSportPage
    ? 'bg-black text-white border border-black'
    : 'bg-white text-black border border-white';

  const inactiveClass = isSportPage ? 'text-black' : 'text-white';

  const excludedRoutes = ['/intro', '/signup'];
  const isExcludedRoute = excludedRoutes.includes(location.pathname);

  if (isExcludedRoute) {
    return null;
  }

  const navItems = [
    { path: '/ecommerce', label: 'Auto entreprise' },
    { path: '/suivi-personnel', label: 'Suivi personnel' },
    { path: '/sceance-sport', label: 'Sceance de sport' },
  ];

  return (
    <nav className="flex gap-8">
      {navItems.map((item, index) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.3s ease-out ${0.1 * index}s, transform 0.1s ease-out ${0.1 * index}s`,
          }}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}