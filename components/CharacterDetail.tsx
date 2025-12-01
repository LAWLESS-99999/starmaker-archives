import React, { useState } from 'react';
import { Character } from '../types';
import { X, MapPin, Key, AlertTriangle, ArrowRight, CheckCircle2, CornerDownRight, ScrollText, GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';

interface CharacterDetailProps {
  character: Character;
  onClose: () => void;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get all images for the character
  const getCharacterImages = () => {
    if (character.images && character.images.length > 0) {
      return character.images;
    }
    // Fallback to avatarUrl if no specific images array
    return [character.avatarUrl];
  };

  const characterImages = getCharacterImages();
  const hasMultipleImages = characterImages.length > 1;

  const baseUrl = (import.meta as any).env?.BASE_URL || '/';
  const resolvePath = (p?: string) => {
    if (!p) return '';
    // if already absolute (starts with '/'), prepend base if base isn't '/'
    if (p.startsWith('/')) {
      return baseUrl === '/' ? p : `${baseUrl.replace(/\/$/, '')}${p}`;
    }
    return `${baseUrl}${p}`;
  };

  const getRouteImage = (keyword: string, fallbackFile: string) => {
    const found = characterImages.find((img) => img.includes(keyword));
    return resolvePath(found || `/images/${fallbackFile}`);
  };
  // Treat any character with role 'SYSTEM' as the system guide (FAQ/basic guides)
  // Keep id fallback for compatibility.
  const isSystemGuide = character.role === 'SYSTEM' || character.id === 'system_guide';

  // Navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % characterImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + characterImages.length) % characterImages.length);
  };

  // Helper function to parse custom tags for styling
  const renderRichText = (text: string) => {
    const parts = text.split(/(\[r\].*?\[\/r\]|\[g\].*?\[\/g\]|\[b\].*?\[\/b\]|\[big\].*?\[\/big\])/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('[r]') && part.endsWith('[/r]')) {
        return <span key={index} className="text-red-500 font-bold">{part.slice(3, -4)}</span>;
      }
      if (part.startsWith('[g]') && part.endsWith('[/g]')) {
        return <span key={index} className="text-emerald-600 font-bold">{part.slice(3, -4)}</span>;
      }
      if (part.startsWith('[b]') && part.endsWith('[/b]')) {
        return <span key={index} className="text-blue-600 font-bold">{part.slice(3, -4)}</span>;
      }
      if (part.startsWith('[big]') && part.endsWith('[/big]')) {
        return <span key={index} className="text-xl md:text-2xl font-black text-slate-800">{part.slice(5, -6)}</span>;
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white/95 w-full max-w-7xl h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative border border-white/50 animate-slide-up"
      >
        
        {/* Header */}
        <div className="flex justify-between items-center px-10 py-6 border-b border-slate-100 bg-white/80 backdrop-blur-xl z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg text-white font-bold text-3xl shrink-0">
              {character.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                {character.name}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm font-mono text-slate-400 bg-slate-100 px-3 py-1 rounded">ID: {character.id.toUpperCase()}</span>
                <span className="text-sm font-bold text-win-accent bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {character.role}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            aria-label="关闭档案"
            className="ui-button ui-icon"
          >
            <X size={24} className="text-slate-600" />
          </button>
        </div>

        {/* Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Image & Info (Fixed) */}
          {!isSystemGuide && (
          <div className="w-96 bg-slate-50/80 border-r border-slate-100 p-8 flex flex-col gap-8 overflow-y-auto shrink-0 hidden lg:flex">
            {/* Image Carousel */}
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white relative group">
              <img 
                src={resolvePath(characterImages[currentImageIndex])} 
                alt={`${character.name} 图片`} 
                className="w-full h-full object-cover transition-all duration-500" 
              />
              
              {/* Navigation Arrows - Only show if multiple images */}
                  {hasMultipleImages && (
                    <>
                      <button 
                        onClick={prevImage}
                        title="上一张"
                        aria-label="上一张"
                        className="absolute left-4 top-1/2 -translate-y-1/2 ui-button ui-icon opacity-0 group-hover:opacity-100 border border-slate-200"
                      >
                        <ChevronLeft size={20} className="text-slate-700" />
                      </button>
                      <button 
                        onClick={nextImage}
                        title="下一张"
                        aria-label="下一张"
                        className="absolute right-4 top-1/2 -translate-y-1/2 ui-button ui-icon opacity-0 group-hover:opacity-100 border border-slate-200"
                      >
                        <ChevronRight size={20} className="text-slate-700" />
                      </button>
                    </>
                  )}
              
              {/* Image Indicator Dots */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {characterImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      title={`切换图片`}
                      aria-label={`切换图片`}
                      className={`transition-all duration-300 ${index === currentImageIndex ? 'scale-125' : ''}`}
                    >
                      <span className={`ui-dot ${index === currentImageIndex ? 'bg-white' : ''}`} />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Image Counter */}
              {/* image counter removed to avoid numeric ordering */}
            </div>

              <div className="space-y-6">
              {character.unlockConditions && (
                <div className="ui-card">
                  <h4 className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                    <Key size={16} /> 解锁/触发条件
                  </h4>
                  <p className="text-base text-orange-600 font-bold leading-relaxed bg-orange-50 p-4 rounded-xl border border-orange-100">
                    {renderRichText(character.unlockConditions)}
                  </p>
                </div>
              )}
            </div>
          </div>
          )}

          {/* Right Content Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto bg-white scroll-smooth p-10">
            <div className="max-w-5xl mx-auto space-y-16 pb-24">
              {!isSystemGuide ? (
              /* Profile Section */
              <section className="space-y-8">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl shadow-lg">
                    <ScrollText size={28} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">档案概览</h3>
                </div>
                
                {/* Enhanced Description with Route Visualization */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-8 rounded-3xl border border-slate-100 text-slate-700 leading-loose text-lg shadow-lg backdrop-blur-sm">
                  {renderRichText(character.description)}
                  
                  {/* Special Route Visualization for Anna */}
                  {character.id === 'anna' && (
                    <div className="ui-card mt-8">
                      <h4 className="text-slate-800 font-bold mb-6 text-lg flex items-center gap-2">
                        <span className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></span>
                        路线选择可视化
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="text-center">
                          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-emerald-200 mb-4">
                            <img 
                              src={getRouteImage('善良', '安娜善良.png')}
                              alt="安娜善良路线" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
                            <h5 className="font-bold text-emerald-700 text-lg mb-2">纯洁路线</h5>
                            <p className="text-sm text-emerald-600">保持纯洁行为，减少堕落值</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-red-200 mb-4">
                            <img 
                              src={getRouteImage('堕落', '安娜堕落.png')}
                              alt="安娜堕落路线" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl border border-red-200">
                            <h5 className="font-bold text-red-700 text-lg mb-2">恶堕路线</h5>
                            <p className="text-sm text-red-600">调皮行为增加堕落值</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {character.tips && character.tips.length > 0 && (
                  <div className="ui-card">
                    <h4 className="text-amber-600 font-bold mb-4 flex items-center gap-2 text-base uppercase tracking-wider">
                      <AlertTriangle size={20} className="text-amber-500" /> 
                      重要提示
                    </h4>
                    <ul className="space-y-4">
                      {character.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-slate-700 text-lg leading-relaxed">
                          <span className="mt-2 w-2 h-2 bg-amber-500 rounded-full shrink-0 shadow-sm" />
                          <span>{renderRichText(tip)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
              ) : (
                /* If this is the system guide, only show guideSteps (FAQ content) */
                <section className="space-y-8">
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <ArrowRight size={28} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800">常见问题</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="ui-card">
                      <ul className="space-y-3 text-slate-600">
                        {character.guideSteps.map((item, i) => (
                          <li key={i} className="leading-relaxed text-lg">{renderRichText(item)}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {!isSystemGuide && (
              <section className="space-y-8">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <ArrowRight size={28} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">攻略流程</h3>
                </div>

                <div className="space-y-0 relative pl-6">
                  {/* Timeline Line */}
                  <div className="absolute left-[23px] top-6 bottom-6 w-1 bg-slate-100" />
                  
                  {character.guideSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-8 relative pb-8 group last:pb-0">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center text-slate-400 font-mono font-bold text-lg shadow-sm group-hover:border-win-accent group-hover:text-win-accent group-hover:scale-110 transition-all shrink-0">
                        <span className="w-3 h-3 rounded-full bg-slate-300" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="ui-card">
                          {renderRichText(step)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              )}

              {/* Routes Section */}
              {!isSystemGuide && character.routes && character.routes.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                      <GitBranch size={28} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800">分支路线</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {character.routes.map((route, idx) => (
                      <div key={idx} className="ui-card overflow-hidden">
                        <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex justify-between items-center">
                          <h4 className="font-bold text-slate-800 flex items-center gap-3 text-xl">
                            <CheckCircle2 size={24} className="text-green-500" />
                            {route.name}
                          </h4>
                          {/* removed numeric route index to avoid 1/2/3 ordering */}
                        </div>
                        <div className="p-8 bg-white">
                          <ul className="space-y-4">
                            {route.steps.map((step, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-4 text-lg text-slate-600 group-hover:text-slate-800 transition-colors leading-relaxed">
                                <CornerDownRight size={20} className="text-purple-300 mt-1 shrink-0" />
                                <span>{renderRichText(step)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
