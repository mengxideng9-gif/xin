import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Layers, Droplet, Box, Scissors, Truck, Factory, Tag, RefreshCw, Edit3, FileText } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Initial Data
const initialSmallBoxBOM = [
  { id: 1, name: '鱼油 (Fish Oil)', value: 17, cost: 0.714, color: '#3b82f6', icon: Droplet, detail: '14粒/版 (Tuwang/Huluwa)' },
  { id: 2, name: '冻干 (Freeze-Dried)', value: 15, cost: 0.640, color: '#60a5fa', icon: Layers, detail: '8袋/盒 (Chongrun)' },
  { id: 3, name: '内包 (Blister/Bag)', value: 23, cost: 0.980, color: '#94a3b8', icon: Package, detail: '铝板 + 锁鲜袋' },
  { id: 4, name: '外包 (Color Box)', value: 21, cost: 1.15, color: '#f97316', icon: Box, detail: '小彩盒 (Dongpeng)' },
  { id: 5, name: '人工 (Assembly)', value: 24, cost: 0.900, color: '#fbbf24', icon: Scissors, detail: '组装费' },
];

const initialLargeBoxBOM = [
  { id: 1, name: '鱼油 (Fish Oil)', value: 13, cost: 5.712, color: '#3b82f6', icon: Droplet, detail: '112粒 (8版)' },
  { id: 2, name: '冻干 (Freeze-Dried)', value: 11, cost: 4.720, color: '#60a5fa', icon: Layers, detail: '118粒 (59袋)' },
  { id: 3, name: '内包 (Blister/Bag)', value: 18, cost: 7.800, color: '#94a3b8', icon: Package, detail: '铝板*8 + 锁鲜袋' },
  { id: 4, name: '外包 (Big Box)', value: 23, cost: 14.700, color: '#f97316', icon: Box, detail: '大礼盒 + 内托' },
  { id: 5, name: '人工 (Assembly)', value: 35, cost: 1.000, color: '#fbbf24', icon: Scissors, detail: '复杂组装' },
];

const initialSuppliers = [
  { id: 1, role: '加工/鱼油', name: '土王生物技术有限公司', location: 'Tuwang Biotech' },
  { id: 2, role: '原料/鱼油', name: '葫芦娃宠物营养品', location: 'Huluwa Pet' },
  { id: 3, role: '冻干/组装', name: '山东宠润宠物食品有限公司', location: 'Chongrun Pet Food' },
  { id: 4, role: '包装 (袋)', name: '苍南县东蓬包装有限公司', location: 'Dongpeng Pack' },
  { id: 5, role: '包装 (盒)', name: '荣吉包装', location: 'Heshi Pack' },
];

interface SupplyChainBOMProps {
  isEditMode?: boolean;
}

