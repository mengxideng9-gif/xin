import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Map, Flag, Edit3, FileText } from 'lucide-react';

interface MarketInsightsProps {
    isEditMode?: boolean;
}

const MarketInsights: React.FC<MarketInsightsProps> = ({ isEditMode = false }) => {
  const [data, setData] = useState([
    { name: '美国 (核心)', value: 60, color: '#2563eb', desc: '约19.9-27亿美元，品牌灯塔' },
    { name: '日本', value: 14, color: '#f59e0b', desc: '约5-6亿美元，品牌金矿，高复购' },
    { name: '英国', value: 7, color: '#10b981', desc: '约2.5-3亿美元，口碑高地' },
    { name: '德国', value: 6, color: '#f97316', desc: '约2-2.5亿美元，科学高地' },
    { name: '韩国', value: 5, color: '#a855f7', desc: '约1.5-2亿美元，潮流风口' },
    { name: '俄罗斯', value: 3, color: '#ef4444', desc: '约0.8-1.2亿美元，现金奶牛' },
  ]);

  const [roadmap, setRoadmap] = useState([
    { year: 'Year 1', title: '北美扎根 + 俄区抢钱', color: 'border-red-500', bg: 'bg-red-50', icon: '🚀', points: ['🇺🇸 美国: 切入“冻干+爆珠”，细分Top 20', '🇷🇺 俄罗斯: 欧美断货空窗期，现金奶牛', '🇨🇦 加拿大: 承接美国溢出流量'] },
    { year: 'Year 2', title: '欧洲桥头堡 + 亚洲颜值战', color: 'border-orange-500', bg: 'bg-orange-50', icon: '⚔️', points: ['🇬🇧 英国: “纯净标签”建立高标准口碑', '🇰🇷 韩国: 打造“时尚感”，反向输出素材'] },
    { year: 'Year 3', title: '攻克终极堡垒', color: 'border-blue-500', bg: 'bg-blue-50', icon: '🏰', points: ['🇩🇪 德国: 攻克欧盟最严法规，建立科学形象', '🇯🇵 日本: 极致老龄化市场，高复购利润'] },
  ]);
  
  const [conclusion, setConclusion] = useState("市场机会点：美国作为全球最大的单一市场 (60%) 是必须攻下的高地。俄罗斯市场虽小 (3%) 但因制裁导致的品牌空窗期，提供了极佳的“现金奶牛”机会，可为欧美战场的持续投入提供弹药。");

  const handleDataUpdate = (index: number, field: string, value: string | number) => {
      const newData = data.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      );
      setData(newData);
  };

  const handleRoadmapUpdate = (idx: number, field: string, value: string) => {
      const newMap = roadmap.map((item, i) => 
        i === idx ? { ...item, [field]: value } : item
      );
      setRoadmap(newMap);
  };

  const handlePointUpdate = (idx: number, pIdx: number, value: string) => {
      const newMap = roadmap.map((item, i) => {
        if (i === idx) {
            const newPoints = [...item.points];
            newPoints[pIdx] = value;
            return { ...item, points: newPoints };
        }
        return item;
      });
      setRoadmap(newMap);
  };

  return (
    <section className={`premium-card p-8 rounded-3xl relative overflow-hidden bg-white ${isEditMode ? 'ring-2 ring-blue-100 border-blue-300' : ''}`}>
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] pointer-events-none">
        <Map size={400} className="text-slate-900" />
      </div>

      <div className="mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <span className="p-2 bg-blue-100 rounded-lg text-blue-600"><Flag size={20} /></span>
          市场洞察与三年战略
          {isEditMode && <Edit3 size={16} className="text-blue-500 animate-pulse"/>}
        </h2>
        <p className="text-slate-500 mt-2 ml-11">数据可视化：重点目标国家市场规模与执行规划 (Project Lumina)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-8">
        {/* Left: Charts */}
        <div className="relative flex flex-col justify-center">
            <h3 className="text-lg font-bold mb-4 text-center text-slate-700 bg-slate-50 py-2 rounded-lg">全球市场规模占比</h3>
            
            <div className="h-[280px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = outerRadius + 25;
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                            // Safety Check: percent can be undefined
                            const safePercent = (percent || 0) * 100;
                            return (
                                <text x={x} y={y} fill="#64748b" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight="bold">
                                    {`${safePercent.toFixed(0)}%`}
                                </text>
                            );
                        }}
                    >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                    />
                </PieChart>
                </ResponsiveContainer>
                
                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <div className="text-3xl font-extrabold text-slate-800">100%</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Market</div>
                </div>
            </div>

            {/* Legend / List */}
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {data.map((item, i) => (
                    <div key={i} className={`flex items-start gap-2 p-2 rounded-lg ${isEditMode ? 'bg-blue-50/50 border border-blue-100' : ''}`}>
                        <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{backgroundColor: item.color}}></div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-0.5">
                                {isEditMode ? (
                                    <input className="text-xs font-bold bg-transparent border-b border-blue-300 w-24 outline-none" value={item.name} onChange={e=>handleDataUpdate(i, 'name', e.target.value)}/>
                                ) : (
                                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                                )}
                                {isEditMode ? (
                                    <input className="text-xs font-bold bg-transparent border-b border-blue-300 w-8 text-right outline-none" type="number" value={item.value} onChange={e=>handleDataUpdate(i, 'value', parseInt(e.target.value))}/>
                                ) : (
                                    <span className="text-xs font-bold text-slate-900">{item.value}%</span>
                                )}
                            </div>
                            <div className="text-[10px] text-slate-400 leading-tight">
                                 {isEditMode ? (
                                    <input className="bg-transparent border-b border-blue-200 w-full outline-none text-[10px]" value={item.desc} onChange={e=>handleDataUpdate(i, 'desc', e.target.value)}/>
                                ) : item.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Right: Strategy Roadmap */}
        <div className="space-y-8">
          <div className="flex justify-between items-end mb-4 border-b border-slate-100 pb-2">
            <h3 className="text-lg font-bold text-slate-800">三年战略路线图</h3>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded font-bold">2026 - 2029</span>
          </div>

          <div className="space-y-4">
            {roadmap.map((item, idx) => (
                <motion.div 
                    key={idx}
                    layout
                    className={`p-5 rounded-xl border-l-4 ${item.color} ${item.bg} relative overflow-hidden hover:shadow-md transition-shadow`}
                >
                    <div className="flex justify-between items-start mb-2">
                         <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2 w-full">
                            <span className="text-xl">{item.icon}</span> 
                            <span className="font-bold mr-2">{item.year}:</span>
                            {isEditMode ? (
                                <input value={item.title} onChange={e => handleRoadmapUpdate(idx, 'title', e.target.value)} className="bg-white/50 w-full border-b border-slate-300 outline-none" />
                            ) : item.title}
                        </h4>
                    </div>
                    <ul className="text-sm text-slate-600 space-y-1.5 ml-8 list-disc w-full">
                        {item.points.map((p, i) => (
                             <li key={i}>
                                 {isEditMode ? (
                                     <input value={p} onChange={e => handlePointUpdate(idx, i, e.target.value)} className="bg-white/50 w-full border-b border-slate-300 outline-none text-xs" />
                                 ) : p}
                             </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
          </div>

          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-indigo-900 text-sm">
             <strong>🔥 核心竞争策略 (Project Lumina):</strong> 冻干(高适口性) + 爆珠(物理锁鲜) 双效合一。
             <div className="mt-1 text-xs text-indigo-600 opacity-80">目标人群：Z世代/千禧一代“成分党”，愿为黑科技支付溢价。</div>
          </div>
        </div>
      </div>
      
      {/* Conclusion Section */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
          <div className="shrink-0 pt-1 text-blue-500"><FileText size={20}/></div>
          <div className="flex-grow">
              <h4 className="text-sm font-bold text-blue-900 mb-1">战略结论分析</h4>
              {isEditMode ? (
                  <textarea 
                    value={conclusion} 
                    onChange={e=>setConclusion(e.target.value)}
                    className="w-full bg-white p-2 rounded border border-blue-200 text-sm text-blue-800 h-20 outline-none focus:ring-2 focus:ring-blue-300"
                  />
              ) : (
                  <p className="text-sm text-blue-700 leading-relaxed">{conclusion}</p>
              )}
          </div>
      </div>

    </section>
  );
};

export default MarketInsights;