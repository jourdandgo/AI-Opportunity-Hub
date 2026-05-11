import { useState } from 'react';
import { Opportunity, Recommendation } from '../types';
import { motion } from 'motion/react';
import OpportunityDetailModal from './OpportunityDetailModal';

interface Props {
  opportunities: Opportunity[];
}

export default function DecisionBoard({ opportunities }: Props) {
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);

  const categories: { type: Recommendation; label: string; desc: string; stripe: string }[] = [
    { type: 'Pursue', label: 'Priority Pursue', desc: 'High impact, high feasibility. Execute immediately.', stripe: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' },
    { type: 'Pilot', label: 'Technical Pilot', desc: 'High promise, moderate complexity. Test at scale.', stripe: 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]' },
    { type: 'Refine', label: 'Strategic Refine', desc: 'Potential value, but low feasibility or reach.', stripe: 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]' },
    { type: 'Park', label: 'Resource Park', desc: 'Low impact or too complex for current phase.', stripe: 'bg-slate-700 shadow-[0_0_10px_rgba(255,255,255,0.05)]' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
      {categories.map((cat) => {
        const items = opportunities.filter(o => o.recommendation === cat.type);
        return (
          <div key={cat.type} className="flex flex-col gap-4">
            <div className="space-y-1.5 px-1 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-widest italic">{cat.label}</h3>
                <span className="text-[10px] font-bold bg-[#161B22] text-slate-500 w-6 h-6 rounded-lg flex items-center justify-center shadow-inner border border-white/5">
                  {items.length}
                </span>
              </div>
              <p className="text-[10px] text-slate-600 font-medium leading-tight">{cat.desc}</p>
            </div>

            <div className="space-y-4 min-h-[500px] bg-black/20 rounded-3xl p-4 border border-white/5 border-dashed transition-colors hover:bg-black/30">
               {items.map(opp => (
                 <motion.div 
                   layout
                   key={opp.id} 
                   onClick={() => setSelectedOpp(opp)}
                   className="bg-[#0D1117] rounded-2xl border border-white/5 p-6 shadow-2xl hover:border-indigo-500/30 transition-all cursor-pointer relative overflow-hidden group"
                 >
                   <div className={`absolute top-0 left-0 w-1 h-full ${cat.stripe}`} />
                   
                   <div className="mb-6">
                     <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-2">{opp.department}</p>
                     <h4 className="font-bold text-sm text-slate-200 leading-snug group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{opp.title}</h4>
                   </div>

                   <div className="flex items-center justify-between pt-4 border-t border-white/5">
                     <div className="flex gap-4">
                        <div className="text-center">
                           <p className="text-[8px] font-bold text-slate-700 uppercase">R</p>
                           <p className="text-[10px] font-bold text-slate-500">{opp.reach}</p>
                        </div>
                        <div className="text-center">
                           <p className="text-[8px] font-bold text-slate-700 uppercase">I</p>
                           <p className="text-[10px] font-bold text-slate-500">{opp.impact}</p>
                        </div>
                        <div className="text-center">
                           <p className="text-[8px] font-bold text-slate-700 uppercase">F</p>
                           <p className="text-[10px] font-bold text-slate-500">{opp.feasibility}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[8px] font-bold text-slate-700 uppercase">Index</p>
                        <p className="text-sm font-display font-black text-white">{opp.totalScore}</p>
                     </div>
                   </div>
                 </motion.div>
               ))}
               
               {items.length === 0 && (
                 <div className="h-40 flex flex-col items-center justify-center border border-white/5 rounded-2xl bg-black/10 space-y-2 opacity-20 grayscale">
                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Inventory Null</p>
                 </div>
               )}
            </div>
          </div>
        );
      })}
      
      <OpportunityDetailModal 
        selectedOpp={selectedOpp} 
        onClose={() => setSelectedOpp(null)} 
      />
    </div>
  );
}
