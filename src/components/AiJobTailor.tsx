import React, { useState } from 'react';
import { ResumeData, AtsAnalysisResult } from '../types/resume';
import { SAMPLE_JOB_DESCRIPTIONS } from '../data/defaultResume';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  FileCheck,
  X,
  Plus,
  RefreshCw,
  Award,
} from 'lucide-react';

interface AiJobTailorProps {
  currentResume: ResumeData;
  onApplyTailoredResume: (newResume: ResumeData, analysis: AtsAnalysisResult) => void;
  onClose: () => void;
  onAddKeyword: (keyword: string) => void;
}

export const AiJobTailor: React.FC<AiJobTailorProps> = ({
  currentResume,
  onApplyTailoredResume,
  onClose,
  onAddKeyword,
}) => {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [targetRole, setTargetRole] = useState<string>('');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AtsAnalysisResult | null>(null);
  const [tailoredResumeData, setTailoredResumeData] = useState<ResumeData | null>(null);

  const handleSelectSample = (sample: (typeof SAMPLE_JOB_DESCRIPTIONS)[0]) => {
    setJobDescription(sample.text);
    setTargetRole(sample.title);
    setError(null);
  };

  const handleOptimize = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a Job Description first or select one of the sample roles below.');
      return;
    }

    setIsOptimizing(true);
    setError(null);

    try {
      const response = await fetch('/api/tailor-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentResume,
          jobDescription,
          targetRole,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Failed with status ${response.status}`);
      }

      const data = await response.json();
      if (!data.tailoredResume || !data.atsAnalysis) {
        throw new Error('Invalid format returned by AI optimizer');
      }

      // Add ids to technicalSkills, experience, projects, education if missing
      const formattedResume: ResumeData = {
        ...data.tailoredResume,
        technicalSkills: data.tailoredResume.technicalSkills.map(
          (item: any, i: number) => ({
            id: item.id || `tailor-skill-${i}-${Date.now()}`,
            category: item.category,
            skills: item.skills,
          })
        ),
        experience: data.tailoredResume.experience.map((item: any, i: number) => ({
          id: item.id || `tailor-exp-${i}-${Date.now()}`,
          role: item.role,
          company: item.company,
          location: item.location,
          period: item.period,
          highlights: item.highlights || [],
        })),
        projects: data.tailoredResume.projects.map((item: any, i: number) => ({
          id: item.id || `tailor-proj-${i}-${Date.now()}`,
          title: item.title,
          period: item.period,
          technologies: item.technologies,
          highlights: item.highlights || [],
        })),
        education: data.tailoredResume.education.map((item: any, i: number) => ({
          id: item.id || `tailor-edu-${i}-${Date.now()}`,
          degree: item.degree,
          institution: item.institution,
          period: item.period,
          grade: item.grade,
        })),
      };

      setTailoredResumeData(formattedResume);
      setAnalysisResult(data.atsAnalysis);
    } catch (err: any) {
      console.error('Optimization error:', err);
      setError(
        err.message || 'An error occurred while connecting to the AI model. Please check server logs.'
      );
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApply = () => {
    if (tailoredResumeData && analysisResult) {
      onApplyTailoredResume(tailoredResumeData, analysisResult);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-700 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-neutral-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <span>AI Job Description Tailor</span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Target: 90+ ATS Score
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Pasting your Job Description automatically rewrites bullets, skills & keywords to match automated ATS parsers.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Sample quick pick */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Or try a realistic industry sample:
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SAMPLE_JOB_DESCRIPTIONS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(sample)}
                  className="text-left p-2.5 rounded-lg border border-neutral-800 bg-neutral-800/40 hover:bg-neutral-800 hover:border-blue-500/50 transition-all text-xs group"
                >
                  <div className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                    {sample.title}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    {sample.company}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Job Description Form */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Target Job Title (Optional)
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior MEAN Stack Engineer"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Paste Target Job Description (JD)
                </label>
                <span className="text-[11px] text-neutral-400 block mb-1">
                  Paste the requirements, responsibilities, and tech stack from LinkedIn, Indeed, etc.
                </span>
              </div>
            </div>

            <textarea
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste complete Job Description here...
Example:
We need a MEAN Stack Developer with 4+ years in Angular 16+, Node.js, Express, MongoDB, RxJS, REST APIs, AWS EC2/S3, Docker containerization, Agile, and automated CI/CD pipelines..."
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed font-mono"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end">
            <button
              onClick={handleOptimize}
              disabled={isOptimizing}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-all ${
                isOptimizing
                  ? 'bg-neutral-700 cursor-not-allowed opacity-75'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02] active:scale-95'
              }`}
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Analyzing ATS Algorithms & Rewriting (90+ Score)...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Generate 90+ ATS Optimized Resume</span>
                </>
              )}
            </button>
          </div>

          {/* AI Tailored Results & 90+ ATS Scorecard */}
          {analysisResult && (
            <div className="mt-6 pt-6 border-t border-neutral-800 space-y-5 animate-fadeIn">
              {/* Score Badges Card */}
              <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-2xl p-5 shadow-xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Big 90+ ATS Score Meter */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-lg text-white">
                      <div className="text-center">
                        <div className="text-2xl font-black leading-none">
                          {analysisResult.overallScore}%
                        </div>
                        <div className="text-[9px] font-bold tracking-wider uppercase opacity-90 mt-0.5">
                          ATS Match
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">
                          Applicant Tracking System Score
                        </span>
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {analysisResult.overallScore >= 90 ? 'PASSED (Tier 1)' : 'OPTIMIZED'}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 mt-1 max-w-md">
                        {analysisResult.executiveSummary ||
                          'Resume keywords, bullet points, and skills have been aligned with the job description for top-percentile ATS indexing.'}
                      </p>
                    </div>
                  </div>

                  {/* Sub Scores */}
                  <div className="flex gap-3 text-center">
                    <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl px-3.5 py-2">
                      <div className="text-xs text-neutral-400">Format Match</div>
                      <div className="text-base font-bold text-emerald-400">
                        {analysisResult.formatScore}%
                      </div>
                    </div>
                    <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl px-3.5 py-2">
                      <div className="text-xs text-neutral-400">Impact Metrics</div>
                      <div className="text-base font-bold text-blue-400">
                        {analysisResult.impactScore}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Improvements */}
                {analysisResult.keyImprovements && analysisResult.keyImprovements.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-neutral-700/60">
                    <div className="text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Optimizations Applied for 90+ ATS Score:</span>
                    </div>
                    <ul className="space-y-1 text-xs text-neutral-300">
                      {analysisResult.keyImprovements.map((imp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Keyword Coverage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Matched Keywords */}
                <div className="bg-neutral-850 border border-neutral-800 rounded-xl p-4">
                  <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Matched Keywords ({analysisResult.matchingKeywords?.length || 0})
                    </span>
                    <span className="text-[10px] text-neutral-400">Indexed in resume</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                    {analysisResult.matchingKeywords?.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded text-[11px]"
                      >
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing / Additional High-Value Keywords */}
                <div className="bg-neutral-850 border border-neutral-800 rounded-xl p-4">
                  <div className="text-xs font-bold text-amber-400 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Extra Opportunity Keywords
                    </span>
                    <span className="text-[10px] text-neutral-400">Click to add</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                    {analysisResult.missingKeywords && analysisResult.missingKeywords.length > 0 ? (
                      analysisResult.missingKeywords.map((kw, i) => (
                        <button
                          key={i}
                          onClick={() => onAddKeyword(kw)}
                          className="px-2 py-0.5 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-800/80 text-amber-300 rounded text-[11px] flex items-center gap-1 transition-colors"
                          title="Click to append to your ATS keywords"
                        >
                          <Plus className="w-3 h-3" />
                          <span>{kw}</span>
                        </button>
                      ))
                    ) : (
                      <span className="text-xs text-neutral-400">
                        100% of critical core keywords are addressed in this tailored draft!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Apply CTA */}
              <div className="flex items-center justify-between p-4 bg-blue-950/40 border border-blue-800/50 rounded-xl">
                <div>
                  <div className="text-xs font-bold text-white">
                    Ready to update your live resume?
                  </div>
                  <div className="text-[11px] text-neutral-300">
                    This will load the 90+ ATS tailored content directly into the editor and preview.
                  </div>
                </div>

                <button
                  onClick={handleApply}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>Apply Tailored Resume</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
