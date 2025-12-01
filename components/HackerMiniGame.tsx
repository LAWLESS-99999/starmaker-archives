
import React, { useState } from 'react';
import { HACKER_CODES } from '../constants';
import { Search, Copy, Check, Terminal } from 'lucide-react';

const HackerMiniGame: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredCodes = HACKER_CODES.filter(
    item => 
      item.code.toLowerCase().includes(filter.toLowerCase()) || 
      item.answer.toLowerCase().includes(filter.toLowerCase()) ||
      item.meaning.includes(filter)
  );

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center py-10">
        <h2 className="text-4xl font-black text-slate-800 font-sans tracking-tight mb-3">黑客答案</h2>
        <p className="text-slate-500 text-lg">萨曼莎电脑解密游戏快速查询</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Search Bar */}
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <Terminal size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">黑客游戏对应答案</h3>
              <p className="text-sm text-slate-400 font-mono">DATABASE_V1.0</p>
            </div>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="搜索代码或游戏名 (例如: GTA)..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-800 pl-12 pr-5 py-3 rounded-2xl text-base focus:outline-none focus:border-win-accent focus:ring-2 focus:ring-win-accent/20 transition-all shadow-sm placeholder-slate-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-base">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="p-6 w-1/3">加密代码 (CODE)</th>
                <th className="p-6 w-1/3">答案 (点击复制)</th>
                <th className="p-6 w-1/3">中文含义</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCodes.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="p-6 font-mono font-bold text-slate-700 text-lg">{item.code}</td>
                  <td className="p-6">
                    <button 
                      onClick={() => handleCopy(item.answer, idx)}
                      className="flex items-center gap-4 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-sm transition-all w-full md:w-auto justify-between group-btn"
                    >
                      <span className="font-mono font-medium text-lg">{item.answer}</span>
                      {copiedIndex === idx ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} className="opacity-30 group-hover/btn:opacity-100 transition-opacity" />}
                    </button>
                  </td>
                  <td className="p-6 text-slate-500 text-lg">{item.meaning}</td>
                </tr>
              ))}
              {filteredCodes.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-16 text-center text-slate-400">
                    <Search size={64} className="mx-auto mb-4 opacity-20" />
                    没有找到匹配的代码
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-slate-50 p-4 text-center text-sm text-slate-400 border-t border-slate-100">
          共收录 {filteredCodes.length} 条数据
        </div>
      </div>
    </div>
  );
};

export default HackerMiniGame;
