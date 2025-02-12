import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

export function Link({ href, children, active }: LinkProps) {
  const location = useLocation();
  const isSportPage = location.pathname === '/sceance-sport';

  return (
    <RouterLink
      to={href}
      className={`
        px-4 py-2 transition-all duration-100 ease-in-out
        ${isSportPage
          ? `hover:bg-black hover:text-white hover:border hover:border-black
             ${active ? 'bg-black text-white border border-black' : 'text-black'}`
          : `hover:bg-white hover:text-black hover:border hover:border-white
             ${active ? 'bg-white text-black border border-white' : 'text-white'}`
        }
      `}
    >
      {children}
    </RouterLink>
  );
}