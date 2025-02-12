import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const messages = [
  "Lance-toi, le monde t'attend !",
  "Chaque jour est une opportunité !",
  "Crée ton succès, pas à pas.",
  "Les défis construisent des leaders.",
  "Rêve grand, agis vite.",
  "Ton potentiel est infini.",
  "La persévérance paie toujours.",
  "Ta vision change le monde.",
  "Ose, apprends, réussis.",
  "C'est ton moment, brille !",
  "Tu es à une idée de la réussite.",
  "Fais un pas aujourd'hui, un bond demain.",
  "Ton énergie est contagieuse, inspire !",
  "Le succès aime les esprits audacieux.",
  "Les grands rêves commencent petits.",
  "Construis ton empire, pierre par pierre.",
  "Le futur appartient à ceux qui osent.",
  "Chaque échec est une leçon déguisée.",
  "Rien n'est impossible pour toi.",
  "La passion mène à l'excellence.",
  "Tu crées ta propre opportunité.",
  "Le succès commence dans ton esprit.",
  "Transforme ta vision en action.",
  "Le moment idéal, c'est maintenant.",
  "Crois, crée, conquiers.",
  "Ta détermination ouvre des portes.",
  "Chaque pas compte, avance !",
  "Fais de ton rêve une réalité.",
  "Le travail acharné bat le talent.",
  "Je crois en toi, rien ne t'arrête.",
];

export function TerminalText() {
  const [text, setText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const location = useLocation();
  const isSportPage = location.pathname === '/sceance-sport';

  useEffect(() => {
    const currentMessage = messages[messageIndex];

    if (isTyping) {
      if (text.length < currentMessage.length) {
        const timeout = setTimeout(() => {
          setText(currentMessage.slice(0, text.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (text.length > 0) {
        const timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setIsTyping(true);
      }
    }
  }, [text, messageIndex, isTyping]);

  return (
    <div className={`w-64 h-8 font-mono ${isSportPage ? 'text-black' : 'text-white'}`}>
      {text}<span className="animate-pulse">|</span>
    </div>
  );
}
