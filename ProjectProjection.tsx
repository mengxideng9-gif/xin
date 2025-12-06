
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, RefreshCw, DollarSign, TrendingUp, Package, Scale, Settings, FileText, Box, Layers } from 'lucide-react';

interface ProjectProjectionProps {
  isEditMode?: boolean;
}

const ProjectProjection: React.FC<ProjectProjectionProps> = ({ isEditMode = false }) => {
  const [skuMode, setSkuMode] = useState<'small' | 'large'>('small');

  // Hardcoded Exact Unit Economics (v6.0 - Force Override)
  const smallDefaults = {
    retailPrice: 19.99,
    productCost: 0.61,     
    headhaul: 0.20,        
    fbaFee: 5.80,          
    referralRate: 15,      
    storageFee: 0.15,      
    marketingBudgetCNY: 1200000,
    exchangeRate: 7.2,
    cpc: 1.50,             
    cvr: 5.0,             
    returnRate: 3.0,       
  };

  const largeDefaults = {
    retailPrice: 59.99,    
    productCost: 4.72,    
    headhaul: 1.60,        
    fbaFee: 9.20,          
    referralRate: 15,      
    storageFee: 0.45,      
    marketingBudgetCNY: 500000, 
    exchangeRate: 7.2,
    cpc: 1.80,             
    cvr: 5.0,              
    returnRate: 3.0,       
  };

  const [params, setParams] = useState(smallDefaults);
  const [conclusion, setConclusion] = useState("单品测算结论：小盒(体验装)毛利约 50%，承担引流任务，前期因高 PPC 处于亏损区间；大盒(囤货装)虽然转化率较低，但客单价高，毛利额充足(~$25/单)，是后续利润释放的核心来源。建议 Q2 开始通过 Email 营销重点推大盒复购。");
  
  // Initialize with 0s to prevent undefined errors
  const [results, setResults] = useState({
    marketingBudgetUSD: 0,
    trafficClicks: 0,
    salesUnits: 0,
    totalRevenue: 0,
    totalProductCost: 0,
    totalHeadhaul: 0,
    totalFBA: 0,
    totalReferral: 0,
    totalStorage: 0,
    totalReturnLoss: 0,
    totalAllCosts: 0,
    netProfit: 0,
    margin: 0,
    roi: 0,
    breakEvenUnits: 0
  });
  
  const [showFBACalc, setShowFBACalc] = useState(false);
  
  // FBA Calculator State (Default Metric per prompt)
  // Small: 23x15x1.5 cm, 0.05kg
  // Large: 20x15x15 cm, 0.05kg
  const [fbaUnit, setFbaUnit] = useState<'imperial' | 'metric'>('metric'); 
  const [fbaDims, setFbaDims] = useState({ l: 23, w: 15, h: 1.5, weight: 0.05 }); 
  const [calcResult, setCalcResult] = useState({ fee: 0, storage: 0 });

  // Handle Mode Switching
  const handleModeSwitch = (mode: 'small' | 'large') => {
      setSkuMode(mode);
      setParams(mode === 'small' ? smallDefaults : largeDefaults);
      
      // Update FBA defaults
      if (mode === 'small') {
          setFbaDims({ l: 23, w: 15, h: 1.5, weight: 0.05 });
      } else {
          setFbaDims({ l: 20, w: 15, h: 15, weight: 0.05 });
      }
  };

  // Real-time P&L Calculation
  useEffect(() => {
    // Safety checks: Ensure no NaN values propagate
    const safeParams = {
        marketingBudgetCNY: params.marketingBudgetCNY || 0,
        exchangeRate: params.exchangeRate || 1, // Prevent divide by zero
        cpc: params.cpc || 0,
        cvr: params.cvr || 0,
        retailPrice: params.retailPrice || 0,
        productCost: params.productCost || 0,
        headhaul: params.headhaul || 0,
        fbaFee: params.fbaFee || 0,
        referralRate: params.referralRate || 0,
        storageFee: params.storageFee || 0,
        returnRate: params.returnRate || 0,
    };

    // 1. Marketing Physics
    const marketingBudgetUSD = safeParams.marketingBudgetCNY / safeParams.exchangeRate;
    const trafficClicks = safeParams.cpc > 0 ? marketingBudgetUSD / safeParams.cpc : 0;
    const salesUnits = trafficClicks * (safeParams.cvr / 100);
    const totalRevenue = salesUnits * safeParams.retailPrice;

    // 2. Variable Costs (Per Unit * Units)
    const totalProductCost = salesUnits * safeParams.productCost;
    const totalHeadhaul = salesUnits * safeParams.headhaul;
    
    // FBA & Platform Fees
    const totalFBA = salesUnits * safeParams.fbaFee;
    const totalReferral = totalRevenue * (safeParams.referralRate / 100);
    const totalStorage = salesUnits * safeParams.storageFee;

    // 3. Returns Logic (Loss Estimation)
    const returnUnits = salesUnits * (safeParams.returnRate / 100);
    const costPerReturn = safeParams.productCost + safeParams.headhaul + safeParams.fbaFee; 
    const totalReturnLoss = returnUnits * costPerReturn;

    // 4. Totals
    const totalCoGS = totalProductCost + totalHeadhaul; 
    const totalOpEx = totalFBA + totalReferral + totalStorage + totalReturnLoss + marketingBudgetUSD;
    const totalAllCosts = totalCoGS + totalOpEx;

    const netProfit = totalRevenue - totalAllCosts;
    const margin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    const roi = totalAllCosts > 0 ? (netProfit / totalAllCosts) * 100 : 0;
    
    // Break-even Units
    const unitCOGS = safeParams.productCost + safeParams.headhaul;
    const unitOpEx = safeParams.fbaFee + (safeParams.retailPrice * safeParams.referralRate/100) + safeParams.storageFee + (costPerReturn * safeParams.returnRate/100);
    const contributionMargin = safeParams.retailPrice - unitCOGS - unitOpEx;
    const breakEvenUnits = contributionMargin > 0 ? marketingBudgetUSD / contributionMargin : 0;

    setResults({
      marketingBudgetUSD,
      trafficClicks,
      salesUnits,
      totalRevenue,
      totalProductCost,
      totalHeadhaul,
      totalFBA,
      totalReferral,
      totalStorage,
      totalReturnLoss,
      totalAllCosts,
      netProfit,
      margin,
      roi,
      breakEvenUnits
    });
  }, [params]);

  // Real-time FBA Fee Estimation inside the popup
  useEffect(() => {
      let l_in = fbaDims.l || 0;
      let w_in = fbaDims.w || 0;
      let h_in = fbaDims.h || 0;
      let weight_lb = fbaDims.weight || 0;

      // Convert from Metric if needed
      if (fbaUnit === 'metric') {
          l_in = (fbaDims.l || 0) / 2.54;
          w_in = (fbaDims.w || 0) / 2.54;
          h_in = (fbaDims.h || 0) / 2.54;
          weight_lb = (fbaDims.weight || 0) * 2.20462;
      }

      // 1. Calculate FBA Fee (Simplified 2024 Amazon US Logic)
      let fee = 0;
      const isSmall = l_in <= 15 && w_in <= 12 && h_in <= 0.75 && weight_lb <= 1;
      
      if (isSmall) {
          fee = 3.22;
      } else {
          if (weight_lb <= 1) fee = 3.86;
          else if (weight_lb <= 2) fee = 5.40;
          else fee = 5.40 + (Math.ceil(Math.max(0, weight_lb - 2)) * 0.35); 
      }
      
      // 2. Calculate Storage Fee
      const volumeCuFt = (l_in * w_in * h_in) / 1728;
      const storage = volumeCuFt * 0.87; 

      setCalcResult({
          fee: parseFloat(fee.toFixed(2)) || 0,
          storage: parseFloat(storage.toFixed(2)) || 0
      });

  }, [fbaDims, fbaUnit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    setParams(prev => ({
      ...prev,
      [name]: isNaN(numValue) ? 0 : numValue
    }));
  };

  const applyFBA = () => {
      setParams(prev => ({
          ...prev,
          fbaFee: calcResult.fee,
          storageFee: calcResult.storage
      }));
      setShowFBACalc(false);
  };

  // Safe Formatters
  const formatUSD = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val || 0);
  const formatNum = (val: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val || 0);

  return (
    <section className={`premium-card p-6 md:p-8 rounded-3xl border transition-all duration-300 ${skuMode === 'small' ? (isEditMode ? 'border-blue-400 ring-2 ring-blue-100 bg-white' : 'border-slate-200 bg-white') : (isEditMode ? 'border-purple-400 ring-2 ring-purple-100 bg-slate-50' : 'border-slate-300 bg-slate-50')}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-slate-200 gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
             <span className={`p-2 rounded-lg text-white ${skuMode === 'small' ? 'bg-blue-600' : 'bg-purple-600'}`}><Calculator size={20}/></span>
             单品销售利润测算模型 (v6.0)
           </h2>
           <p className="text-slate-500 mt-2 ml-11">Unit Economics Calculation (SKU Level)</p>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button 
                    onClick={() => handleModeSwitch('small')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${skuMode === 'small' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Package size={16} /> 小盒 (Small)
                </button>
                <button 
                    onClick={() => handleModeSwitch('large')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${skuMode === 'large' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Layers size={16} /> 大盒 (Large)
                </button>
            </div>
            
            <button 
                onClick={() => setParams(skuMode === 'small' ? smallDefaults : largeDefaults)}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg transition-colors"
                title="Reset to Defaults"
            >
                <RefreshCw size={18} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
        
        {/* Left: Inputs */}
        <div className="xl:col-span-5 space-y-6">
            
            {/* 1. Unit Economics */}
            <div className={`p-5 rounded-2xl border ${skuMode === 'small' ? 'bg-blue-50/50 border-blue-100' : 'bg-purple-50/50 border-purple-100'}`}>
                <h3 className={`font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wide ${skuMode === 'small' ? 'text-blue-800' : 'text-purple-800'}`}>
                    <Package size={16}/> {skuMode === 'small' ? '小盒成本结构 (Small Box)' : '大盒成本结构 (Large Box)'}
                </h3>
                
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 block mb-1">售价 (Retail Price)</label>
                            <div className="relative">
                                <span className="absolute left-2 top-2 text-slate-400 font-bold">$</span>
                                <input type="number" name="retailPrice" value={params.retailPrice} onChange={handleChange} className="w-full pl-6 p-2 rounded border border-slate-300 focus:border-blue-500 outline-none font-mono text-slate-800 font-bold" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 block mb-1">采购成本 (EXW)</label>
                            <div className="relative">
                                <span className="absolute left-2 top-2 text-slate-400 font-bold">$</span>
                                <input type="number" name="productCost" value={params.productCost} onChange={handleChange} className="w-full pl-6 p-2 rounded border border-slate-300 focus:border-blue-500 outline-none font-mono text-slate-800" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 block mb-1">头程物流 (Freight)</label>
                            <div className="relative">
                                <span className="absolute left-2 top-2 text-slate-400 font-bold">$</span>
                                <input type="number" name="headhaul" value={params.headhaul} onChange={handleChange} className="w-full pl-6 p-2 rounded border border-slate-300 focus:border-blue-500 outline-none font-mono text-slate-800" />
                            </div>
                        </div>
                         <div>
                            <label className="text-xs font-bold text-slate-500 block mb-1">平台佣金 (Referral %)</label>
                            <div className="relative">
                                <input type="number" name="referralRate" value={params.referralRate} onChange={handleChange} className="w-full p-2 pr-6 rounded border border-slate-300 focus:border-blue-500 outline-none font-mono text-slate-800" />
                                <span className="absolute right-2 top-2 text-slate-400 font-bold">%</span>
                            </div>
                        </div>
                    </div>

                    {/* FBA Section with Calculator Trigger */}
                    <div className="grid grid-cols-2 gap-4 relative">
                        <div className="col-span-1">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs font-bold text-slate-500">FBA配送费</label>
                                <button onClick={() => setShowFBACalc(!showFBACalc)} className="flex items-center gap-1 text-[10px] text-blue-600 font-bold hover:bg-blue-50 px-1 rounded transition-colors">
                                    <Settings size={10} /> 计算器
                                </button>
                            </div>
                            <div className="relative">
                                <span className="absolute left-2 top-2 text-slate-400 font-bold">$</span>
                                <input type="number" name="fbaFee" value={params.fbaFee} onChange={handleChange} className="w-full pl-6 p-2 rounded border border-slate-300 focus:border-blue-500 outline-none font-mono text-slate-800 bg-white" />
                            </div>
                            
                            {/* FBA Calculator Popover */}
                            <AnimatePresence>
                            {showFBACalc && (
                                <motion.div 
                                    initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.95}}
                                    className="absolute top-full left-0 mt-2 bg-white shadow-2xl rounded-xl border border-blue-100 p-5 z-20 w-80 ring-1 ring-black/5"
                                >
                                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                                        <h4 className="font-bold text-xs text-slate-700 flex items-center gap-1">
                                            <Scale size={12}/> FBA 费用估算
                                        </h4>
                                        <div className="flex bg-slate-100 rounded-lg p-0.5">
                                            <button 
                                                onClick={()=>setFbaUnit('metric')}
                                                className={`px-2 py-0.5 text-[10px] rounded-md font-bold transition-all ${fbaUnit === 'metric' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                                            >cm/kg</button>
                                            <button 
                                                onClick={()=>setFbaUnit('imperial')}
                                                className={`px-2 py-0.5 text-[10px] rounded-md font-bold transition-all ${fbaUnit === 'imperial' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                                            >in/lb</button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                        <div>
                                            <label className="text-[9px] font-bold text-slate-400 block mb-1">长 ({fbaUnit === 'metric' ? 'cm' : 'in'})</label>
                                            <input className="border p-1.5 text-xs rounded w-full font-mono bg-slate-50 outline-none focus:border-blue-400" type="number" value={fbaDims.l} onChange={e=>setFbaDims({...fbaDims, l: parseFloat(e.target.value) || 0})} />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-bold text-slate-400 block mb-1">宽 ({fbaUnit === 'metric' ? 'cm' : 'in'})</label>
                                            <input className="border p-1.5 text-xs rounded w-full font-mono bg-slate-50 outline-none focus:border-blue-400" type="number" value={fbaDims.w} onChange={e=>setFbaDims({...fbaDims, w: parseFloat(e.target.value) || 0})} />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-bold text-slate-400 block mb-1">高 ({fbaUnit === 'metric' ? 'cm' : 'in'})</label>
                                            <input className="border p-1.5 text-xs rounded w-full font-mono bg-slate-50 outline-none focus:border-blue-400" type="number" value={fbaDims.h} onChange={e=>setFbaDims({...fbaDims, h: parseFloat(e.target.value) || 0})} />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-[9px] font-bold text-slate-400 block mb-1">单品重量 ({fbaUnit === 'metric' ? 'kg' : 'lb'})</label>
                                        <input className="border p-1.5 text-xs rounded w-full font-mono bg-slate-50 outline-none focus:border-blue-400" type="number" value={fbaDims.weight} onChange={e=>setFbaDims({...fbaDims, weight: parseFloat(e.target.value) || 0})} />
                                    </div>
                                    
                                    <div className="bg-slate-50 rounded-lg p-3 mb-4 space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">预估配送费:</span>
                                            <span className="font-bold text-slate-800 font-mono">${(calcResult.fee || 0).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">预估月仓储:</span>
                                            <span className="font-bold text-slate-800 font-mono">${(calcResult.storage || 0).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button onClick={applyFBA} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded-lg font-bold shadow-blue-200 shadow-lg transition-all">
                                        应用结果 (Apply)
                                    </button>
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </div>
                        
                         <div className="col-span-1">
                            <label className="text-xs font-bold text-slate-500 block mb-1">月仓储费 (Storage)</label>
                            <div className="relative">
                                <span className="absolute left-2 top-2 text-slate-400 font-bold">$</span>
                                <input type="number" name="storageFee" value={params.storageFee} onChange={handleChange} className="w-full pl-6 p-2 rounded border border-slate-300 focus:border-blue-500 outline-none font-mono text-slate-800 bg-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Marketing & Operations */}
            <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
                <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <TrendingUp size={16}/> 营销与运营变量
                </h3>
                <div className="space-y-4">
                     <div>
                        <label className="text-xs font-bold text-orange-700 block mb-1">营销总预算 (人民币 CNY)</label>
                        <div className="relative">
                            <span className="absolute left-2 top-2 text-orange-400 font-bold">¥</span>
                            <input type="number" name="marketingBudgetCNY" value={params.marketingBudgetCNY} onChange={handleChange} className="w-full pl-6 p-2 rounded border border-orange-200 focus:border-orange-500 outline-none font-mono text-slate-800 bg-white" />
                        </div>
                        <div className="flex justify-between mt-1 text-[10px] text-orange-600 opacity-80">
                            <span>当前汇率: {params.exchangeRate}</span>
                            <span>≈ {formatUSD(results.marketingBudgetUSD)}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                         <div>
                            <label className="text-xs font-bold text-orange-700 block mb-1">CPC ($)</label>
                            <input type="number" step="0.1" name="cpc" value={params.cpc} onChange={handleChange} className="w-full p-2 rounded border border-orange-200 focus:border-orange-500 outline-none font-mono text-slate-800 bg-white" />
                         </div>
                         <div>
                            <label className="text-xs font-bold text-orange-700 block mb-1">转化率 CVR (%)</label>
                            <input type="number" step="0.5" name="cvr" value={params.cvr} onChange={handleChange} className="w-full p-2 rounded border border-orange-200 focus:border-orange-500 outline-none font-mono text-slate-800 bg-white" />
                         </div>
                         <div>
                            <label className="text-xs font-bold text-orange-700 block mb-1">退货率 (%)</label>
                            <input type="number" step="0.5" name="returnRate" value={params.returnRate} onChange={handleChange} className="w-full p-2 rounded border border-orange-200 focus:border-orange-500 outline-none font-mono text-slate-800 bg-white" />
                         </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right: Results Waterfall */}
        <div className="xl:col-span-7 flex flex-col h-full">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">销售量 (Sales)</div>
                    <div className="text-xl font-bold text-slate-800 font-mono mt-1">{formatNum(results.salesUnits)}</div>
                    <div className="text-[10px] text-slate-400">Units</div>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">总营收 (Revenue)</div>
                    <div className="text-xl font-bold text-blue-600 font-mono mt-1">{formatUSD(results.totalRevenue)}</div>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">总支出 (Spend)</div>
                    <div className="text-xl font-bold text-red-600 font-mono mt-1">{formatUSD(results.totalAllCosts)}</div>
                </div>
                <div className={`p-4 rounded-xl border shadow-sm ${results.netProfit >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="text-[10px] font-bold opacity-60 uppercase">净利润 (Net Profit)</div>
                    <div className={`text-xl font-bold font-mono mt-1 ${results.netProfit >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>{formatUSD(results.netProfit)}</div>
                </div>
            </div>

            {/* Visual Waterfall */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex-grow">
                <h4 className="font-bold text-slate-700 text-sm mb-6 flex justify-between">
                    <span>利润瀑布流 (Profit Waterfall) - {skuMode === 'small' ? '小盒' : '大盒'}</span>
                    <span className="text-slate-400 text-xs font-normal">ROI: {(results.roi || 0).toFixed(1)}% | 利润率: {(results.margin || 0).toFixed(1)}% | 盈亏平衡: {formatNum(results.breakEvenUnits)} 件</span>
                </h4>

                <div className="space-y-3 text-xs font-medium">
                    {/* Revenue */}
                    <div className="flex items-center h-8 relative">
                        <div className="w-24 text-slate-500">总营收</div>
                        <div className="flex-grow bg-slate-200 rounded h-6 relative overflow-hidden">
                            <div className="absolute left-0 top-0 h-full bg-blue-500 w-full" />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white font-bold">{formatUSD(results.totalRevenue)}</span>
                        </div>
                    </div>

                    {/* COGS */}
                    <div className="flex items-center h-6 relative">
                        <div className="w-24 text-slate-500 pl-2 border-l-2 border-slate-300">产品成本</div>
                        <div className="flex-grow bg-slate-200 rounded h-5 relative overflow-hidden w-[90%]">
                            <div className="absolute left-0 top-0 h-full bg-slate-400" style={{width: `${Math.min(100, (results.totalProductCost / (results.totalRevenue || 1))*100)}%`}} />
                        </div>
                        <div className="w-20 text-right text-slate-600">-{formatUSD(results.totalProductCost)}</div>
                    </div>

                     {/* Logistics */}
                    <div className="flex items-center h-6 relative">
                        <div className="w-24 text-slate-500 pl-2 border-l-2 border-slate-300">物流/运费</div>
                        <div className="flex-grow bg-slate-200 rounded h-5 relative overflow-hidden w-[90%]">
                            <div className="absolute left-0 top-0 h-full bg-slate-400" style={{width: `${Math.min(100, (results.totalHeadhaul / (results.totalRevenue || 1))*100)}%`}} />
                        </div>
                        <div className="w-20 text-right text-slate-600">-{formatUSD(results.totalHeadhaul)}</div>
                    </div>

                    {/* FBA & Platform */}
                    <div className="flex items-center h-6 relative">
                        <div className="w-24 text-slate-500 pl-2 border-l-2 border-slate-300">平台/FBA</div>
                        <div className="flex-grow bg-slate-200 rounded h-5 relative overflow-hidden w-[90%]">
                            <div className="absolute left-0 top-0 h-full bg-orange-300" style={{width: `${Math.min(100, ((results.totalFBA + results.totalReferral + results.totalStorage) / (results.totalRevenue || 1))*100)}%`}} />
                        </div>
                        <div className="w-20 text-right text-slate-600">-{formatUSD(results.totalFBA + results.totalReferral + results.totalStorage)}</div>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-center h-6 relative">
                        <div className="w-24 text-slate-500 pl-2 border-l-2 border-slate-300">营销费用</div>
                        <div className="flex-grow bg-slate-200 rounded h-5 relative overflow-hidden w-[90%]">
                            <div className="absolute left-0 top-0 h-full bg-red-400" style={{width: `${Math.min(100, (results.marketingBudgetUSD / (results.totalRevenue || 1))*100)}%`}} />
                        </div>
                        <div className="w-20 text-right text-slate-600">-{formatUSD(results.marketingBudgetUSD)}</div>
                    </div>
                     
                     {/* Returns */}
                    <div className="flex items-center h-6 relative">
                        <div className="w-24 text-slate-500 pl-2 border-l-2 border-slate-300">退货损耗</div>
                        <div className="flex-grow bg-slate-200 rounded h-5 relative overflow-hidden w-[90%]">
                            <div className="absolute left-0 top-0 h-full bg-red-300" style={{width: `${Math.min(100, (results.totalReturnLoss / (results.totalRevenue || 1))*100)}%`}} />
                        </div>
                        <div className="w-20 text-right text-slate-600">-{formatUSD(results.totalReturnLoss)}</div>
                    </div>

                    {/* Profit */}
                    <div className="flex items-center h-8 relative mt-2 pt-2 border-t border-slate-200">
                        <div className="w-24 font-bold text-slate-700">净利润</div>
                        <div className="flex-grow bg-slate-200 rounded h-6 relative overflow-hidden">
                             <div 
                                className={`absolute left-0 top-0 h-full ${results.netProfit >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                                style={{width: `${Math.min(100, (Math.abs(results.netProfit) / (results.totalRevenue || 1))*100)}%`}} 
                             />
                        </div>
                        <div className={`w-20 text-right font-bold ${results.netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{formatUSD(results.netProfit)}</div>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* Conclusion Section */}
      <div className={`p-4 rounded-xl border flex gap-3 ${skuMode === 'small' ? 'bg-slate-100 border-slate-200' : 'bg-purple-50 border-purple-200'}`}>
          <div className="shrink-0 pt-1 text-slate-500"><FileText size={20}/></div>
          <div className="flex-grow">
              <h4 className="text-sm font-bold text-slate-800 mb-1">财务模型结论</h4>
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

export default ProjectProjection;
