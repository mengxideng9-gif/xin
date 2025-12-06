import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Target, Megaphone, FileText } from 'lucide-react';

interface MarketingBudgetProps {
  isEditMode?: boolean;
}

const MarketingBudget: React.FC<MarketingBudgetProps> = ({ isEditMode = false }) => {
  const [budgetData, setBudgetData] = useState([
    { name: 'Amazon PPC', value: 600, color: '#3b82f6', label: '防守 (50%)' },
    { name: 'TikTok', value: 450, color: '#ef4444', label: '进攻 (38%)' },
    { name: 'Social', value: 135, color: '#f97316', label: '声量 (10%)' },
    { name: 'Vine', value: 15, color: '#94a3b8', label: '转化 (2%)' },
  ]);

  const [monthlyTrend, setMonthlyTrend] = useState([
    { month: 'Dec', value: 10, label: '预热' },
    { month: 'Jan', value: 25, label: '启动' },
    { month: 'Feb', value: 60, label: '爆发' },
    { month: 'Mar', value: 35, label: '维稳' },
  ]);
  
  const [conclusion, setConclusion] = useState("预算分析：Q1 预算重点在于 2 月份的爆发期 (60万)，通过 PPC (50%) 稳住基本盘，TikTok (38%) 拓展新流量。建议每日监控 ACOS，若低于 40% 可继续加大 PPC 投入。");

  const updateBudget = (idx: number, field: string, val: string | number) => {
      const newData = [...budgetData];
      // @ts-ignore
      newData[idx][field] = val;
      setBudgetData(newData);
  };
  
  const updateTrend = (idx: number, field: string, val: string | number) => {
      const newData = [...monthlyTrend];
      // @ts-ignore
      newData[idx][field] = val;
      setMonthlyTrend(newData);
  };

    return (
        <section className={`premium-card p-8 rounded-3xl border bg-white ${isEditMode ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                        <span className="p-2 bg-orange-100 rounded-lg text-orange-600"><Megaphone size={20}/></span>
                        Q1 营销预算: ¥120万 饱和攻击
                    </h2>
                    <p className="text-slate-500 mt-2 ml-11">50% 进攻 (声量) vs 50% 防守 (转化)</p>
                </div>
                {/* Pet Element - Interactive feel */}
                <div className="hidden md:block relative">
                    <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=200&auto=format&fit=crop" className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg z-10 relative" alt="Target Audience" />
                    <div className="absolute -inset-2 bg-orange-100 rounded-full z-0 animate-pulse"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-8">
                {/* Allocation Chart */}
                <div className="h-[350px]">
                    <h3 className="text-slate-700 font-bold mb-6 text-center bg-slate-50 py-2 rounded-lg">资金去向 (k RMB)</h3>
                    {isEditMode && (
                        <div className="grid grid-cols-2 gap-2 mb-2">
                             {budgetData.map((d, i) => (
                                 <div key={i} className="flex gap-1">
                                     <input className="border text-xs w-full p-1 rounded" value={d.name} onChange={e=>updateBudget(i, 'name', e.target.value)} />
                                     <input className="border text-xs w-16 p-1 rounded" type="number" value={d.value} onChange={e=>updateBudget(i, 'value', parseInt(e.target.value))} />
                                 </div>
                             ))}
                        </div>
                    )}
                    <div className="h-[80%]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={budgetData} layout="vertical" margin={{ left: 20 }}>
                                <XAxis type="number" stroke="#cbd5e1" hide />
                                <YAxis dataKey="name" type="category" stroke="#64748b" width={100} tick={{fontSize: 12, fontWeight: 600, fill: '#475569'}} />
                                <Tooltip 
                                    cursor={{fill: '#f1f5f9'}}
                                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#1e293b', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={32}>
                                    {budgetData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Trend Chart */}
                <div className="h-[350px]">
                    <h3 className="text-slate-700 font-bold mb-6 text-center bg-slate-50 py-2 rounded-lg">投放力度月度趋势 (万)</h3>
                    <div className="flex items-end h-[85%] gap-6 px-4 border-b border-slate-200 pb-2">
                        {monthlyTrend.map((m, idx) => (
                            <div key={idx} className="flex-1 flex flex-col justify-end items-center group">
                                <div 
                                    className={`w-full relative rounded-t-xl transition-all duration-500 hover:shadow-lg ${m.month === 'Feb' ? 'bg-gradient-to-t from-red-500 to-red-400 shadow-red-200' : 'bg-slate-200 group-hover:bg-slate-300'}`}
                                    style={{ height: `${(Number(m.value) / 60) * 100}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-slate-800 font-bold text-sm bg-white shadow-sm px-2 py-1 rounded border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {m.value}w
                                    </div>
                                </div>
                                <div className="mt-3 text-center w-full">
                                    <div className="text-sm text-slate-600 font-bold">{m.month}</div>
                                    {isEditMode ? (
                                        <input 
                                            className="text-[10px] text-slate-400 font-semibold text-center w-full border-b outline-none bg-transparent"
                                            value={m.value}
                                            onChange={e=>updateTrend(idx, 'value', parseInt(e.target.value))}
                                        />
                                    ) : (
                                        <div className="text-[10px] text-slate-400 uppercase font-semibold">{m.label} ({m.value})</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
                <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100">
                    <div className="text-orange-500 font-extrabold text-2xl mb-1">300万+</div>
                    <div className="text-xs text-orange-700 font-semibold uppercase tracking-wide">全网声量目标</div>
                </div>
                <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="text-blue-600 font-extrabold text-2xl mb-1">3000+</div>
                    <div className="text-xs text-blue-700 font-semibold uppercase tracking-wide">种子用户沉淀</div>
                </div>
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="text-emerald-600 font-extrabold text-2xl mb-1">Top 1</div>
                    <div className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">核心词首页卡位</div>
                </div>
            </div>

            {/* Conclusion Section */}
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3">
                <div className="shrink-0 pt-1 text-orange-500"><FileText size={20}/></div>
                <div className="flex-grow">
                    <h4 className="text-sm font-bold text-orange-900 mb-1">营销投入结论</h4>
                    {isEditMode ? (
                        <textarea 
                            value={conclusion} 
                            onChange={e=>setConclusion(e.target.value)}
                            className="w-full bg-white p-2 rounded border border-orange-200 text-sm text-orange-800 h-20 outline-none focus:ring-2 focus:ring-orange-300"
                        />
                    ) : (
                        <p className="text-sm text-orange-700 leading-relaxed">{conclusion}</p>
                    )}
                </div>
            </div>

        </section>
    );
};

export default MarketingBudget;