import { useState } from 'react';
import { SummaryStats, Opportunity, Recommendation } from '../types';
import { Target, Rocket, RefreshCw, Archive, Plus, BarChart3, PieChart as PieChartIcon, X, Users, Activity, Layers, ArrowRight, Zap } from 'lucide-react';
import { ReactNode } from 'react';
import Modal from './Modal';
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

  const filteredOpps = (filterRec 
    ? opportunities.filter(o => o.recommendation === filterRec)
    : opportunities).sort((a, b) => b.totalScore - a.totalScore);

  const handleChartClick = (data: any) => {
    if (data && data.activeLabel) {
      setFilterRec(data.activeLabel as Recommendation);
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
          <div className="flex items-center gap-2 mb-8">
             <PieChartIcon size={20} className="text-indigo-400" />
             <h3 className="font-display font-bold text-lg text-white">Org Load</h3>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            {deptData.length > 0 ? (
              <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                <div className="h-64 w-64 flex-shrink-0">
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
                      >
                        {deptData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'][index % 6]} strokeWidth={0} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3 min-w-[140px]">
                   {deptData.map((dept, index) => (
                     <div key={dept.name} className="flex items-center justify-between group gap-4">
                       <div className="flex items-center gap-3 overflow-hidden">
                         <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'][index % 6] }} />
                         <span className="text-[11px] font-bold text-slate-300 truncate leading-none">{dept.name}</span>
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
              {filterRec ? `${filterRec} Strategies` : 'Strategic Pipeline'}
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

      <Modal 
        isOpen={selectedOpp !== null} 
        onClose={() => setSelectedOpp(null)}
        title="Strategy Diagnostic Brief"
      >
        {selectedOpp && (
          <div className="space-y-10">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0D1117] border border-white/5 p-8 sm:p-10 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${getRecBadgeStyles(selectedOpp.recommendation)} bg-black/40`}>
                    Recommendation: {selectedOpp.recommendation}
                  </div>
                  <div className="px-4 py-1.5 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] bg-white/5 border border-white/5">
                    Dept: {selectedOpp.department}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="space-y-3">
                    <h2 className="text-3xl sm:text-5xl font-display font-black text-white italic tracking-tight leading-tight uppercase">
                      {selectedOpp.title}
                    </h2>
                    <div className="flex items-center gap-4 text-slate-400">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-indigo-400" />
                        <span className="text-sm font-medium">{selectedOpp.targetUsers}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-slate-700" />
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-emerald-400" />
                        <span className="text-sm font-medium">Diagnostic Index: {selectedOpp.totalScore}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 bg-black/40 p-8 rounded-3xl border border-white/5 shadow-inner text-center min-w-[160px]">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-2">Value Score</p>
                    <p className="text-6xl font-display font-black text-white italic tracking-tighter">{selectedOpp.totalScore}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ScoreMetric label="Reach" value={selectedOpp.reach} description="Breadth of impact across the ecosystem" color="blue" />
              <ScoreMetric label="Impact" value={selectedOpp.impact} description="Depth of business transformation" color="emerald" />
              <ScoreMetric label="Feasibility" value={selectedOpp.feasibility} description="Technical readiness and ease" color="amber" />
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <section className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em] flex items-center gap-3 px-2">
                    <div className="w-1.5 h-4 bg-red-500 rounded-full" />
                    Problem Definition
                  </h4>
                  <div className="bg-[#0D1117]/50 p-8 rounded-3xl border border-white/5 text-slate-200 text-lg leading-relaxed italic">
                    "{selectedOpp.problem}"
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em] flex items-center gap-3 px-2">
                    <div className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                    Solution Architecture
                  </h4>
                  <div className="bg-indigo-600/10 p-8 rounded-3xl border border-indigo-500/20 text-white text-xl font-bold leading-relaxed italic">
                    {selectedOpp.solution}
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em] flex items-center gap-3 px-2">
                    <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                    Projected Value
                  </h4>
                  <div className="bg-emerald-600/10 p-8 rounded-3xl border border-emerald-500/20 text-emerald-400 text-3xl font-display font-black italic tracking-tight uppercase">
                    {selectedOpp.benefit}
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em] flex items-center gap-3 px-2">
                    <div className="w-1.5 h-4 bg-slate-500 rounded-full" />
                    Target Success Metrics
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedOpp.kpis.map(kpi => (
                      <div key={kpi} className="px-5 py-4 bg-[#0D1117] border border-white/5 text-white text-xs font-bold rounded-2xl shadow-xl flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {kpi}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Neural Rationale */}
            <section className="pt-8 border-t border-white/5 space-y-6">
              <div className="flex items-center gap-3 px-2">
                <Layers size={18} className="text-slate-600" />
                <h4 className="text-[11px] font-black uppercase text-slate-600 tracking-[0.4em]">Strategic Rationalization</h4>
              </div>
              <div className="bg-black/20 p-8 rounded-[2rem] border border-white/5 border-dashed">
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {selectedOpp.explanation}
                </p>
              </div>
            </section>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-10 border-t border-white/5">
              <button 
                onClick={() => setSelectedOpp(null)}
                className="px-8 py-5 border border-white/10 text-slate-400 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:text-white hover:bg-white/5 transition-all"
              >
                Exit Brief
              </button>
              <button className="px-10 py-5 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:bg-indigo-500 hover:-translate-y-1 transition-all active:scale-95">
                Generate Architecture Spec
              </button>
            </div>
          </div>
        )}
      </Modal>
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

function DetailChip({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-[#161B22] px-4 py-1.5 rounded-xl border border-white/5 shadow-xl">
      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mr-3">{label}</span>
      <span className="text-xs font-bold text-white">{value}</span>
    </div>
  );
}

function ScoreMetric({ label, value, description, color }: { label: string, value: number, description: string, color: 'blue' | 'emerald' | 'amber' }) {
  const colors = {
    blue: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20 shadow-indigo-500/10',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-500/10'
  };

  const orbColors = {
    blue: 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]',
    emerald: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    amber: 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
  };

  return (
    <div className={`p-8 rounded-[2rem] border ${colors[color].split(' ')[2]} bg-[#0D1117] flex flex-col items-center text-center space-y-4 group hover:shadow-2xl transition-all hover:bg-[#161B22]`}>
      <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] font-sans">{label} Index</h5>
      <div className="relative">
        <p className="text-5xl font-display font-black text-white group-hover:scale-110 transition-transform italic">{value}<span className="text-xs text-slate-700 italic font-medium ml-1">/5</span></p>
      </div>
      <p className="text-[10px] font-bold text-slate-400 leading-tight uppercase tracking-widest">{description}</p>
      <div className="flex gap-1.5 pt-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-700 ${i <= value ? orbColors[color] : 'bg-white/5'}`} />
        ))}
      </div>
    </div>
  );
}

function ScoreBlock({ label, value, icon, color, bgColor }: { label: string, value: number, icon: ReactNode, color: string, bgColor: string }) {
  return (
    <div className="flex flex-col items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100">
      <div className={`w-10 h-10 rounded-full ${bgColor} ${color} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full ${i <= value ? color.replace('text', 'bg') : 'bg-slate-200'}`} 
          />
        ))}
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

function getBarColor(rec: Recommendation) {
  switch (rec) {
    case 'Pursue': return 'bg-emerald-500';
    case 'Pilot': return 'bg-amber-500';
    case 'Refine': return 'bg-blue-500';
    case 'Park': return 'bg-slate-400';
    default: return 'bg-slate-400';
  }
}

function getRecBadgeStyles(rec: Recommendation) {
  switch (rec) {
    case 'Pursue': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'Pilot': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'Refine': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}

function getRecommendationStyles(rec: Recommendation) {
  switch (rec) {
    case 'Pursue': return 'bg-emerald-500/20 text-emerald-400';
    case 'Pilot': return 'bg-amber-500/20 text-amber-400';
    case 'Refine': return 'bg-blue-500/20 text-blue-400';
    case 'Park': return 'bg-slate-500/20 text-slate-400';
    default: return 'bg-slate-500/20 text-slate-400';
  }
}

