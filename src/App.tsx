/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Lightbulb, 
  PlusCircle, 
  ListTodo, 
  LayoutPanelLeft,
  Search,
  LogOut,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Opportunity, UseCase, SummaryStats, Department, Recommendation } from './types';
import { SEED_USE_CASES } from './data/seedData';
import { calculateRecommendation } from './utils/engine';
import { auth } from './lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { firebaseService } from './lib/firebaseService';

// Components
import DashboardView from './components/DashboardView';
import UseCaseLibrary from './components/UseCaseLibrary';
import OpportunityForm from './components/OpportunityForm';
import BacklogView from './components/BacklogView';
import DecisionBoard from './components/DecisionBoard';

type View = 'dashboard' | 'library' | 'add' | 'backlog' | 'board';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);
  const [templateToUse, setTemplateToUse] = useState<UseCase | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setOpportunities([]);
      return;
    }

    const unsubscribeOpps = firebaseService.subscribeToOpportunities((syncedOpps) => {
      setOpportunities(syncedOpps);
    });

    return () => unsubscribeOpps();
  }, [user]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login Error:", error);
      if (error.code === 'auth/unauthorized-domain') {
        alert("Domain Not Authorized: Please add this Vercel URL to your Authorized Domains in the Firebase Console (Authentication > Settings).");
      }
    }
  };

  const handleLogout = () => signOut(auth);

  const addOpportunity = async (opp: Omit<Opportunity, 'id' | 'totalScore' | 'recommendation' | 'explanation' | 'createdAt'>) => {
    const { recommendation, explanation } = calculateRecommendation(opp.impact, opp.feasibility, opp.reach);
    const newOpp: Omit<Opportunity, 'id'> = {
      ...opp,
      totalScore: opp.reach + opp.impact + opp.feasibility,
      recommendation,
      explanation,
      createdAt: new Date().toISOString(),
    };
    await firebaseService.addOpportunity(newOpp);
    setCurrentView('backlog');
  };

  const updateOpportunity = async (opp: Opportunity) => {
     const { recommendation, explanation } = calculateRecommendation(opp.impact, opp.feasibility, opp.reach);
     const updatedOpp: Partial<Opportunity> = {
       ...opp,
       totalScore: opp.reach + opp.impact + opp.feasibility,
       recommendation,
       explanation,
     };
     // Remove id from updates
     const { id, ...data } = updatedOpp as any;
     await firebaseService.updateOpportunity(id, data);
     setEditingOpportunity(null);
     setCurrentView('backlog');
  };

  const deleteOpportunity = async (id: string) => {
    await firebaseService.deleteOpportunity(id);
  };

  const seedInitialData = async (forceClear = false) => {
    if (!user || isSeeding) return;
    setIsSeeding(true);

    try {
      if (forceClear) {
        for (const opp of opportunities) {
          await firebaseService.deleteOpportunity(opp.id);
        }
      }

      const initialOpps = [
      // PURSUE (20)
      { title: 'Customer Support Triage Bot', department: 'Customer Support', problem: 'High basic ticket volume.', solution: 'LLM-based classifier.', targetUsers: 'Support Tier 1', benefit: '$1.2M Annual Savings', kpis: ['Resolution Time', 'Deflection Rate'], reach: 5, impact: 5, feasibility: 5 },
      { title: 'Marketing Content Engine', department: 'Marketing', problem: 'Ad copy generation lag.', solution: 'Custom GPT for brand-aligned copy.', targetUsers: 'Content Team', benefit: '4x Content Output', kpis: ['Lead Quality', 'CTR'], reach: 5, impact: 4, feasibility: 5 },
      { title: 'Talent Sourcing Agent', department: 'HR', problem: 'Niche hiring bottlenecks.', solution: 'AI recruiter for passive talent.', targetUsers: 'HR Staff', benefit: '50% Faster Sourcing', kpis: ['Time-to-Hire', 'Pipeline Depth'], reach: 5, impact: 4, feasibility: 4 },
      { title: 'Invoice Data Extractor', department: 'Finance', problem: 'Manual AP entry errors.', solution: 'OCR + LLM for automated billing.', targetUsers: 'Finance Team', benefit: '99% Entry Accuracy', kpis: ['Processing Cost', 'Error Rate'], reach: 4, impact: 5, feasibility: 5 },
      { title: 'IT Service Desk Assistant', department: 'IT', problem: 'Employee password resets.', solution: 'Self-service AI chatbot.', targetUsers: 'All Employees', benefit: '30% IT Workload Reduc.', kpis: ['MTTR', 'Ticket Volume'], reach: 5, impact: 4, feasibility: 5 },
      { title: 'Sales Email Personalizer', department: 'Sales', problem: 'Low outbound response rates.', solution: 'AI-driven dynamic outreach.', targetUsers: 'SDRs', benefit: '3x Meeting Bookings', kpis: ['Conv Rate', 'Response Rate'], reach: 4, impact: 4, feasibility: 4 },
      { title: 'Supply Chain Tracker', department: 'Operations', problem: 'Inventory visibility gaps.', solution: 'Predictive stock monitoring.', targetUsers: 'Logistics', benefit: '20% Inventory Optimization', kpis: ['Stock Turns', 'Shortage %'], reach: 4, impact: 5, feasibility: 4 },
      { title: 'Legal Contract Reviewer', department: 'Operations', problem: 'Contract review backlog.', solution: 'AI analysis for standard clauses.', targetUsers: 'Legal Team', benefit: '70% Faster Reviews', kpis: ['Cycle Time', 'Risk Flagging'], reach: 3, impact: 5, feasibility: 4 },
      { title: 'Sentiment Analysis Hub', department: 'Marketing', problem: 'Fragmented brand feedback.', solution: 'Unified social listening hub.', targetUsers: 'Brand Managers', benefit: 'Real-time Crisis Alerting', kpis: ['Net Sentiment', 'Alert Acc.'], reach: 5, impact: 4, feasibility: 4 },
      { title: 'Code Review Copilot', department: 'IT', problem: 'Dev bottlenecks in PRs.', solution: 'AI assistant for tech debt flagging.', targetUsers: 'Engineers', benefit: '25% Dev Velocity Up', kpis: ['PR Velocity', 'Bug Density'], reach: 3, impact: 5, feasibility: 5 },
      { title: 'Expense Fraud Shield', department: 'Finance', problem: 'Micro-fraud in expenses.', solution: 'Anomaly detection for claims.', targetUsers: 'Internal Audit', benefit: 'Recover $500k/yr', kpis: ['Fraud Detected', 'FPR'], reach: 4, impact: 4, feasibility: 5 },
      { title: 'Customer Feedback Cluster', department: 'Customer Support', problem: 'Inability to find product trends.', solution: 'Unsupervised clustering of CS logs.', targetUsers: 'Product Managers', benefit: 'Evidence-based Roadmap', kpis: ['Feature Adoption', 'Churn'], reach: 4, impact: 4, feasibility: 4 },
      { title: 'Employee Onboarding Buddy', department: 'HR', problem: 'Slow ramp-up for new hires.', solution: 'Instant internal Q&A agent.', targetUsers: 'New Jobs', benefit: '20% Faster Ramp Time', kpis: ['Time-to-Prod', 'Retention'], reach: 3, impact: 4, feasibility: 5 },
      { title: 'Logistics Route Optimizer', department: 'Operations', problem: 'Rising fuel/labor costs.', solution: 'Genetic algorithm for routing.', targetUsers: 'Delivery Drivers', benefit: '15% Fuel Savings', kpis: ['Cost/Mile', 'Ontime %'], reach: 3, impact: 5, feasibility: 4 },
      { title: 'B2B Lead Scoring 2.0', department: 'Sales', problem: 'Low quality pipeline intent.', solution: 'Intent signal modeling.', targetUsers: 'Sales Ops', benefit: '2x Deal Velocity', kpis: ['Win Rate', 'Deal Size'], reach: 3, impact: 5, feasibility: 4 },
      { title: 'Meeting Intel Summarizer', department: 'IT', problem: 'Lost knowledge in calls.', solution: 'Transcript summarization agent.', targetUsers: 'All Teams', benefit: 'Recover 4h/week/employee', kpis: ['Search Relevancy', 'Adoption'], reach: 5, impact: 4, feasibility: 5 },
      { title: 'Automated FAQ Portal', department: 'Customer Support', problem: 'Static help articles outdated.', solution: 'AI-generated help docs.', targetUsers: 'External Users', benefit: '90% Search Relevancy', kpis: ['Self-service Rate', 'SEO'], reach: 5, impact: 4, feasibility: 5 },
      { title: 'Strategy Brief Generator', department: 'Operations', problem: 'Inconsistent planning docs.', solution: 'Template-based AI drafter.', targetUsers: 'Executives', benefit: 'Uniform Strategy Output', kpis: ['Plan Velocity', 'Alignment'], reach: 3, impact: 4, feasibility: 5 },
      { title: 'Documentation Assistant', department: 'IT', problem: 'Technical docs are stale.', solution: 'AI sync with codebase changes.', targetUsers: 'Developers', benefit: 'Up-to-date SDKs', kpis: ['Doc Coverage', 'Dev Satisfaction'], reach: 3, impact: 4, feasibility: 4 },
      { title: 'Competitor Intel Radar', department: 'Marketing', problem: 'Late market response.', solution: 'AI competitor web-scraping.', targetUsers: 'Strategy Team', benefit: 'First-mover Advantage', kpis: ['Market Share', 'Pricing Acc.'], reach: 3, impact: 5, feasibility: 4 },

      // PILOT (10)
      { title: 'Dynamic Pricing Engine', department: 'Sales', problem: 'Stagnant B2B price sheets.', solution: 'Real-time volatility adjustment.', targetUsers: 'Pricing Team', benefit: '10% Margin Expansion', kpis: ['Profitability', 'Win Rate'], reach: 3, impact: 5, feasibility: 3 },
      { title: 'Synthetic Data Emulator', department: 'IT', problem: 'Privacy blocks testing.', solution: 'Generative tabular data.', targetUsers: 'QA Teams', benefit: 'Compliant Scaling', kpis: ['Test Speed', 'Privacy Score'], reach: 3, impact: 4, feasibility: 3 },
      { title: 'Smart Building Optimizer', department: 'Operations', problem: 'HVAC energy bills.', solution: 'Reinforcement learning for HVAC.', targetUsers: 'Facility Mgmt', benefit: '30% Energy Savings', kpis: ['Utility Cost', 'Carbon Footprint'], reach: 4, impact: 4, feasibility: 3 },
      { title: 'Behavioral Loyalty Hub', department: 'Marketing', problem: 'Generic coupons.', solution: 'Behavioral reward modeling.', targetUsers: 'VIP Customers', benefit: '25% LTV Increase', kpis: ['Loyalty ROI', 'Retention'], reach: 4, impact: 4, feasibility: 3 },
      { title: 'Real-time Voice Dubber', department: 'Marketing', problem: 'Localization lag.', solution: 'AI voice & sync translation.', targetUsers: 'Global Markets', benefit: '10x Global Reach', kpis: ['Viewership', 'Market Pen.'], reach: 5, impact: 4, feasibility: 3 },
      { title: 'AI-Led Compliance Audit', department: 'Finance', problem: 'Manual audit latency.', solution: 'Continuous transaction auditing.', targetUsers: 'Compliance Officer', benefit: 'Zero Failures', kpis: ['Audit Speed', 'Risk Score'], reach: 3, impact: 5, feasibility: 3 },
      { title: 'Skill Gap Predictor', department: 'HR', problem: 'Obsolescence risk.', solution: 'AI trend vs internal scan.', targetUsers: 'L&D Leaders', benefit: 'Pre-emptive Upskilling', kpis: ['Internal Mobility', 'Vacancy Time'], reach: 4, impact: 4, feasibility: 3 },
      { title: 'Visual Search Catalog', department: 'Customer Support', problem: 'Unstructured search.', solution: 'Image-embedding search.', targetUsers: 'Mobile App Users', benefit: '50% Faster Search', kpis: ['Conv Rate', 'CSAT'], reach: 4, impact: 4, feasibility: 3 },
      { title: 'Predictive Churn Radar', department: 'Sales', problem: 'Silent churn.', solution: 'Multi-signal health modeling.', targetUsers: 'Account Managers', benefit: 'Prevent 15% Churn', kpis: ['Net Retention', 'LTV'], reach: 3, impact: 5, feasibility: 3 },
      { title: 'Neural Support Chat', department: 'Customer Support', problem: 'Siloed languages.', solution: 'Real-time neural translation.', targetUsers: 'Global Agents', benefit: 'Universal Utilization', kpis: ['Agent Load', 'CSAT'], reach: 5, impact: 4, feasibility: 3 },

      // REFINE (5)
      { title: 'Emotion-Based Routing', department: 'Customer Support', problem: 'Generic desk for VIPs.', solution: 'Voice sentiment routing.', targetUsers: 'VIP Support', benefit: 'Crisis Avoidance', kpis: ['Escalations', 'NPS'], reach: 4, impact: 3, feasibility: 2 },
      { title: 'Generative Logo Bot', department: 'Marketing', problem: 'Iterative design lag.', solution: 'AI brand-asset creator.', targetUsers: 'Designers', benefit: 'Rapid Prototyping', kpis: ['Brand Cohesion', 'Creative Cost'], reach: 2, impact: 3, feasibility: 2 },
      { title: 'Branch Site Manager AI', department: 'Operations', problem: 'Visibility gaps.', solution: 'Vision-based ops monitoring.', targetUsers: 'Regional Leads', benefit: 'Remote Management', kpis: ['Site Health', 'Ops Exp.'], reach: 2, impact: 3, feasibility: 1 },
      { title: 'Performance Review Bot', department: 'HR', problem: 'Evaluation bias.', solution: 'Objective metric bot.', targetUsers: 'HR Staff', benefit: 'Zero Bias', kpis: ['Fairness Score', 'Speed'], reach: 5, impact: 2, feasibility: 2 },
      { title: 'Legal Drafting AI', department: 'Finance', problem: 'Slow legal drafting.', solution: 'Strict template generator.', targetUsers: 'Legal Team', benefit: 'Instant Drafts', kpis: ['Draft Speed', 'Doc Error'], reach: 2, impact: 3, feasibility: 2 },

      // PARK (5)
      { title: 'Coffee Barista Bot', department: 'Operations', problem: 'Morning wait times.', solution: 'Robotic barista.', targetUsers: 'Employees', benefit: 'Perk Satisfaction', kpis: ['Wait Time', 'Sentiment'], reach: 2, impact: 1, feasibility: 1 },
      { title: 'Holodeck VR Trainer', department: 'IT', problem: 'Textual training.', solution: 'Generative 3D spaces.', targetUsers: 'Training Teams', benefit: 'Immersive Learning', kpis: ['Retention', 'Speed'], reach: 1, impact: 1, feasibility: 1 },
      { title: 'Autonomous Sales Rep', department: 'Sales', problem: 'High CAC.', solution: 'Unsupervised selling.', targetUsers: 'Mid-market', benefit: 'Zero CAC', kpis: ['CAC', 'Pipeline'], reach: 5, impact: 1, feasibility: 1 },
      { title: 'Moral Ethics Auditor', department: 'HR', problem: 'Culture drift.', solution: 'Cultural sentiment monitor.', targetUsers: 'HR Strategy', benefit: 'Compliance', kpis: ['Culture Score', 'Risk'], reach: 5, impact: 1, feasibility: 1 },
      { title: 'Deepfake Brand Host', department: 'Marketing', problem: 'Talent availability.', solution: 'Synthetic spokespeople.', targetUsers: 'Social Media', benefit: '24/7 Content', kpis: ['Engagement', 'Synthetic ROI'], reach: 5, impact: 1, feasibility: 1 }
    ];

    const processedOpps = initialOpps.map(opp => {
      const { recommendation, explanation } = calculateRecommendation(opp.impact, opp.feasibility, opp.reach);
      return {
        ...opp,
        totalScore: opp.reach + opp.impact + opp.feasibility,
        recommendation,
        explanation,
        createdAt: new Date().toISOString()
      };
    });

    await firebaseService.bulkAddOpportunities(processedOpps as any);
    } catch (error) {
      console.error("Seed error:", error);
    } finally {
      setIsSeeding(false);
    }
  };
   


  const stats: SummaryStats = useMemo(() => ({
    total: opportunities.length,
    pursue: opportunities.filter(o => o.recommendation === 'Pursue').length,
    pilot: opportunities.filter(o => o.recommendation === 'Pilot').length,
    refine: opportunities.filter(o => o.recommendation === 'Refine').length,
    park: opportunities.filter(o => o.recommendation === 'Park').length,
  }), [opportunities]);

  if (authLoading) {
    return (
      <div className="h-screen bg-[#05060B] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center animate-pulse mx-auto">
            <Zap className="text-white w-8 h-8" />
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">Initializing Neural Core...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen bg-[#05060B] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05)_0%,rgba(5,6,11,1)_70%)]">
        <div className="max-w-md w-full space-y-12 text-center">
          <div className="space-y-6">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-500/20 mx-auto relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Lightbulb className="text-white w-10 h-10 relative z-10" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-black text-white tracking-tight uppercase italic underline decoration-indigo-500 underline-offset-8">AI Opportunity Hub</h1>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] mt-4">Enterprise Transformation OS</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-slate-400 text-sm leading-relaxed">
              Login to access your strategic pipeline and neural diagnostics engine.
            </p>
            <button 
              onClick={handleLogin}
              className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-100 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
            >
              <Globe size={18} />
              Authenticate with Google
            </button>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest italic">
              Quantum-Safe / AES-256 Protocol Active
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView 
            stats={stats} 
            opportunities={opportunities} 
            onAddClick={() => setCurrentView('add')} 
            onSeed={() => seedInitialData(false)}
            isSeeding={isSeeding}
          />
        );
      case 'library':
        return (
          <UseCaseLibrary 
            onUseAsInspiration={(useCase) => {
              setEditingOpportunity(null);
              setTemplateToUse(useCase);
              setCurrentView('add');
            }} 
          />
        );
      case 'add':
        return (
          <OpportunityForm 
            onSubmit={editingOpportunity ? updateOpportunity : addOpportunity} 
            initialData={editingOpportunity || undefined}
            template={templateToUse || undefined}
            onCancel={() => {
              setEditingOpportunity(null);
              setTemplateToUse(null);
              setCurrentView('backlog');
            }}
          />
        );
      case 'backlog':
        return (
          <BacklogView 
            opportunities={opportunities} 
            onEdit={(opp) => {
              setEditingOpportunity(opp);
              setCurrentView('add');
            }}
            onDelete={deleteOpportunity}
          />
        );
      case 'board':
        return <DecisionBoard opportunities={opportunities} />;
      default:
        return (
          <DashboardView 
            stats={stats} 
            opportunities={opportunities} 
            onAddClick={() => setCurrentView('add')} 
            onSeed={() => seedInitialData(false)}
            isSeeding={isSeeding}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#05060B] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0A0C14] border-r border-white/5 flex flex-col relative z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 group cursor-pointer overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Lightbulb className="text-white w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <h1 className="font-display font-black text-lg tracking-tight text-white uppercase">AI Opportunity Hub</h1>
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em] -mt-1">V.02 Global</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Core Systems</p>
            <nav className="space-y-1">
              <NavItem 
                icon={<LayoutDashboard size={20} />} 
                label="Transformation Hub" 
                active={currentView === 'dashboard'} 
                onClick={() => setCurrentView('dashboard')} 
              />
              <NavItem 
                icon={<Lightbulb size={20} />} 
                label="AI Use Case Library" 
                active={currentView === 'library'} 
                onClick={() => setCurrentView('library')} 
              />
              <NavItem 
                icon={<ListTodo size={20} />} 
                label="Strategy Backlog" 
                active={currentView === 'backlog'} 
                onClick={() => setCurrentView('backlog')} 
              />
               <NavItem 
                icon={<LayoutPanelLeft size={20} />} 
                label="Decision Board" 
                active={currentView === 'board'} 
                onClick={() => setCurrentView('board')} 
              />
            </nav>
          </div>

          <div className="mt-12 space-y-1">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Operations</p>
            <nav className="space-y-1">
              <NavItem 
                icon={<PlusCircle size={20} />} 
                label="New Strategic Brief" 
                active={currentView === 'add'} 
                onClick={() => {
                  setEditingOpportunity(null);
                  setCurrentView('add');
                }} 
              />
            </nav>
          </div>
        </div>

        <div className="mt-auto p-4">
          <div className="bg-[#0D1117] rounded-[2rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-cyan-500/10 transition-colors duration-1000" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Strategy Pulse</p>
              </div>
              <p className="text-sm font-display font-bold text-white leading-tight italic">
                "{opportunities.length > 15 ? 'Strategic velocity is at maximum.' : 'Expansion in progress...'}"
              </p>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (opportunities.length / 30) * 100)}%` }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 px-6 py-4 flex items-center justify-between border-t border-white/5">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center font-display font-black text-slate-600 text-[10px] overflow-hidden">
                  {user.photoURL ? <img src={user.photoURL} alt="" /> : user.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="text-xs font-bold text-white truncate max-w-[120px]">{user.displayName || user.email}</p>
                    <p className="text-[9px] font-bold text-slate-600 uppercase">CDO / Enterprise</p>
                </div>
             </div>
             <button 
              onClick={handleLogout}
              className="text-slate-600 hover:text-red-400 transition-colors"
              title="Logout"
             >
               <LogOut size={16} />
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#05060B] relative flex flex-col">
        <header className="h-24 bg-[#05060B]/60 backdrop-blur-xl px-12 flex items-center justify-between sticky top-0 z-30 border-b border-white/5">
          <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] font-sans">
            Infrastructure / <span className="text-white">{currentView.replace('-', ' ')}</span>
          </h2>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
            </div>
            <button className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Search size={18} />
            </button>
          </div>
        </header>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-12 pb-32">
            {(opportunities.length === 0 || opportunities.length < 40) && currentView === 'dashboard' && (
              <div className="mb-12 p-10 bg-indigo-600/10 border border-indigo-500/20 rounded-[2rem] flex flex-col items-center text-center space-y-6">
                <ShieldCheck size={48} className="text-indigo-400" />
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-black text-white italic tracking-tight uppercase">
                    {opportunities.length === 0 ? 'Database Is Empty' : 'Baseline Enhancement Required'}
                  </h3>
                  <p className="text-slate-400 text-sm max-w-md">
                    {opportunities.length === 0 
                      ? 'Initialize your strategic neural engine by seeding the baseline datasets.' 
                      : `Your current database has ${opportunities.length} patterns. The full strategic baseline contains 40 pre-validated AI use cases.`}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => seedInitialData(false)}
                    disabled={isSeeding}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSeeding ? 'Deploying...' : opportunities.length === 0 ? 'Seed Strategy Baseline' : 'Inject Missing Baseline Data'}
                  </button>
                  {opportunities.length > 0 && (
                    <button 
                      onClick={() => {
                        if (confirm('This will delete existing data and replace it with the 40 master patterns. Continue?')) {
                          seedInitialData(true);
                        }
                      }}
                      disabled={isSeeding}
                      className="px-8 py-4 bg-slate-900 text-slate-400 border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:text-white transition-all disabled:opacity-50"
                    >
                      Factory Reset to Master 40
                    </button>
                  )}
                </div>
              </div>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Global Footer Status Bar */}
        <footer className="h-12 bg-[#05060B] border-t border-white/5 px-12 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-8 text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              Quantum-Safe Encryption Active
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              AI Core V2.4 / Online
            </div>
          </div>
          <div className="text-[9px] font-bold text-slate-700 uppercase tracking-widest italic">
            © 2026 AI OPPORTUNITY HUB EXCELLENCE OFFICE
          </div>
        </footer>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all relative overflow-hidden ${
        active 
          ? 'bg-[#161B22] text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] border border-white/10' 
          : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"
        />
      )}
      <span className={`transition-colors duration-300 ${active ? 'text-indigo-400' : 'text-slate-700 group-hover:text-slate-500'}`}>
        {icon}
      </span>
      <span className="relative z-10">{label}</span>
      {!active && (
        <div className="absolute inset-0 bg-slate-800 transition-transform duration-500 -translate-x-full group-hover:translate-x-0 -z-0 opacity-30" />
      )}
    </button>
  );
}
