import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Filter, Video, Laptop, Box } from 'lucide-react';

interface TeamStructureProps {
  isEditMode?: boolean;
}

const TeamStructure: React.FC<TeamStructureProps> = ({ isEditMode = false }) => {
    const [timeline, setTimeline] = useState([
        { id: 1, date: '[Mar]', title: '视频策划', sub: '日更脚本/AI生成', icon: Video },
        { id: 2, date: '[Mar]', title: '高级运营', sub: 'PPC精细化/库存周转', icon: Laptop },
        { id: 3, date: '[May]', title: '产品经理', sub: '供应链/FDA/降本', icon: Box },
    ]);

    const updateTimeline = (id: number, field: string, val: string) => {
        setTimeline(timeline.map(t => t.id === id ? { ...t, [field]: val } : t));
    };

    return (
        <section className={`premium-card p-8 rounded-3xl border bg-white ${isEditMode ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
             <div className="mb-8 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold text-slate-800">06. 组织架构与营销全景</h2>
                <p className="text-slate-500 mt-1">左手铁三角，右手营销漏斗</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Organization */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Users className="text-blue-600" size={20} /> 组织进化论
                    </h3>
                    
                    <div className="flex gap-2 mb-6">
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm">🔵 品牌营销</span>
                        <span className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-sm">🟢 销量转化</span>
                        <span className="px-3 py-1 bg-orange-500 text-white rounded-lg text-xs font-bold shadow-sm">🟠 品牌打造</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-6 italic">Current State: “铁三角”全能小组</p>

                    <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide mb-3">招聘时间轴 (2026)</h4>
                    <div className="space-y-3 relative pl-4 border-l-2 border-slate-200">
                         {timeline.map((item) => (
                             <div key={item.id} className="relative">
                                <div className="absolute -left-[21px] top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                                <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                                    <item.icon size={14} className="text-slate-400"/> 
                                    {isEditMode ? (
                                        <>
                                            <input value={item.date} onChange={e=>updateTimeline(item.id, 'date', e.target.value)} className="w-12 bg-transparent border-b border-slate-300 outline-none text-xs"/>
                                            <input value={item.title} onChange={e=>updateTimeline(item.id, 'title', e.target.value)} className="w-24 bg-transparent border-b border-slate-300 outline-none text-xs"/>
                                        </>
                                    ) : (
                                        <>{item.date} {item.title}</>
                                    )}
                                </div>
                                <div className="text-xs text-slate-500 pl-6">
                                     {isEditMode ? <input value={item.sub} onChange={e=>updateTimeline(item.id, 'sub', e.target.value)} className="w-full bg-transparent border-b border-slate-300 outline-none"/> : item.sub}
                                </div>
                             </div>
                         ))}
                    </div>
                </div>

                {/* Right: Marketing Funnel */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Filter className="text-orange-600" size={20} /> 营销作战漏斗
                    </h3>
                    
                    <motion.div whileHover={{scale:1.02}} className="bg-slate-900 text-white p-5 rounded-xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="font-bold text-lg mb-1">📱 TikTok (声量场)</div>
                            <div className="text-sm text-slate-400">Nutri-Treats, Picky-eater approved</div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-20"><Video size={80}/></div>
                    </motion.div>

                    <motion.div whileHover={{scale:1.02}} className="bg-orange-500 text-white p-5 rounded-xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="font-bold text-lg mb-1">🛒 Amazon (收割场)</div>
                            <div className="text-sm text-orange-100">Hassle-free, Vet-formulated</div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-20"><Filter size={80}/></div>
                    </motion.div>

                    <div className="p-4 bg-slate-50 rounded-xl border-2 border-slate-100 mt-2">
                         <p className="text-sm text-slate-600 font-medium">财务逻辑: Q1 战略亏损换种子用户 → Q3 高复购盈亏平衡</p>
                    </div>
                </div>
            </div>

             <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-slate-600 text-sm">
                    <strong>总人力成本 (Year 1): ¥123万</strong> (占营收 2.5%) 
                    <span className="mx-2 text-slate-300">|</span> 
                    创始团队 ¥67.2万 + 新增编制 ¥40.8万 + 奖金 ¥15万
                </p>
             </div>
        </section>
    );
};

export default TeamStructure;