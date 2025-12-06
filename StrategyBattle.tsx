import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Zap, CheckCircle, AlertTriangle, Edit3, FileText } from 'lucide-react';

interface StrategyBattleProps {
    isEditMode?: boolean;
}

const StrategyBattle: React.FC<StrategyBattleProps> = ({ isEditMode = false }) => {
    const [hovered, setHovered] = useState<string | null>(null);

    const [planA, setPlanA] = useState({
        budget: '750,000',
        ratio: '50%',
        traffic: '100w+',
        cac: '$13',
        points: ['精准收割，保利润', '收集 3000 邮箱', '广告主投长尾词']
    });

    const [planB, setPlanB] = useState({
        budget: '1,200,000',
        ratio: '80%',
        traffic: '300w+',
        cac: '$21',
        points: ['暴力霸屏，买未来复购', 'TikTok 病毒式传播', '强占 "Dog Fish Oil" 大词']
    });
    
    const [conclusion, setConclusion] = useState("决策分析：在库存充足的情况下，建议Q1采取 Plan B (饱和攻击)，虽然前期亏损较高 ($21 CAC)，但能快速抢占首页排名并沉淀高价值复购用户，实现 Q3 的盈利反转。");

    const updatePlan = (plan: 'A' | 'B', field: string, val: string | string[]) => {
        if (plan === 'A') setPlanA({ ...planA, [field]: val });
        else setPlanB({ ...planB, [field]: val });
    };
    
    const updatePoint = (plan: 'A' | 'B', idx: number, val: string) => {
        const points = plan === 'A' ? [...planA.points] : [...planB.points];
        points[idx] = val;
        updatePlan(plan, 'points', points);
    };

    return (
        <section className="mt-4">
            <div className="mb-10 text-center">
                <span className="inline-block px-3 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded-full mb-3">DECISION MATRIX</span>
                <h2 className="text-3xl font-bold text-slate-900 flex justify-center items-center gap-2">
                    Q1 饱和攻击：Plan A vs Plan B
                    {isEditMode && <Edit3 size={18} className="text-blue-500"/>}
                </h2>
                <p className="text-slate-500 mt-2">战略性亏损（50%-80%营销占比） = 购买核心资产</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
                {/* Plan A */}
                <motion.div
                    onMouseEnter={() => setHovered('A')}
                    onMouseLeave={() => setHovered(null)}
                    className={`relative p-8 rounded-3xl border-2 transition-all duration-500 overflow-hidden cursor-pointer bg-white ${hovered === 'B' ? 'opacity-40 scale-95' : 'opacity-100 shadow-xl border-blue-100'}`}
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 shadow-sm"><Crosshair size={32} /></div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">Plan A: 狙击手</h3>
                                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded inline-block mt-1">稳健策略</p>
                            </div>
                        </div>

                        <div className="text-5xl font-mono font-bold text-slate-800 mb-2 tracking-tighter flex items-center">
                             ¥ {isEditMode ? <input value={planA.budget} onChange={e=>updatePlan('A', 'budget', e.target.value)} className="bg-slate-50 w-48 border-b outline-none"/> : planA.budget}
                        </div>
                        <div className="text-sm text-slate-500 mb-8 font-medium">
                            营销占比 {isEditMode ? <input value={planA.ratio} onChange={e=>updatePlan('A', 'ratio', e.target.value)} className="bg-slate-50 w-12 border-b outline-none"/> : planA.ratio}
                        </div>

                        <div className="space-y-5">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                <span className="text-slate-500 text-sm">流量目标</span>
                                <span className="font-bold text-slate-800 text-lg">
                                    {isEditMode ? <input value={planA.traffic} onChange={e=>updatePlan('A', 'traffic', e.target.value)} className="bg-slate-50 w-24 text-right border-b outline-none"/> : planA.traffic}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                <span className="text-slate-500 text-sm">CAC (获客成本)</span>
                                <span className="font-bold text-emerald-600 text-lg">
                                     {isEditMode ? <input value={planA.cac} onChange={e=>updatePlan('A', 'cac', e.target.value)} className="bg-slate-50 w-24 text-right border-b outline-none"/> : planA.cac}
                                     <span className="text-xs text-slate-400">/人</span>
                                </span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl">
                                <ul className="space-y-2 text-sm text-slate-600">
                                    {planA.points.map((p, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <CheckCircle size={14} className="text-blue-500 shrink-0" /> 
                                            {isEditMode ? <input value={p} onChange={e=>updatePoint('A', i, e.target.value)} className="bg-white w-full border-b border-slate-200 outline-none"/> : p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Plan B */}
                <motion.div
                    onMouseEnter={() => setHovered('B')}
                    onMouseLeave={() => setHovered(null)}
                    className={`relative p-8 rounded-3xl border-2 transition-all duration-500 overflow-hidden cursor-pointer bg-white ${hovered === 'A' ? 'opacity-40 scale-95' : 'opacity-100 shadow-xl border-red-100'}`}
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-red-50 rounded-2xl text-red-600 shadow-sm"><Zap size={32} /></div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">Plan B: 轰炸机</h3>
                                <p className="text-xs text-red-600 font-bold uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded inline-block mt-1">激进策略</p>
                            </div>
                        </div>

                         <div className="text-5xl font-mono font-bold text-slate-800 mb-2 tracking-tighter flex items-center">
                             ¥ {isEditMode ? <input value={planB.budget} onChange={e=>updatePlan('B', 'budget', e.target.value)} className="bg-slate-50 w-48 border-b outline-none"/> : planB.budget}
                        </div>
                        <div className="text-sm text-slate-500 mb-8 font-medium">
                            营销占比 {isEditMode ? <input value={planB.ratio} onChange={e=>updatePlan('B', 'ratio', e.target.value)} className="bg-slate-50 w-12 border-b outline-none"/> : planB.ratio}
                        </div>

                        <div className="space-y-5">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                <span className="text-slate-500 text-sm">流量目标</span>
                                <span className="font-bold text-slate-800 text-lg">
                                    {isEditMode ? <input value={planB.traffic} onChange={e=>updatePlan('B', 'traffic', e.target.value)} className="bg-slate-50 w-24 text-right border-b outline-none"/> : planB.traffic}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                <span className="text-slate-500 text-sm">CAC (获客成本)</span>
                                <span className="font-bold text-emerald-600 text-lg">
                                     {isEditMode ? <input value={planB.cac} onChange={e=>updatePlan('B', 'cac', e.target.value)} className="bg-slate-50 w-24 text-right border-b outline-none"/> : planB.cac}
                                     <span className="text-xs text-slate-400">/人</span>
                                </span>
                            </div>
                            <div className="bg-red-50 p-4 rounded-xl">
                                <ul className="space-y-2 text-sm text-slate-600">
                                    {planB.points.map((p, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <AlertTriangle size={14} className="text-red-500 shrink-0" /> 
                                            {isEditMode ? <input value={p} onChange={e=>updatePoint('B', i, e.target.value)} className="bg-white w-full border-b border-slate-200 outline-none"/> : p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            {/* Conclusion Section */}
            <div className="max-w-5xl mx-auto p-4 bg-slate-50 rounded-xl border border-slate-200 flex gap-3">
                <div className="shrink-0 pt-1 text-slate-500"><FileText size={20}/></div>
                <div className="flex-grow">
                    <h4 className="text-sm font-bold text-slate-800 mb-1">战略选择结论</h4>
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

export default StrategyBattle;