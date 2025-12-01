
import React, { useState } from 'react';
import { X, Heart, CreditCard, Smartphone } from 'lucide-react';
import { AUTHOR_INFO } from '../constants';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [activeMethod, setActiveMethod] = useState<'wechat' | 'alipay'>('wechat');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-white text-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-[520px] animate-slide-up border border-white/60">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-slate-100 rounded-full transition-colors z-20 backdrop-blur-sm"
        >
          <X size={20} className="text-slate-500" />
        </button>

        {/* Left Side - Info */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex flex-col justify-center items-center text-center border-r border-slate-100 relative overflow-hidden">
          {/* Background decorative circles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-pink-200 rotate-3 hover:rotate-6 transition-transform">
            <Heart className="text-white fill-white animate-pulse" size={36} />
          </div>
          
          <h2 className="text-2xl font-black text-slate-800 mb-2">{AUTHOR_INFO.name}</h2>
          <p className="text-slate-500 mb-8 text-sm leading-relaxed font-medium px-2">{AUTHOR_INFO.supportMessage}</p>

            <div className="w-full space-y-3 relative z-10">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">关注作者平台</div>
            <div className="flex justify-center gap-3">
              {AUTHOR_INFO.platforms.map(p => (
                <button 
                  key={p.name} 
                  onClick={() => window.open(p.link, '_blank')}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-bold text-slate-600 hover:scale-105 transition-transform hover:border-slate-300"
                >
                  {p.icon}
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Payment */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">选择支付方式</h3>
          
          <div className="flex gap-2 mb-6 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
            <button 
              onClick={() => setActiveMethod('wechat')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeMethod === 'wechat' ? 'bg-white text-green-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <MessageCircleIcon /> 微信
            </button>
            <button 
              onClick={() => setActiveMethod('alipay')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeMethod === 'alipay' ? 'bg-white text-blue-500 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <CreditCardIcon /> 支付宝
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 relative group overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
               <div className={`w-40 h-40 bg-white shadow-xl p-2 rounded-xl ${activeMethod === 'wechat' ? 'ring-2 ring-green-100' : 'ring-2 ring-blue-100'} transition-all duration-300 transform group-hover:scale-105`}>
                 <img 
                   src={activeMethod === 'wechat' ? AUTHOR_INFO.qrWechat : AUTHOR_INFO.qrAlipay} 
                   alt={activeMethod === 'wechat' ? "微信支付" : "支付宝"}
                   className="w-full h-full object-cover rounded-lg"
                 />
               </div>
               <p className="mt-5 text-xs text-slate-400 font-medium flex items-center gap-1">
                 <Smartphone size={12} />
                 扫描二维码支持
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
)

const CreditCardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
)

export default DonationModal;
