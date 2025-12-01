import React from 'react';
import { ViewState } from '../types';
import { Home, BookOpen, Plane, PartyPopper, Zap, Terminal, HelpCircle, History, HeartHandshake, Menu } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onOpenDonation: () => void;
  onToggleSidebar: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  currentView, 
  onChangeView, 
  onOpenDonation,
  onToggleSidebar 
}) => {
  const navItems = [
    { view: ViewState.DASHBOARD, label: '首页', icon: <Home size={20} /> },
    { view: ViewState.CHARACTER_LIST, label: '人物', icon: <BookOpen size={20} /> },
    { view: ViewState.VACATION_GUIDES, label: '度假', icon: <Plane size={20} /> },
    { view: ViewState.FESTIVALS, label: '节日', icon: <PartyPopper size={20} /> },
    { view: ViewState.HACKER_TOOL, label: '黑客', icon: <Terminal size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={onToggleSidebar}
          className="flex flex-col items-center justify-center p-2 text-slate-600"
        >
          <Menu size={20} />
          <span className="text-xs mt-1">菜单</span>
        </button>
        
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onChangeView(item.view)}
            className={`flex flex-col items-center justify-center p-2 ${
              currentView === item.view 
                ? 'text-blue-600' 
                : 'text-slate-600'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
        
        <button
          onClick={onOpenDonation}
          className="flex flex-col items-center justify-center p-2 text-red-500"
        >
          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-xs font-bold">❤</span>
          </div>
          <span className="text-xs mt-1">支持</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;
