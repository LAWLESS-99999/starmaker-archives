
import React from 'react';
import { ViewState } from '../types';
import { BookOpen, Home, Terminal, History, HeartHandshake, MessageCircle, Heart, Calendar, Star, HelpCircle, Image, Languages, Gamepad2, Plane, PartyPopper, Zap } from 'lucide-react';
import { AUTHOR_INFO } from '../constants';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onOpenDonation: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, onOpenDonation }) => {
  const navItems = [
    { view: ViewState.DASHBOARD, label: '首页', icon: <Home size={22} /> },
    { view: ViewState.CHARACTER_LIST, label: '人物档案 & 攻略', icon: <BookOpen size={22} /> },
    { view: ViewState.VACATION_GUIDES, label: '度假旅行', icon: <Plane size={22} /> },
    { view: ViewState.FESTIVALS, label: '节日', icon: <PartyPopper size={22} /> },
    { view: ViewState.FULL_EFFECTS, label: '全特征展示', icon: <Zap size={22} /> },
    { view: ViewState.HACKER_TOOL, label: '黑客答案', icon: <Terminal size={22} /> },
    { view: ViewState.FAQ, label: '常见问题', icon: <HelpCircle size={22} /> },
    { view: ViewState.CHANGELOG, label: '更新日志', icon: <History size={22} /> },
    { view: ViewState.ABOUT, label: '关于作者 & 鸣谢', icon: <HeartHandshake size={22} /> },
  ];

  return (
    <div className="h-screen w-80 bg-win-panel backdrop-blur-2xl flex flex-col border-r border-white/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-20">
      {/* Large Header Area */}
      <div className="h-44 p-8 flex flex-col justify-end bg-gradient-to-br from-white/80 to-blue-50/50 border-b border-white/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
           <Gamepad2 size={120} />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-win-accent via-purple-500 to-win-highlight animate-gradient-x font-sans tracking-tight leading-tight">
            STARMAKER<br/>ARCHIVES
          </h1>
        <p className="text-sm text-win-muted mt-2 font-mono tracking-widest uppercase">
          v1.1 // GUIDE_SYSTEM
        </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-8 px-4">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => onChangeView(item.view)}
                className={`w-full flex items-center px-5 py-4 rounded-xl transition-all duration-300 group ${
                  currentView === item.view
                    ? 'bg-white shadow-sm text-win-accent font-bold scale-[1.02]'
                    : 'text-slate-600 hover:bg-white/60 hover:text-win-text'
                }`}
              >
                <span className={`mr-5 p-2 rounded-lg transition-colors ${currentView === item.view ? 'bg-blue-100 text-win-accent' : 'bg-transparent text-slate-400 group-hover:text-slate-600'}`}>
                  {item.icon}
                </span>
                <span className="font-medium tracking-wide text-base">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-8 border-t border-white/50 bg-white/30 space-y-4 backdrop-blur-sm">
        <button
          onClick={onOpenDonation}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white font-bold text-base shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
        >
          <Heart size={20} fill="currentColor" className="group-hover:animate-ping" />
          <span className="relative">支持作者 (投喂)</span>
        </button>
        
        <button 
          onClick={() => alert('期待后续更新')}
          className="w-full py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-medium text-base hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3 shadow-sm"
        >
          <MessageCircle size={20} />
          玩家反馈 (期待后续更新)
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
