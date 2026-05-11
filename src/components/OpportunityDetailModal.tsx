import { ReactNode } from 'react';
import { Opportunity, Recommendation } from '../types';
import { Users, Activity, Layers, X } from 'lucide-react';
import Modal from './Modal';

interface Props {
  selectedOpp: Opportunity | null;
  onClose: () => void;
}

export default function OpportunityDetailModal({ selectedOpp, onClose }: Props) {
  if (!selectedOpp) return null;

  return (
    <Modal 
      isOpen={selectedOpp !== null} 
      onClose={onClose}
      title="Strategy Diagnostic Brief"
    >
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
            onClick={onClose}
            className="px-8 py-5 border border-white/10 text-slate-400 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:text-white hover:bg-white/5 transition-all"
          >
            Exit Brief
          </button>
          <button className="px-10 py-5 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:bg-indigo-500 hover:-translate-y-1 transition-all active:scale-95">
            Generate Architecture Spec
          </button>
        </div>
      </div>
    </Modal>
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

function getRecBadgeStyles(rec: Recommendation) {
  switch (rec) {
    case 'Pursue': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'Pilot': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'Refine': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}
