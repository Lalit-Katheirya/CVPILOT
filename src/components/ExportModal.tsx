import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import {
  Download,
  Printer,
  FileText,
  FileCode,
  Copy,
  Check,
  X,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportModalProps {
  data: ResumeData;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ data, onClose }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pdfQuality, setPdfQuality] = useState<'standard' | 'high'>('high');

  // Trigger vector print dialog (ATS Gold Standard)
  const handlePrint = () => {
    window.print();
  };

  // Direct client-side PDF download using html2canvas & jsPDF
  const handleDownloadPdf = async () => {
    const element = document.getElementById('ats-resume-printable');
    if (!element) return;

    try {
      setIsGeneratingPdf(true);

      const canvas = await html2canvas(element, {
        scale: pdfQuality === 'high' ? 2.5 : 1.8,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // mm for A4
      const pageHeight = 297; // mm for A4
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${data.header.fullName.replace(/\s+/g, '_')}_Resume_ATS.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Could not generate direct PDF file. You can use the Vector Print option to save as PDF.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Generate clean ATS plain text format
  const generatePlainText = (): string => {
    const { header, summary, technicalSkills, experience, projects, education, atsKeywords } =
      data;

    let text = `${header.fullName}\n`;
    text += `${header.title}\n`;
    text += `${header.location} | ${header.phone} | ${header.email} | ${header.linkedin}\n\n`;

    text += `===============================\n`;
    text += `PROFESSIONAL SUMMARY\n`;
    text += `===============================\n`;
    text += `${summary}\n\n`;

    text += `===============================\n`;
    text += `TECHNICAL SKILLS\n`;
    text += `===============================\n`;
    technicalSkills.forEach((s) => {
      text += `${s.category}: ${s.skills}\n`;
    });
    text += `\n`;

    text += `===============================\n`;
    text += `PROFESSIONAL EXPERIENCE\n`;
    text += `===============================\n`;
    experience.forEach((exp) => {
      text += `${exp.role} | ${exp.company} | ${exp.location} | ${exp.period}\n`;
      exp.highlights.forEach((h) => {
        text += `• ${h}\n`;
      });
      text += `\n`;
    });

    text += `===============================\n`;
    text += `SELECTED PROJECTS\n`;
    text += `===============================\n`;
    projects.forEach((proj) => {
      text += `${proj.title} | ${proj.period}\n`;
      if (proj.technologies) {
        text += `Technologies: ${proj.technologies}\n`;
      }
      proj.highlights.forEach((h) => {
        text += `• ${h}\n`;
      });
      text += `\n`;
    });

    text += `===============================\n`;
    text += `EDUCATION\n`;
    text += `===============================\n`;
    education.forEach((edu) => {
      text += `${edu.degree} – ${edu.institution} | ${edu.period}${
        edu.grade ? ` | ${edu.grade}` : ''
      }\n`;
    });
    text += `\n`;

    text += `===============================\n`;
    text += `ATS KEYWORDS\n`;
    text += `===============================\n`;
    text += `${atsKeywords}\n`;

    return text;
  };

  // Download ATS plain text
  const handleDownloadTxt = () => {
    const text = generatePlainText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.header.fullName.replace(/\s+/g, '_')}_Resume_ATS.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download JSON
  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.header.fullName.replace(/\s+/g, '_')}_Resume_Data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Copy plain text to clipboard
  const handleCopyText = async () => {
    const text = generatePlainText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-700 w-full max-w-lg rounded-2xl shadow-2xl p-6 text-neutral-100">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">Download & Export Resume</h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {/* Primary Recommended Option: Vector PDF Print */}
          <div className="p-4 rounded-xl border border-blue-500/40 bg-blue-950/30 hover:bg-blue-950/50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white flex items-center gap-1.5">
                    <Printer className="w-4 h-4 text-blue-400" />
                    Print to PDF (Vector Text - Recommended)
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">
                    ATS 100% Readable
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Opens browser print dialog configured for Letter/A4 portrait. Leaves pure searchable vector text that ATS scanners (Workday, Greenhouse, Taleo) read with 100% accuracy.
                </p>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center justify-center gap-2 active:scale-98"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Open Vector Print / Save as PDF</span>
            </button>
          </div>

          {/* Direct File Download PDF */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-850 hover:bg-neutral-800 transition-colors">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-semibold text-xs text-white flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  Direct Download PDF File (.pdf)
                </div>
                <p className="text-[11px] text-neutral-400">
                  Instant client-side PDF file download
                </p>
              </div>

              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white rounded-lg text-xs font-medium transition-all"
              >
                {isGeneratingPdf ? 'Generating...' : 'Download PDF'}
              </button>
            </div>
          </div>

          {/* Plain Text (.txt) for ATS Job Portals */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-850 hover:bg-neutral-800 transition-colors">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-semibold text-xs text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Plain Text File (.txt)
                </div>
                <p className="text-[11px] text-neutral-400">
                  Clean ASCII formatting for pasting into application portals
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyText}
                  className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 rounded-lg text-xs font-medium flex items-center gap-1"
                  title="Copy formatted text"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white rounded-lg text-xs font-medium"
                >
                  Download .txt
                </button>
              </div>
            </div>
          </div>

          {/* JSON Backup */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-850 hover:bg-neutral-800 transition-colors">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-semibold text-xs text-white flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-purple-400" />
                  Structured Backup (.json)
                </div>
                <p className="text-[11px] text-neutral-400">
                  Save all fields to re-import at any time
                </p>
              </div>

              <button
                onClick={handleDownloadJson}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white rounded-lg text-xs font-medium"
              >
                Download JSON
              </button>
            </div>
          </div>
        </div>

        {/* ATS Quality Notice */}
        <div className="mt-4 p-3 bg-neutral-950/80 border border-neutral-800 rounded-xl flex items-center gap-2.5 text-xs text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Single-column standard layout matches ISO ATS standards. No complex graphics or non-standard tables that fail OCR parsing.
          </span>
        </div>
      </div>
    </div>
  );
};
