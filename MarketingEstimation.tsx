import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MousePointer, Eye, ShoppingCart, ArrowDown, TrendingUp, AlertCircle, FileText } from 'lucide-react';

interface MarketingEstimationProps {
  isEditMode?: boolean;
}

const MarketingEstimation: React.FC<MarketingEstimationProps> = ({ isEditMode = false }) => {
    // Basic assumptions
    const exchangeRate = 7.2; // USD to CNY
    const [conclusion, setConclusion] = useState("流量推演结论：TikTok 以 $0.4 的低 CPC 优势，能为品牌提供千万级的曝光。虽然 CVR 较低，但其作为流量入口（Top of Funnel）至关重要。建议重点优化 Amazon 站内的 Listing 质量，以承接站外引入的流量，目标将综合 CVR 提升至 5% 以上。");
    
    // Channel Data
    const [channels, setChannels] = useState([
        {
            id: 'amazon',
            name: 'Amazon PPC (站内)',
            type: '防守/收割',
            budgetCNY: 600000,
            cpcUSD: 1.5,
            ctr: '0.8% - 1.2%',
            cvr: '15% - 25%',
            desc: '高意向精准流量，转化率高但单价贵。',
            color: 'bg-blue-500',
            lightColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            borderColor: 'border-blue-200'
        },
        {
            id: 'social',
            name: 'TikTok/FB (站外)',
            type: '进攻/种草',
            budgetCNY: 450000,
            cpcUSD: 0.4,
            ctr: '1.5% - 3.0%',
            cvr: '1% - 3%',
            desc: '低价泛流量，用于扩大声量和人群包。',
            color: 'bg-purple-500',
            lightColor: 'bg-purple-50',
            textColor: 'text-purple-600',
            borderColor: 'border-purple-200'
        }
    ]);

    const calculateTraffic = (budgetCNY: number, cpcUSD: number) => {
        const budgetUSD = budgetCNY / exchangeRate;
        const clicks = Math.floor(budgetUSD / cpcUSD);
        return clicks.toLocaleString();
    };

    const handleUpdate = (id: string, field: string, value: string | number) => {
        const updated = channels.map(c => c.id === id ? { ...c, [field]: value } : c);
        setChannels(updated);
    };

    return (
        <section className={`premium-card p-8 rounded-3xl border bg-white ${isEditMode ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                        <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Calculator size={20}/></span>
                        营销费用与流量测算模型
                    </h2>
                    <p className="text-slate-500 mt-2 ml-11">基于 Q1 预算的点击成本 (CPC) 与预期流量收益推演</p>
                </div>
                <div className="text-xs font-mono text-slate-400">Exchange Rate: $1 = ¥{exchangeRate}</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {channels.map((channel) => (
                    <motion.div 
                        key={channel.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={`rounded-2xl border ${channel.borderColor} overflow-hidden`}
                    >
                        {/* Header */}
                        <div className={`${channel.lightColor} p-5 border-b ${channel.borderColor} flex justify-between items-start`}>
                            <div>
                                <h3 className={`font-bold text-lg ${channel.textColor}`}>{channel.name}</h3>
                                <span className="text-xs font-semibold bg-white px-2 py-1 rounded-full border border-slate-100 text-slate-500 mt-1 inline-block">
                                    {channel.type}
                                </span>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-slate-500">Q1 总预算</div>
                                {isEditMode ? (
                                    <input 
                                        type="number"
                                        className="text-xl font-mono font-bold w-32 text-right bg-white/50 border-b border-slate-300 outline-none"
                                        value={channel.budgetCNY}
                                        onChange={e => handleUpdate(channel.id, 'budgetCNY', parseInt(e.target.value))}
                                    />
                                ) : (
                                    <div className={`text-xl font-mono font-bold ${channel.textColor}`}>¥{(channel.budgetCNY / 10000).toFixed(0)}万</div>
                                )}
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="p-6 grid grid-cols-2 gap-6 bg-white">
                            <div className="space-y-1">
                                <div className="text-xs text-slate-400 uppercase font-bold flex items-center gap-1"><MousePointer size={12}/> 单次点击成本 (CPC)</div>
                                <div className="flex items-center gap-1">
                                    <span className="text-xl font-bold text-slate-800">$</span>
                                    {isEditMode ? (
                                        <input 
                                            type="number" 
                                            step="0.1"
                                            className="text-2xl font-bold text-slate-800 w-20 bg-slate-50 border-b outline-none"
                                            value={channel.cpcUSD}
                                            onChange={e => handleUpdate(channel.id, 'cpcUSD', parseFloat(e.target.value))}
                                        />
                                    ) : (
                                        <div className="text-2xl font-bold text-slate-800">{(channel.cpcUSD || 0).toFixed(2)}</div>
                                    )}
                                </div>
                                <div className="text-xs text-slate-400">≈ ¥{(channel.cpcUSD * exchangeRate).toFixed(2)}</div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-xs text-slate-400 uppercase font-bold flex items-center gap-1"><TrendingUp size={12}/> 预估总流量 (Clicks)</div>
                                <div className="text-2xl font-bold text-emerald-600">{calculateTraffic(channel.budgetCNY, channel.cpcUSD)}</div>
                                <div className="text-xs text-emerald-500 font-medium">进店人次</div>
                            </div>

                            <div className="col-span-2 pt-4 border-t border-slate-50">
                                <div className="grid grid-cols-2 gap-4">
                                     <div className="bg-slate-50 p-3 rounded-lg">
                                        <div className="text-xs text-slate-500 mb-1">CTR (点击率) 参考值</div>
                                        {isEditMode ? (
                                            <input className="font-bold text-slate-700 bg-transparent w-full border-b" value={channel.ctr} onChange={e=>handleUpdate(channel.id, 'ctr', e.target.value)} />
                                        ) : (
                                            <div className="font-bold text-slate-700">{channel.ctr}</div>
                                        )}
                                     </div>
                                     <div className="bg-slate-50 p-3 rounded-lg">
                                        <div className="text-xs text-slate-500 mb-1">CVR (转化率) 参考值</div>
                                        {isEditMode ? (
                                            <input className="font-bold text-slate-700 bg-transparent w-full border-b" value={channel.cvr} onChange={e=>handleUpdate(channel.id, 'cvr', e.target.value)} />
                                        ) : (
                                            <div className="font-bold text-slate-700">{channel.cvr}</div>
                                        )}
                                     </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Funnel Visualization */}
            <div className="mb-10 bg-slate-50 rounded-2xl p-8 border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-[80px] opacity-50"></div>
                
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
                    <Eye className="text-slate-600"/> 全渠道流量漏斗推演 (Q1 Total)
                </h3>

                <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto space-y-2">
                    
                    {/* Level 1: Impressions */}
                    <div className="w-full bg-slate-200 text-slate-600 p-4 rounded-lg flex justify-between items-center shadow-sm">
                        <span className="font-bold flex items-center gap-2"><Eye size={16}/> 曝光 (Impressions)</span>
                        <span className="font-mono">Est. 15,000,000+</span>
                    </div>
                    
                    <ArrowDown size={20} className="text-slate-300" />

                    {/* Level 2: Clicks */}
                    <div className="w-[80%] bg-blue-100 text-blue-800 p-4 rounded-lg flex justify-between items-center shadow-sm border border-blue-200">
                        <span className="font-bold flex items-center gap-2"><MousePointer size={16}/> 点击 (Clicks/Traffic)</span>
                        <div className="text-right">
                             <div className="font-mono font-bold text-lg">211,000+</div>
                             <div className="text-xs text-blue-600 opacity-80">综合 CPC ≈ $0.79</div>
                        </div>
                    </div>

                    <ArrowDown size={20} className="text-blue-300" />

                    {/* Level 3: Conversions */}
                    <div className="w-[50%] bg-emerald-100 text-emerald-800 p-4 rounded-lg flex justify-between items-center shadow-sm border border-emerald-200">
                         <span className="font-bold flex items-center gap-2"><ShoppingCart size={16}/> 转化 (Orders)</span>
                         <div className="text-right">
                             <div className="font-mono font-bold text-lg">≈ 8,500 - 12,000</div>
                             <div className="text-xs text-emerald-600 opacity-80">综合 CVR ≈ 4-6%</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative z-10">
                    <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={20} />
                    <div className="text-sm text-slate-600">
                        <span className="font-bold text-slate-800">策略洞察：</span> 
                        TikTok 的 CPC ($0.4) 远低于 Amazon ($1.5)，能以低成本带来巨大流量基数。虽然站外转化率低 (1-3%)，但其核心作用是<span className="text-orange-600 font-bold">“降低全盘获客成本”</span>并为 Amazon 积累重定向 (Retargeting) 人群包，从而提升站内最终转化效率。
                    </div>
                </div>
            </div>

             {/* Conclusion Section */}
             <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex gap-3">
                <div className="shrink-0 pt-1 text-indigo-500"><FileText size={20}/></div>
                <div className="flex-grow">
                    <h4 className="text-sm font-bold text-indigo-900 mb-1">流量模型总结</h4>
                    {isEditMode ? (
                        <textarea 
                            value={conclusion} 
                            onChange={e=>setConclusion(e.target.value)}
                            className="w-full bg-white p-2 rounded border border-indigo-200 text-sm text-indigo-800 h-20 outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                    ) : (
                        <p className="text-sm text-indigo-700 leading-relaxed">{conclusion}</p>
                    )}
                </div>
            </div>

        </section>
    );
};

export default MarketingEstimation;