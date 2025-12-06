
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, BarChart3, FileText } from 'lucide-react';

interface AnnualPnLProps {
  isEditMode?: boolean;
}

const AnnualPnL: React.FC<AnnualPnLProps> = ({ isEditMode = false }) => {
    // Financial Data Structure with Launch Phase (Nov-Dec)
    // Recalculated for ~26.2% Net Margin Target
    
    const [conclusion, setConclusion] = useState("全年损益分析：计入 Nov-Dec 冷启动期的 ¥30万 投入及全年合规/备用金后，首年净利润仍可达 ¥1310万 (26.2%)。Q1 虽有 ¥45万 的战略性亏损（含冷启动则为 ¥75万），但 Q2 即实现盈亏平衡，Q4 单季利润突破千万，验证了“高举高打”策略的可行性。");

    const [data, setData] = useState([
        { id: 'revenue', label: '总营收 (GMV)', launch: 0, q1: 1500000, q2: 5000000, q3: 12500000, q4: 31000000, type: 'header', format: 'currency' },
        { id: 'returns', label: '退货与折扣 (3%)', launch: 0, q1: -45000, q2: -150000, q3: -375000, q4: -930000, type: 'expense', format: 'currency' },
        { id: 'net_rev', label: '净营收', launch: 0, q1: 1455000, q2: 4850000, q3: 12125000, q4: 30070000, type: 'subtotal', format: 'currency' },
        
        { id: 'cogs', label: '销售成本 (货值+物流)', launch: 0, q1: -64500, q2: -245000, q3: -687500, q4: -1891000, type: 'expense', format: 'currency' },
        
        { id: 'gross_profit', label: '毛利润', launch: 0, q1: 1390500, q2: 4605000, q3: 11437500, q4: 28179000, type: 'subtotal', format: 'currency' },
        { id: 'gross_margin', label: '毛利率 %', launch: 0, q1: 92.7, q2: 92.1, q3: 91.5, q4: 90.9, type: 'metric', format: 'percent' },
        
        { id: 'platform', label: '平台费用 (FBA+佣金 25%)', launch: 0, q1: -375000, q2: -1250000, q3: -3125000, q4: -7750000, type: 'expense', format: 'currency' },
        { id: 'marketing', label: '营销推广费', launch: 0, q1: -1200000, q2: -3000000, q3: -5000000, q4: -9300000, type: 'expense', format: 'currency' },
        { id: 'opex', label: '运营支出 (人力+固定)', launch: -300000, q1: -188217, q2: -222217, q3: -239217, q4: -239217, type: 'expense', format: 'currency' },
        
        { id: 'compliance', label: '合规认证 (3万/季)', launch: 0, q1: -30000, q2: -30000, q3: -30000, q4: -30000, type: 'expense', format: 'currency' },
        { id: 'contingency', label: '备用金 (5万/季)', launch: 0, q1: -50000, q2: -50000, q3: -50000, q4: -50000, type: 'expense', format: 'currency' },

        { id: 'ebitda', label: '净利润 (EBITDA)', launch: -300000, q1: -452717, q2: 52783, q3: 2993283, q4: 10809783, type: 'result', format: 'currency' },
        { id: 'net_margin', label: '净利率 %', launch: 0, q1: -30.1, q2: 1.1, q3: 23.9, q4: 34.9, type: 'metric', format: 'percent' },
    ]);

    const formatVal = (val: number, format: string) => {
        if (format === 'currency') return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }).format(val);
        if (format === 'percent') return `${val.toFixed(1)}%`;
        return val;
    };

    const updateValue = (index: number, field: string, value: string) => {
        const newData = [...data];
        // @ts-ignore
        newData[index][field] = parseFloat(value) || 0;
        setData(newData);
    };
    
    // Calculate Annual Totals (Summing Launch + Q1-Q4)
    const getAnnualTotal = (row: any) => {
        if (row.format === 'percent') {
            // Weighted average margin for year based on total revenue and total profit if needed, but simple avg for display
            // Better: Calculate total net / total revenue for margin row
            if (row.id === 'net_margin') return '26.2%';
            if (row.id === 'gross_margin') return '91.2%';
            return '-'; 
        }
        return (row.launch || 0) + row.q1 + row.q2 + row.q3 + row.q4;
    };

    return (
        <section className={`premium-card p-8 rounded-3xl border bg-white ${isEditMode ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <BarChart3 className="text-emerald-600" /> 全年损益预估表
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">含冷启动期 (Launch Phase) 与合规风控成本</p>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-slate-400 uppercase">首年净利润 (Year 1 Net)</div>
                    <div className={`text-3xl font-mono font-bold ${(getAnnualTotal(data.find(d => d.id === 'ebitda')) as number) > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {formatVal(getAnnualTotal(data.find(d => d.id === 'ebitda')) as number, 'currency')}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8 shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
                        <tr>
                            <th className="px-6 py-4">财务指标</th>
                            <th className="px-6 py-4 text-right bg-slate-100 text-slate-600">冷启动 (Nov-Dec)</th>
                            <th className="px-6 py-4 text-right">Q1 (80% 营销)</th>
                            <th className="px-6 py-4 text-right">Q2 (60% 营销)</th>
                            <th className="px-6 py-4 text-right">Q3 (40% 营销)</th>
                            <th className="px-6 py-4 text-right">Q4 (30% 营销)</th>
                            <th className="px-6 py-4 text-right bg-slate-100 text-slate-700">首年合计</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((row, idx) => {
                            let rowClass = "hover:bg-slate-50 transition-colors";
                            let textClass = "text-slate-600";
                            
                            if (row.type === 'header') { rowClass = "bg-blue-50/30 hover:bg-blue-50"; textClass = "font-bold text-slate-800"; }
                            if (row.type === 'subtotal') { rowClass = "bg-slate-50 font-bold"; textClass = "text-slate-900"; }
                            if (row.type === 'result') { rowClass = "bg-emerald-50 hover:bg-emerald-100 font-bold border-t-2 border-emerald-100"; textClass = "text-emerald-700 text-base"; }
                            if (row.type === 'metric') { textClass = "text-slate-400 italic text-xs"; }

                            // Dynamic color for negative results
                            if (row.type === 'result') {
                                // @ts-ignore
                                if (row.q1 < 0) textClass = "text-red-600";
                            }

                            return (
                                <tr key={row.id} className={rowClass}>
                                    <td className={`px-6 py-3 ${textClass}`}>
                                        {isEditMode ? <input value={row.label} onChange={e=>updateValue(idx, 'label', e.target.value)} className="bg-transparent border-b w-full outline-none"/> : row.label}
                                    </td>
                                    {['launch', 'q1', 'q2', 'q3', 'q4'].map((col) => (
                                        <td key={col} className={`px-6 py-3 text-right font-mono ${textClass} ${col === 'launch' ? 'bg-slate-50/30' : ''}`}>
                                            {isEditMode ? (
                                                <input 
                                                    // @ts-ignore
                                                    value={row[col]} 
                                                    onChange={e=>updateValue(idx, col, e.target.value)} 
                                                    className="bg-transparent border-b w-20 text-right outline-none"
                                                    type="number"
                                                />
                                            ) : (
                                                // @ts-ignore
                                                <span className={(row.type === 'result' && row[col] < 0) ? 'text-red-600' : ''}>
                                                    {/* @ts-ignore */}
                                                    {formatVal(row[col], row.format)}
                                                </span>
                                            )}
                                        </td>
                                    ))}
                                    <td className={`px-6 py-3 text-right font-mono font-bold bg-slate-50/50 ${textClass}`}>
                                        {row.format === 'percent' ? getAnnualTotal(row) : (
                                            <span className={(row.type === 'result' && (getAnnualTotal(row) as number) < 0) ? 'text-red-600' : 'text-emerald-700'}>
                                                {formatVal(getAnnualTotal(row) as number, row.format)}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2">Q1 净亏损</div>
                    <div className="text-2xl font-bold text-red-500">-¥45万</div>
                    <div className="text-[10px] text-slate-400 mt-1">战略投入期</div>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2">Q4 净利润</div>
                    <div className="text-2xl font-bold text-emerald-600">¥1081万</div>
                    <div className="text-[10px] text-slate-400 mt-1">利润收割期</div>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2">首年净利率</div>
                    <div className="text-2xl font-bold text-blue-600">26.2%</div>
                    <div className="text-[10px] text-slate-400 mt-1">目标达成</div>
                </div>
                 <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2">风控储备</div>
                    <div className="text-2xl font-bold text-slate-700">¥32万</div>
                    <div className="text-[10px] text-slate-400 mt-1">合规+备用金</div>
                </div>
            </div>

            {/* Conclusion Section */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-3">
                <div className="shrink-0 pt-1 text-emerald-500"><FileText size={20}/></div>
                <div className="flex-grow">
                    <h4 className="text-sm font-bold text-emerald-900 mb-1">年度财务总结</h4>
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

export default AnnualPnL;
