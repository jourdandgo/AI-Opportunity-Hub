import { UseCase } from '../types';

export const SEED_USE_CASES: UseCase[] = [
  {
    id: 'hr-1',
    title: 'AI Job Description and Screening Criteria Assistant',
    department: 'HR',
    description: 'Use AI to draft job descriptions, interview scorecards, and initial screening criteria from role requirements.',
    painPoint: 'Hiring managers often provide incomplete role requirements, resulting in slow job posting cycles and inconsistent candidate evaluation.',
    benefit: 'Faster role intake, clearer hiring criteria, and more consistent candidate screening.',
    kpis: ['Time-to-post', 'Time-to-fill', 'Quality of shortlist'],
    complexity: 'Low'
  },
  {
    id: 'hr-2',
    title: 'Employee Policy Q&A Assistant',
    department: 'HR',
    description: 'Create a chatbot or searchable assistant that answers common employee questions using HR policies, benefits documents, and internal FAQs.',
    painPoint: 'HR teams repeatedly answer the same questions about leave, benefits, payroll, onboarding, and policies.',
    benefit: 'Reduces repetitive HR inquiries while giving employees faster access to accurate policy guidance.',
    kpis: ['HR ticket volume', 'Average response time', 'Employee satisfaction'],
    complexity: 'Medium'
  },
  {
    id: 'hr-3',
    title: 'Onboarding Journey Content Generator',
    department: 'HR',
    description: 'Use AI to generate personalized onboarding checklists, welcome messages, learning plans, and manager guides by role or department.',
    painPoint: 'Onboarding materials are often generic, inconsistent, or manually assembled for each new hire.',
    benefit: 'More consistent onboarding experience with less administrative effort for HR and managers.',
    kpis: ['New hire ramp-up time', 'Onboarding completion rate', 'Manager satisfaction'],
    complexity: 'Low'
  },
  {
    id: 'hr-4',
    title: 'Internal Talent Mobility Matcher',
    department: 'HR',
    description: 'AI engine that maps employee skills and career aspirations to internal project opportunities and open roles.',
    painPoint: "Employees often leave because they don't see growth paths, while internal projects struggle to find niche skills.",
    benefit: 'Increases retention by 15% and reduces external recruiting costs.',
    kpis: ['Internal fill rate', 'Employee retention', 'Skill gap reduction'],
    complexity: 'High'
  },
  {
    id: 'hr-5',
    title: 'Biased Language Auditor for Job Postings',
    department: 'HR',
    description: 'Automated scanner that identifies gender, age, or cultural bias in job descriptions and suggests inclusive alternatives.',
    painPoint: 'Unconscious bias in job postings limits the diversity of the applicant pool.',
    benefit: 'More diverse candidate pipeline and stronger employer brand.',
    kpis: ['Applicant diversity %', 'EDI score', 'Brand sentiment'],
    complexity: 'Low'
  },
  {
    id: 'hr-6',
    title: 'Automated Performance Review Summarizer',
    department: 'HR',
    description: 'Synthesizes multi-source feedback (peers, managers, self) into a draft performance summary for manager review.',
    painPoint: 'Managers spend 20+ hours per cycle manually aggregating feedback and looking for themes.',
    benefit: 'Reduces performance review administrative time by 50%.',
    kpis: ['Review completion speed', 'Manager satisfaction', 'Feedback quality'],
    complexity: 'Medium'
  },
  {
    id: 'hr-7',
    title: 'Predictive Workforce Churn Model',
    department: 'HR',
    description: 'Uses historical engagement and operational data to flag departments or cohorts at high risk of turnover.',
    painPoint: 'HR is often reactive to resignations rather than proactive in addressing root causes.',
    benefit: 'Enables proactive interventions to save key talent before they resign.',
    kpis: ['Predictive accuracy', 'Turnover rate', 'Engagement index'],
    complexity: 'High'
  },
  {
    id: 'it-1',
    title: 'IT Ticket Triage and Resolution Assistant',
    department: 'IT',
    description: 'Use AI to classify incoming IT tickets, suggest priority, identify likely root causes, and recommend resolution steps.',
    painPoint: 'IT support teams spend significant time reading, categorizing, and routing repetitive tickets.',
    benefit: 'Faster ticket handling, better routing accuracy, and reduced first-response time.',
    kpis: ['First response time', 'Mean time to resolution', 'Ticket backlog'],
    complexity: 'Medium'
  },
  {
    id: 'it-2',
    title: 'Knowledge Base Article Generator',
    department: 'IT',
    description: 'Use AI to convert resolved tickets, support notes, and troubleshooting steps into draft knowledge base articles.',
    painPoint: "IT knowledge bases are often outdated because documentation is deprioritized after incidents are resolved.",
    benefit: 'Improves self-service support and reduces dependency on individual IT experts.',
    kpis: ['Self-service resolution rate', 'Repeat ticket volume', 'Knowledge base coverage'],
    complexity: 'Low'
  },
  {
    id: 'it-3',
    title: 'Access Request Reviewer',
    department: 'IT',
    description: 'Use AI to summarize access requests, check completeness, flag unusual requests, and guide approvers with decision context.',
    painPoint: 'Access approvals are manual, slow, and sometimes lack enough context for managers or system owners.',
    benefit: 'Faster access approvals with better risk visibility and auditability.',
    kpis: ['Access approval cycle time', 'Compliance exceptions', 'Audit findings'],
    complexity: 'Medium'
  },
  {
    id: 'it-4',
    title: 'Cloud Cost Optimization Agent',
    department: 'IT',
    description: 'AI that scans cloud infrastructure usage patterns to recommend rightsizing, shutdown schedules, and instance types.',
    painPoint: 'Cloud bills are complex and grow unchecked due to idle resources and inefficient configurations.',
    benefit: 'Average 20-30% reduction in monthly cloud expenditure.',
    kpis: ['Cloud ROI', 'Monthly Savings', 'Idle Resource %'],
    complexity: 'Medium'
  },
  {
    id: 'it-5',
    title: 'Legacy Code Documentation Engine',
    department: 'IT',
    description: 'Transforms undocumented legacy codebases into human-readable technical documentation and architecture diagrams.',
    painPoint: 'Aging systems lack documentation, making maintenance expensive and risky when key staff leave.',
    benefit: 'Reduces developer onboarding time and maintenance risk significantly.',
    kpis: ['Documentation coverage', 'MTTR', 'Developer velocity'],
    complexity: 'High'
  },
  {
    id: 'it-6',
    title: 'Automated Security Incident Draftsman',
    department: 'IT',
    description: 'Summarizes security logs and alerts into structured incident reports for SOC analysts to review.',
    painPoint: 'Security teams are overwhelmed by alert volume and spend too much time on report admin.',
    benefit: 'Speeds up incident response and ensures consistent reporting quality.',
    kpis: ['Mean time to report', 'Alert-to-report ratio', 'Data accuracy'],
    complexity: 'Medium'
  },
  {
    id: 'it-7',
    title: 'Self-Healing Server Recovery',
    department: 'IT',
    description: 'ML model that predicts infrastructure failures and automatically triggers restarts or scaling actions.',
    painPoint: 'Uptime relies on reactive manual intervention by on-call engineers.',
    benefit: 'Near-zero downtime for known failure patterns and reduced on-call fatigue.',
    kpis: ['Uptime %', 'MTTR', 'On-call alerts'],
    complexity: 'High'
  },
  {
    id: 'marketing-1',
    title: 'Campaign Brief Generator',
    department: 'Marketing',
    description: 'Use AI to turn marketing objectives, audience notes, and product information into structured campaign briefs.',
    painPoint: 'Campaign planning often starts with incomplete briefs, causing rework between marketing, creative, and business teams.',
    benefit: 'Faster campaign planning and better alignment on audience, message, channels, and success metrics.',
    kpis: ['Campaign planning cycle time', 'Creative rework', 'Campaign launch speed'],
    complexity: 'Low'
  },
  {
    id: 'marketing-2',
    title: 'Content Repurposing Assistant',
    department: 'Marketing',
    description: 'Use AI to transform long-form content into social posts, email copy, blog summaries, sales snippets, and executive talking points.',
    painPoint: 'Marketing teams spend too much time manually adapting the same message across formats and channels.',
    benefit: 'Increases content output while maintaining message consistency across channels.',
    kpis: ['Content production volume', 'Content cycle time', 'Engagement rate'],
    complexity: 'Low'
  },
  {
    id: 'marketing-3',
    title: 'Voice-of-Customer Insight Synthesizer',
    department: 'Marketing',
    description: 'Use AI to analyze survey responses, reviews, customer interviews, and social comments to identify themes, pain points, and messaging opportunities.',
    painPoint: 'Customer feedback is scattered and time-consuming to synthesize manually.',
    benefit: 'Faster insight generation for positioning, messaging, content, and campaign decisions.',
    kpis: ['Insight turnaround time', 'Campaign relevance', 'Conversion rate'],
    complexity: 'Medium'
  },
  {
    id: 'marketing-4',
    title: 'Hyper-Personalized Email Architect',
    department: 'Marketing',
    description: 'Generates 1:1 email copy that references recent user behavioral events and specific interest clusters.',
    painPoint: 'Generic email sequences result in low engagement and high unsubscribe rates.',
    benefit: 'Significant lift in click-through rates and customer loyalty.',
    kpis: ['CTR', 'Unsubscribe rate', 'Revenue per email'],
    complexity: 'High'
  },
  {
    id: 'marketing-5',
    title: 'Brand Consistency Auditor',
    department: 'Marketing',
    description: 'Analyzes cross-channel marketing copy (social, blog, ad) against brand guidelines for tone and style.',
    painPoint: 'As marketing teams scale, content quality becomes fragmented and off-brand.',
    benefit: 'Ensures 100% brand alignment across all global content output.',
    kpis: ['Brand compliance score', 'Rejection rate', 'Production speed'],
    complexity: 'Low'
  },
  {
    id: 'marketing-6',
    title: 'Predictive Lead Scoring 2.0',
    department: 'Marketing',
    description: 'AI model that scores leads based on intent signals, content consumption patterns, and firmographics.',
    painPoint: 'Sales teams waste time on low-intent leads provided by marketing.',
    benefit: 'Ensures Sales focuses only on the highest probability opportunities.',
    kpis: ['MQL to SQL conversion', 'Sales velocity', 'Cost per lead'],
    complexity: 'High'
  },
  {
    id: 'marketing-7',
    title: 'Trend-to-Campaign Content Engine',
    department: 'Marketing',
    description: 'Scans social trends and news to suggest real-time marketing angles and draft reactive social content.',
    painPoint: 'Marketing is often too slow to capitalize on trending conversations.',
    benefit: 'Positions the brand as a culturally relevant market leader.',
    kpis: ['Viral reach', 'Engagement rate', 'Social share of voice'],
    complexity: 'Medium'
  },
  {
    id: 'sales-1',
    title: 'Account Research Brief Generator',
    department: 'Sales',
    description: 'Use AI to create account briefs from public company information, CRM notes, prior interactions, and industry context.',
    painPoint: 'Sales teams spend too much time preparing for calls and often rely on fragmented account information.',
    benefit: 'Better-prepared sales conversations with less manual research time.',
    kpis: ['Sales productivity', 'Meeting preparation time', 'Opportunity conversion rate'],
    complexity: 'Medium'
  },
  {
    id: 'sales-2',
    title: 'Sales Email and Follow-Up Assistant',
    department: 'Sales',
    description: 'Use AI to draft personalized outreach emails, follow-ups, recap notes, and next-step messages based on prospect context.',
    painPoint: 'Sellers spend a large portion of their time writing emails and manually tailoring messages.',
    benefit: 'Faster, more personalized outreach and improved consistency in follow-up quality.',
    kpis: ['Outreach volume', 'Response rate', 'Meeting booking rate'],
    complexity: 'Low'
  },
  {
    id: 'sales-3',
    title: 'Call Notes to Opportunity Update Assistant',
    department: 'Sales',
    description: 'Use AI to convert meeting transcripts or notes into CRM-ready summaries, next steps, risks, objections, and opportunity updates.',
    painPoint: 'CRM updates are often delayed, incomplete, or inconsistent because sellers prioritize customer-facing work.',
    benefit: 'Better CRM hygiene with less administrative burden on sales teams.',
    kpis: ['CRM completeness', 'Forecast accuracy', 'Sales admin time'],
    complexity: 'Medium'
  },
  {
    id: 'sales-4',
    title: 'Competitor Battlecard Assistant',
    department: 'Sales',
    description: 'Real-time AI that fetches specific competitor counter-points and feature comparisons during active sales calls.',
    painPoint: 'Sellers struggle to answer complex competitive questions on the fly accurately.',
    benefit: 'Increases win rates in head-to-head competitive deals.',
    kpis: ['Win rate', 'Competitive deal velocity', 'Sales confidence'],
    complexity: 'Medium'
  },
  {
    id: 'sales-5',
    title: 'Deal Health Risk Predictor',
    department: 'Sales',
    description: 'Analyzes email sentiment, meeting frequency, and stakeholder involvement to flag "stalled" deals before they fail.',
    painPoint: 'Forecasts are often overly optimistic until it is too late to rescue a deal.',
    benefit: 'Allows Sales Leadership to intervene early in high-value at-risk deals.',
    kpis: ['Forecast accuracy', 'Deal slip rate', 'Early warning leads'],
    complexity: 'High'
  },
  {
    id: 'sales-6',
    title: 'Automated Quote and Proposal Drafter',
    department: 'Sales',
    description: 'Synthesizes pricing tables, solution descriptions, and customer requirements into a custom PDF proposal draft.',
    painPoint: 'Sellers spend up to 10 hours a week on administrative proposal creation.',
    benefit: 'Reduces time-to-proposal by 80%, allowing more time for actual selling.',
    kpis: ['Proposal turnaround time', 'Sales capacity', 'Close cycle'],
    complexity: 'Medium'
  },
  {
    id: 'sales-7',
    title: 'Account Penetration Strategy Agent',
    department: 'Sales',
    description: 'Scans job boards, news, and financial reports of target accounts to suggest high-impact "ins" for Account Execs.',
    painPoint: 'Account planning is manual and often relies on outdated or surface-level information.',
    benefit: 'Faster entry into large enterprise accounts with relevant value propositions.',
    kpis: ['Meeting booking rate', 'Account entry speed', 'Pipeline value'],
    complexity: 'High'
  },
  {
    id: 'finance-1',
    title: 'Budget Variance Explanation Assistant',
    department: 'Finance',
    description: 'Use AI to draft plain-language explanations for budget variances using financial data, comments, and supporting context.',
    painPoint: 'Finance teams spend significant time explaining variances and preparing commentary for business reviews.',
    benefit: 'Faster monthly reporting and more business-friendly financial insights.',
    kpis: ['Reporting cycle time', 'Forecast accuracy', 'Stakeholder satisfaction'],
    complexity: 'Medium'
  },
  {
    id: 'finance-2',
    title: 'Invoice and Expense Review Assistant',
    department: 'Finance',
    description: 'Use AI to review invoices or expense claims for missing information, policy exceptions, duplicates, and unusual patterns.',
    painPoint: 'Manual invoice and expense checks are repetitive and prone to delays or missed exceptions.',
    benefit: 'Faster processing with improved compliance and exception detection.',
    kpis: ['Invoice processing time', 'Expense approval cycle time', 'Policy compliance'],
    complexity: 'Medium'
  },
  {
    id: 'finance-3',
    title: 'Management Report Narrative Generator',
    department: 'Finance',
    description: 'Use AI to convert financial dashboards and metric movements into executive-ready commentary and key takeaways.',
    painPoint: 'Finance dashboards show the numbers, but teams still spend time manually writing the story behind the numbers.',
    benefit: 'Speeds up reporting while improving clarity for leadership decision-making.',
    kpis: ['Report preparation time', 'Leadership satisfaction', 'Decision cycle time'],
    complexity: 'Low'
  },
  {
    id: 'finance-4',
    title: 'Real-time Cash Flow Predictor',
    department: 'Finance',
    description: 'Analyzes accounts payable/receivable trends and market variables to predict 30/60/90-day cash positions.',
    painPoint: 'Cash flow forecasting is often manual and reactive, leading to missed investment opportunities or liquidity risks.',
    benefit: 'Optimizes capital allocation and reduces interest expenses.',
    kpis: ['Forecasting accuracy', 'Cash conversion cycle', 'Invested capital ROI'],
    complexity: 'High'
  },
  {
    id: 'finance-5',
    title: 'Automated Vendor Risk Auditor',
    department: 'Finance',
    description: 'Scans public filings, news, and legal databases to flag financial instability or compliance risks in our supply chain.',
    painPoint: 'Procurement and Finance only audit vendor risk annually, missing real-time fluctuations.',
    benefit: 'Prevents supply chain shocks by alerting teams to vendor financial trouble early.',
    kpis: ['Vendor risk incidents', 'Audit frequency', 'Supply continuity'],
    complexity: 'High'
  },
  {
    id: 'finance-6',
    title: 'T&E Policy Compliance Scanner',
    department: 'Finance',
    description: 'AI that audits travel and expense submissions against complex corporate policies, flagging suspicious outliers.',
    painPoint: 'Finance teams can only spot-check a small % of receipts, leading to significant policy leakage.',
    benefit: 'Reduces non-compliant spend by 10-15% through 100% audit coverage.',
    kpis: ['Policy leakage %', 'Audit hours', 'Disputed claims'],
    complexity: 'Medium'
  },
  {
    id: 'finance-7',
    title: 'Strategic M&A Data Room Analyzer',
    department: 'Finance',
    description: 'Automated review of thousands of documents in target company data rooms to flag financial liabilities or oddities.',
    painPoint: 'Due diligence is a bottleneck for M&A, costing millions in consultant fees and weeks of delay.',
    benefit: 'Accelerates M&A cycles and reduces the risk of missed financial liabilities.',
    kpis: ['Diligence cycle time', 'Cost per acquisition', 'Risk flags caught'],
    complexity: 'High'
  },
  {
    id: 'ops-1',
    title: 'Standard Operating Procedure Generator',
    department: 'Operations',
    description: 'Use AI to draft SOPs from process notes, interviews, screen recordings, and existing documents.',
    painPoint: 'Operational knowledge is often undocumented or stored in the heads of experienced employees.',
    benefit: 'Faster documentation, easier training, and more consistent execution across teams.',
    kpis: ['SOP coverage', 'Training time', 'Process compliance'],
    complexity: 'Low'
  },
  {
    id: 'ops-2',
    title: 'Daily Operations Issue Summarizer',
    department: 'Operations',
    description: 'Use AI to summarize daily operational issues from logs, shift reports, emails, or team updates into a concise action brief.',
    painPoint: 'Operations leaders spend time piecing together updates from multiple sources to understand what needs attention.',
    benefit: 'Faster issue visibility, better handoffs, and clearer escalation priorities.',
    kpis: ['Issue resolution time', 'Escalation accuracy', 'Downtime'],
    complexity: 'Medium'
  },
  {
    id: 'ops-3',
    title: 'Process Bottleneck Discovery Assistant',
    department: 'Operations',
    description: 'Use AI to analyze process notes, tickets, timestamps, and feedback to identify recurring bottlenecks and improvement opportunities.',
    painPoint: 'Process improvement work often starts with anecdotal feedback rather than structured analysis.',
    benefit: 'Helps teams quickly identify high-impact operational improvements to prioritize.',
    kpis: ['Cycle time', 'Throughput', 'Rework rate'],
    complexity: 'Medium'
  },
  {
    id: 'ops-4',
    title: 'Predictive Maintenance Scheduler',
    department: 'Operations',
    description: 'ML model that analyzes equipment sensor data to schedule service before a failure occurs.',
    painPoint: 'Equipment downtime causes cascading delays and expensive emergency repair costs.',
    benefit: 'Extends equipment life and reduces unscheduled downtime by 40%.',
    kpis: ['Equipment uptime', 'Maintenance cost', 'OEE'],
    complexity: 'High'
  },
  {
    id: 'ops-5',
    title: 'Warehouse Layout Optimizer (Digital Twin)',
    department: 'Operations',
    description: 'AI simulation that recommends the most efficient product placements based on seasonal picking frequencies.',
    painPoint: 'Inefficient item placement increases travel time for pickers by 30% or more.',
    benefit: 'Reduces fulfillment labor costs and speeds up delivery times.',
    kpis: ['Picking velocity', 'Labor cost per order', 'Storage efficiency'],
    complexity: 'High'
  },
  {
    id: 'ops-6',
    title: 'Supplier Geopolitical Risk Engine',
    department: 'Operations',
    description: 'Scans global news for risks (strikes, weather, political unrest) affecting tier-2 and tier-3 suppliers.',
    painPoint: 'Supply chains are vulnerable to shocks that occur tiers away from the primary manufacturer.',
    benefit: 'Provides a 7-10 day head-start to find alternative vendors in a crisis.',
    kpis: ['Supply risk index', 'Lead time variance', 'Resilience score'],
    complexity: 'High'
  },
  {
    id: 'ops-7',
    title: 'Sustainability Compliance Auditor',
    department: 'Operations',
    description: 'Extracts ESG data from supplier reports and logistics logs to track the carbon footprint across the value chain.',
    painPoint: 'Manually tracking scope-3 emissions for reporting is nearly impossible at scale.',
    benefit: 'Enables accurate ESG reporting and identifies high-emission bottlenecks.',
    kpis: ['Carbon footprint', 'ESG score', 'Audit readiness'],
    complexity: 'Medium'
  },
  {
    id: 'cs-1',
    title: 'Customer Support Response Assistant',
    department: 'Customer Support',
    description: 'Use AI to draft suggested responses to customer inquiries using product documentation, policies, and prior resolved cases.',
    painPoint: 'Support agents spend time writing repetitive responses and searching for the right information.',
    benefit: 'Faster, more consistent responses while keeping human review before sending.',
    kpis: ['First response time', 'Average handle time', 'Customer satisfaction'],
    complexity: 'Low'
  },
  {
    id: 'cs-2',
    title: 'Ticket Summarization and Escalation Assistant',
    department: 'Customer Support',
    description: 'Use AI to summarize long customer threads, identify issue type, sentiment, urgency, and recommended escalation path.',
    painPoint: 'Escalated tickets often require agents and managers to reread long histories before taking action.',
    benefit: 'Faster escalations and better continuity between support tiers.',
    kpis: ['Escalation resolution time', 'SLA compliance', 'Customer effort score'],
    complexity: 'Low'
  },
  {
    id: 'cs-3',
    title: 'Customer Feedback Theme Analyzer',
    department: 'Customer Support',
    description: 'Use AI to analyze support tickets and customer feedback to identify recurring issues, product gaps, and improvement themes.',
    painPoint: 'Support data contains valuable product and service insights, but teams rarely have time to analyze it systematically.',
    benefit: 'Turns support interactions into actionable insights for product, operations, and service improvement.',
    kpis: ['Repeat contact rate', 'Top issue volume', 'Churn risk'],
    complexity: 'Medium'
  },
  {
    id: 'cs-4',
    title: 'Voice-to-CRM Auto-Updater',
    department: 'Customer Support',
    description: 'Listens to support calls and automatically populates CRM fields, action items, and follow-up emails.',
    painPoint: 'Agents spend 25% of their day on post-call documentation rather than helping customers.',
    benefit: 'Increases agent capacity by 20% while improving CRM data quality.',
    kpis: ['Agent occupancy', 'Data accuracy', 'AHT'],
    complexity: 'High'
  },
  {
    id: 'cs-5',
    title: 'Sentiment-Based Smart Escalator',
    department: 'Customer Support',
    description: 'Analyzes live chat sentiment and key phrases to immediately push frustrated customers to senior agents.',
    painPoint: 'Angry customers often get trapped in tiered support, leading to higher churn.',
    benefit: 'Prevents churn by ensuring high-risk customers get top-tier help faster.',
    kpis: ['Churn rate', 'CSAT', 'Escalation speed'],
    complexity: 'Medium'
  },
  {
    id: 'cs-6',
    title: 'Multilingual Support Translation Layer',
    department: 'Customer Support',
    description: 'Real-time translation of chat and tickets, allowing agents to support customers in 50+ languages.',
    painPoint: 'Hiring specialized language agents is expensive and limits coverage to specific regions.',
    benefit: 'Enables global support coverage with a unified agent pool.',
    kpis: ['Language coverage', 'Response time (Intl)', 'Hiring cost'],
    complexity: 'Medium'
  },
  {
    id: 'cs-7',
    title: 'Automated Technical FAQ Updater',
    department: 'Customer Support',
    description: 'Scans product documentation and engineering updates to automatically refresh the support FAQ database.',
    painPoint: 'Support agents often work with outdated info because knowledge bases lag behind software releases.',
    benefit: 'Reduces incorrect support guidance and improves first-contact resolution.',
    kpis: ['FAQ accuracy', 'First call resolution', 'Support doc traffic'],
    complexity: 'Low'
  }
];
