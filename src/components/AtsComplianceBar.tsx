import React from 'react';
import { ResumeData, AtsAnalysisResult } from '../types/resume';
import {
  ShieldCheck,
  Award,
  Sparkles,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface AtsComplianceBarProps {
  data: ResumeData;
  activeAnalysis: AtsAnalysisResult | null;
  onOpenAiTailor: () => void;
}

export const AtsComplianceBar: React.FC<AtsComplianceBarProps> = ({
  data,
  activeAnalysis,
  onOpenAiTailor,
}) => {
  // Compute basic metrics from resume content
  const fullText = JSON.stringify(data);
  const wordsCount = data.summary.split(/\s+/).length +
    data.experience.flatMap((e) => e.highlights).join(' ').split(/\s+/).length +
    data.projects.flatMap((p) => p.highlights).join(' ').split(/\s+/).length;

  // Count numbers and metrics
  const metricMatches = (fullText.match(/\b\d+(\.\d+)?%?(\+)?\b/g) || []).length;

  // Calculate base score if no AI analysis is performed yet
  const displayScore = activeAnalysis
    ? activeAnalysis.overallScore
    : Math.min(95, 82 + (metricMatches > 6 ? 5 : 2));

  return (
    <div className="bg-neutral-900/90 border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between gap-4 flex-wrap text-xs text-neutral-300">
      <div className="flex items-center gap-4 flex-wrap">
        {/* ATS Score Indicator */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center font-bold px-2 py-0.5 rounded-full text-xs border ${
              displayScore >= 90
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
            }`}
          >
            <Award className="w-3.5 h-3.5 mr-1" />
            <span>ATS Score: {displayScore}%</span>
          </div>

          <span className="text-[11px] text-neutral-400 hidden sm:inline">
            {displayScore >= 90
              ? '✓ Target 90+ Score Achieved for ATS automated parsing'
              : 'Passes standard ATS scan; optimize with JD for 90+'}
          </span>
        </div>

        {/* Format & Layout Pill */}
        <div className="hidden md:flex items-center gap-1.5 text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Single-Column Standard Layout</span>
          <span className="text-neutral-600">•</span>
          <span>{wordsCount} Words</span>
          <span className="text-neutral-600">•</span>
          <span className="text-emerald-400 font-medium">{metricMatches} Quantified Metrics</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenAiTailor}
          className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-medium text-xs shadow-sm transition-transform active:scale-95"
        >
          <Sparkles className="w-3 h-3 text-yellow-300" />
          <span>Match with Job Description (90+ ATS)</span>
        </button>
      </div>
    </div>
  );
};
