import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Lock, AlertTriangle, RefreshCcw, FileText } from 'lucide-react';

interface RiskManagementProps {
  isEditMode?: boolean;
}

const RiskManagement: React.FC<RiskManagementProps> = ({ isEditMode = false }) => {
    const [conclusion, setConclusion] = useState("风险控制结论：Q1 的核心风险在于广告转化率 (CVR) 和恶意竞争。通过透明计划杜绝跟卖，并设置 3% 的 CVR 熔断线，可确保在极端情况下资金链不至于断裂。售后端的“只退款不退货”策略虽然增加了短期成本，但能极大降低差评率，保护 Listing 权重。");

    const [defenses, setDefenses] = useState([
        { id: 1, title: 'FDA/COA/保险/UPC', sub: '硬门槛必过，缺一不可', icon: Lock, color: 'text-emerald-600' },
        { id: 2, title: '透明计划 (Transparency)', sub: '$0.05/个，彻底杜绝跟卖', icon: ShieldCheck, color: 'text-blue-600' },
        { id: 3, title: '售后策略', sub: '只退款不退货 (运费 > 成本)', icon: RefreshCcw, color: 'text-yellow-600', highlight: true },
    ]);

    const [risks, setRisks] = useState([
        { id: 1, title: '🔴 极高风险 (转化崩盘)', trigger: 'CVR < 3%', action: '立即止损，暂停站外', style: 'red' },
        { id: 2, title: '🟡 中等风险 (广告失控)', trigger: 'ACOS > 100%', action: '关停大词，回防长尾', style: 'amber' },
    ]);

    const updateDefense = (id: number, field: string, val: string) => {
        setDefenses(defenses.map(d => d.id === id ? { ...d, [field]: val } : d));
    };

    const updateRisk = (id: number, field: string, val: string) => {
        setRisks(risks.map(r => r.id === id ? { ...r, [field]: val } : r));
    };

    return (
        <section className={`premium-card p-8 rounded-3xl border bg-white ${isEditMode ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
            <div className="mb-8 border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">07/08. 风险合规体系 & 熔断机制</h2>
                    <p className="text-slate-500 mt-1">安全气囊：FDA合规 / 售后闭环 / 止损底线</p>
                </div>
                <ShieldCheck size={40} className="text-emerald-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Defense */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <ShieldCheck className="text-emerald-500" /> 防御体系
                    </h3>
                    <ul className="space-y-3">
                        {defenses.map((def) => (
                             <li key={def.id} className={`p-4 rounded-xl border flex items-start gap-3 ${def.highlight ? 'bg-yellow-50 border-yellow-100' : 'bg-slate-50 border-slate-100'}`}>
                                <div className={`p-2 bg-white rounded-lg shadow-sm ${def.color}`}><def.icon size={16} /></div>
                                <div className="flex-1">
                                    <div className="font-bold text-slate-700 text-sm">
                                        {isEditMode ? <input value={def.title} onChange={e=>updateDefense(def.id, 'title', e.target.value)} className="bg-transparent border-b w-full outline-none"/> : def.title}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">
                                        {isEditMode ? <input value={def.sub} onChange={e=>updateDefense(def.id, 'sub', e.target.value)} className="bg-transparent border-b w-full outline-none"/> : def.sub}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Circuit Breaker */}
                <div>
                     <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <ShieldAlert className="text-red-500" /> 熔断警报
                    </h3>
                    <div className="space-y-4">
                        {risks.map((risk) => {
                            const isRed = risk.style === 'red';
                            const bg = isRed ? 'bg-red-50' : 'bg-amber-50';
                            const border = isRed ? 'border-red-100' : 'border-amber-100';
                            const text = isRed ? 'text-red-700' : 'text-amber-700';
                            
                            return (
                                <div key={risk.id} className={`p-5 ${bg} border-2 ${border} rounded-2xl relative overflow-hidden`}>
                                    <div className="absolute right-0 top-0 p-4 opacity-10"><AlertTriangle size={60} className={isRed ? 'text-red-500' : 'text-amber-500'}/></div>
                                    <div className={`font-bold ${text} mb-1`}>
                                         {isEditMode ? <input value={risk.title} onChange={e=>updateRisk(risk.id, 'title', e.target.value)} className="bg-transparent border-b w-full outline-none"/> : risk.title}
                                    </div>
                                    <div className={`text-sm ${text.replace('700', '600')} mb-2`}>
                                        Trigger: {isEditMode ? <input value={risk.trigger} onChange={e=>updateRisk(risk.id, 'trigger', e.target.value)} className="bg-transparent border-b w-24 outline-none"/> : risk.trigger}
                                    </div>
                                    <div className={`bg-white px-3 py-2 rounded-lg border ${border} text-xs font-bold ${text.replace('700', '800')} inline-block shadow-sm`}>
                                        Action: {isEditMode ? <input value={risk.action} onChange={e=>updateRisk(risk.id, 'action', e.target.value)} className="bg-transparent border-b w-40 outline-none"/> : risk.action}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Conclusion Section */}
            <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3">
                <div className="shrink-0 pt-1 text-red-500"><FileText size={20}/></div>
                <div className="flex-grow">
                    <h4 className="text-sm font-bold text-red-900 mb-1">风控结论</h4>
                    {isEditMode ? (
                        <textarea 
                            value={conclusion} 
                            onChange={e=>setConclusion(e.target.value)}
                            className="w-full bg-white p-2 rounded border border-red-200 text-sm text-red-800 h-20 outline-none focus:ring-2 focus:ring-red-300"
                        />
                    ) : (
                        <p className="text-sm text-red-700 leading-relaxed">{conclusion}</p>
                    )}
                </div>
            </div>

        </section>
    );
};

export default RiskManagement;