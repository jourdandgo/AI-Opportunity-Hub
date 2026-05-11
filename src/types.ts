/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Department = 
  | 'HR' 
  | 'IT' 
  | 'Marketing' 
  | 'Sales' 
  | 'Finance' 
  | 'Operations' 
  | 'Customer Support';

export type Recommendation = 'Pursue' | 'Pilot' | 'Refine' | 'Park';

export type Complexity = 'Low' | 'Medium' | 'High';

export interface UseCase {
  id: string;
  title: string;
  department: Department;
  description: string;
  painPoint: string;
  benefit: string;
  kpis: string[];
  complexity: Complexity;
}

export interface Opportunity {
  id: string;
  title: string;
  department: Department;
  problem: string;
  solution: string;
  targetUsers: string;
  benefit: string;
  kpis: string[];
  reach: number; // 1-5
  impact: number; // 1-5
  feasibility: number; // 1-5
  totalScore: number;
  recommendation: Recommendation;
  explanation: string;
  createdAt: string;
  useCaseId?: string; // Optional reference if created from a template
}

export interface SummaryStats {
  total: number;
  pursue: number;
  pilot: number;
  refine: number;
  park: number;
}
