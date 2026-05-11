import { Recommendation } from '../types';

export const calculateRecommendation = (
  impact: number,
  feasibility: number,
  reach: number
): { recommendation: Recommendation; explanation: string } => {
  if (impact >= 4 && feasibility >= 4 && reach >= 3) {
    return {
      recommendation: 'Pursue',
      explanation: 'Recommended as Pursue because it has high impact, high feasibility, and sufficient reach.'
    };
  }
  
  if ((impact >= 4 && feasibility === 3 && reach >= 3) || (impact === 3 && feasibility >= 4 && reach >= 3)) {
    return {
      recommendation: 'Pilot',
      explanation: 'Recommended as Pilot because it has promising impact but should be tested first before scaling.'
    };
  }
  
  if (impact >= 4 && feasibility <= 2) {
    return {
      recommendation: 'Refine',
      explanation: 'Recommended as Refine because the impact is high but feasibility is currently low. Needs more discovery.'
    };
  }
  
  if (impact <= 2 || reach <= 2) {
    return {
      recommendation: 'Park',
      explanation: 'Recommended as Park because the expected reach or impact is currently limited.'
    };
  }
  
  return {
    recommendation: 'Refine',
    explanation: 'Recommended as Refine because the potential value or implementation path needs more clarity.'
  };
};
