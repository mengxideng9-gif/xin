
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, TrendingUp, Target, ShieldCheck, DollarSign, PawPrint, PenTool, Eye, Image as ImageIcon, Printer } from 'lucide-react';

// Components
import Dashboard2026 from './components/Dashboard2026';
import ExecutionRoadmap from './components/ExecutionRoadmap';
import MarketInsights from './components/MarketInsights';
import StrategyBattle from './components/StrategyBattle';
import TeamStructure from './components/TeamStructure';
import MarketingBudget from './components/MarketingBudget';
import MarketingEstimation from './components/MarketingEstimation';
import CACAnalysis from './components/CACAnalysis';
import RiskManagement from './components/RiskManagement';
import InfraAndSupply from './components/InfraAndSupply';
import FinancialTable from './components/FinancialTable';
import ProjectProjection from './components/ProjectProjection';
import SupplyChainBOM from './components/SupplyChainBOM';
import AnnualPnL from './components/AnnualPnL';
import QuarterlyActionPlan from './components/QuarterlyActionPlan';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Editable Header State
  const [headerData, setHeaderData] = useState({
    title: '季度规划与',
    subTitle: '三年战略路径',
    desc: 'Project Lumina: 全球宠物保健品市场格局深度解析',
    bgImage: 'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=2574&auto=format&fit=crop'
  });

  const tabs = [
    { id: 'overview', label: '总览与规划', icon: LayoutDashboard },
    { id: 'strategy', label: '市场与策略', icon: TrendingUp },
    { id: 'growth', label: '营销与增长', icon: Target },
    { id: 'operations', label: '运营与供应链', icon: ShieldCheck },
    { id: 'finance', label: '财务与测算', icon: DollarSign },
  ];

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden relative font-sans print:bg-white">
      
      {/* Background Ambience (Light Theme) - Hidden on Print */}
      <div className="fixed inset-0 pointer-events-none z-0 print:hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[120px]" />
      </div>

      {/* Navigation - Hidden on Print */}
      <nav className="fixed top-0 left-0 w-24 h-full bg-white z-50 flex flex-col items-center py-8 border-r border-slate-200 hidden md:flex shadow-xl shadow-slate-200/50 print:hidden">
        <div className="mb-12 p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30">
          <PawPrint size={28} className="text-white" />
        </div>
        <div className="flex flex-col gap-10 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative group flex flex-col items-center gap-2 p-2 w-full transition-all duration-300 ${
                activeTab === tab.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`p-3 rounded-xl transition-all duration-300 ${activeTab === tab.id ? 'bg-blue-50' : 'group-hover:bg-slate-50'}`}>
                <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-bold tracking-wide">
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full"
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-24 min-h-screen relative z-10 pb-20 print:ml-0 print:pb-0 print:w-full">
        {/* Header */}
        <header className="relative h-[280px] overflow-hidden bg-white group print:h-auto print:pb-6 print:border-b print:border-slate-200">
           <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-blue-50/30 to-white z-10 print:hidden" />
           
           {/* Header Image - Hidden on Print to save ink/clean look */}
           <img 
            src={headerData.bgImage} 
            alt="Header Background" 
            className="absolute right-0 top-[-20%] w-2/3 h-[150%] object-cover opacity-80 mix-blend-multiply transition-opacity duration-300 print:hidden"
           />
           
           {/* Image Editor Overlay - Hidden on Print */}
           {isEditMode && (
             <div className="absolute top-4 right-4 z-30 bg-white/90 backdrop-blur p-2 rounded-lg border border-blue-200 shadow-lg flex flex-col gap-2 w-80 print:hidden">
                <div className="text-xs font-bold text-slate-500 flex items-center gap-1"><ImageIcon size={12}/> Background Image URL</div>
                <input 
                  type="text" 
                  value={headerData.bgImage} 
                  onChange={(e) => setHeaderData({...headerData, bgImage: e.target.value})}
                  className="text-xs p-2 border border-slate-300 rounded focus:border-blue-500 outline-none"
                />
             </div>
           )}

           {/* Export Button */}
           <div className="absolute top-6 right-6 z-40 print:hidden">
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-white hover:text-blue-600 shadow-sm hover:shadow-md transition-all text-sm"
              >
                <Printer size={16} /> Export PDF
              </button>
           </div>

           <div className="relative z-20 container mx-auto px-10 h-full flex flex-col justify-center print:px-4 print:py-6">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
             >
               <div className="flex items-center gap-3 mb-4">
                 <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 print:border-none">
                   Q1 2026 STRATEGY
                 </span>
                 <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200 print:border-none">
                   CONFIDENTIAL
                 </span>
               </div>
               
               <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-3 leading-tight print:text-4xl">
                 {isEditMode ? (
                   <input 
                      value={headerData.title}
                      onChange={(e) => setHeaderData({...headerData, title: e.target.value})}
                      className="bg-transparent border-b-2 border-blue-300 outline-none w-auto inline-block"
                   />
                 ) : headerData.title} 
                 <br/> 
                 <span className="gradient-text">
                  {isEditMode ? (
                     <input 
                        value={headerData.subTitle}
                        onChange={(e) => setHeaderData({...headerData, subTitle: e.target.value})}
                        className="bg-transparent border-b-2 border-blue-300 outline-none text-blue-600"
                     />
                   ) : headerData.subTitle}
                 </span>
               </h1>
               
               <div className="text-xl text-slate-500 max-w-2xl font-normal print:text-base print:text-slate-600">
                  {isEditMode ? (
                    <textarea 
                      value={headerData.desc}
                      onChange={(e) => setHeaderData({...headerData, desc: e.target.value})}
                      className="bg-transparent border border-blue-200 p-2 rounded w-full outline-none h-20"
                    />
                  ) : headerData.desc}
               </div>

             </motion.div>
           </div>
        </header>

        {/* Dynamic Content */}
        <div className="container mx-auto px-4 md:px-10 mt-10 print:px-4 print:mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-10 print:space-y-8">
                   <Dashboard2026 isEditMode={isEditMode} />
                   <ExecutionRoadmap isEditMode={isEditMode} />
                </div>
              )}

              {activeTab === 'strategy' && (
                <div className="space-y-10 print:space-y-8">
                  <MarketInsights isEditMode={isEditMode} />
                  <TeamStructure isEditMode={isEditMode} />
                </div>
              )}

              {activeTab === 'growth' && (
                <div className="space-y-10 print:space-y-8">
                   <QuarterlyActionPlan />
                   <StrategyBattle isEditMode={isEditMode} />
                   <MarketingBudget isEditMode={isEditMode} />
                   <RiskManagement isEditMode={isEditMode} />
                   <MarketingEstimation isEditMode={isEditMode} />
                   <CACAnalysis isEditMode={isEditMode} />
                </div>
              )}

              {activeTab === 'operations' && (
                <div className="space-y-10 print:space-y-8">
                   <SupplyChainBOM isEditMode={isEditMode} />
                   <InfraAndSupply isEditMode={isEditMode} />
                </div>
              )}

              {activeTab === 'finance' && (
                <div className="space-y-10 print:space-y-8">
                  <ProjectProjection isEditMode={isEditMode} />
                  <AnnualPnL isEditMode={isEditMode} />
                  <FinancialTable isEditMode={isEditMode} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global Edit Mode Toggle - Hidden on Print */}
      <div className="fixed bottom-8 right-8 z-50 print:hidden">
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-2xl font-bold text-sm transition-all duration-300 ${
                isEditMode 
                ? 'bg-blue-600 text-white shadow-blue-500/30' 
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
        >
            {isEditMode ? (
                <>
                    <Eye size={18} /> Exit Edit Mode
                </>
            ) : (
                <>
                    <PenTool size={18} /> Edit Dashboard
                </>
            )}
        </motion.button>
        {isEditMode && (
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-16 right-0 bg-slate-800 text-white text-xs px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
             >
                Data editing enabled. Click text to edit.
             </motion.div>
        )}
      </div>

    </div>
  );
};

export default App;
