import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Truck, BarChart2 } from 'lucide-react';

interface ExecutionRoadmapProps {
  isEditMode?: boolean;
}

const ExecutionRoadmap: React.FC<ExecutionRoadmapProps> = ({ isEditMode = false }) => {
    const [stages, setStages] = useState([
        { id: 1, title: '筹备阶段', week: 'Wk 1-3', desc: '✅ 已完成', status: 'done', bg: 'bg-slate-50', border: 'border-slate-200', icon: CheckCircle },
        { id: 2, title: '基建与物料 ⚡', week: 'Wk 3-6', desc: '🚚 产品出货', status: 'current', bg: 'bg-orange-50', border: 'border-orange-200', icon: Truck },
        { id: 3, title: '推广执行 📢', week: 'Wk 6-11', desc: '广告启动', status: 'upcoming', bg: 'bg-white', border: 'border-slate-300', icon: BarChart2 },
        { id: 4, title: '复盘评估 🏁', week: 'Wk 12', desc: '项目总结', status: 'upcoming', bg: 'bg-white', border: 'border-slate-300', icon: Clock },
    ]);

    const updateStage = (id: number, field: string, val: string) => {
        setStages(stages.map(s => s.id === id ? { ...s, [field]: val } : s));
    };

    return (
        <section className={`premium-card p-8 rounded-3xl border bg-white ${isEditMode ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
            <div className="mb-8 border-b border-slate-100 pb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">05. Q1 执行规划路线图</h2>
                    <p className="text-slate-500 mt-1">当前进度: <span className="font-bold text-blue-600">Wk 4</span> (物料准备冲刺期)</p>
                </div>
                {/* Pet Element */}
                <img src="https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=200&auto=format&fit=crop" alt="Cat Planning" className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {stages.map((stage) => (
                     <motion.div 
                        key={stage.id}
                        initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} transition={{delay: stage.id * 0.1}}
                        className={`p-5 rounded-2xl ${stage.bg} border ${stage.status === 'upcoming' ? 'border-dashed' : ''} ${stage.border} relative`}
                    >
                        {stage.status === 'current' && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">CURRENT</div>}
                        <div className={`absolute top-4 right-4 ${stage.status === 'current' ? 'text-orange-500 animate-pulse' : 'text-slate-300'}`}><stage.icon size={20} /></div>
                        
                        <h3 className="font-bold text-slate-700 text-lg mb-1">
                            {isEditMode ? <input value={stage.title} onChange={e=>updateStage(stage.id, 'title', e.target.value)} className="bg-transparent border-b border-slate-300 w-full outline-none" /> : stage.title}
                        </h3>
                        
                        <div className="text-xs font-semibold px-2 py-1 rounded inline-block bg-white border border-slate-200 text-slate-500 mt-1">
                             {isEditMode ? <input value={stage.week} onChange={e=>updateStage(stage.id, 'week', e.target.value)} className="bg-transparent w-16 outline-none text-center" /> : stage.week}
                        </div>
                        
                        <p className="text-sm text-slate-500 mt-3 font-medium">
                             {isEditMode ? <input value={stage.desc} onChange={e=>updateStage(stage.id, 'desc', e.target.value)} className="bg-transparent border-b border-slate-300 w-full outline-none" /> : stage.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-center text-blue-800 font-medium text-sm flex items-center justify-center gap-2">
                <span>🎨 长期专项支撑 (Wk2-Wk12):</span>
                <span className="font-bold">宣传物料制作持续输出</span>
            </div>
        </section>
    );
};

export default ExecutionRoadmap;