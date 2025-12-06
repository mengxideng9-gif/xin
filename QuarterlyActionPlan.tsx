
import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  Target, 
  Zap, 
  Users, 
  BarChart2, 
  TrendingUp, 
  AlertTriangle, 
  Package, 
  Mail, 
  Video,
  Clock,
  Layout,
  Flag
} from 'lucide-react';

// --- UI Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "blue" }: { children: React.ReactNode, color?: string }) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800",
    orange: "bg-orange-100 text-orange-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    purple: "bg-purple-100 text-purple-800",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${colorMap[color] || colorMap.blue}`}>
      {children}
    </span>
  );
};

const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2.5 bg-blue-600 rounded-lg shadow-sm">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  </div>
);

// --- Modules ---

// 1. 总体时间轴 (3-Month Launch)
const Q1Timeline = () => {
  const months = [
    {
      month: "JANUARY",
      title: "蓄水与锁定",
      subtitle: "The Build-Up",
      goal: "私域筑堤 & 供应链锁单",
      kpi: ["1000+ 邮箱", "50+ KOC就位", "春节备货锁单"],
      color: "blue",
      icon: Users
    },
    {
      month: "FEBRUARY",
      title: "引爆与抗压",
      subtitle: "The Launch",
      goal: "全网泄洪 & 排名卡位",
      kpi: ["日销 200单", "BSR Top 50", "声量 300万+"],
      color: "orange",
      icon: Zap
    },
    {
      month: "MARCH",
      title: "爬坡与拓新",
      subtitle: "The Expansion",
      goal: "数据清洗 & 新品布局",
      kpi: ["ACOS < 50%", "Review 100+", "新品打样"],
      color: "green",
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {months.map((m, idx) => (
        <Card key={idx} className={`relative p-6 border-t-4 border-t-${m.color}-500 hover:shadow-md transition-all`}>
          <div className="absolute top-4 right-4 opacity-10">
            <m.icon className="w-16 h-16" />
          </div>
          <div className="mb-4">
            <span className={`text-xs font-bold text-${m.color}-600 uppercase tracking-widest`}>{m.month}</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{m.title}</h3>
            <p className="text-sm text-slate-500 italic">{m.subtitle}</p>
          </div>
          <div className="space-y-3">
            <div className="text-sm font-medium text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
              🎯 {m.goal}
            </div>
            <ul className="space-y-2">
              {m.kpi.map((k, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className={`w-4 h-4 text-${m.color}-500`} />
                  {k}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  );
};

// 2. 详细执行计划 (Execution Plan)
const ExecutionPlan = () => {
  const [activeTab, setActiveTab] = useState(0);

  const data = [
    {
      month: "1月 (JAN)",
      theme: "蓄水期",
      color: "blue",
      weeks: [
        {
          name: "Week 1-2: 基建与素材",
          focus: "Foundation",
          tasks: [
            { tag: "供应链", text: "追踪首批大货到港时间，确认春节后复工排产表", type: "critical" },
            { tag: "营销", text: "FB留资广告全开，日预算$50，目标收集500邮箱" },
            { tag: "素材", text: "完成官方ASMR视频剪辑 & A+页面视觉素材定稿" },
            { tag: "合规", text: "完成VINE计划预注册，等待上架" }
          ]
        },
        {
          name: "Week 3-4: 寄样与锁定",
          focus: "Seeding",
          tasks: [
            { tag: "KOC", text: "50份样品空运直发，确认KOC签收" },
            { tag: "运营", text: "Listing文案预埋，上传视频，状态设为不可售" },
            { tag: "营销", text: "给红人下达Brief：必须在1月底/2月初发布" },
            { tag: "私域", text: "制作倒计时海报 (3 Days Left) & EDM文案" }
          ]
        }
      ]
    },
    {
      month: "2月 (FEB)",
      theme: "引爆期",
      color: "orange",
      weeks: [
        {
          name: "Week 1-2: 开闸泄洪",
          focus: "Launch",
          tasks: [
            { tag: "私域", text: "上架首小时群发邮件：LIVE NOW! 50% OFF!" },
            { tag: "PPC", text: "开启首页霸屏广告 (Top of Search +100%)" },
            { tag: "测评", text: "秒抢30个VINE名额" },
            { tag: "TikTok", text: "Spark Ads 日耗$200+，强推3条红人爆款视频" }
          ]
        },
        {
          name: "Week 3-4: 抗压与补货",
          focus: "Sustain",
          tasks: [
            { tag: "风控", text: "每日监控VINE回评，出现差评立即处理" },
            { tag: "供应链", text: "如日销>150单，立即涨价保库存，并安排年后空运" },
            { tag: "运营", text: "否定PPC无效词，初步优化ACOS" },
            { tag: "工厂", text: "确认春节后复工时间，安排第一批补货发货" }
          ]
        }
      ]
    },
    {
      month: "3月 (MAR)",
      theme: "爬坡期",
      color: "green",
      weeks: [
        {
          name: "Week 1-2: 清洗数据",
          focus: "Optimization",
          tasks: [
            { tag: "PPC", text: "深度优化广告，目标ACOS降至50%" },
            { tag: "订阅", text: "开启 Subscribe & Save (10% Off) 锁定复购" },
            { tag: "素材", text: "收集好评制作成UGC图片，更新A+页面" },
            { tag: "新品", text: "启动软骨素/猫用鱼油研发打样" }
          ]
        },
        {
          name: "Week 3-4: 矩阵扩张",
          focus: "Expansion",
          tasks: [
            { tag: "新品", text: "支付新品首批订单定金" },
            { tag: "物流", text: "美森补货入仓，解除库存警报" },
            { tag: "再营销", text: "FB/Google DSP投放给'看过没买'的人群" },
            { tag: "复盘", text: "Q1全盘复盘，制定Q2 Prime Day计划" }
          ]
        }
      ]
    }
  ];

  return (
    <div>
      <div className="flex space-x-2 mb-6 bg-slate-100 p-1 rounded-lg w-fit">
        {data.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-2.5 text-sm font-bold rounded-md transition-all ${
              activeTab === index
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {item.month} · {item.theme}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {data[activeTab].weeks.map((week, idx) => (
          <Card key={idx} className="p-6 h-full border-t-4 border-t-slate-300">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-slate-800">{week.name}</h4>
              <Badge color={data[activeTab].color}>{week.focus}</Badge>
            </div>
            <div className="space-y-4">
              {week.tasks.map((task, i) => (
                <div key={i} className={`flex gap-3 p-3 rounded-lg ${task.type === 'critical' ? 'bg-red-50 border border-red-100' : 'bg-slate-50'}`}>
                  <div className={`mt-0.5 px-2 py-0.5 h-fit text-[10px] font-bold uppercase rounded text-slate-600 bg-white border border-slate-200`}>
                    {task.tag}
                  </div>
                  <p className={`text-sm ${task.type === 'critical' ? 'text-red-700 font-medium' : 'text-slate-600'}`}>
                    {task.text}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// 3. 日常运营 SOP (Routine SOP)
const RoutineSOP = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="p-0 border-l-4 border-l-blue-500">
        <div className="p-4 border-b border-slate-100 bg-blue-50">
          <div className="flex items-center gap-2 font-bold text-blue-800">
            <Clock className="w-4 h-4" /> 每日必做 (Daily)
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
            <p className="text-sm text-slate-600"><strong>PPC调优：</strong>检查昨日ACOS，调整竞价，否定无效词。</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
            <p className="text-sm text-slate-600"><strong>库存监控：</strong>更新《库存周转表》，预警断货风险。</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
            <p className="text-sm text-slate-600"><strong>社媒互动：</strong>回复所有评论/私信，保持账号活跃。</p>
          </div>
        </div>
      </Card>

      <Card className="p-0 border-l-4 border-l-orange-500">
        <div className="p-4 border-b border-slate-100 bg-orange-50">
          <div className="flex items-center gap-2 font-bold text-orange-800">
            <Layout className="w-4 h-4" /> 每周必做 (Weekly)
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0"></div>
            <p className="text-sm text-slate-600"><strong>发货指令：</strong>周一计算补货量，向工厂/货代下单。</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0"></div>
            <p className="text-sm text-slate-600"><strong>素材日：</strong>周三集中拍摄/剪辑下周的短视频素材。</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0"></div>
            <p className="text-sm text-slate-600"><strong>红人维护：</strong>检查KOC发帖情况，下载素材存档。</p>
          </div>
        </div>
      </Card>

      <Card className="p-0 border-l-4 border-l-green-500">
        <div className="p-4 border-b border-slate-100 bg-green-50">
          <div className="flex items-center gap-2 font-bold text-green-800">
            <Flag className="w-4 h-4" /> 每月必做 (Monthly)
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></div>
            <p className="text-sm text-slate-600"><strong>财务复盘：</strong>核算上月毛利、CAC、ROAS，调整预算。</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></div>
            <p className="text-sm text-slate-600"><strong>新品规划：</strong>推进新品研发进度，审核样品。</p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0"></div>
            <p className="text-sm text-slate-600"><strong>资产盘点：</strong>检查Review数量、邮箱库数量是否达标。</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const QuarterlyActionPlan = () => {
  return (
    <section className="premium-card p-8 rounded-3xl border border-slate-200 bg-white">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Badge color="blue">Project Dual-Core</Badge>
          <Badge color="orange">点火行动</Badge>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Aeicoi Q1 品牌营销作战指挥室</h1>
        <p className="text-slate-500 mt-2">Operation Ignition: 从0到1冷启动全案 (1月-3月)</p>
      </div>

      {/* Module 1: Timeline */}
      <section className="mb-12">
        <SectionHeader icon={Calendar} title="Q1 总体时间轴" subtitle="3-Month Launch Timeline" />
        <Q1Timeline />
      </section>

      {/* Module 2: Execution Plan */}
      <section className="mb-12">
        <SectionHeader icon={Target} title="详细执行计划" subtitle="Weekly Breakdown & Action Items" />
        <ExecutionPlan />
      </section>

      {/* Module 3: SOP */}
      <section>
        <SectionHeader icon={CheckCircle} title="日常运营 SOP" subtitle="Routine Operational Standards" />
        <RoutineSOP />
      </section>
    </section>
  );
};

export default QuarterlyActionPlan;
