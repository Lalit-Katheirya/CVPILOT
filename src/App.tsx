import React, { useState, useRef } from 'react';
import { ResumeData, AtsAnalysisResult } from './types/resume';
import { DEFAULT_RESUME } from './data/defaultResume';
import { ResumeDocument } from './components/ResumeDocument';
import { ResumeEditor } from './components/ResumeEditor';
import { AiJobTailor } from './components/AiJobTailor';
import { ExportModal } from './components/ExportModal';
import { AtsComplianceBar } from './components/AtsComplianceBar';
import {
  FileText,
  Download,
  Sparkles,
  Eye,
  Edit3,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Upload,
  Undo2,
  FileDown,
  ExternalLink,
  Award,
} from 'lucide-react';

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME);
  const [history, setHistory] = useState<ResumeData[]>([]);
  const [activeAnalysis, setActiveAnalysis] = useState<AtsAnalysisResult | null>(null);
  const [isAiTailorOpen, setIsAiTailorOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [activeMobileView, setActiveMobileView] = useState<'editor' | 'preview'>('editor');
  const [previewScale, setPreviewScale] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update resume data with undo history
  const handleDataChange = (newData: ResumeData) => {
    setHistory((prev) => [...prev.slice(-10), resumeData]);
    setResumeData(newData);
  };

  // Undo last change
  const handleUndo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((old) => old.slice(0, old.length - 1));
      setResumeData(prev);
    }
  };

  // Apply tailored resume from AI
  const handleApplyTailored = (newResume: ResumeData, analysis: AtsAnalysisResult) => {
    handleDataChange(newResume);
    setActiveAnalysis(analysis);
    setIsAiTailorOpen(false);
  };

  // Add individual keyword
  const handleAddKeyword = (keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    const currentKeywords = resumeData.atsKeywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    if (!currentKeywords.some((k) => k.toLowerCase() === trimmed.toLowerCase())) {
      const updated = [...currentKeywords, trimmed].join(', ');
      handleDataChange({
        ...resumeData,
        atsKeywords: updated,
      });
    }
  };

  // Import JSON backup
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.header && parsed.summary && parsed.experience) {
          handleDataChange(parsed);
          alert('Resume data successfully imported!');
        } else {
          alert('Invalid resume format in file.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans select-text">
      {/* Hidden file input for JSON import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportJson}
        accept=".json"
        className="hidden"
      />

      {/* Top Application Navbar */}
      <header className="h-14 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur px-4 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm text-white tracking-tight">
                ATS Resume Studio
              </h1>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.2 rounded-full font-semibold">
                90+ Score Ready
              </span>
            </div>
            <div className="text-[11px] text-neutral-400">
              Lalit Katheriya • MEAN Stack Developer
            </div>
          </div>
        </div>

        {/* Center Mobile View Toggle */}
        <div className="flex md:hidden bg-neutral-800 p-0.5 rounded-lg border border-neutral-700">
          <button
            onClick={() => setActiveMobileView('editor')}
            className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-medium transition-all ${
              activeMobileView === 'editor'
                ? 'bg-blue-600 text-white shadow'
                : 'text-neutral-400'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span>Form</span>
          </button>
          <button
            onClick={() => setActiveMobileView('preview')}
            className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md font-medium transition-all ${
              activeMobileView === 'preview'
                ? 'bg-blue-600 text-white shadow'
                : 'text-neutral-400'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={handleUndo}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-medium border border-neutral-700 transition-colors"
              title="Undo last modification"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Undo</span>
            </button>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-medium border border-neutral-700 transition-colors"
            title="Import Resume JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import</span>
          </button>

          <a
            href="/assets/aistudio/Lalit_Katheriya_MEAN_Stack_ATS_Resume_8baffc28.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded-lg text-xs border border-neutral-700 transition-colors"
            title="View original uploaded PDF"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Original PDF</span>
          </a>

          <button
            onClick={() => setIsAiTailorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span className="hidden sm:inline">Tailor for Job (90+ ATS)</span>
            <span className="sm:hidden">AI Tailor</span>
          </button>

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </header>

      {/* Real-time ATS Compliance Status Bar */}
      <AtsComplianceBar
        data={resumeData}
        activeAnalysis={activeAnalysis}
        onOpenAiTailor={() => setIsAiTailorOpen(true)}
      />

      {/* Main Dual-Pane Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Pane: Interactive Resume Form Editor */}
        <section
          className={`w-full md:w-[48%] lg:w-[45%] xl:w-[42%] flex-col h-full ${
            activeMobileView === 'editor' ? 'flex' : 'hidden md:flex'
          }`}
        >
          <ResumeEditor
            data={resumeData}
            onChange={handleDataChange}
            onOpenAiTailor={() => setIsAiTailorOpen(true)}
          />
        </section>

        {/* Right Pane: Live ATS-Compliant Document Preview */}
        <section
          className={`flex-1 bg-neutral-950 flex-col h-full overflow-hidden ${
            activeMobileView === 'preview' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Preview Toolbar */}
          <div className="h-10 bg-neutral-900 border-b border-neutral-800 px-4 flex items-center justify-between text-xs text-neutral-400 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-200">
                Live ATS Document Preview
              </span>
              <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700">
                Standard A4 / Letter
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-neutral-800/80 rounded-lg p-0.5 border border-neutral-700">
              <button
                onClick={() => setPreviewScale((s) => Math.max(0.6, s - 0.1))}
                className="p-1 hover:text-white rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1 text-[11px] font-mono text-neutral-300">
                {Math.round(previewScale * 100)}%
              </span>
              <button
                onClick={() => setPreviewScale((s) => Math.min(1.4, s + 0.1))}
                className="p-1 hover:text-white rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPreviewScale(1)}
                className="p-1 hover:text-white rounded border-l border-neutral-700 ml-0.5"
                title="Reset to 100%"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Document Display Area */}
          <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-neutral-950">
            <ResumeDocument data={resumeData} scale={previewScale} />
          </div>
        </section>
      </main>

      {/* AI Job Tailor Modal */}
      {isAiTailorOpen && (
        <AiJobTailor
          currentResume={resumeData}
          onApplyTailoredResume={handleApplyTailored}
          onClose={() => setIsAiTailorOpen(false)}
          onAddKeyword={handleAddKeyword}
        />
      )}

      {/* Export & Download Modal */}
      {isExportOpen && (
        <ExportModal
          data={resumeData}
          onClose={() => setIsExportOpen(false)}
        />
      )}
    </div>
  );
}
