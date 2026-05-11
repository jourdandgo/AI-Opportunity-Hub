import { useState } from 'react';
import { SummaryStats, Opportunity, Recommendation } from '../types';
import { Target, Rocket, RefreshCw, Archive, Plus, BarChart3, PieChart as PieChartIcon, X, Users, Activity, Layers, ArrowRight, Zap } from 'lucide-react';
import { ReactNode } from 'react';
import Modal from './Modal';
import OpportunityDetailModal from './OpportunityDetailModal';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

interface Props {
  stats: SummaryStats;
  opportunities: Opportunity[];
  onAddClick: () => void;
  onSeed?: () => void;
  isSeeding?: boolean;
}

export default function DashboardView({ stats, opportunities, onAddClick, onSeed, isSeeding }: Props) {
  const [filterRec, setFilterRec] = useState<Recommendation | null>(null);
  const [filterDept, setFilterDept] = useState<string | null>(null);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);

  const chartData = [
    { name: 'Pursue', value: stats.pursue, color: '#10b981' },
    { name: 'Pilot', value: stats.pilot, color: '#f59e0b' },
    { name: 'Refine', value: stats.refine, color: '#3b82f6' },
    { name: 'Park', value: stats.park, color: '#94a3b8' },
  ];

  const deptData = Object.entries(
    opportunities.reduce((acc, curr) => {
      acc[curr.department] = (acc[curr.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const filteredOpps = opportunities
    .filter(o => {
      const recMatch = !filterRec || o.recommendation === filterRec;
      const deptMatch = !filterDept || o.department === filterDept;
      return recMatch && deptMatch;
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  const handleChartClick = (data: any) => {
    if (data && data.activeLabel) {
      setFilterRec(data.activeLabel as Recommendation);
    }
  };

  const handlePieClick = (data: any) => {
    if (data && data.name) {
      setFilterDept(data.name);
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-800 backdrop-blur-md bg-opacity-90">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{payload[0].payload.name}</p>
          <p className="text-sm font-bold">{payload[0].value} <span className="text-slate-400 font-medium">Initiatives</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <div className="h-1 w-8 bg-indigo-500 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Pulse Center</span>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-white italic">AI Opportunity Hub</h1>
          <p className="text-slate-500 max-w-2xl leading-relaxed">
            Architecting the future through strategic AI deployment. Monitor, prioritize, and scale initiatives across the global enterprise.
          </p>
        </div>
        <div className="flex gap-3">
          {opportunities.length < 40 && onSeed && (
            <button 
              onClick={onSeed}
              disabled={isSeeding}
              className="flex items-center gap-2 bg-slate-900 text-slate-300 border border-white/5 px-6 py-3 rounded-full text-sm font-bold hover:text-white transition-all disabled:opacity-50"
            >
              <Zap size={16} className={isSeeding ? 'animate-spin' : ''} />
              {isSeeding ? 'Syncing...' : 'Sync Master Baseline (40)'}
            </button>
          )}
          <button 
            onClick={onAddClick}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 hover:-translate-y-1 transition-all active:scale-95 group border border-indigo-400/20"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> New Strategy Brief
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Pursue" value={stats.pursue} icon={<Rocket className="text-emerald-500" />} color="emerald" description="Priority Status" />
        <StatCard title="Pilot" value={stats.pilot} icon={<Target className="text-amber-500" />} color="amber" description="Active Testing" />
        <StatCard title="Refine" value={stats.refine} icon={<RefreshCw className="text-blue-500" />} color="blue" description="Needs Strategy" />
        <StatCard title="Park" value={stats.park} icon={<Archive className="text-slate-400" />} color="slate" description="Resource Pool" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0D1117] p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
               <BarChart3 size={20} className="text-indigo-400" />
               <h3 className="font-display font-bold text-lg text-white">Strategy Mix</h3>
            </div>
            {filterRec && (
              <button 
                onClick={() => setFilterRec(null)}
                className="text-[10px] font-bold uppercase text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 rounded-full transition-colors"
              >
                <X size={12} /> Clear Filter
              </button>
            )}
          </div>
          <div className="h-64 w-full cursor-pointer">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} onClick={handleChartClick} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#161B22" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#484f58', fontFamily: 'Inter' }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#161B22' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={44}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      opacity={filterRec === null || filterRec === entry.name ? 1 : 0.2}
                      className="transition-all duration-300"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-500 text-center font-bold uppercase mt-6 tracking-widest">
            Click a bar to focus view
          </p>
        </div>

        <div className="bg-[#0D1117] p-8 rounded-2xl border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
               <PieChartIcon size={20} className="text-indigo-400" />
               <h3 className="font-display font-bold text-lg text-white">Org Load</h3>
            </div>
            {filterDept && (
              <button 
                onClick={() => setFilterDept(null)}
                className="text-[10px] font-bold uppercase text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 rounded-full transition-colors"
              >
                <X size={12} /> Clear Filter
              </button>
            )}
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            {deptData.length > 0 ? (
              <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                <div className="h-64 w-64 flex-shrink-0 cursor-pointer">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deptData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1500}
                        stroke="none"
                        onClick={handlePieClick}
                      >
                        {deptData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'][index % 6]} 
                            strokeWidth={0} 
                            opacity={filterDept === null || filterDept === entry.name ? 1 : 0.2}
                            className="transition-all duration-300 outline-none"
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3 min-w-[140px]">
                   {deptData.map((dept, index) => (
                     <div 
                       key={dept.name} 
                       onClick={() => setFilterDept(dept.name)}
                       className={`flex items-center justify-between group gap-4 cursor-pointer p-1 rounded-lg transition-colors ${filterDept === dept.name ? 'bg-white/5' : 'hover:bg-white/5'}`}
                     >
                       <div className="flex items-center gap-3 overflow-hidden">
                         <div 
                           className="w-2 h-2 rounded-full flex-shrink-0 transition-transform group-hover:scale-125" 
                           style={{ 
                             backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'][index % 6],
                             opacity: filterDept === null || filterDept === dept.name ? 1 : 0.2
                           }} 
                         />
                         <span className={`text-[11px] font-bold truncate leading-none transition-colors ${filterDept === dept.name ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                           {dept.name}
                         </span>
                       </div>
                       <span className="text-[11px] font-mono font-bold text-slate-500 group-hover:text-white transition-colors">{dept.value}</span>
                     </div>
                   ))}
                </div>
              </div>
            ) : (
              <div className="text-slate-500 text-xs font-medium italic">
                No departmental data available
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Opportunities */}
        <div className="lg:col-span-2 bg-[#0D1117] rounded-2xl border border-white/5 p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display font-bold text-xl text-white">
              {filterRec || filterDept 
                ? `${filterRec || ''} ${filterDept ? `in ${filterDept}` : ''} Strategies`.trim()
                : 'Strategic Pipeline'}
            </h3>
            <button 
              onClick={onAddClick}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4 decoration-indigo-500/20"
            >
              Add Strategic Brief
            </button>
          </div>
          
          {filteredOpps.length === 0 ? (
             <div className="py-20 text-center">
               <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800 border-dashed">
                 <Lightbulb className="text-slate-700" />
               </div>
               <p className="text-slate-500 font-medium italic">No initiatives match your criteria.</p>
             </div>
          ) : (
            <div className="space-y-4">
              {filteredOpps.slice(0, 5).map((opp, idx) => (
                <div 
                  key={opp.id} 
                  onClick={() => setSelectedOpp(opp)}
                  className="flex items-center justify-between p-5 bg-[#161B22]/50 rounded-xl hover:bg-[#161B22] hover:-translate-x-1 transition-all cursor-pointer border border-white/5 group shadow-sm hover:shadow-xl hover:border-indigo-500/30"
                >
                  <div className="flex items-center gap-5">
                    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-[#0D1117] text-[10px] font-display font-black text-slate-600 border border-white/5 group-hover:border-indigo-500 group-hover:text-indigo-400 transition-colors shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-200 group-hover:text-indigo-400 transition-colors mb-0.5">{opp.title}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{opp.department}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{opp.targetUsers}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right hidden sm:block">
                      <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter mb-0.5 whitespace-nowrap">Value Index</p>
                      <p className="text-sm font-bold text-white font-mono italic">{opp.totalScore}</p>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border ${getRecBadgeStyles(opp.recommendation)}`}>
                      {opp.recommendation}
                    </div>
                    <ArrowRight size={18} className="text-slate-800 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
              {filteredOpps.length > 5 && (
                <button className="w-full py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors">
                  View {filteredOpps.length - 5} more in backlog
                </button>
              )}
            </div>
          )}
        </div>

        {/* Strategy Focus Card */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[480px]">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="font-display font-medium text-blue-400 text-sm mb-4 tracking-wide uppercase">Strategic Focus</h3>
            <p className="text-2xl font-bold leading-tight mb-8">
              Based on pipeline velocity, prioritize <span className="text-blue-400 italic">Technical Pilot</span> to maximize ROI.
            </p>
            
            <div className="space-y-6">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Resource Allocation</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold">Engineering Ops</span>
                  <span className="text-[10px] font-bold text-blue-400 font-mono">82% Load</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 w-[82%] rounded-full" />
                </div>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Departmental Health</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold">Finance Transformation</span>
                  <span className="text-[10px] font-bold text-amber-400 font-mono">34% Coverage</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 w-[34%] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 mt-6">
            <p className="text-[11px] text-slate-400 mb-6 leading-relaxed italic">
              "Competitive advantage in this era isn't just about having data, but the speed at which you turn it into intelligence."
            </p>
            <button className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group">
              Generate Board Deck <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <OpportunityDetailModal 
        selectedOpp={selectedOpp} 
        onClose={() => setSelectedOpp(null)} 
      />
    </div>
  );
}

function StatCard({ title, value, icon, color, description }: { title: string, value: number, icon: ReactNode, color: string, description: string }) {
  const getGradients = (c: string) => {
    switch(c) {
      case 'emerald': return 'from-emerald-500/10 to-transparent';
      case 'amber': return 'from-amber-500/10 to-transparent';
      case 'blue': return 'from-blue-500/10 to-transparent';
      default: return 'from-slate-500/10 to-transparent';
    }
  };

  return (
    <div className={`bg-[#0D1117] p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors`}>
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${getGradients(color)} -translate-y-1/2 translate-x-1/2 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-black/50 rounded-xl group-hover:scale-110 transition-transform border border-white/5 shadow-sm text-white">
          {icon}
        </div>
        <div className="text-right">
          <span className="text-2xl font-display font-black text-white leading-none">{value}</span>
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1">Strategies</p>
        </div>
      </div>
      <div>
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</h3>
        <p className="text-sm font-bold text-slate-200">{description}</p>
      </div>
    </div>
  );
}

function Lightbulb({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function getRecBadgeStyles(rec: Recommendation) {
  switch (rec) {
    case 'Pursue': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'Pilot': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'Refine': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}

