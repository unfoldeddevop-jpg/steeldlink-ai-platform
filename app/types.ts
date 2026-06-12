export interface SteelAuditReport {
  projectName: string;
  totalEstHours: string;
  totalEstCost: string;
  confidence: string;
  executiveAnalysis: string; // Long technical prose
  detailedRisks: { title: string; explanation: string }[];
  basisOfEstimate: {
    sheets: string;
    standards: string;
    complexityReasoning: string;
  };
  hoursTable: {
    task: string;
    low: number;
    high: number;
    pct: string;
    notes: string;
  }[];
}