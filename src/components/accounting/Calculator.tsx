import React, { useState } from 'react';
import { Equal } from 'lucide-react';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10 w-full max-w-xs">
      <div className="bg-black p-4 rounded mb-4 text-right">
        <div className="text-white/60 text-sm mb-1">{equation}</div>
        <div className="text-white text-2xl">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map(
          (btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === '=') calculate();
                else if (['+', '-', '×', '÷'].includes(btn)) handleOperator(btn);
                else handleNumber(btn);
              }}
              className="p-3 text-white border border-white/20 rounded hover:bg-white/10"
            >
              {btn}
            </button>
          )
        )}
      </div>
    </div>
  );
}