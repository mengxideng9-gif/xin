import React, { useState } from 'react';
import { Package, Truck, Database, Shield, DollarSign, FileText } from 'lucide-react';

interface InfraAndSupplyProps {
  isEditMode?: boolean;
}

const InfraAndSupply: React.FC<InfraAndSupplyProps> = ({ isEditMode = false }) => {
    const [conclusion, setConclusion] = useState("基建分析：Q1 在基础设施上的一次性投入 (¥100k) 是必要的护城河。特别是在合规 (FDA) 和数据工具上的投入，将为后续的规模化扩张打下坚实基础，避免后期因违规或盲目投放产生更高昂的隐形成本。");
    
    const [infraItems, setInfraItems] = useState([
        { id: 1, category: 'safety', label: '美区环境 (手机/IP/老号)', cost: '¥25,000', catLabel: '安全护城河', icon: Shield, color: 'blue' },
        { id: 2, category: 'safety', label: '硬合规认证 (FDA/UPC)', cost: '¥11,500', catLabel: '安全护城河', icon: Shield, color: 'blue' },
        { id: 3, category: 'safety', label: '资金通道 (PayPal)', cost: '费率 4%', catLabel: '安全护城河', icon: Shield, color: 'blue' },
        { id: 4, category: 'growth', label: '数据工具 (H10/FastMoss)', cost: '¥30,000', catLabel: '增长加速器', icon: Database, color: 'orange' },
        { id: 5, category: 'growth', label: '视觉资产 (拍摄/影棚)', cost: '¥30,000', catLabel: '增长加速器', icon: Database, color: 'orange' },
        { id: 6, category: 'growth', label: '独立站预售页', cost: '¥3,000', catLabel: '增长加速器', icon: Database, color: 'orange' },
    ]);

    const [supplyItems, setSupplyItems] = useState([
        { id: 1, label: '初始生产 (FOB)', cost: '¥68,250', icon: Package, color: 'slate' },
        { id: 2, label: '头程物流', cost: '¥25,750', icon: Truck, color: 'slate' },
        { id: 3, label: '补货储备 (最大占比)', cost: '¥100,000', icon: DollarSign, color: 'orange' },
        { id: 4, label: '隐性风险金', cost: '¥45,000', icon: Shield, color: 'slate' },
    ]);

    const handleInfraUpdate = (id: number, field: string, val: string) => {
        setInfraItems(infraItems.map(i => i.id === id ? { ...i, [field]: val } : i));
    };

    const handleSupplyUpdate = (id: number, field: string, val: string) => {
        setSupplyItems(supplyItems.map(i => i.id === id ? { ...i, [field]: val } : i));
    };

    return (
        <div className="space-y-8">
            {/* Section 09: Infra */}
            <section className={`premium-card p-8 rounded-3xl border bg-white ${isEditMode ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">09. 项目启动基建</h2>
                        <p className="text-slate-500 text-sm">数字资产一次性投入</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-mono font-bold text-emerald-600">¥100,000</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    {['blue', 'orange'].map((color) => {
                        const items = infraItems.filter(i => i.color === color);
                        if (items.length === 0) return null;
                        
                        // FIX: Assign component to capitalized variable to avoid JSX syntax error
                        const CategoryIcon = items[0].icon;

                        const bgClass = color === 'blue' ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100';
                        const titleClass = color === 'blue' ? 'text-blue-800' : 'text-orange-800';
                        const textClass = color === 'blue' ? 'text-blue-700' : 'text-orange-700';
                        const costClass = color === 'blue' ? 'text-blue-900' : 'text-orange-900';
                        
                        return (
                            <div key={color} className={`${bgClass} p-6 rounded-2xl border`}>
                                <h3 className={`font-bold ${titleClass} mb-4 flex items-center gap-2`}>
                                    <CategoryIcon size={18}/> {items[0].catLabel}
                                </h3>
                                <div className="space-y-3">
                                    {items.map((item) => (
                                        <div key={item.id} className={`flex justify-between text-sm border-b border-${color}-200/50 pb-2`}>
                                            <div className={textClass}>
                                                {isEditMode ? <input value={item.label} onChange={e=>handleInfraUpdate(item.id, 'label', e.target.value)} className="bg-transparent border-b border-slate-300 w-full outline-none" /> : item.label}
                                            </div>
                                            <div className={`font-bold ${costClass}`}>
                                                {isEditMode ? <input value={item.cost} onChange={e=>handleInfraUpdate(item.id, 'cost', e.target.value)} className="bg-transparent border-b border-slate-300 w-20 text-right outline-none" /> : item.cost}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                 {/* Conclusion Section */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex gap-3">
                    <div className="shrink-0 pt-1 text-slate-500"><FileText size={20}/></div>
                    <div className="flex-grow">
                        <h4 className="text-sm font-bold text-slate-800 mb-1">基建投入分析</h4>
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

            {/* Section 11: Supply Chain */}
            <section className={`premium-card p-8 rounded-3xl border bg-white ${isEditMode ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
                <div className="flex justify-between items-center mb-6">
                     <div>
                        <h2 className="text-xl font-bold text-slate-800">11. Q1 供应链成本与策略</h2>
                        <p className="text-slate-500 text-sm">动态周转 (30天库存+15天在途)</p>
                    </div>
                     <div className="text-right">
                        <div className="text-2xl font-mono font-bold text-slate-800">¥180,000</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-3">
                         {supplyItems.map((item) => (
                             <div key={item.id} className={`flex justify-between p-3 rounded-lg border ${item.color === 'orange' ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-100'}`}>
                                <div className={`flex items-center gap-2 text-sm ${item.color === 'orange' ? 'text-orange-700 font-bold' : 'text-slate-600'}`}>
                                    <item.icon size={16}/> 
                                    {isEditMode ? <input value={item.label} onChange={e=>handleSupplyUpdate(item.id, 'label', e.target.value)} className="bg-transparent border-b border-slate-300 outline-none w-40" /> : item.label}
                                </div>
                                <div className={`font-bold ${item.color === 'orange' ? 'text-orange-800' : 'text-slate-800'}`}>
                                    {isEditMode ? <input value={item.cost} onChange={e=>handleSupplyUpdate(item.id, 'cost', e.target.value)} className="bg-transparent border-b border-slate-300 outline-none w-20 text-right" /> : item.cost}
                                </div>
                             </div>
                         ))}
                    </div>

                    <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10"><Truck size={100} /></div>
                        <h3 className="text-lg font-bold mb-4">🔄 动态补货逻辑</h3>
                        <div className="text-center py-4 border-b border-slate-700 mb-4">
                            <span className="text-2xl font-bold text-orange-400">30 Days 在仓</span>
                            <span className="mx-2 text-slate-500">+</span>
                            <span className="text-2xl font-bold text-blue-400">15 Days 在途</span>
                            <div className="mt-2 text-sm text-slate-400">= 🚫 零滞销</div>
                        </div>
                        <p className="text-sm text-slate-300">目标：确保现金流在"补货"与"回款"之间高效滚动。</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InfraAndSupply;