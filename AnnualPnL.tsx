import React, { useState } from 'react';
import { 
  DollarSign, 
  Activity, 
  RefreshCw, 
  CreditCard, 
  PieChart,
  Wallet,
  TrendingDown,
  Calculator,
  ClipboardList,
  ShieldCheck,
  Split,
  Info,
  Package,
  AlertTriangle,
  Settings,
  Truck,
  ShoppingBag,
  Percent
} from 'lucide-react';

// --- UI Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "blue" }) => {
  const colorMap = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    orange: "bg-orange-100 text-orange-800",
    purple: "bg-purple-100 text-purple-800",
    gray: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${colorMap[color] || colorMap.blue}`}>
      {children}
    </span>
  );
};

const StatCard = ({ title, value, subtext, icon: Icon, trend, alert }) => (
  <Card className={`p-6 flex items-start justify-between ${alert ? 'border-red-300 bg-red-50' : ''}`}>
    <div>
      <p className={`text-sm font-medium mb-1 ${alert ? 'text-red-600' : 'text-slate-500'}`}>{title}</p>
      <h3 className={`text-2xl font-bold ${alert ? 'text-red-700' : 'text-slate-900'}`}>{value}</h3>
      {subtext && <p className={`text-xs mt-2 font-medium ${alert ? 'text-red-500' : (trend === 'up' ? 'text-green-600' : 'text-slate-400')}`}>{subtext}</p>}
    </div>
    <div className={`p-3 rounded-lg ${alert ? 'bg-red-100 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
      <Icon className="w-6 h-6" />
    </div>
  </Card>
);

// --- Modules ---

