import { useState, useEffect, FormEvent } from 'react';
import { Opportunity, Department, Recommendation, UseCase } from '../types';
import { Save, X, ChevronRight } from 'lucide-react';
import { calculateRecommendation } from '../utils/engine';

interface Props {
  onSubmit: (opp: any) => void;
  initialData?: Opportunity;
  template?: UseCase;
  onCancel: () => void;
}

export default function OpportunityForm({ onSubmit, initialData, template, onCancel }: Props) {
  const [formData, setFormData] = useState({
    title: initialData?.title || template?.title || '',
    department: initialData?.department || template?.department || 'Marketing' as Department,
    problem: initialData?.problem || template?.description || '',
    solution: initialData?.solution || (template ? `Implement ${template.title} solution pattern.` : ''),
    targetUsers: initialData?.targetUsers || '',
    benefit: initialData?.benefit || '',
    kpis: initialData?.kpis.join(', ') || template?.kpis.join(', ') || '',
    reach: initialData?.reach || 3,
    impact: initialData?.impact || 3,
    feasibility: initialData?.feasibility || (template?.complexity === 'Low' ? 5 : template?.complexity === 'Medium' ? 3 : 1),
  });

  const [preview, setPreview] = useState<{ recommendation: Recommendation; explanation: string } | null>(null);

  useEffect(() => {
    const res = calculateRecommendation(formData.impact, formData.feasibility, formData.reach);
    setPreview(res);
  }, [formData.impact, formData.feasibility, formData.reach]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      kpis: formData.kpis.split(',').map(k => k.trim()).filter(k => k !== ''),
      id: initialData?.id || undefined,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <div className="h-1 w-6 bg-indigo-500 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Strategy Formulation</span>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-white italic">
            {initialData ? 'Refine Initiative' : 'Construct Strategy'}
          </h1>
          <p className="text-slate-500 max-w-xl leading-relaxed">
            Architect the business case for your AI transformation. Define the technical bounds and quantify the expected strategic value.
          </p>
        </div>
        <button 
          onClick={onCancel}
          className="flex items-center gap-2 px-6 py-3 bg-[#0D1117] text-slate-400 hover:text-white hover:bg-[#161B22] rounded-full text-xs font-bold transition-all border border-white/5 shadow-2xl"
        >
          <X size={16} /> Discard Blueprint
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Basic Info */}
        <div className="md:col-span-7 space-y-12">
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#0D1117] border border-white/5 flex items-center justify-center font-display font-black text-slate-700 shadow-xl">01</div>
              <h3 className="font-display font-bold text-lg text-white">Environmental Context</h3>
            </div>
            
            <div className="space-y-6 pl-14">
              <div className="group space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Strategic Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Sales Outreach Personalization Engine"
                  className="w-full px-5 py-4 bg-[#0D1117] border border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-2xl font-medium text-white placeholder:text-slate-700"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Organizational Unit</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-4 bg-[#0D1117] border border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all appearance-none shadow-2xl cursor-pointer font-bold text-white italic"
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value as Department })}
                    >
                      <option className="bg-[#0D1117]">HR</option>
                      <option className="bg-[#0D1117]">IT</option>
                      <option className="bg-[#0D1117]">Marketing</option>
                      <option className="bg-[#0D1117]">Sales</option>
                      <option className="bg-[#0D1117]">Finance</option>
                      <option className="bg-[#0D1117]">Operations</option>
                      <option className="bg-[#0D1117]">Customer Support</option>
                    </select>
                    <ChevronRight size={18} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-600 pointer-events-none" />
                  </div>
                </div>
                <div className="group space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Target Beneficiary</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Demand Gen Team"
                    className="w-full px-5 py-4 bg-[#0D1117] border border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-2xl font-medium text-white placeholder:text-slate-700"
                    value={formData.targetUsers}
                    onChange={e => setFormData({ ...formData, targetUsers: e.target.value })}
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Strategic Friction Point</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe the current friction or inefficiency that AI needs to address..."
                  className="w-full px-5 py-4 bg-[#0D1117] border border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all resize-none shadow-2xl font-medium text-white placeholder:text-slate-700"
                  value={formData.problem}
                  onChange={e => setFormData({ ...formData, problem: e.target.value })}
                />
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#0D1117] border border-white/5 flex items-center justify-center font-display font-black text-slate-700 shadow-xl">02</div>
              <h3 className="font-display font-bold text-lg text-white">Transformation Pattern</h3>
            </div>
            
            <div className="space-y-8 pl-14">
              <div className="group space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">AI Solution Architecture</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Which AI models or techniques (e.g. RAG, Vision, Automation) will solve this?"
                  className="w-full px-5 py-4 bg-[#0D1117] border border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all resize-none shadow-2xl font-medium italic text-white placeholder:text-slate-700"
                  value={formData.solution}
                  onChange={e => setFormData({ ...formData, solution: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-emerald-400 transition-colors">Expected Benefit</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. 30% reduction in triage time"
                    className="w-full px-5 py-4 bg-[#0D1117] border border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all shadow-2xl font-bold text-white placeholder:text-slate-700"
                    value={formData.benefit}
                    onChange={e => setFormData({ ...formData, benefit: e.target.value })}
                  />
                </div>
                <div className="group space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Success Metrics</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. CAC, MTTR, Accuracy"
                    className="w-full px-5 py-4 bg-[#0D1117] border border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all shadow-2xl font-medium text-white placeholder:text-slate-700"
                    value={formData.kpis}
                    onChange={e => setFormData({ ...formData, kpis: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Scoring & Diagnostic */}
        <div className="md:col-span-5">
          <div className="bg-[#0D1117] border border-white/5 p-8 rounded-[2rem] shadow-2xl space-y-10 sticky top-28">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <h3 className="font-display font-bold text-lg text-white italic uppercase tracking-wider">Strategy Index</h3>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 rounded-lg border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] font-mono">Quantum Logic</span>
              </div>
            </div>
            
            <div className="space-y-10">
              <ScoreSlider 
                label="Reach" 
                detail="Depth of organizational impact"
                value={formData.reach} 
                onChange={val => setFormData({ ...formData, reach: val })} 
              />
              
              <ScoreSlider 
                label="Impact" 
                detail="Net business value & ROI"
                value={formData.impact} 
                onChange={val => setFormData({ ...formData, impact: val })} 
              />
              
              <ScoreSlider 
                label="Feasibility" 
                detail="Technical maturity needed"
                value={formData.feasibility} 
                onChange={val => setFormData({ ...formData, feasibility: val })} 
              />
            </div>

            {/* Recommendation Diagnostic */}
            {preview && (
              <div className={`p-8 rounded-3xl border shadow-xl transition-all duration-700 ${getDiagnosticStyles(preview.recommendation)}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Strategy Diagnostic</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-display font-black tracking-tight">{preview.recommendation}</span>
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-current/10 mb-6 font-mono text-[11px] leading-relaxed italic">
                  "{preview.explanation}"
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase opacity-50">Strategic Index (R·I·F)</p>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-display font-black leading-none">{formData.reach + formData.impact + formData.feasibility}</span>
                      <span className="text-sm opacity-50 font-bold mb-1">/15</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pb-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => (
                      <div 
                        key={i} 
                        className={`w-1 h-6 rounded-full transition-all duration-700 ${
                          i <= (formData.reach + formData.impact + formData.feasibility)
                            ? 'bg-current opacity-100' 
                            : 'bg-current opacity-10'
                        }`} 
                        style={{ height: `${12 + (i % 3) * 6}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 flex flex-col gap-4">
               <button 
                 type="submit"
                 className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-display font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 hover:-translate-y-1 active:scale-95 group uppercase tracking-widest"
               >
                 <Save size={18} className="group-hover:scale-110 transition-transform" /> 
                 {initialData ? 'Update Strategy' : 'Commit Strategy'}
               </button>
               <p className="text-[10px] text-slate-600 text-center font-medium italic">
                 Finalizing will commit this architecture to the global strategic pipeline.
               </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function ScoreSlider({ label, detail, value, onChange }: { label: string, detail: string, value: number, onChange: (val: number) => void }) {
  return (
    <div className="space-y-6 group">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
           <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-blue-400 transition-colors">{label}</p>
           <p className="text-[10px] text-slate-600 italic font-medium">{detail}</p>
        </div>
        <div className="flex items-end gap-1 font-display">
          <span className="text-3xl font-black text-white leading-none">{value}</span>
          <span className="text-xs font-bold text-slate-700 mb-0.5">/5</span>
        </div>
      </div>
      <div className="relative pt-2">
        <input 
          type="range" 
          min="1" 
          max="5" 
          step="1"
          className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500 group-hover:bg-slate-600 transition-colors"
          value={value}
          onChange={e => onChange(parseInt(e.target.value))}
        />
        <div className="flex justify-between px-0.5 mt-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`flex flex-col items-center gap-2`}>
              <div className={`w-1 h-3 rounded-full transition-all duration-500 ${i <= value ? 'bg-blue-500' : 'bg-slate-700'}`} />
              <span className={`text-[8px] font-black font-mono transition-colors ${i === value ? 'text-white' : 'text-slate-700'}`}>{i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getDiagnosticStyles(rec: Recommendation) {
  switch (rec) {
    case 'Pursue': return 'bg-emerald-500 text-white border-emerald-400 selection:bg-emerald-300';
    case 'Pilot': return 'bg-amber-500 text-white border-amber-400 selection:bg-amber-100';
    case 'Refine': return 'bg-blue-600 text-white border-blue-500 selection:bg-blue-300';
    default: return 'bg-slate-800 text-white border-slate-700 selection:bg-slate-600';
  }
}
