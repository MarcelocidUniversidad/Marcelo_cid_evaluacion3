import React from 'react';
import { Armchair, User, Settings } from 'lucide-react';
interface HeaderProps {
  isAdmin: boolean;
  onToggleView: (isAdmin: boolean) => void;
}
export function Header({
  isAdmin,
  onToggleView
}: HeaderProps) {
  return <header className="sticky top-0 z-50 w-full border-b border-amber-100 bg-amber-50/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-800 rounded-lg text-amber-50">
            <Armchair className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-amber-950 leading-tight">
              Mueblería Los Muebles Hermanos
            </h1>
            <p className="text-xs text-amber-700 font-medium tracking-wide">
              CALIDAD Y CONFORT DESDE 1980
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-4">
          <div className="bg-stone-200 p-1 rounded-full flex relative w-64 shadow-inner">
            {/* Sliding Background */}
            <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-spring ${isAdmin ? 'left-[calc(50%)]' : 'left-1'}`} />

            <button onClick={() => onToggleView(false)} className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${!isAdmin ? 'text-amber-900' : 'text-stone-500 hover:text-stone-700'}`}>
              <User className="h-4 w-4" />
              <span>Cliente</span>
            </button>

            <button onClick={() => onToggleView(true)} className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${isAdmin ? 'text-amber-900' : 'text-stone-500 hover:text-stone-700'}`}>
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>;
}