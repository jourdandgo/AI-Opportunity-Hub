import { useState } from 'react';
import { Opportunity, Department, Recommendation } from '../types';
import { 
  Search, 
  ArrowUpDown, 
  Filter,
  Download,
  Edit2 as Edit, 
  Trash2
} from 'lucide-react';

interface Props {
  opportunities: Opportunity[];
  onEdit: (opp: Opportunity) => void;
  onDelete: (id: string) => void;
}

export default function BacklogView({ opportunities, onEdit, onDelete }: Props) {
  const [filterDepartment, setFilterDepartment] = useState<Department | 'All'>('All');
  const [filterRecommendation, setFilterRecommendation] = useState<Recommendation | 'All'>('All');
  const [sortBy, setSortBy] = useState<'title' | 'score' | 'department'>('score');

  const filtered = opportunities
    .filter(opp => (filterDepartment === 'All' || opp.department === filterDepartment))
    .filter(opp => (filterRecommendation === 'All' || opp.recommendation === filterRecommendation))
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'department') return a.department.localeCompare(b.department);
      return b.totalScore - a.totalScore;
    });

  const departments: (Department | 'All')[] = [
    'All', 'HR', 'IT', 'Marketing', 'Sales', 'Finance', 'Operations', 'Customer Support'
  ];

  const exportToCSV = () => {
    const headers = ['Title', 'Department', 'Problem', 'Solution', 'Reach', 'Impact', 'Feasibility', 'Total Score', 'Recommendation', 'Created At'];
    const rows = filtered.map(o => [
      `"${o.title}"`,
      o.department,
      `"${o.problem.replace(/"/g, '""')}"`,
      `"${o.solution.replace(/"/g, '""')}"`,
      o.reach,
      o.impact,
      o.feasibility,
      o.totalScore,
      o.recommendation,
      o.createdAt
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `ai_opportunity_backlog_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <div className="h-1 w-8 bg-indigo-500 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Inventory</span>
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-white italic">Opportunity Backlog</h1>
          <p className="text-slate-500 max-w-2xl leading-relaxed">
            Manage your collection of AI initiatives. Audit scores, refine strategies, and prioritize your transformation roadmap.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-[#0D1117] border border-white/5 rounded-full px-5 py-2.5 shadow-xl text-xs font-bold text-slate-300 hover:bg-[#161B22] transition-all hover:border-white/10 active:scale-95"
          >
            <Download size={14} /> Export CSV
          </button>
          <div className="flex items-center gap-2 bg-[#0D1117] border border-white/5 rounded-full px-5 py-2.5 shadow-xl focus-within:border-indigo-500 transition-all">
             <Filter size={14} className="text-slate-600" />
             <select 
               className="text-xs font-bold text-slate-300 bg-transparent focus:outline-none appearance-none pr-4 cursor-pointer"
               value={filterDepartment}
               onChange={(e) => setFilterDepartment(e.target.value as any)}
             >
               {departments.map(d => <option key={d} value={d} className="bg-[#0D1117]">{d === 'All' ? 'All Departments' : d}</option>)}
             </select>
          </div>
          <div className="flex items-center gap-2 bg-[#0D1117] border border-white/5 rounded-full px-5 py-2.5 shadow-xl focus-within:border-indigo-500 transition-all">
             <ArrowUpDown size={14} className="text-slate-600" />
             <select 
               className="text-xs font-bold text-slate-300 bg-transparent focus:outline-none appearance-none pr-4 cursor-pointer"
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value as any)}
             >
               <option value="score" className="bg-[#0D1117]">Sort by Diagnostic Score</option>
               <option value="title" className="bg-[#0D1117]">Sort Alphabetically</option>
               <option value="department" className="bg-[#0D1117]">Sort by Org Unit</option>
             </select>
          </div>
        </div>
      </div>

      <div className="bg-[#0D1117] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#161B22] border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] font-sans">Strategic Opportunity</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] font-sans">Org Unit</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] font-sans text-center">Diagnostic (R/I/F)</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] font-sans text-center">Total Index</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] font-sans">Recommendation</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] font-sans text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(opp => (
                <tr key={opp.id} className="hover:bg-[#161B22]/50 transition-colors group">
                  <td className="px-8 py-6 max-w-md">
                    <p className="font-bold text-sm text-slate-200 group-hover:text-indigo-400 transition-colors">{opp.title}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-medium italic">"{opp.problem}"</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {opp.department}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-3">
                      <ScoreOrb value={opp.reach} color="bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" label="R" />
                      <ScoreOrb value={opp.impact} color="bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" label="I" />
                      <ScoreOrb value={opp.feasibility} color="bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" label="F" />
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="font-display text-base font-black text-white bg-black/40 px-3 py-1 rounded-lg border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                      {opp.totalScore}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                     <span className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border inline-block ${getRecBadgeStyles(opp.recommendation)}`}>
                        {opp.recommendation}
                     </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 transition-all">
                      <button 
                        onClick={() => onEdit(opp)}
                        className="p-2.5 rounded-xl bg-[#161B22] border border-white/5 text-slate-600 hover:border-indigo-500 hover:text-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 transition-all shadow-sm"
                        title="Edit Opportunity"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => onDelete(opp.id)}
                        className="p-2.5 rounded-xl bg-[#161B22] border border-white/5 text-slate-600 hover:border-red-500/50 hover:text-red-400 hover:shadow-xl hover:shadow-red-500/10 transition-all shadow-sm"
                        title="Delete Opportunity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filtered.length === 0 && (
          <div className="py-32 text-center bg-slate-900/50">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700 shadow-sm text-slate-600">
              <Search size={32} />
            </div>
            <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">No results match your filters</p>
            <button 
              onClick={() => { setFilterDepartment('All'); setFilterRecommendation('All'); }}
              className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreOrb({ value, color, label }: { value: number, color: string, label: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-black/40 border border-white/5 px-2 py-1 rounded-md shadow-sm">
      <span className="text-[9px] font-black text-slate-700 font-mono italic">{label}</span>
      <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
      <span className="text-[10px] font-bold text-slate-400 font-mono">{value}</span>
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

function getRecommendationStyles(rec: Recommendation) {
  switch (rec) {
    case 'Pursue': return 'bg-emerald-500/20 text-emerald-400';
    case 'Pilot': return 'bg-amber-500/20 text-amber-400';
    case 'Refine': return 'bg-blue-500/20 text-blue-400';
    case 'Park': return 'bg-slate-500/20 text-slate-400';
    default: return 'bg-slate-500/20 text-slate-400';
  }
}
