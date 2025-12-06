import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingCart, Award, DollarSign, ArrowUpRight, Edit3, FileText } from 'lucide-react';

interface DashboardProps {
  isEditMode?: boolean;
}

const KPICard = ({ label, value, sub, icon: Icon, color, delay, trend, isEditMode, onUpdate }: any) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay }}
    className={`premium-card p-6 rounded-2xl relative overflow-hidden bg-white ${isEditMode ? 'ring-2 ring-blue-100 border-blue-300' : ''}`}
  >
    <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color.bg} ${color.text}`}>
            <Icon size={24} />
        </div>
        {trend && (
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                {trend}
            </div>
        )}
    </div>
    
    <div>
        {isEditMode ? (
            <input 
                value={value}
                onChange={(e) => onUpdate('value', e.target.value)}
                className="text-3xl font-extrabold text-slate-800 mb-1 w-full border-b border-blue-200 outline-none bg-blue-50/50"
            />
        ) : (
            <h3 className="text-3xl font-extrabold text-slate-800 mb-1">{value}</h3>
        )}

        <p className="text-sm text-slate-500 font-medium mb-2">{label}</p>
        
        {isEditMode ? (
            <input 
                value={sub}
                onChange={(e) => onUpdate('sub', e.target.value)}
                className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 font-semibold border border-slate-200 w-full outline-none"
            />
        ) : (
            <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 font-semibold border border-slate-200">{sub}</span>
        )}
    </div>
  </motion.div>
);

const initialQuarters = [
    { id: 'Q1', title: '点火 🔥', sub: '买资产 | 战略亏损', metrics: ['营收 ¥150万', '营销 50%-80%', 'Review 100+'], border: 'border-red-500', bg: 'bg-red-50', text: 'text-red-700' },
    { id: 'Q2', title: '扩音 📢', sub: '势能 | 盈亏平衡', metrics: ['营收 ¥500万', '日销 200单+', '声量 4000w+'], border: 'border-orange-500', bg: 'bg-orange-50', text: 'text-orange-700' },
    { id: 'Q3', title: '爆发 🚀', sub: '霸屏 | 开始盈利', metrics: ['营收 ¥1250万', '日销 800单+', 'Prime Day秒杀'], border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
    { id: 'Q4', title: '收割 💰', sub: '升维 | 利润丰收', metrics: ['营收 ¥3100万', '全年60%营收', '库存售罄 90%'], border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
];

const Dashboard2026: React.FC<DashboardProps> = ({ isEditMode = false }) => {
  const [kpis, setKpis] = useState([
      { id: 1, label: "年度营收", value: "¥5000万", sub: "Target 100%", icon: DollarSign, color: {bg: 'bg-blue-50', text: 'text-blue-600'}, trend: "+120%" },
      { id: 2, label: "净利润", value: "¥1000万", sub: "Margin 20%", icon: TrendingUp, color: {bg: 'bg-emerald-50', text: 'text-emerald-600'}, trend: null },
      { id: 3, label: "总销量", value: "18.5万盒", sub: "High Velocity", icon: ShoppingCart, color: {bg: 'bg-orange-50', text: 'text-orange-600'}, trend: "Top 1" },
      { id: 4, label: "类目份额", value: "Top 50", sub: "Category Rank", icon: Award, color: {bg: 'bg-purple-50', text: 'text-purple-600'}, trend: null },
  ]);

  const [quarters, setQuarters] = useState(initialQuarters);
  const [conclusion, setConclusion] = useState("年度规划总结：2026年是品牌破局的关键年。Q1 的核心任务不是盈利，而是以合理的亏损换取核心关键词的首页排名和 Review 资产。只有 Q1 地基打得牢，Q3 的 Prime Day 才能实现爆发，最终确保 Q4 贡献全年 60% 的营收并实现盈利目标。");

  const updateKPI = (id: number, field: string, newValue: string) => {
      setKpis(kpis.map(k => k.id === id ? { ...k, [field]: newValue } : k));
  };

  return (
    <section>
       <div className="mb-8 flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                2026 年度作战仪表盘
                {isEditMode && <Edit3 size={16} className="text-blue-500 animate-pulse"/>}
            </h2>
            <p className="text-slate-500 mt-1">从蓄势到收割：Q1战略亏损 → Q4利润收割</p>
        </div>
        <div className="text-right hidden md:block">
             <div className="text-sm text-slate-400 font-bold tracking-wider">YEARLY TARGET</div>
             <div className="text-3xl font-mono font-bold text-blue-600">¥50,000,000</div>
        </div>
       </div>

       {/* Top KPIs */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi, idx) => (
              <KPICard 
                key={kpi.id}
                {...kpi} 
                delay={0.1 * (idx+1)} 
                isEditMode={isEditMode}
                onUpdate={(field: string, val: string) => updateKPI(kpi.id, field, val)}
              />
          ))}
       </div>

       {/* Timeline */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quarters.map((q, idx) => (
             <motion.div 
                key={q.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className={`premium-card p-1 rounded-2xl border-t-4 ${q.border}`}
             >
                <div className="p-5 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className={`text-xl font-bold ${q.text}`}>{q.id} {q.title.split(' ')[1]}</h4>
                        <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-500">{q.title.split(' ')[0]}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-400 mb-4 pb-2 border-b border-slate-100">{q.sub}</p>
                    <ul className="space-y-3 flex-grow">
                        {q.metrics.map((m, i) => (
                            <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${q.text.replace('text', 'bg')}`}></div>
                                {isEditMode ? (
                                    <input 
                                        className="bg-slate-50 border-b border-slate-200 outline-none w-full text-xs py-1"
                                        defaultValue={m}
                                    />
                                ) : m}
                            </li>
                        ))}
                    </ul>
                </div>
             </motion.div>
          ))}
       </div>

        {/* Conclusion Section */}
        <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 flex gap-3">
            <div className="shrink-0 pt-1 text-slate-500"><FileText size={20}/></div>
            <div className="flex-grow">
                <h4 className="text-sm font-bold text-slate-800 mb-1">仪表盘总结</h4>
                {isEditMode ? (
                    <textarea 
                        value={conclusion} 
                        onChange={e=>setConclusion(e.target.value)}
                        className="w-full bg-white p-2 rounded border border-slate-300 text-sm text-slate-700 h-20 outline-none focus:ring-2 focus:ring-blue-300"
                    />
                ) : (
                    <p className="text-sm text-slate-600 leading-relaxed">{conclusion}</p>
                )}
            </div>
        </div>

    </section>
  );
};

export default Dashboard2026;