const SupplyChainBOM: React.FC<SupplyChainBOMProps> = ({ isEditMode = false }) => {
  const [mode, setMode] = useState<'small' | 'large'>('small');
  
  // State for editable data
  const [smallData, setSmallData] = useState(initialSmallBoxBOM);
  const [largeData, setLargeData] = useState(initialLargeBoxBOM);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [conclusion, setConclusion] = useState("结论分析：供应链结构中，包材与人工成本占比过高。后续可通过自动化设备引入降低人工成本，同时大货采购降低包材单价，目标将综合成本降低 15%。");

  const currentData = mode === 'small' ? smallData : largeData;
  const setCurrentData = mode === 'small' ? setSmallData : setLargeData;

  const totalCost = currentData.reduce((acc, item) => acc + item.cost, 0);
  const title = mode === 'small' ? '鱼油冻干小盒 (体验装)' : '鱼油冻干大盒 (囤货装)';

  const handleUpdate = (id: number, field: string, value: string | number) => {
    const updated = currentData.map(item => {
        if (item.id === id) {
            return { ...item, [field]: value };
        }
        return item;
    });
    setCurrentData(updated);
  };
  
  const handleSupplierUpdate = (id: number, field: string, value: string) => {
      const updated = suppliers.map(s => s.id === id ? { ...s, [field]: value } : s);
      setSuppliers(updated);
  };

  const resetData = () => {
      if(window.confirm('Reset all BOM data to defaults?')) {
        setSmallData(initialSmallBoxBOM);
        setLargeData(initialLargeBoxBOM);
        setSuppliers(initialSuppliers);
      }
  };

  return (
    <section className={`premium-card p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden bg-white ${isEditMode ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      {isEditMode && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500" />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-slate-100 gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
             <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Factory size={20}/></span>
             产品成本深度拆解
             {isEditMode && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full border border-blue-200 flex items-center gap-1"><Edit3 size={10}/> Editing Mode</span>}
           </h2>
           <p className="text-slate-500 mt-2 ml-11">Based on Supplier Quotations & SKU Profiles</p>
        </div>
        
        <div className="flex items-center gap-2">
            <button 
                onClick={resetData}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                title="Reset to Defaults"
            >
                <RefreshCw size={18} />
            </button>
            <div className="flex items-center gap-4 bg-slate-100 p-1 rounded-xl">
                <button 
                    onClick={() => setMode('small')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'small' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    小盒 (Small)
                </button>
                <button 
                    onClick={() => setMode('large')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'large' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    大盒 (Large)
                </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8">
         {/* Left: Chart & Summary */}
         <div className="lg:col-span-5 flex flex-col">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-6 text-center relative">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Total Unit Cost (CNY)</div>
                <motion.div 
                    key={totalCost}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-mono font-extrabold text-slate-800"
                >
                    ¥{(totalCost || 0).toFixed(3)}
                </motion.div>
                <div className="mt-2 inline-block px-3 py-1 bg-white rounded border border-slate-200 text-xs font-bold text-slate-500">
                    {title}
                </div>
            </div>

            <div className="h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={currentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="cost"
                    stroke="none"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 20;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text x={x} y={y} fill="#64748b" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10} fontWeight="bold">
                            {currentData[index].name}
                          </text>
                        );
                      }}
                    >
                    {currentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value: number) => [`¥${(value || 0).toFixed(3)}`, 'Cost']}
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                    />
                </PieChart>
                </ResponsiveContainer>
                
                {/* Center Graphic */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="bg-white p-3 rounded-full shadow-sm border border-slate-100 flex items-center justify-center">
                         <Factory size={32} className="text-blue-500" />
                    </div>
                    <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">COST</div>
                </div>
            </div>
         </div>

         {/* Middle: Detailed List (Editable) */}
         <div className="lg:col-span-4 space-y-3">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide flex items-center gap-2">
                    <Tag size={16}/> Component Breakdown
                </h3>
            </div>
            
            <div className="space-y-3">
                {currentData.map((item) => (
                    <motion.div 
                        key={item.id}
                        layout
                        className={`flex items-center justify-between p-3 rounded-xl border shadow-sm group transition-all ${isEditMode ? 'bg-white border-blue-200' : 'bg-white border-slate-200'}`}
                    >
                        <div className="flex items-center gap-3 flex-1">
                            <div className={`p-2 rounded-lg bg-slate-50 text-slate-500 group-hover:text-blue-600 transition-colors`}>
                                <item.icon size={18} />
                            </div>
                            <div className="flex-1">
                                {isEditMode ? (
                                    <input 
                                        type="text" 
                                        value={item.name}
                                        onChange={(e) => handleUpdate(item.id, 'name', e.target.value)}
                                        className="font-bold text-slate-800 text-sm w-full bg-blue-50/50 border-b border-blue-200 focus:border-blue-500 outline-none px-1 rounded-t"
                                    />
                                ) : (
                                    <div className="font-bold text-slate-800 text-sm">{item.name}</div>
                                )}
                                
                                {isEditMode ? (
                                    <input 
                                        type="text" 
                                        value={item.detail}
                                        onChange={(e) => handleUpdate(item.id, 'detail', e.target.value)}
                                        className="text-[10px] text-slate-500 font-medium w-full bg-blue-50/50 border-b border-blue-200 focus:border-blue-500 outline-none mt-0.5 px-1 rounded-t"
                                    />
                                ) : (
                                    <div className="text-[10px] text-slate-400 font-medium">{item.detail}</div>
                                )}
                            </div>
                        </div>
                        <div className="text-right w-24">
                            <div className="flex items-center justify-end">
                                <span className="text-slate-400 text-xs font-mono mr-1">¥</span>
                                {isEditMode ? (
                                    <input 
                                        type="number" 
                                        step="0.001"
                                        value={item.cost}
                                        onChange={(e) => handleUpdate(item.id, 'cost', parseFloat(e.target.value) || 0)}
                                        className="font-mono font-bold text-slate-800 text-sm w-16 text-right bg-blue-50/50 border-b border-blue-200 focus:border-blue-500 outline-none px-1 rounded-t"
                                    />
                                ) : (
                                    <span className="font-mono font-bold text-slate-800 text-sm">{item.cost.toFixed(3)}</span>
                                )}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 mt-1">
                                {((item.cost / (totalCost || 1)) * 100).toFixed(1)}%
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
         </div>

         {/* Right: Suppliers (Editable) */}
         <div className="lg:col-span-3 bg-slate-50 rounded-2xl p-5 border border-slate-200">
             <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <Truck size={16}/> Key Suppliers
            </h3>
            <div className="space-y-4">
                {suppliers.map((sup) => (
                    <div key={sup.id} className="relative pl-4 border-l-2 border-slate-300">
                        {isEditMode ? (
                            <>
                                <input 
                                    value={sup.role}
                                    onChange={(e) => handleSupplierUpdate(sup.id, 'role', e.target.value)}
                                    className="text-[10px] font-bold text-blue-600 uppercase mb-0.5 bg-white w-full border border-slate-200 rounded px-1" 
                                />
                                <input 
                                    value={sup.name}
                                    onChange={(e) => handleSupplierUpdate(sup.id, 'name', e.target.value)}
                                    className="text-xs font-bold text-slate-700 bg-white w-full border border-slate-200 rounded px-1" 
                                />
                            </>
                        ) : (
                            <>
                                <div className="text-[10px] font-bold text-blue-600 uppercase mb-0.5">{sup.role}</div>
                                <div className="text-xs font-bold text-slate-700">{sup.name}</div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-slate-200">
                <div className="text-[10px] text-slate-400 mb-2 font-bold uppercase">Logistics & Tax</div>
                <div className="text-xs text-slate-600 leading-relaxed">
                    含税成本 (Tax Included): <strong className="text-slate-900">¥{(totalCost * 1.06).toFixed(2)}</strong>
                    <br/>
                    <span className="text-slate-400 text-[10px] mt-1 block">Est. Tax Rate: ~6% avg</span>
                </div>
            </div>
         </div>
      </div>

      {/* Conclusion Section */}
      <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex gap-3">
          <div className="shrink-0 pt-1 text-indigo-500"><FileText size={20}/></div>
          <div className="flex-grow">
              <h4 className="text-sm font-bold text-indigo-900 mb-1">供应链结论分析</h4>
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

export default SupplyChainBOM;