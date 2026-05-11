import { useState } from 'react';
import { UseCase, Department, Complexity } from '../types';
import { SEED_USE_CASES } from '../data/seedData';
import { Search, ChevronRight, Zap } from 'lucide-react';

interface Props {
  onUseAsInspiration: (useCase: UseCase) => void;
}

export default function UseCaseLibrary({ onUseAsInspiration }: Props) {
  const [filterDepartment, setFilterDepartment] = useState<Department | 'All'>('All');
  const [filterComplexity, setFilterComplexity] = useState<Complexity | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const departments: (Department | 'All')[] = [
    'All', 'HR', 'IT', 'Marketing', 'Sales', 'Finance', 'Operations', 'Customer Support'
  ];

  const filtered = SEED_USE_CASES.filter(uc => {
    const matchesDept = filterDepartment === 'All' || uc.department === filterDepartment;
    const matchesComp = filterComplexity === 'All' || uc.complexity === filterComplexity;
    const matchesSearch = uc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          uc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesComp && matchesSearch;
  });

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <div className="h-1 w-8 bg-indigo-500 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Strategy Blueprints</span>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-white italic uppercase">AI Use Case Library</h1>
          <p className="text-slate-500 max-w-2xl leading-relaxed">
            Browse our library of pre-validated AI transition patterns. Use these as a foundation to accelerate your own strategic architecture.
          </p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search strategy patterns..."
            className="pl-12 pr-6 py-4 bg-[#0D1117] border border-white/5 rounded-full text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 w-full md:w-80 shadow-2xl transition-all text-white placeholder:text-slate-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters Hub - Top Side */}
      <div className="bg-[#0D1117]/50 rounded-[2.5rem] border border-white/5 p-8 sm:p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  Filter by Org Unit
                </h4>
                {filterDepartment !== 'All' && (
                   <button onClick={() => setFilterDepartment('All')} className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest">Reset</button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {departments.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setFilterDepartment(dept)}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black transition-all border uppercase tracking-wider ${
                      filterDepartment === dept 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-500/20 scale-105' 
                        : 'bg-black/40 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-200'
                    }`}
                  >
                    {dept === 'All' ? 'All Units' : dept}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  Technical Complexity
                </h4>
                {filterComplexity !== 'All' && (
                   <button onClick={() => setFilterComplexity('All')} className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-widest">Reset</button>
                )}
              </div>
              <div className="flex gap-2">
                {(['All', 'Low', 'Medium', 'High'] as const).map(comp => (
                  <button
                    key={comp}
                    onClick={() => setFilterComplexity(comp)}
                    className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all border uppercase tracking-wider ${
                      filterComplexity === comp 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-500/20' 
                        : 'bg-black/40 border-white/5 text-slate-500 hover:border-white/10'
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-8 border-t border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Zap size={14} className="text-indigo-400 fill-indigo-400" />
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Showing <span className="text-white">{filtered.length}</span> verified transition patterns</p>
            </div>
            <div className="text-[10px] text-slate-600 font-bold italic uppercase tracking-widest">
              Generated by AI Strategy Core
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12 pb-20">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(uc => (
            <div 
              key={uc.id} 
              className="group bg-[#0D1117] border border-white/5 p-8 rounded-[2rem] shadow-2xl hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col relative overflow-hidden h-full"
            >
              <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000 ${
                uc.complexity === 'Low' ? 'bg-emerald-500' : uc.complexity === 'Medium' ? 'bg-amber-500' : 'bg-red-500'
              }`} />

              <div className="flex items-center justify-between mb-8">
                <span className="px-3 py-1.5 bg-black/40 text-[9px] font-black text-slate-600 rounded-lg uppercase tracking-[0.4em] border border-white/5 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all">
                  {uc.department}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    uc.complexity === 'Low' ? 'bg-emerald-500' : uc.complexity === 'Medium' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{uc.complexity} Complexity</span>
                </div>
              </div>
              
              <h3 className="font-display font-bold text-white mb-3 leading-tight text-xl group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{uc.title}</h3>
              <p className="text-xs text-slate-500 mb-8 leading-relaxed line-clamp-3 font-medium italic">"{uc.description}"</p>
              
              <div className="mt-auto space-y-6 pt-8 border-t border-white/5">
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Target Metrics</p>
                  <div className="flex flex-wrap gap-1.5">
                    {uc.kpis.map(kpi => (
                      <span key={kpi} className="text-[10px] font-bold text-slate-600 bg-black/40 px-3 py-1 rounded-full border border-white/5 group-hover:text-slate-400 transition-colors">
                        {kpi}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => onUseAsInspiration(uc)}
                  className="w-full flex items-center justify-center gap-2 py-5 bg-indigo-600 text-white text-[11px] font-black rounded-2xl hover:bg-indigo-500 transition-all group/btn uppercase tracking-widest shadow-xl shadow-indigo-500/20"
                >
                  Draft Strategy <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-40 text-center bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-24 h-24 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm shadow-slate-200/50">
                <Search className="text-slate-200" size={32} />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-2">No Matching Blueprints</h3>
              <p className="text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">
                We couldn't find any patterns matching your current strategy filters. Try a broader search category.
              </p>
              <button 
                onClick={() => { setFilterDepartment('All'); setFilterComplexity('All'); setSearchQuery(''); }}
                className="mt-8 text-xs font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4"
              >
                Reset All Parameters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