// 1. 成本结构计算器 (Cost Calculator) - NEW
const CostCalculator = ({ costRatios, setCostRatios }) => {
  const [activeTab, setActiveTab] = useState('cogs'); // cogs, logistics, fba

  const tabs = [
    { id: 'cogs', label: '货值成本 (COGS)', icon: ShoppingBag, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'logistics', label: '头程物流', icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'fba', label: 'FBA/佣金', icon: Percent, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const handleSliderChange = (q, val) => {
    setCostRatios(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [q]: Number(val)
      }
    }));
  };

  return (
    <Card className="p-6 border-slate-200 bg-white">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-slate-700" />
        <h3 className="text-lg font-bold text-slate-800">成本结构动态推演 (Cost Structure Simulator)</h3>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-2 mb-6 bg-slate-100 p-1 rounded-lg">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-md transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-slate-800 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? tab.color : ''}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 p-6 rounded-xl ${tabs.find(t=>t.id===activeTab).bg}`}>
        {['q1', 'q2', 'q3', 'q4'].map((q) => (
          <div key={q} className="relative">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-slate-700 uppercase">{q} 占比</label>
              <span className={`text-sm font-bold ${tabs.find(t=>t.id===activeTab).color}`}>
                {costRatios[activeTab][q]}%
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max={activeTab === 'fba' ? 50 : 20} 
              step="0.1" 
              value={costRatios[activeTab][q]} 
              onChange={(e) => handleSliderChange(q, e.target.value)}
              className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            />
            <div className="mt-1 text-[10px] text-slate-500">
              {activeTab === 'cogs' && '出厂价占营收比'}
              {activeTab === 'logistics' && '海运/空运费率'}
              {activeTab === 'fba' && '平台硬性扣点'}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-slate-500 flex gap-2">
        <Info className="w-4 h-4" />
        <p>提示：Q1物流占比可能较高(空运)，Q4货值占比可能较低(规模效应)。拖动滑块模拟降本增效。</p>
      </div>
    </Card>
  );
};

// 2. 资金占用分析 (Inventory Value Held)
const InventoryAnalysis = ({ revenueTargets, inventoryDays, setInventoryDays, costRatios }) => {
  
  const calculateHeldValue = (nextQuarterRevenue, q) => {
    // 货值占用 = 下季度营收 * (COGS占比 + 物流占比) * (周转天数/90)
    // 这里假设资金占用包含货值和头程运费
    const ratio = (costRatios.cogs[q] + costRatios.logistics[q]) / 100;
    return Math.round(nextQuarterRevenue * ratio * (inventoryDays[q] / 90));
  };

  const data = [
    { 
      quarter: "Q1 期末", 
      status: "备战Q2", 
      nextRev: revenueTargets.q2, 
      days: inventoryDays.q1,
      heldValue: calculateHeldValue(revenueTargets.q2, 'q1') 
    },
    { 
      quarter: "Q2 期末", 
      status: "备战Q3", 
      nextRev: revenueTargets.q3, 
      days: inventoryDays.q2,
      heldValue: calculateHeldValue(revenueTargets.q3, 'q2') 
    },
    { 
      quarter: "Q3 期末", 
      status: "备战黑五", 
      nextRev: revenueTargets.q4, 
      days: inventoryDays.q3,
      heldValue: calculateHeldValue(revenueTargets.q4, 'q3'),
      isPeak: true
    },
    { 
      quarter: "Q4 期末", 
      status: "常态周转", 
      nextRev: 1500, 
      days: inventoryDays.q4,
      heldValue: calculateHeldValue(1500, 'q4') 
    },
  ];

  return (
    <Card className="p-0 overflow-hidden mb-8 border-t-4 border-t-orange-500">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-orange-600" />
          <div>
            <h3 className="text-lg font-bold text-slate-800">动态库存资金占用模型</h3>
            <p className="text-xs text-slate-500">基于动态成本占比 & 销量预测</p>
          </div>
        </div>
        <Badge color="orange">动态周转设定</Badge>
      </div>

      <div className="bg-orange-50/30 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-slate-100">
        {Object.keys(inventoryDays).map((q, idx) => (
          <div key={q} className="relative">
            <div className="flex justify-between mb-2">
              <label className="text-xs font-bold text-slate-600 uppercase">{data[idx].quarter} 备货天数</label>
              <span className={`text-xs font-bold ${q === 'q3' ? 'text-red-600' : 'text-blue-600'}`}>
                {inventoryDays[q]} 天
              </span>
            </div>
            <input 
              type="range" min="30" max="90" step="5" 
              value={inventoryDays[q]} 
              onChange={(e) => setInventoryDays({...inventoryDays, [q]: Number(e.target.value)})}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${q === 'q3' ? 'bg-red-200 accent-red-600' : 'bg-slate-200 accent-blue-600'}`}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 divide-x divide-slate-100 bg-white">
        {data.map((item, idx) => (
          <div key={idx} className={`p-6 text-center ${item.isPeak ? 'bg-orange-50' : ''}`}>
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">{item.quarter}</div>
            <div className="text-sm text-slate-600 mb-3">{item.status}</div>
            <div className={`text-2xl font-black ${item.isPeak ? 'text-orange-600' : 'text-slate-800'}`}>
              ¥{item.heldValue}万
            </div>
            <div className="text-[10px] text-slate-400 mt-2">
              (货值+物流占用)
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// 3. 详细季度损益表 (Quarterly P&L)
const QuarterlyProfitLoss = ({ data, costRatios }) => {
  const rows = [
    { id: 'revenue', label: '营收目标 (Revenue)', isBold: true, color: 'text-blue-600' },
    { id: 'cogs', label: '货值成本 (COGS)', sub: '动态占比' },
    { id: 'fba', label: 'FBA/佣金', sub: '动态占比' },
    { id: 'marketing', label: '营销总投入', sub: '站内+站外+基建', color: 'text-orange-600' },
    { id: 'logistics', label: '头程物流', sub: '动态占比' },
    { id: 'hr', label: '人力行政', sub: '固定开支' },
    { id: 'compliance', label: '合规费用', sub: '3万/季' },
    { id: 'reserve', label: '备用金', sub: '5万/季' },
    { id: 'refunds', label: '售后损耗', sub: '3%' },
    { id: 'netProfit', label: '净利润 (Net Profit)', isBold: true, isTotal: true }
  ];

  const quarters = ['prep', 'q1', 'q2', 'q3', 'q4'];

  return (
    <Card className="p-0 overflow-hidden mb-8 border-t-4 border-t-blue-600">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-800">分季度详细损益表 (Quarterly P&L)</h3>
        </div>
        <div className="text-xs text-slate-500">单位：万元</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 bg-slate-100 sticky left-0 z-10 border-r">费用科目</th>
              <th className="px-4 py-3 text-center bg-gray-50 text-slate-600">冷启动</th>
              <th className="px-4 py-3 text-center">Q1</th>
              <th className="px-4 py-3 text-center">Q2</th>
              <th className="px-4 py-3 text-center">Q3</th>
              <th className="px-4 py-3 text-center">Q4</th>
              <th className="px-6 py-3 text-right bg-slate-100 font-bold">全年总计</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className={`hover:bg-slate-50 ${row.isTotal ? 'bg-blue-50/50' : ''}`}>
                <td className="px-4 py-3 bg-white sticky left-0 z-10 border-r">
                  <div className={`font-medium ${row.isBold ? 'text-slate-900' : 'text-slate-600'}`}>{row.label}</div>
                  {row.sub && <div className="text-xs text-slate-400">{row.sub}</div>}
                </td>
                {quarters.map((q) => (
                  <td key={q} className={`px-4 py-3 text-center ${q === 'prep' ? 'bg-gray-50 text-slate-500' : ''} ${row.color || ''} ${row.isTotal ? (data[q][row.id] > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold') : ''}`}>
                    {row.id === 'revenue' ? '' : row.id === 'netProfit' ? '' : '-'}
                    ¥{Math.round(data[q][row.id])}
                  </td>
                ))}
                <td className={`px-6 py-3 text-right font-bold bg-slate-50 ${row.isTotal ? 'text-blue-700' : ''}`}>
                  {row.id === 'revenue' ? '' : row.id === 'netProfit' ? '' : '-'}
                  ¥{Math.round(data.total[row.id])}
                </td>
              </tr>
            ))}
            {/* 净利率行 */}
            <tr className="bg-slate-100 font-bold">
              <td className="px-4 py-3 text-slate-800 bg-white sticky left-0 z-10 border-r">净利率 (Margin)</td>
              {quarters.map((q) => (
                <td key={q} className={`px-4 py-3 text-center ${q === 'prep' ? 'bg-gray-50' : ''} ${data[q].margin >= 20 ? 'text-green-600' : 'text-red-600'}`}>
                  {data[q].margin}%
                </td>
              ))}
              <td className={`px-6 py-3 text-right ${data.total.margin >= 20 ? 'text-green-600' : 'text-red-600'}`}>
                {data.total.margin}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

// 4. 现金流瀑布图 (Cash Flow)
const CashFlowTable = ({ data, initialCapital, marketingDetails, costRatios }) => {
  return (
    <Card className="p-0 overflow-hidden mb-8 border-t-4 border-t-green-500">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-bold text-slate-800">现金流与回款推演 (Cash Flow)</h3>
        </div>
        <div className="flex gap-2">
          <Badge color="green">回款滞后模型</Badge>
          <Badge color="red">现金投放分离</Badge>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 bg-slate-100/50 sticky left-0 z-10 border-r">阶段</th>
              <th className="px-4 py-3 text-blue-600 font-bold">营收目标</th>
              <th className="px-4 py-3 text-gray-400 text-xs text-right border-r bg-slate-50/50">
                PPC广告<br/>(余额抵扣)
              </th>
              <th className="px-4 py-3 text-green-600 font-bold bg-green-50/30 border-r">
                实际回款<br/>
                <span className="text-[10px] font-normal text-green-800 opacity-80">
                  (Inflow)
                </span>
              </th>
              <th className="px-4 py-3 text-slate-600">固定开支<br/>(人力/备用)</th>
              <th className="px-4 py-3 text-red-500">供应链支出<br/>(货值/物流)</th>
              <th className="px-4 py-3 text-orange-500 bg-orange-50/20 font-bold border-r border-orange-100">站外营销<br/>(现金投放)</th>
              <th className="px-4 py-3 font-bold border-l">净现金流</th>
              <th className="px-4 py-3 font-black text-slate-800 bg-slate-50 sticky right-0 z-10">账户余额</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-4 font-medium bg-white sticky left-0 z-10 border-r">{row.quarter}</td>
                <td className="px-4 py-4 text-blue-600 font-bold">¥{row.revenueTarget}</td>
                <td className="px-4 py-4 text-gray-400 text-xs text-right border-r bg-slate-50/50">-¥{marketingDetails[idx]?.ppc || 0}</td>
                <td className="px-4 py-4 text-green-700 font-bold bg-green-50/30 border-r">¥{Math.round(row.inflow)}</td>
                <td className="px-4 py-4 text-slate-600">-¥{row.fixed_cost}</td>
                <td className="px-4 py-4 text-red-500">-¥{Math.round(row.supply_chain)}</td>
                <td className="px-4 py-4 text-orange-600 font-bold bg-orange-50/20 border-r border-orange-100">-¥{row.marketing_cash}</td>
                <td className={`px-4 py-4 font-bold border-l ${row.net_cash >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {row.net_cash >= 0 ? '+' : ''}¥{Math.round(row.net_cash)}
                </td>
                <td className={`px-4 py-4 font-black sticky right-0 z-10 ${row.cashPosition < 50 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-900'}`}>
                  ¥{Math.round(row.cashPosition)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 border-t border-slate-100">
        <div className="flex gap-2 items-start text-xs text-slate-600">
          <Info className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
          <p>
            <strong>实际回款公式：</strong> <br/>
            营收 - (动态FBA% + 动态佣金%) - 站内PPC广告 - 回款滞后。<br/>
            * 您的动态FBA/物流设置已应用到回款计算中。
          </p>
        </div>
        <div className="flex gap-2 items-start text-xs text-orange-800 bg-orange-50 p-2 rounded">
          <Split className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            <strong>营销费用：</strong><br/>
            现金流出的部分(站外+基建)在"站外营销"列，余额抵扣部分(PPC)在"PPC广告"列。
          </p>
        </div>
      </div>
    </Card>
  );
};

// 5. 核心指标概览
const OverviewMetrics = ({ initialCapital, totalRevenue, totalProfit, profitMargin, turnoverRate, minCash }) => (
  <div className="grid md:grid-cols-4 gap-4 mb-8">
    <StatCard 
      title="建议启动资金" 
      value={`¥${initialCapital}万`} 
      subtext="覆盖谷底与备货峰值" 
      icon={Wallet} 
      trend="up"
    />
    <StatCard 
      title="年度营收目标" 
      value={`¥${totalRevenue}万`} 
      subtext="目标达成率 100%" 
      icon={DollarSign} 
      trend="up"
    />
    <StatCard 
      title="资金周转次数" 
      value={`${turnoverRate} 次`} 
      subtext="30+15 极速流转" 
      icon={RefreshCw} 
      trend="up"
    />
    <StatCard 
      title="资金使用效率" 
      value="2000%" 
      subtext="以小博大高杠杆" 
      icon={Activity} 
      trend="up"
    />
  </div>
);

// --- Main Application ---

const AnnualCashFlowModel = () => {
  // --- State Configuration ---
  const [initialCapital, setInitialCapital] = useState(250); 
  const [inventoryDays, setInventoryDays] = useState({ q1: 45, q2: 45, q3: 60, q4: 45 });
  const [marketingRatios, setMarketingRatios] = useState({ q1: 80, q2: 60, q3: 40, q4: 25 });
  
  // NEW: Cost Ratios State
  const [costRatios, setCostRatios] = useState({
    cogs: { q1: 7.2, q2: 7.2, q3: 7.2, q4: 7.2 }, // 货值成本
    logistics: { q1: 2.0, q2: 2.0, q3: 2.0, q4: 2.0 }, // 头程物流
    fba: { q1: 30, q2: 30, q3: 30, q4: 30 } // FBA/佣金
  });

  // --- Constants ---
  const revenueTargets = { prep: 0, q1: 150, q2: 500, q3: 1250, q4: 3100 };
  const totalRevenue = 5000;
  
  // 固定支出配置 (每季度)
  const hrCosts = { prep: 30, q1: 20, q2: 30, q3: 35, q4: 35 }; 
  const compliance = { prep: 0, q1: 3, q2: 3, q3: 3, q4: 3 }; 
  const reserve = { prep: 0, q1: 5, q2: 5, q3: 5, q4: 5 }; 
  
  // --- Calculations ---

  // 1. Marketing Spend
  const marketingSpend = {
    prep: 10, 
    q1: Math.round(revenueTargets.q1 * (marketingRatios.q1 / 100)),
    q2: Math.round(revenueTargets.q2 * (marketingRatios.q2 / 100)),
    q3: Math.round(revenueTargets.q3 * (marketingRatios.q3 / 100)),
    q4: Math.round(revenueTargets.q4 * (marketingRatios.q4 / 100)),
  };

  // 2. P&L Data Generation (Dynamic Costs)
  const calculateQuarterPnL = (q) => {
    const rev = revenueTargets[q];
    
    if (q === 'prep') {
      const profit = 0 - hrCosts.prep - marketingSpend.prep;
      return { 
        revenue: 0, cogs: 0, fba: 0, marketing: marketingSpend.prep, logistics: 0, 
        hr: hrCosts.prep, compliance: 0, reserve: 0, refunds: 0, 
        netProfit: profit, margin: 0 
      };
    }

    const mkt = marketingSpend[q];
    // Dynamic Calculation here:
    const fba = Math.round(rev * (costRatios.fba[q] / 100));
    const cogs = Math.round(rev * (costRatios.cogs[q] / 100));
    const logistics = Math.round(rev * (costRatios.logistics[q] / 100));
    
    const refunds = Math.round(rev * 0.03);
    const fixed = hrCosts[q] + compliance[q] + reserve[q];
    
    const profit = rev - mkt - fba - refunds - fixed - cogs - logistics;
    const margin = ((profit / rev) * 100).toFixed(1);
    
    return { 
      revenue: rev, cogs, fba, marketing: mkt, logistics, 
      hr: hrCosts[q], compliance: compliance[q], reserve: reserve[q], refunds, 
      netProfit: profit, margin 
    };
  };

  const pnlData = {
    prep: calculateQuarterPnL('prep'),
    q1: calculateQuarterPnL('q1'),
    q2: calculateQuarterPnL('q2'),
    q3: calculateQuarterPnL('q3'),
    q4: calculateQuarterPnL('q4'),
  };

  // Total P&L
  pnlData.total = Object.keys(pnlData).reduce((acc, q) => {
    Object.keys(pnlData[q]).forEach(key => {
      if (key !== 'margin') acc[key] = (acc[key] || 0) + pnlData[q][key];
    });
    return acc;
  }, {});
  pnlData.total.margin = ((pnlData.total.netProfit / pnlData.total.revenue) * 100).toFixed(1);

  // 3. Cash Flow Generation
  const marketingCashOut = {
    q1: Math.round(marketingSpend.q1 * 0.5), 
    q2: Math.round(marketingSpend.q2 * 0.5),
    q3: Math.round(marketingSpend.q3 * 0.4),
    q4: Math.round(marketingSpend.q4 * 0.3),
  };

  const marketingDetails = [
    { ppc: 0 }, // Prep
    { ppc: marketingSpend.q1 - marketingCashOut.q1 },
    { ppc: marketingSpend.q2 - marketingCashOut.q2 },
    { ppc: marketingSpend.q3 - marketingCashOut.q3 },
    { ppc: marketingSpend.q4 - marketingCashOut.q4 },
  ];

  // Cash Flow Logistics & COGS (Approximate cash flow based on P&L cost but applied as cash out)
  // 修正逻辑：现金流中的供应链支出 = 动态计算的COGS + 动态计算的Logistics
  // 注意：现金流通常滞后或提前，这里为简化模型，假设现金流支出金额 ≈ P&L成本金额(虽然时间点不同，但总量一致)
  const supplyChainCash = { 
    q1: pnlData.q1.cogs + pnlData.q1.logistics + 5, // +5 buffer for Q1 samples
    q2: pnlData.q2.cogs + pnlData.q2.logistics,
    q3: pnlData.q3.cogs + pnlData.q3.logistics + 50, // +50 buffer for Q4 prep
    q4: pnlData.q4.cogs + pnlData.q4.logistics
  }; 
  const prepCash = { 
    hr: hrCosts.prep, 
    cogs: 7, 
    marketing: 10, 
    logistics: 3, 
    compliance: 0, 
    reserve: 0 
  }; 

  const calculateInflow = (rev, mktTotal, mktCash, fbaCost, prevReserve = 0, ratio) => {
    const ppc = mktTotal - mktCash; 
    // 使用动态计算的 FBA Cost
    const theoretical = rev - fbaCost - ppc;
    const actual = theoretical * ratio + prevReserve;
    const nextReserve = theoretical * (1 - ratio);
    return { actual, nextReserve };
  };

  const q1Cf = calculateInflow(revenueTargets.q1, marketingSpend.q1, marketingCashOut.q1, pnlData.q1.fba, 0, 0.6);
  const q2Cf = calculateInflow(revenueTargets.q2, marketingSpend.q2, marketingCashOut.q2, pnlData.q2.fba, q1Cf.nextReserve, 0.8);
  const q3Cf = calculateInflow(revenueTargets.q3, marketingSpend.q3, marketingCashOut.q3, pnlData.q3.fba, q2Cf.nextReserve, 0.9);
  const q4Cf = calculateInflow(revenueTargets.q4, marketingSpend.q4, marketingCashOut.q4, pnlData.q4.fba, q3Cf.nextReserve, 0.85);

  const prepOutTotal = prepCash.hr + prepCash.cogs + prepCash.marketing + prepCash.logistics;
  
  const cfRows = [
    {
      quarter: "预备期 (11-12月)",
      revenueTarget: 0, inflow: 0,
      fixed_cost: prepCash.hr, 
      supply_chain: prepCash.cogs + prepCash.logistics,
      marketing_cash: prepCash.marketing,
      net_cash: -prepOutTotal,
      cashPosition: initialCapital - prepOutTotal
    },
    {
      quarter: "Q1 启动 (营销80%)",
      revenueTarget: 150, inflow: q1Cf.actual,
      fixed_cost: hrCosts.q1 + compliance.q1 + reserve.q1,
      supply_chain: supplyChainCash.q1,
      marketing_cash: marketingCashOut.q1,
      net_cash: q1Cf.actual - (hrCosts.q1 + compliance.q1 + reserve.q1 + supplyChainCash.q1 + marketingCashOut.q1),
      get cashPosition() { return this.net_cash + (initialCapital - prepOutTotal) }
    },
    {
      quarter: "Q2 爬坡 (营销60%)",
      revenueTarget: 500, inflow: q2Cf.actual,
      fixed_cost: hrCosts.q2 + compliance.q2 + reserve.q2,
      supply_chain: supplyChainCash.q2,
      marketing_cash: marketingCashOut.q2,
      net_cash: q2Cf.actual - (hrCosts.q2 + compliance.q2 + reserve.q2 + supplyChainCash.q2 + marketingCashOut.q2),
      get cashPosition() { return this.net_cash + this.prevCashPos }, // handled in loop below
      prevCashPos: 0
    }
  ];
  
  // Re-calcing balances
  let runningBalance = initialCapital - prepOutTotal;
  const cashFlowData = [
    { ...cfRows[0], cashPosition: runningBalance },
  ];

  // Q1
  const q1Net = Math.round(q1Cf.actual - (hrCosts.q1 + compliance.q1 + reserve.q1 + supplyChainCash.q1 + marketingCashOut.q1));
  runningBalance += q1Net;
  cashFlowData.push({ ...cfRows[1], net_cash: q1Net, cashPosition: runningBalance });

  // Q2
  const q2Net = Math.round(q2Cf.actual - (hrCosts.q2 + compliance.q2 + reserve.q2 + supplyChainCash.q2 + marketingCashOut.q2));
  runningBalance += q2Net;
  cashFlowData.push({ 
    quarter: `Q2 爬坡 (营销${marketingRatios.q2}%)`, 
    revenueTarget: 500, inflow: q2Cf.actual,
    fixed_cost: hrCosts.q2 + compliance.q2 + reserve.q2, 
    supply_chain: supplyChainCash.q2, 
    marketing_cash: marketingCashOut.q2,
    net_cash: q2Net, cashPosition: runningBalance 
  });

  // Q3
  const q3Net = Math.round(q3Cf.actual - (hrCosts.q3 + compliance.q3 + reserve.q3 + supplyChainCash.q3 + marketingCashOut.q3));
  runningBalance += q3Net;
  cashFlowData.push({
    quarter: `Q3 爆发 (营销${marketingRatios.q3}%)`, 
    revenueTarget: 1250, inflow: q3Cf.actual,
    fixed_cost: hrCosts.q3 + compliance.q3 + reserve.q3, 
    supply_chain: supplyChainCash.q3, 
    marketing_cash: marketingCashOut.q3,
    net_cash: q3Net, cashPosition: runningBalance
  });

  // Q4
  const q4Net = Math.round(q4Cf.actual - (hrCosts.q4 + compliance.q4 + reserve.q4 + supplyChainCash.q4 + marketingCashOut.q4));
  runningBalance += q4Net;
  cashFlowData.push({
    quarter: `Q4 收割 (营销${marketingRatios.q4}%)`, 
    revenueTarget: 3100, inflow: q4Cf.actual,
    fixed_cost: hrCosts.q4 + compliance.q4 + reserve.q4, 
    supply_chain: supplyChainCash.q4, 
    marketing_cash: marketingCashOut.q4,
    net_cash: q4Net, cashPosition: runningBalance
  });

  const turnoverRate = (totalRevenue / initialCapital).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Project Dual-Core 动态财务驾驶舱 (终极版)</h1>
            <p className="text-slate-500 mt-2">集成P&L、现金流、周转率与动态计算器</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm mt-4 md:mt-0">
            <span className="text-xs font-bold text-slate-400 uppercase">启动资金设定</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-blue-600">¥{initialCapital}万</span>
              <input 
                type="range" min="100" max="500" step="10" 
                value={initialCapital} 
                onChange={(e) => setInitialCapital(Number(e.target.value))}
                className="w-24 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 1. 核心指标 */}
        <OverviewMetrics 
          initialCapital={initialCapital} 
          totalRevenue={totalRevenue} 
          totalProfit={pnlData.total.netProfit}
          profitMargin={pnlData.total.margin}
          turnoverRate={turnoverRate}
          minCash={Math.min(...cashFlowData.map(d => d.cashPosition))}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* 2. 营销配比计算器 */}
          <Card className="p-6 border-blue-200 bg-blue-50/50">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-800">营销配比计算器 (Marketing Mix)</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {Object.keys(marketingRatios).map((q) => (
                <div key={q} className="relative">
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">{q}</label>
                    <span className="text-xs font-bold text-blue-600">{marketingRatios[q]}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="100" step="1" 
                    value={marketingRatios[q]} 
                    onChange={(e) => setMarketingRatios({...marketingRatios, [q]: Number(e.target.value)})}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* 3. 成本结构计算器 (New) */}
          <CostCalculator costRatios={costRatios} setCostRatios={setCostRatios} />
        </div>

        {/* 4. 详细损益表 */}
        <QuarterlyProfitLoss data={pnlData} costRatios={costRatios} />

        {/* 5. 库存资金占用分析 */}
        <InventoryAnalysis revenueTargets={revenueTargets} inventoryDays={inventoryDays} setInventoryDays={setInventoryDays} costRatios={costRatios} />

        {/* 6. 现金流表 */}
        <CashFlowTable data={cashFlowData} initialCapital={initialCapital} marketingDetails={marketingDetails} costRatios={costRatios} />

      </div>
    </div>
  );
};

export default AnnualCashFlowModel;
