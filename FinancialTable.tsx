import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, FileText, Edit3 } from 'lucide-react';

interface FinancialTableProps {
  isEditMode?: boolean;
}

const FinancialTable: React.FC<FinancialTableProps> = ({ isEditMode = false }) => {
    const [conclusion, setConclusion] = useState("成本结构总结：Q1 的成本重心完全向前端倾斜，68% 的资金用于营销和数字化基建，这是典型的新品牌冷启动策略。这种激进的投入结构要求运营团队必须具备极高的流量转化能力，否则资金链压力将迅速增大。");

    const [rows, setRows] = useState([
        { id: 1, name: '人工场地', m12: '8万', m1: '8万', m2: '8万', m3: '8万', total: '32万', pct: '16.75%', style: '' },
        { id: 2, name: '产品成本', m12: '7万', m1: '0', m2: '0', m3: '8万', total: '15万', pct: '7.85%', style: '' },
        { id: 3, name: '营销费用+数字基建', m12: '10万', m1: '25万', m2: '60万', m3: '35万', total: '130万', pct: '68.06%', style: 'highlight' },
        { id: 4, name: '物流仓储', m12: '0', m1: '0', m2: '0', m3: '3万', total: '3万', pct: '2.11%', style: '' },
        { id: 5, name: '备用金', m12: '2万', m1: '2万', m2: '2万', m3: '2万', total: '10万', pct: '5.24%', style: '' },
    ]);

    const [footerData, setFooterData] = useState({
        totalM12: '28万',
        totalM1: '35万',
        totalM2: '70万',
        totalM3: '57万',
        grandTotal: '190万',
        pctTotal: '100%'
    });

    const handleUpdate = (id: number, field: string, val: string) => {
        setRows(rows.map(r => r.id === id ? { ...r, [field]: val } : r));
    };

    const handleFooterUpdate = (field: string, val: string) => {
        setFooterData(prev => ({ ...prev, [field]: val }));
    };

    return (
        <section className={`premium-card p-8 rounded-3xl border bg-white ${isEditMode ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
            <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <FileText className="text-slate-500" /> Q1 季度项目合计
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">成本费用明细表</p>
                 </div>
                 <span className="text-xs px-3 py-1 bg-slate-100 rounded-full font-bold text-slate-600 border border-slate-200">Unit: 万元 (CNY)</span>
            </div>
           
            <div className="overflow-x-auto rounded-xl border border-slate-200 mb-8">
                <table className="w-full text-sm text-left text-slate-600">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-extrabold">成本项目</th>
                            <th className="px-6 py-4 font-bold">12月费用</th>
                            <th className="px-6 py-4 font-bold">1月费用</th>
                            <th className="px-6 py-4 font-bold">2月费用</th>
                            <th className="px-6 py-4 font-bold">3月费用</th>
                            <th className="px-6 py-4 text-blue-600 font-extrabold">总金额</th>
                            <th className="px-6 py-4 font-bold">占比</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rows.map((row) => (
                            <motion.tr 
                                key={row.id}
                                className={`hover:bg-slate-50 transition-colors ${row.style === 'highlight' ? 'bg-orange-50 hover:bg-orange-100' : ''}`}
                            >
                                <td className={`px-6 py-4 font-medium ${row.style === 'highlight' ? 'text-orange-800 font-bold' : 'text-slate-800'}`}>
                                    {isEditMode ? <input className="bg-transparent border-b border-slate-300 w-full outline-none" value={row.name} onChange={e=>handleUpdate(row.id, 'name', e.target.value)} /> : row.name}
                                </td>
                                <td className="px-6 py-4">
                                     {isEditMode ? <input className="bg-transparent border-b border-slate-300 w-16 outline-none" value={row.m12} onChange={e=>handleUpdate(row.id, 'm12', e.target.value)} /> : row.m12}
                                </td>
                                <td className="px-6 py-4">
                                     {isEditMode ? <input className="bg-transparent border-b border-slate-300 w-16 outline-none" value={row.m1} onChange={e=>handleUpdate(row.id, 'm1', e.target.value)} /> : row.m1}
                                </td>
                                <td className="px-6 py-4">
                                     {isEditMode ? <input className="bg-transparent border-b border-slate-300 w-16 outline-none" value={row.m2} onChange={e=>handleUpdate(row.id, 'm2', e.target.value)} /> : row.m2}
                                </td>
                                <td className="px-6 py-4">
                                     {isEditMode ? <input className="bg-transparent border-b border-slate-300 w-16 outline-none" value={row.m3} onChange={e=>handleUpdate(row.id, 'm3', e.target.value)} /> : row.m3}
                                </td>
                                <td className={`px-6 py-4 font-bold ${row.style === 'highlight' ? 'text-orange-600 text-lg' : 'text-slate-800'}`}>
                                     {isEditMode ? <input className="bg-transparent border-b border-slate-300 w-16 outline-none font-bold" value={row.total} onChange={e=>handleUpdate(row.id, 'total', e.target.value)} /> : row.total}
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                     {isEditMode ? <input className="bg-transparent border-b border-slate-300 w-16 outline-none" value={row.pct} onChange={e=>handleUpdate(row.id, 'pct', e.target.value)} /> : row.pct}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                        <tr>
                            <td className="px-6 py-5 text-slate-800">合计</td>
                            <td className="px-6 py-5 text-slate-800">
                                {isEditMode ? <input className="bg-transparent border-b border-slate-300 w-16 outline-none font-bold" value={footerData.totalM12} onChange={e=>handleFooterUpdate('totalM12', e.target.value)} /> : footerData.totalM12}
                            </td>
                            <td className="px-6 py-5 text-slate-800">
                                {isEditMode ? <input className="bg-transparent border-b border-slate-300 w-16 outline-none font-bold" value={footerData.totalM1} onChange={e=>handleFooterUpdate('totalM1', e.target.value)} /> : footerData.totalM1}
                            </td>
                            <td className="px-6 py-5 text-red-600">
                                {isEditMode ? <input className="bg-transparent border-b border-red-200 w-16 outline-none font-bold text-red-600" value={footerData.totalM2} onChange={e=>handleFooterUpdate('totalM2', e.target.value)} /> : footerData.totalM2}
                            </td>
                            <td className="px-6 py-5 text-slate-800">
                                {isEditMode ? <input className="bg-transparent border-b border-slate-300 w-16 outline-none font-bold" value={footerData.totalM3} onChange={e=>handleFooterUpdate('totalM3', e.target.value)} /> : footerData.totalM3}
                            </td>
                            <td className="px-6 py-5 text-xl text-blue-600">
                                {isEditMode ? <input className="bg-transparent border-b border-blue-200 w-20 outline-none font-bold text-xl text-blue-600" value={footerData.grandTotal} onChange={e=>handleFooterUpdate('grandTotal', e.target.value)} /> : footerData.grandTotal}
                            </td>
                            <td className="px-6 py-5 text-slate-800">
                                {isEditMode ? <input className="bg-transparent border-b border-slate-300 w-16 outline-none font-bold" value={footerData.pctTotal} onChange={e=>handleFooterUpdate('pctTotal', e.target.value)} /> : footerData.pctTotal}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 items-start">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                    <DollarSign className="text-blue-600" size={24}/>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">💰 战略定调</h4>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
                        这是一场"以资金换空间"的战役。重仓进攻总预算 <strong className="text-slate-900">¥190万</strong>，其中 <strong className="text-orange-600 bg-orange-50 px-1 rounded">68% (¥130万) 投入前线打粮食（营销+基建）</strong>，仅 17% (¥32万) 用于后台运营。
                        <br/><span className="mt-1 block text-slate-500">盘面结构：无限拉满营销火力。价值交付：买下3000+种子用户资产 + 核心词首页地位。</span>
                    </p>
                </div>
            </div>
            
             {/* Conclusion Section */}
             <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3">
                <div className="shrink-0 pt-1 text-orange-500"><FileText size={20}/></div>
                <div className="flex-grow">
                    <h4 className="text-sm font-bold text-orange-900 mb-1">资金结构结论</h4>
                    {isEditMode ? (
                        <textarea 
                            value={conclusion} 
                            onChange={e=>setConclusion(e.target.value)}
                            className="w-full bg-white p-2 rounded border border-orange-200 text-sm text-orange-800 h-20 outline-none focus:ring-2 focus:ring-orange-300"
                        />
                    ) : (
                        <p className="text-sm text-orange-700 leading-relaxed">{conclusion}</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FinancialTable;