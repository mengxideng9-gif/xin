import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, FileText } from 'lucide-react';

interface CACAnalysisProps {
  isEditMode?: boolean;
}

const CACAnalysis: React.FC<CACAnalysisProps> = ({ isEditMode = false }) => {
    const [conclusion, setConclusion] = useState("获客成本分析：Q1 $21 的高 CAC 是为了获取核心资产（排名+评价+用户）。随着复购率提升和权重增加，Q4 预计 CAC 可降至 $6.5，届时将实现全面的利润收割。");

    const [steps, setSteps] = useState([
        { id: 1, title: 'Q1 饱和攻击', cost: '$21.00', status: '战略亏损', color: 'bg-red-500', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
        { id: 2, title: 'Q2 爬坡优化', cost: '$15.00', status: '盈亏平衡', color: 'bg-orange-500', bg: 'bg-white', border: 'border-slate-200', text: 'text-slate-800' },
        { id: 3, title: 'Q3 大促爆发', cost: '$10.00', status: '开始盈利', color: 'bg-blue-500', bg: 'bg-white', border: 'border-slate-200', text: 'text-slate-800' },
        { id: 4, title: 'Q4 收割复购', cost: '$6.50', status: '高利润', color: 'bg-emerald-500', bg: 'bg-white', border: 'border-slate-200', text: 'text-slate-800' },
    ]);

    const updateStep = (id: number, field: string, val: string) => {
        setSteps(steps.map(s => s.id === id ? { ...s, [field]: val } : s));
    };

    return (
        <section className={`premium-card p-8 rounded-3xl border bg-white ${isEditMode ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
            <h2 className="text-2xl font-bold mb-8 text-slate-800 flex items-center gap-3">
                <span className="p-2 bg-slate-100 rounded-lg"><Calculator size={20} className="text-slate-600"/></span>
                Q1 获客成本 (CAC) 全年演变
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                {steps.map((step, idx) => (
                    <div key={step.id} className="relative group">
                         {idx !== 3 && <ArrowRight className="absolute -right-5 top-1/2 transform -translate-y-1/2 text-slate-300 z-10 hidden md:block" />}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className={`p-6 rounded-2xl border ${step.border} ${step.bg} text-center h-full flex flex-col justify-center shadow-sm transition-shadow hover:shadow-md`}
                        >
                            <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                                {isEditMode ? <input value={step.title} onChange={e=>updateStep(step.id, 'title', e.target.value)} className="bg-transparent border-b border-slate-300 w-full outline-none text-center" /> : step.title}
                            </div>
                            <div className={`text-3xl font-extrabold mb-3 ${step.text}`}>
                                {isEditMode ? <input value={step.cost} onChange={e=>updateStep(step.id, 'cost', e.target.value)} className="bg-transparent border-b border-slate-300 w-full outline-none text-center" /> : step.cost}
                            </div>
                            <div className={`text-xs inline-block px-3 py-1 rounded-full font-bold text-white ${step.color} shadow-sm`}>{step.status}</div>
                        </motion.div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-8">
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 font-mono text-sm relative overflow-hidden shadow-inner">
                     {/* Decorative Elements */}
                     <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-2xl opacity-60"></div>

                    <h3 className="text-slate-800 font-bold mb-6 text-lg border-b border-slate-200 pb-2">Q1 单笔盈亏算术题</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 text-slate-600 bg-white px-3 rounded border border-slate-100 shadow-sm">
                            <span>客单价 (Revenue)</span>
                            <span className="text-emerald-600 font-bold">+$25.00</span>
                        </div>
                        <div className="flex justify-between py-2 text-slate-600 bg-red-50 px-3 rounded border border-red-100">
                            <span>减：获客成本 (CAC)</span>
                            <span className="text-red-600 font-bold">-$21.00</span>
                        </div>
                        <div className="flex justify-between py-2 text-slate-500 px-3">
                            <span>减：平台佣金/FBA</span>
                            <span>-$8.00</span>
                        </div>
                        <div className="flex justify-between py-2 text-slate-500 px-3 border-b border-dashed border-slate-300">
                            <span>减：货值运费</span>
                            <span>-$3.00</span>
                        </div>
                        <div className="flex justify-between pt-4 px-3 text-lg font-bold">
                            <span>净亏损 (Net Loss)</span>
                            <span className="text-red-600">-$7.00 / 单 🔴</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">价值转换逻辑</h3>
                        <p className="text-slate-500 leading-relaxed mt-1">
                            我们用 <span className="text-red-600 font-bold bg-red-50 px-1 rounded">-$7.00</span> 的亏损购买了什么？
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-orange-300 transition-colors">
                            <div className="text-orange-500 font-bold text-lg mb-1">首页排名</div>
                            <div className="text-xs text-slate-500">核心大词卡位入场券</div>
                        </div>
                        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                            <div className="text-blue-500 font-bold text-lg mb-1">100+ Review</div>
                            <div className="text-xs text-slate-500">极高权重的信任资产</div>
                        </div>
                        <div className="p-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg col-span-2 text-white">
                            <div className="text-emerald-400 font-bold text-lg mb-1">3000+ 种子用户</div>
                            <div className="text-xs text-slate-400">私域流量池启动资金 (LTV潜力)</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conclusion Section */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-3">
                <div className="shrink-0 pt-1 text-emerald-500"><FileText size={20}/></div>
                <div className="flex-grow">
                    <h4 className="text-sm font-bold text-emerald-900 mb-1">CAC 趋势分析</h4>
                    {isEditMode ? (
                        <textarea 
                            value={conclusion} 
                            onChange={e=>setConclusion(e.target.value)}
                            className="w-full bg-white p-2 rounded border border-emerald-200 text-sm text-emerald-800 h-20 outline-none focus:ring-2 focus:ring-emerald-300"
                        />
                    ) : (
                        <p className="text-sm text-emerald-700 leading-relaxed">{conclusion}</p>
                    )}
                </div>
            </div>

        </section>
    );
};

export default CACAnalysis;