
import React, { useState, useMemo, useEffect, Suspense, lazy } from 'react';
import Sidebar from './components/Sidebar';
import MobileBottomNav from './components/MobileBottomNav';
import CharacterCard from './components/CharacterCard';
import DonationModal from './components/DonationModal';

const CharacterDetail = lazy(() => import('./components/CharacterDetail'));
const HackerMiniGame = lazy(() => import('./components/HackerMiniGame'));
import { ViewState, Character, CharacterRole } from './types';
import { GAME_CHANGELOG, TOOL_CHANGELOG, AUTHOR_INFO, SUPPORTERS } from './constants';
import { Search, Bell, Sparkles, Gamepad2, Info, ChevronLeft, ChevronRight, Star, BookOpen, Terminal, History, HeartHandshake, Heart, MessageCircle, Plane, PartyPopper, Zap, HelpCircle, Menu } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch('/data/characters.json');
      const data = await response.json();
      setCharacters(data);
    };
    fetchCharacters();
  }, []);

  // Custom hero images for the carousel
  const heroCharacters = [
    { id: 'hero-1', avatarUrl: '/images/1.png' },
    { id: 'hero-2', avatarUrl: '/images/2.png' },
    { id: 'hero-3', avatarUrl: '/images/3.png' },
    { id: 'hero-4', avatarUrl: '/images/4.png' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroCharacters.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroCharacters.length]);

  // Separate data based on views
  const characterList = useMemo(() => {
    return characters.filter(c => c.role !== CharacterRole.SYSTEM);
  }, [characters]);

  const guideList = useMemo(() => {
    return characters.filter(c => c.role === CharacterRole.SYSTEM);
  }, [characters]);

  // Search logic
  const filteredItems = useMemo(() => {
    let sourceList = characterList;
    
    if (!searchQuery) return sourceList;
    
    // If searching globally while in other views, search everything
    if (currentView !== ViewState.CHARACTER_LIST) {
       sourceList = characters;
    }

    return sourceList.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentView, characterList]);

  const handleCharacterSelect = (char: Character) => {
    setSelectedCharacter(char);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.VACATION_GUIDES:
        return (
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">度假旅行三星达成条件</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">热带假期、霜度假期、日本度假完整攻略指南</p>
            </div>
            
            {/* 度假旅行三星达成条件展示图片 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">度假旅行三星达成条件展示</h3>
              <div className="flex justify-center">
                <img 
                  src="/images/度假旅行三星达成条件.png" 
                  alt="度假旅行三星达成条件" 
                  className="rounded-2xl w-full max-w-2xl shadow-md"
                />
              </div>
            </div>
            
            {/* 热带假期 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">🦩</span>
                <h2 className="text-3xl font-black text-slate-800">热带假期</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                  <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-3">
                    <span className="text-2xl">⭐</span>
                    第一个星星
                  </h3>
                  <ul className="space-y-3 text-orange-700">
                    <li>• 去海滩，在阳光下放松</li>
                    <li>• 选择享受日光浴，安娜会告诉你她很渴</li>
                    <li>• 选择为您的角质摩洛伊斯兰解放阵线拍照</li>
                    <li>• 她之后会累了，要求早睡，晚上她会有小动作，你继续假装睡觉</li>
                    <li>• 为了得到这个星星，她不能有任何悔恨（只有 2 个 cg）</li>
                    <li>• 然后需要多次去沙滩，遇到短发女粉丝，并达成对话邀请到房间触发CG</li>
                    <li>• 推荐安娜好感度达到5再来否则不触发</li>
                    <li>• 然后好感度达到5时白天准备离开时触发CG</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                  <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-3">
                    <span className="text-2xl">⭐</span>
                    第二个星星
                  </h3>
                  <ul className="space-y-3 text-orange-700">
                    <li>• 去参加选美比赛（你会输）</li>
                    <li>• 去找商场找祖里要一件特别的泳衣</li>
                    <li>• 再次参加选美返回比赛并获胜</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                  <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-3">
                    <span className="text-2xl">⭐</span>
                    第三个星星
                  </h3>
                  <ul className="space-y-3 text-orange-700">
                    <li>• 去酒吧。然后在你的房间里和莱拉尼触发CG</li>
                    <li>• 参加选美比赛</li>
                    <li>• 下次访问时去海滩，芙蕾雅应该会出现（第 1 步或第 2 步将触发芙蕾雅出现，但两者都需要继续）</li>
                    <li>• 然后告诉安娜："我们在阳光下放松一下怎么样？"</li>
                    <li>• "当然没问题"</li>
                    <li>• "你为什么不给我看看？"</li>
                    <li>• 下次拜访芙蕾雅应该接近您和安娜并邀请她到房间</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 霜度假期 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">🏔️</span>
                <h2 className="text-3xl font-black text-slate-800">霜度假期</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                    <span className="text-2xl">⭐</span>
                    第一个星星
                  </h3>
                  <ul className="space-y-3 text-blue-700">
                    <li>• 去泡温泉鼓掌</li>
                    <li>• 在浪漫路线中（仅适用于浪漫路线）：</li>
                    <li>• "我看得出来，你正在发光"</li>
                    <li>• "这是一个仅供成年人使用的地方。这在这里并不少见。"</li>
                    <li>• "我们可以做任何我们想做的事"</li>
                    <li>• 在堕落路线中，你不会告诉她停下来</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                    <span className="text-2xl">⭐</span>
                    第二个星星
                  </h3>
                  <ul className="space-y-3 text-blue-700">
                    <li>• 去参加节日喝点酒，之后安娜会送你一份礼物</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                    <span className="text-2xl">⭐</span>
                    第三个星星
                  </h3>
                  <ul className="space-y-3 text-blue-700">
                    <li>• 去镇上警告你关于狼人的事情。（狼人的性别受您的选择影响）</li>
                    <li>• 去露营，遇到狼人。</li>
                    <li>• 再见老人。</li>
                    <li>• 在商场的商店购买精致的肉类</li>
                    <li>• 返回喂狼人肉</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 日本度假 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">🏯</span>
                <h2 className="text-3xl font-black text-slate-800">日本度假</h2>
              </div>
              
              <div className="bg-red-50 p-6 rounded-2xl border border-red-200 mb-6">
                <h3 className="text-xl font-bold text-red-800 mb-4">日本度假前要：</h3>
                <ul className="space-y-3 text-red-700">
                  <li>• 需要通过以下方式与阿德里安成为朋友</li>
                  <li>• 给他旅行的钱，并与他分享至少一个女孩，可能的选择是：</li>
                  <li>• 共享安娜（不需要完成 只需要告诉安娜解锁）</li>
                  <li>• 共享萨曼莎</li>
                  <li>• 共享爱丽丝 （您必须在游戏之夜进行 3 次才能计入行程）</li>
                  <li>• 去做两次日式按摩 与樱花一起拍摄</li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-3">
                    <span className="text-2xl">⭐</span>
                    第一个星星
                  </h3>
                  <ul className="space-y-3 text-red-700">
                    <li>• 去神社见千寻</li>
                    <li>• 一周后回去 大寿她的事情</li>
                    <li>• 问问千寻大寿说了什么</li>
                    <li>• 下周寻找弘二（酒店对话中的选项）并付钱给他</li>
                    <li>• 下周去见千寻告诉她你知道真相并要求加入</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-3">
                    <span className="text-2xl">⭐</span>
                    第二个星星
                  </h3>
                  <ul className="space-y-3 text-red-700">
                    <li>• 去咖啡馆两次。</li>
                    <li>• 询问她的是否在菜单上并付款。</li>
                    <li>• 接下来的一周她会邀请你到后面，再付钱给她一场戏</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-3">
                    <span className="text-2xl">⭐</span>
                    第三个星星
                  </h3>
                  <ul className="space-y-3 text-red-700">
                    <li>• 在去寺庙的火车上遇到梅和她的丈夫两次，第二次把你的地址给她</li>
                    <li>• 给她打电话到酒店两次</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4">完成奖励</h3>
                  <p className="text-green-700">——完成所有星星后，您将在下个周末收到一件送给安娜的新服装 ——</p>
                </div>
              </div>
            </div>
          </div>
        );

      case ViewState.HACKER_TOOL:
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <HackerMiniGame />
          </Suspense>
        );
      
      case ViewState.CHANGELOG:
        return (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Tool Updates */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-slate-800 font-sans flex items-center gap-4">
                <Sparkles size={32} className="text-win-accent fill-win-accent" /> 
                工具更新日志 (v1.0)
              </h2>
              {TOOL_CHANGELOG.map((log, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-baseline mb-6 border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-bold text-slate-800">v{log.version}</h3>
                    <span className="font-mono text-slate-400 text-sm">{log.date}</span>
                  </div>
                  <ul className="space-y-4">
                    {log.changes.map((change, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-slate-600 text-base">
                        <span className="w-2 h-2 bg-win-accent rounded-full mt-2 shrink-0" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Game Updates */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-slate-800 font-sans flex items-center gap-4">
                <Gamepad2 size={32} className="text-purple-500 fill-purple-500" /> 
                游戏更新内容
              </h2>
              {GAME_CHANGELOG.map((log, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm opacity-90">
                  <div className="flex justify-between items-baseline mb-6 border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-bold text-slate-700">v{log.version}</h3>
                    <span className="font-mono text-slate-400 text-sm">{log.date}</span>
                  </div>
                  <ul className="space-y-4">
                    {log.changes.map((change, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-slate-500 text-base">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 shrink-0" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case ViewState.ABOUT:
        return (
          <div className="max-w-4xl mx-auto pt-12">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">关于 Starmaker Archives</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">{AUTHOR_INFO.description}</p>
            </div>
            
            {/* Author Support Section */}
            <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-xl mb-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3 relative z-10">
                <HeartHandshake size={28} className="text-blue-500 fill-blue-500" />
                关注作者
              </h3>
              
              <p className="text-slate-600 mb-8 relative z-10">{AUTHOR_INFO.supportMessage}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                {AUTHOR_INFO.platforms.map((platform, idx) => (
                  <a 
                    key={idx}
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center font-bold text-slate-700 text-base hover:bg-blue-50 hover:text-blue-800 hover:border-blue-200 transition-colors shadow-sm flex flex-col items-center gap-2"
                  >
                    <span className="text-2xl">{platform.icon}</span>
                    <span>{platform.name}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Supporters Section */}
            <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-xl mb-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
               
               <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3 relative z-10">
                 <Star size={28} className="text-yellow-500 fill-yellow-500" />
                 特别感谢名单 (Special Thanks)
               </h3>
               
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
                 {SUPPORTERS.map((name, idx) => (
                   <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center font-bold text-slate-700 text-base hover:bg-yellow-50 hover:text-yellow-800 hover:border-yellow-200 transition-colors shadow-sm">
                     {name}
                   </div>
                 ))}
                 <div className="col-span-full mt-6 text-center text-sm text-slate-400">
                   感谢所有提供反馈和支持的玩家！名单持续更新中...
                 </div>
               </div>
            </div>
          </div>
        );

      case ViewState.CHARACTER_LIST:
      case ViewState.GAME_GUIDES:
        const isGuideView = currentView === ViewState.GAME_GUIDES;
        return (
          <div className="space-y-10 animate-fade-in">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                  {isGuideView ? '游戏百科 & 节日' : '人物档案库'}
                </h2>
                <p className="text-slate-500 text-base mt-2">
                  {isGuideView ? '系统玩法 / 节日活动 / 常见问题' : '主要角色 / 配角 / 隐藏人物攻略'}
                </p>
              </div>
              <div className="bg-white px-4 py-2 rounded-full border border-slate-200 text-sm font-mono text-slate-400 shadow-sm font-bold">
                ITEMS: {filteredItems.length}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-24">
              {filteredItems.map(char => (
                <CharacterCard 
                  key={char.id} 
                  character={char} 
                  onClick={() => handleCharacterSelect(char)} 
                />
              ))}
            </div>
          </div>
        );

      case ViewState.FESTIVALS:
        return (
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">节日系统</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">1.6B 增加节日系统，每个节日有特定的内容</p>
            </div>
            
            {/* 节日示意图 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">节日示意图</h3>
              <div className="flex justify-center">
                <img 
                  src="/images/节日示意图.png" 
                  alt="节日活动示意图" 
                  className="rounded-2xl w-full max-w-2xl shadow-md"
                />
              </div>
            </div>
            
            {/* 情人节 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">💌</span>
                <h2 className="text-3xl font-black text-slate-800">情人节</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
                  <h3 className="text-xl font-bold text-pink-800 mb-4">触发条件</h3>
                  <ul className="space-y-3 text-pink-700">
                    <li>• 一旦你走出卧室，安娜如果被踢了和约瑟夫都会开始这个场景</li>
                    <li>• 只是不要选择"听起来很沮丧数我出去"场景将继续</li>
                  </ul>
                </div>
                
                <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
                  <h3 className="text-xl font-bold text-pink-800 mb-4">剧情分支</h3>
                  <ul className="space-y-3 text-pink-700">
                    <li>• 要么3个人都去看电影</li>
                    <li>• 要么只有安娜和主角会有相同的场景</li>
                    <li>• 一旦安娜在自卫时给主角打枪，选择前两个选项来互动在安娜的嘴上或者最后一个互动</li>
                    <li>• 回到家后约瑟夫和安娜或者如果独自一人安娜会邀请您到卧室继续[没有"场景"，但有一个有趣的片段阿德里安站在门外]</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 复活节 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">🗿</span>
                <h2 className="text-3xl font-black text-slate-800">复活节</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4">当前状态</h3>
                  <ul className="space-y-3 text-green-700">
                    <li>• 目前没有这个假期的场景</li>
                    <li>• 你可以在地图上找到蛋，这些蛋会给你经验值（一旦代码固定了，就会有半个条）</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4">蛋的位置</h3>
                  <ul className="space-y-3 text-green-700">
                    <li>• 酒吧</li>
                    <li>• 桑拿（马里奥别墅）</li>
                    <li>• 酒店</li>
                    <li>• 胡同</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 约瑟夫的生日 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">🎉</span>
                <h2 className="text-3xl font-black text-slate-800">约瑟夫的生日</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">当前状态</h3>
                  <ul className="space-y-3 text-blue-700">
                    <li>• 目前没有现场，如果你去他的办公室，你可以和约瑟夫聊聊他的生日</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 周年 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">💑</span>
                <h2 className="text-3xl font-black text-slate-800">周年</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">共享路线</h3>
                  <ul className="space-y-3 text-purple-700">
                    <li>• 如果与约瑟夫和阿德里安分享，并完成4P徒步旅行（像以前一样获得奖杯）</li>
                    <li>• 你一走出房间，约瑟夫就会接你，叫你去车库</li>
                    <li>• 一旦到了那里，他会告诉你在主人房给安娜一个惊喜，就像这次更新之前一样</li>
                    <li>• 场景与本次更新之前的婚纱相同</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">独自路线</h3>
                  <ul className="space-y-3 text-purple-700">
                    <li>• 如果你在独自路线上，去厨房，安娜会告诉你和你一起度过周年纪念日的事情，她会邀请你到主人房</li>
                    <li>• 与所有其他性互动活动一样，您需要在工作室进行游戏时生交安娜</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                  <h3 className="text-xl font-bold text-red-800 mb-4">已知错误</h3>
                  <ul className="space-y-3 text-red-700">
                    <li>• 即使不满足条件，约瑟夫当前也总是显示</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 阿德里安的生日 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">🎉</span>
                <h2 className="text-3xl font-black text-slate-800">阿德里安的生日</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4">当前状态</h3>
                  <ul className="space-y-3 text-indigo-700">
                    <li>• 目前没有场景，如果你去他的卧室，你可以和阿德里安聊聊他的生日</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 主角生日 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">🎂</span>
                <h2 className="text-3xl font-black text-slate-800">主角生日</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4">安娜的惊喜</h3>
                  <ul className="space-y-3 text-yellow-700">
                    <li>• 去厨房和安娜谈谈，她会邀请你到衣柜里来一个特别的惊喜</li>
                    <li>• 目前，其他互动，例如Depression Quest，有可能在假期期间触发。这将在未来的更新中予以考虑</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4">阿德里安的礼物</h3>
                  <ul className="space-y-3 text-yellow-700">
                    <li>• 你可以去阿德里安的房间拜访他，这将引发一场简短的对话，你会被授予：[死灵法师迷你]</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 安娜的生日 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">💐</span>
                <h2 className="text-3xl font-black text-slate-800">安娜的生日</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
                  <h3 className="text-xl font-bold text-pink-800 mb-4">触发条件</h3>
                  <ul className="space-y-3 text-pink-700">
                    <li>• 一旦你走出房间，就会开始与阿德里安的对话</li>
                    <li>• 场景将转移到餐桌上</li>
                  </ul>
                </div>
                
                <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
                  <h3 className="text-xl font-bold text-pink-800 mb-4">路线分支</h3>
                  <ul className="space-y-3 text-pink-700">
                    <li>• <strong>如果完全分享并完成了远足之旅：</strong>安娜将赤身，只要您不否认早餐的乐趣，多人会议就会上演</li>
                    <li>• <strong>如果完全分享但没有进行远足之旅，或者只是与阿德里安分享或单独分享：</strong>安娜会放下她的叉子，给你一个秘密的CG</li>
                  </ul>
                </div>
                
                <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
                  <h3 className="text-xl font-bold text-pink-800 mb-4">后续互动</h3>
                  <ul className="space-y-3 text-pink-700">
                    <li>• 场景结束后，如果你去客厅，安娜和夏洛特之间会发生一个小小的互动。夏洛特给了安娜"一些东西"（一份将来可能很重要的礼物），他们拥抱了</li>
                    <li>• 如果你去厨房，安娜会告诉你，她打算放松一下，用香薰蜡烛洗澡，但没有</li>
                    <li>• 去商场的商店买蜡烛。凯特会告诉你，她刚刚把最后2个卖给了一个神秘的人</li>
                    <li>• 去霓虹街的道具商店，见见零女士。她会告诉你帮她一个忙，你可以服从，场景就会上演，或者告诉她"不行，拜托。就让我来吧！"在这种情况下，她会告诉你你很无聊，然后就把蜡烛递给你</li>
                    <li>• 回到家，去厨房把蜡烛给安娜</li>
                    <li>• 这时你可以去洗手间和安娜一起拍一场戏，或者[如果你目前正在与阿德里安合住]你可以上楼到阿德里安的房间，告诉他安娜会洗澡，想知道他是否想和你一起</li>
                    <li>• 去洗手间，安娜阿德里安和主角将多角色CG</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                  <h3 className="text-xl font-bold text-red-800 mb-4">已知错误</h3>
                  <ul className="space-y-3 text-red-700">
                    <li>• 请记住，这个场景目前有错误，因为阿德里安只会不断重复相同的对话，从不去洗手间。这将在 1.6c 中修复</li>
                    <li>• 对于分享场景，该要求与其他分享场景相同。安娜一定是在工作室里被生生地伸伸了。（目前有些地方此条件不正确，但这些都是 BUG）</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 万圣节 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">👻</span>
                <h2 className="text-3xl font-black text-slate-800">万圣节</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">触发条件</h3>
                  <ul className="space-y-3 text-orange-700">
                    <li>• 安娜会在您离开房间后立即邀请您参加夏洛特的万圣节派对</li>
                    <li>• 如果你接受，场景会直接把你带到夏洛特的房子</li>
                    <li>• 在这里，您将能够与阿德里安、约瑟夫（如果不是被踢出）、夏洛特和安娜进行简短的交谈</li>
                    <li>• 你可以看出安娜的服装让你很难受（这里不会发生任何事情）</li>
                    <li>• 一旦你决定离开派对，而不是离开，你会看到安娜和主角在夏洛特的浴室里的场景</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                  <h3 className="text-xl font-bold text-orange-800 mb-4">秘密场景</h3>
                  <ul className="space-y-3 text-orange-700">
                    <li>• 检查卧室里的 PC，您会注意到一个骷髅头图标（单击它）。它将为您提供一些要遵循的说明</li>
                    <li>• 去洗手间，选择在镜子前说词（鬼女在那里，但没有她的CG）</li>
                    <li>• 前往神社（森林 - 寺庙 - 神社）[无需做迷你游戏]。如果您解锁了技能，您可以从这里回到您的卧室，或者按菜单上的汽车图标传送到它</li>
                    <li>• 到达卧室后，点亮日历图标附近的蜡烛（如果它不起作用，请熄灭并再次亮起）</li>
                    <li>• 将出现一个门户，并为您提供 2 个选择：</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">选择 1：主角 x 扎齐亚</h3>
                  <ul className="space-y-3 text-purple-700">
                    <li>• "我看到曲线......䏎？恶魔之物......"</li>
                    <li>• 不要选择"上帝！保护我免受这个口渴的恶魔的伤害！靠主的力量！"，因为这将结束场景</li>
                    <li>• 总共有 4 个 cgs（图片），但要获得所有 4 个，请选择第 4 个对话框中的"我不确定你是否值得我的东西"</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">选择 2：主角 x 安娜 x 瓦尔托</h3>
                  <ul className="space-y-3 text-purple-700">
                    <li>• "我看到了一些巨大的东西......怪物？恶魔？"</li>
                    <li>• 不要选择"Honestly...我不知道。你想走就走。"也不要在安娜出现时把她送走。这两个决定都将结束这一幕</li>
                    <li>• 之后的所有决定都授予相同的 cgs（pics） 只是对话框中的更改</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 圣诞节 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">🎄</span>
                <h2 className="text-3xl font-black text-slate-800">圣诞节</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4">触发条件</h3>
                  <ul className="space-y-3 text-green-700">
                    <li>• 一旦你到达走廊，阿德里安会遇到你，场景就会开始</li>
                    <li>• 如果你在完全共享路线上（与阿德里安和约瑟夫共享）并在堕落路线上进行了多人徒步旅行，安娜将穿着"圣诞老人内衣"（这不会影响场景）</li>
                    <li>• 你可以指着槲寄生来拍 "安娜的吻" 的照片</li>
                    <li>• 无论走哪条路，约瑟夫都会浪费在沙发上睡觉</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4">路线分支</h3>
                    <ul className="space-y-3 text-green-700">
                      <li>• <strong>如果在安娜和阿德里安的共享路线上：</strong>夏洛特会给出欢乐时光（FFMM）的想法 Mc x 夏洛特 和 阿德里安 x 安娜 → 安娜吐痰，而夏洛特吃掉她。（阿德里安 x 夏洛特 不会在现场发生）</li>
                      <li>• <strong>如果在独自路线上：</strong>阿德里安会要求去他的卧室，而 Mc 会在客厅里与夏洛特和安娜一起演出</li>
                    </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                  <h3 className="text-xl font-bold text-red-800 mb-4">已知错误</h3>
                  <ul className="space-y-3 text-red-700">
                    <li>• 即使被踢出，约瑟夫也总是会出现</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 除夕夜 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">🎅</span>
                <h2 className="text-3xl font-black text-slate-800">除夕夜</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">触发条件</h3>
                  <ul className="space-y-3 text-blue-700">
                    <li>• 一旦你走出卧室，安娜就会开始谈论除夕派对</li>
                    <li>• 对话结束后，如果您已完成各自的路线，您将能够邀请 4 个女孩中的 1 个，或者不邀请：</li>
                    <li>• 阿米莉亚</li>
                    <li>• 凯特</li>
                    <li>• 托尼</li>
                    <li>• 喜万里</li>
                    <li>• （如果您选择"这次不"，您将与安娜共度时光）</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">剧情发展</h3>
                  <ul className="space-y-3 text-blue-700">
                    <li>• 泳池边的吻戏将与你邀请的女孩或安娜一起上演。如果选择了安娜，将有 2 张照片，否则为 1 张</li>
                    <li>• 在这个场景之后，你会进入房子，一个场景会上演，安娜和约瑟夫问你在哪里。不要选择"这就是我离开的提示。晚安！"，因为这将结束场景</li>
                    <li>• 如果您选择不邀请任何女孩，而是与安娜共度时光，那么在接吻场景中的 2 之后将不会有 JOSEPH 的场景。OFC 这个场景需要约瑟夫</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case ViewState.SPECIAL_EVENTS:
        return (
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">特殊事件触发</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">隐藏剧情、彩蛋及特殊条件事件</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">特殊事件系统介绍</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                游戏中包含多种特殊事件，包括隐藏人物触发、彩蛋事件、限定剧情等。这些事件通常需要特定条件才能触发，为游戏增加了丰富的探索性。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-4">隐藏人物事件</h4>
                  <ul className="space-y-3 text-slate-600">
                    <li>• <strong>赛里斯</strong> - 特定时间地点触发，需要完成前置任务</li>
                    <li>• <strong>女鬼事件</strong> - 夜晚特定地点，需要特定道具</li>
                    <li>• <strong>AI赛里斯</strong> - 特殊条件解锁，多周目要素</li>
                    <li>• <strong>隐藏结局</strong> - 完成所有隐藏条件</li>
                    <li>• <strong>限定NPC</strong> - 特定版本或活动期间出现</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-4">彩蛋事件</h4>
                  <ul className="space-y-3 text-slate-600">
                    <li>• <strong>开发者彩蛋</strong> - 特定组合键触发</li>
                    <li>• <strong>隐藏对话</strong> - 重复访问特定地点</li>
                    <li>• <strong>特殊成就</strong> - 完成特定挑战任务</li>
                    <li>• <strong>限定道具</strong> - 时间敏感获取</li>
                    <li>• <strong>隐藏剧情</strong> - 多分支选择触发</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">触发条件详解</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-4">时间条件</h4>
                  <ul className="space-y-3 text-slate-600">
                    <li>• 特定时间段（白天/夜晚）</li>
                    <li>• 特定日期或节日</li>
                    <li>• 游戏进度要求</li>
                    <li>• 多周目解锁</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-4">道具条件</h4>
                  <ul className="space-y-3 text-slate-600">
                    <li>• 持有特定道具</li>
                    <li>• 完成前置任务</li>
                    <li>• 达到特定好感度</li>
                    <li>• 解锁特定技能</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">特殊事件示意图</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img 
                  src="/images/女鬼触发.png" 
                  alt="女鬼触发条件" 
                  className="rounded-2xl w-full h-48 object-cover shadow-md"
                />
                <img 
                  src="/images/女鬼触发2.png" 
                  alt="女鬼触发条件2" 
                  className="rounded-2xl w-full h-48 object-cover shadow-md"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <img 
                  src="/images/AI赛里斯触发条件.png" 
                  alt="AI赛里斯触发条件" 
                  className="rounded-2xl w-full max-w-md h-64 object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        );

      case ViewState.BASIC_GUIDES:
        return (
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">基础攻略指南</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">新手入门、系统机制及核心玩法</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">属性系统</h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 魅力 - 影响对话选项成功率</li>
                  <li>• 智力 - 解锁特殊剧情分支</li>
                  <li>• 体力 - 决定活动参与次数</li>
                  <li>• 幸运 - 影响随机事件触发</li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">时间管理</h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 每日时间分配策略</li>
                  <li>• 季节性活动优先级</li>
                  <li>• 人物好感度培养周期</li>
                  <li>• 隐藏要素解锁时机</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">属性加点示意图</h3>
              <div className="flex justify-center">
                <img 
                  src="/images/加点示意图.png" 
                  alt="属性加点示意图" 
                  className="rounded-2xl w-full max-w-2xl shadow-md"
                />
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">特殊事件触发条件</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img 
                  src="/images/女鬼触发.png" 
                  alt="女鬼触发条件" 
                  className="rounded-2xl w-full h-48 object-cover shadow-md"
                />
                <img 
                  src="/images/女鬼触发2.png" 
                  alt="女鬼触发条件2" 
                  className="rounded-2xl w-full h-48 object-cover shadow-md"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <img 
                  src="/images/AI赛里斯触发条件.png" 
                  alt="AI赛里斯触发条件" 
                  className="rounded-2xl w-full max-w-md h-64 object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        );

      case ViewState.FAQ:
        return (
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">常见问题解答</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">游戏攻略大全及实用技巧</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">游戏攻略大全</h3>
              
              <div className="space-y-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                  <h4 className="text-xl font-bold text-blue-800 mb-3">约瑟夫保险箱密码</h4>
                  <p className="text-blue-700 font-mono text-lg">7172</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-2xl border border-green-200">
                  <h4 className="text-xl font-bold text-green-800 mb-3">游戏卡死修复</h4>
                  <p className="text-green-700">如果游戏卡在界面，可以连续按10次F1键进行重置（由水友吴*发现，特别感谢）。</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
                  <h4 className="text-xl font-bold text-purple-800 mb-3">女鬼触发条件</h4>
                  <p className="text-purple-700">点击客厅电视机红色按钮，如果闪烁出现对话即达成（没触发睡觉再试）。触发完成后获得塔防道具"鬼"。</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <img 
                      src="/images/女鬼触发.png" 
                      alt="女鬼触发条件" 
                      className="rounded-2xl w-full h-48 object-cover shadow-md"
                    />
                    <img 
                      src="/images/女鬼触发2.png" 
                      alt="女鬼触发条件2" 
                      className="rounded-2xl w-full h-48 object-cover shadow-md"
                    />
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200">
                  <h4 className="text-xl font-bold text-orange-800 mb-3">AI赛里斯触发条件</h4>
                  <p className="text-orange-700">马里奥豪宅的图书馆墙上有个红色按钮可以解锁实验室。</p>
                  <div className="flex justify-center mt-4">
                    <img 
                      src="/images/AI赛里斯触发条件.png" 
                      alt="AI赛里斯触发条件" 
                      className="rounded-2xl w-full max-w-md h-64 object-cover shadow-md"
                    />
                  </div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-2xl border border-red-200">
                  <h4 className="text-xl font-bold text-red-800 mb-3">存档路径</h4>
                  <p className="text-red-700 font-mono">AppData\\LocalLow\\Arvus Games\\Starmaker Story</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200">
                  <h4 className="text-xl font-bold text-indigo-800 mb-3">CE修改方法</h4>
                  <p className="text-indigo-700">使用CE修改器，双浮点搜索数值进行修改。建议CE加速5倍为最佳，但注意在进门前必卡，请换回1倍速。</p>
                  <p className="text-indigo-600 text-sm mt-2">可修改内容包括但不限于：金钱、粉丝、指向日期、锁日期、游戏血量、健身点击次数8次、点击绿条判定、训练一次等于5次</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-teal-50 p-4 rounded-2xl border border-teal-200">
                    <h4 className="text-lg font-bold text-teal-800 mb-2">怪物打法</h4>
                    <p className="text-teal-700 text-sm">鼠标右键格挡，红色区域鼠标武器离开该区域即可。</p>
                  </div>
                  
                  <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200">
                    <h4 className="text-lg font-bold text-pink-800 mb-2">跳舞小游戏</h4>
                    <p className="text-pink-700 text-sm">鼠标碰到小星星得5分，大星星得1分，碰到物品扣分，碰到骷髅死亡。</p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                    <h4 className="text-lg font-bold text-amber-800 mb-2">武器购买</h4>
                    <p className="text-amber-700 text-sm">前往大师商店。生命值购买：前往医院找医生。</p>
                  </div>
                  
                  <div className="bg-cyan-50 p-4 rounded-2xl border border-cyan-200">
                    <h4 className="text-lg font-bold text-cyan-800 mb-2">存档备份</h4>
                    <p className="text-cyan-700 text-sm">定期备份存档文件以防数据丢失。</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">游戏技巧</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• 游戏设置：根据设备性能调整画面设置以获得最佳体验</li>
                    <li>• 快捷键：熟悉游戏快捷键可以提升操作效率</li>
                    <li>• 任务追踪：使用任务日志追踪当前进度和目标</li>
                    <li>• 多存档：建议使用多个存档位保存不同进度</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case ViewState.FULL_EFFECTS:
        return (
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">全特征展示</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">游戏内所有特征、属性及视觉效果完整展示</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">全特征展示图</h3>
              <div className="flex justify-center">
                <img 
                  src="/images/全特征示意图.png" 
                  alt="全特征展示图" 
                  className="rounded-2xl w-full max-w-2xl shadow-md"
                />
              </div>
            </div>
          </div>
        );

      case ViewState.LOCALIZATION_ISSUES:
        return (
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">汉化问题</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">Starmaker Story 汉化工具使用指南及问题解决方案</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">此汉化工具开发者</h3>
              <div className="space-y-6 text-slate-600">
                <p><strong>GitHub - bbepis/XUnity.AutoTranslator v4.12.0</strong></p>
                <p>Starmaker Story 自从v1.4更新后用AutoTranslator的汉化工具会出现"口口口"这种无法正常汉化的情况，是因为游戏本身更换了新的字体，AutoTranslator作者提供的TMP字体无法兼容新字体导致的，所以我为各位臭宝准备了一个新的自制字体可以完美兼容此游戏和其他一些特殊字体游戏文本。</p>
                <p>如果不会使用AutoTranslator的请自行查看视频：</p>
                <p><a href="https://www.bilibili.com/video/BV1kL2VYAEoX/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-bold">AutoTranslator工具使用教程视频</a></p>
                
                <div className="pt-4">
                  <h4 className="text-xl font-bold text-slate-800 mb-4">新字体下载链接</h4>
                  <div className="space-y-3">
                    <p><strong>百度网盘：</strong><a href="https://pan.baidu.com/s/1LOCtNXQ_Y0t3ING2CTng_A" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">https://pan.baidu.com/s/1LOCtNXQ_Y0t3ING2CTng_A</a> 【提取码】1t8t</p>
                    <p><strong>蓝奏云：</strong><a href="https://wwuv.lanzouw.com/iCwK13586dzg" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">https://wwuv.lanzouw.com/iCwK13586dzg</a> 【提取码】g52j</p>
                  </div>
                </div>
                
                <div className="pt-6">
                  <h4 className="text-xl font-bold text-slate-800 mb-4">使用方法</h4>
                  <div className="space-y-3">
                    <p>首先把下载好的字体放在游戏的根目录</p>
                    <p>在游戏目录下AutoTranslator文件夹下打开Config.ini</p>
                    <p>在Config.ini 按Ctrl+F快速搜索"OverrideFontTextMeshPro"和"FallbackFontTextMeshPro"在等号后面更改成新的字体文件名即可</p>
                    <p className="font-bold">如下图：</p>
                  <div className="flex justify-center">
                    <img 
                      src="/images/如下图展示.png" 
                      alt="字体配置示意图" 
                      className="rounded-2xl w-full max-w-2xl shadow-md"
                    />
                  </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <h4 className="text-xl font-bold text-slate-800 mb-4">翻译后效果</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <img 
                      src="/images/汉化后效果1.png" 
                      alt="汉化效果展示1" 
                      className="rounded-2xl w-full shadow-md"
                    />
                    <img 
                      src="/images/汉化图效果2.png" 
                      alt="汉化效果展示2" 
                      className="rounded-2xl w-full shadow-md"
                    />
                  </div>
                </div>
                
                <div className="pt-6">
                  <h4 className="text-xl font-bold text-slate-800 mb-4">支持作者</h4>
                  <p>如果这个汉化工具对你有帮助，欢迎投喂支持作者：</p>
                  <button 
                    onClick={() => setIsDonationOpen(true)}
                    className="mt-3 px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
                  >
                    投喂支持作者
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case ViewState.DASHBOARD:
      default:
        // Dashboard / Cover Page
        return (
          <div className="space-y-10 animate-fade-in pb-16">
            {/* Hero Section */}
            <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl group">
              {/* Background Slideshow */}
              {heroCharacters.map((char, index) => (
                <div 
                  key={char.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === heroImageIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img 
                    src={char.avatarUrl} 
                    alt="Hero" 
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
                </div>
              ))}

              {/* Hero Content */}
              <div className="absolute inset-0 p-16 flex flex-col justify-center max-w-3xl text-white z-10">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-sm font-bold tracking-widest uppercase mb-6 w-fit">
          <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
          Online v1.1
        </div>
                <h1 className="text-7xl font-black mb-6 tracking-tighter leading-tight">
                  造星物语<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">详细攻略档案</span>
                </h1>
                <p className="text-xl text-slate-200 mb-10 leading-relaxed text-shadow-sm max-w-xl">
                  一站式查询所有人物剧情分支、隐藏要素、节日活动及黑客代码。
                  {AUTHOR_INFO.description}
                </p>
                
                <div className="flex gap-6">
                  <button 
                    onClick={() => setCurrentView(ViewState.CHARACTER_LIST)}
                    className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3 shadow-lg shadow-white/10"
                  >
                    开始查阅 <ChevronRight size={24} />
                  </button>
                  <button 
                    onClick={() => setCurrentView(ViewState.GAME_GUIDES)}
                    className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-colors"
                  >
                    新手指南
                  </button>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-8 right-10 flex gap-3">
                {heroCharacters.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setHeroImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${idx === heroImageIndex ? 'w-12 bg-white' : 'w-3 bg-white/40'}`}
                    title={`切换幻灯片`}
                    aria-label={`切换幻灯片`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* 文字攻略卡片 */}
              <div 
                onClick={() => window.open('https://docs.google.com/document/d/1J4MwvOpk88d7ZKt7h7eyFrt6CSsVie5GIxE9v4I7NVU/edit?usp=sharing', '_blank')}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">文字攻略</h3>
                <p className="text-base text-slate-500">详细游戏攻略、剧情分支及隐藏要素。</p>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.CHARACTER_LIST)}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">人物档案</h3>
                <p className="text-base text-slate-500">主要角色、配角、隐藏人物详细攻略。</p>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.VACATION_GUIDES)}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <Plane size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">度假旅行</h3>
                <p className="text-base text-slate-500">热带假期、霜度假期、日本度假完整攻略。</p>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.FESTIVALS)}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 mb-6 group-hover:scale-110 transition-transform">
                  <PartyPopper size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">节日</h3>
                <p className="text-base text-slate-500">情人节、万圣节、圣诞节等节日活动攻略。</p>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.FULL_EFFECTS)}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                  <Zap size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">全特征展示</h3>
                <p className="text-base text-slate-500">游戏内所有特征、属性及视觉效果展示。</p>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.HACKER_TOOL)}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                  <Terminal size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">黑客答案</h3>
                <p className="text-base text-slate-500">萨曼莎电脑密码、游戏答案一键查询。</p>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.FAQ)}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
                  <HelpCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">常见问题</h3>
                <p className="text-base text-slate-500">常见卡死修复、修改器建议及操作指引。</p>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.CHANGELOG)}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                  <History size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">更新日志</h3>
                <p className="text-base text-slate-500">查看工具版本更新内容及游戏版本变动。</p>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.ABOUT)}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
                  <HeartHandshake size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">关于作者</h3>
                <p className="text-base text-slate-500">关注作者、鸣谢名单及支持方式。</p>
              </div>

              <div 
                onClick={() => setIsDonationOpen(true)}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform">
                  <Heart size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">支持作者</h3>
                <p className="text-base text-slate-500">投喂支持作者，鼓励更多优质内容。</p>
              </div>

              <div 
                onClick={() => alert('期待后续更新')}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 mb-6 group-hover:scale-110 transition-transform">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">玩家反馈</h3>
                <p className="text-base text-slate-500">期待后续更新，欢迎提供宝贵建议。</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-win-bg font-sans text-win-text overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar 
          currentView={currentView} 
          onChangeView={setCurrentView}
          onOpenDonation={() => setIsDonationOpen(true)}
        />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            {/* Close button for mobile sidebar */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 z-10"
              aria-label="关闭菜单"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <Sidebar 
              currentView={currentView} 
              onChangeView={(view) => {
                setCurrentView(view);
                setIsSidebarOpen(false);
              }}
              onOpenDonation={() => {
                setIsDonationOpen(true);
                setIsSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Glass Bar */}
        <header className="h-20 flex items-center px-4 md:px-10 justify-between z-30 sticky top-0 bg-white/80 backdrop-blur-sm md:bg-transparent">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 text-slate-600"
          >
            <Menu size={24} />
          </button>
          
          {/* Breadcrumb / Title placeholder */}
          <div className="flex items-center gap-3 text-slate-400 text-base font-medium">
            <span className="hidden md:inline">APP</span>
            <ChevronRight size={16} className="hidden md:inline" />
            <span className="text-slate-800 font-bold uppercase text-sm md:text-base">{currentView.replace('_', ' ')}</span>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="relative w-40 md:w-80 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-win-accent transition-colors" size={20} />
              <input
                type="text"
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView === ViewState.DASHBOARD) setCurrentView(ViewState.CHARACTER_LIST);
                }}
                className="w-full bg-white/80 backdrop-blur-sm border border-transparent hover:border-slate-200 focus:border-win-accent rounded-full pl-12 pr-6 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-win-accent/20 transition-all shadow-sm"
              />
            </div>
            
            <button 
              className="relative p-2 md:p-3 rounded-full hover:bg-white/50 text-slate-500 hover:text-slate-800 transition-colors"
              title="通知"
            >
              <Bell size={20} className="md:size-6" />
              <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-10 pt-2 relative scroll-smooth">
        <div className="max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentView={currentView}
        onChangeView={setCurrentView}
        onOpenDonation={() => setIsDonationOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />
    </main>

    {/* Modals */}
    {selectedCharacter && (
      <Suspense fallback={<LoadingSpinner />}>
        <CharacterDetail 
          character={selectedCharacter} 
          onClose={() => setSelectedCharacter(null)} 
        />
      </Suspense>
    )}

    <DonationModal 
      isOpen={isDonationOpen} 
      onClose={() => setIsDonationOpen(false)} 
    />
  </div>
);
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);
