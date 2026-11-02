import React, { useState } from 'react';
import {
  ResumeData,
  SkillCategory,
  ExperienceItem,
  ProjectItem,
  EducationItem,
} from '../types/resume';
import {
  User,
  FileText,
  Code2,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Tag,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { DEFAULT_RESUME } from '../data/defaultResume';

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  onOpenAiTailor: () => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  data,
  onChange,
  onOpenAiTailor,
}) => {
  const [activeSection, setActiveSection] = useState<string>('header');

  const updateHeader = (field: keyof typeof data.header, value: string) => {
    onChange({
      ...data,
      header: {
        ...data.header,
        [field]: value,
      },
    });
  };

  const updateSummary = (value: string) => {
    onChange({
      ...data,
      summary: value,
    });
  };

  // Technical Skills operations
  const updateSkill = (index: number, field: keyof SkillCategory, value: string) => {
    const updated = [...data.technicalSkills];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, technicalSkills: updated });
  };

  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      id: `skill-${Date.now()}`,
      category: 'New Category',
      skills: 'Add skills separated by comma...',
    };
    onChange({
      ...data,
      technicalSkills: [...data.technicalSkills, newCategory],
    });
  };

  const removeSkillCategory = (index: number) => {
    const updated = data.technicalSkills.filter((_, i) => i !== index);
    onChange({ ...data, technicalSkills: updated });
  };

  // Experience operations
  const updateExperience = (
    index: number,
    field: keyof ExperienceItem,
    value: any
  ) => {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, experience: updated });
  };

  const addExperienceBullet = (expIndex: number) => {
    const updated = [...data.experience];
    updated[expIndex].highlights.push('Accomplished [task] resulting in [metric] using [tech].');
    onChange({ ...data, experience: updated });
  };

  const updateExperienceBullet = (
    expIndex: number,
    bulletIndex: number,
    value: string
  ) => {
    const updated = [...data.experience];
    updated[expIndex].highlights[bulletIndex] = value;
    onChange({ ...data, experience: updated });
  };

  const removeExperienceBullet = (expIndex: number, bulletIndex: number) => {
    const updated = [...data.experience];
    updated[expIndex].highlights = updated[expIndex].highlights.filter(
      (_, i) => i !== bulletIndex
    );
    onChange({ ...data, experience: updated });
  };

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Full Stack Developer',
      company: 'Tech Enterprise',
      location: 'Remote',
      period: '2023 – Present',
      highlights: [
        'Designed and implemented reactive front-end modules using Angular and TypeScript.',
        'Developed scalable RESTful APIs in Node.js and Express connected to MongoDB.',
      ],
    };
    onChange({
      ...data,
      experience: [newExp, ...data.experience],
    });
  };

  const removeExperience = (index: number) => {
    const updated = data.experience.filter((_, i) => i !== index);
    onChange({ ...data, experience: updated });
  };

  // Projects operations
  const updateProject = (index: number, field: keyof ProjectItem, value: any) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, projects: updated });
  };

  const addProjectBullet = (projIndex: number) => {
    const updated = [...data.projects];
    updated[projIndex].highlights.push('Implemented feature with improved performance and stability.');
    onChange({ ...data, projects: updated });
  };

  const updateProjectBullet = (
    projIndex: number,
    bulletIndex: number,
    value: string
  ) => {
    const updated = [...data.projects];
    updated[projIndex].highlights[bulletIndex] = value;
    onChange({ ...data, projects: updated });
  };

  const removeProjectBullet = (projIndex: number, bulletIndex: number) => {
    const updated = [...data.projects];
    updated[projIndex].highlights = updated[projIndex].highlights.filter(
      (_, i) => i !== bulletIndex
    );
    onChange({ ...data, projects: updated });
  };

  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'Real-Time Enterprise Analytics Portal',
      period: '2024',
      technologies: 'Angular 18, Node.js, Express, MongoDB, Socket.io',
      highlights: [
        'Built interactive dashboards with real-time telemetry and state management.',
        'Improved load times by 40% through lazy loaded modules and code splitting.',
      ],
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const removeProject = (index: number) => {
    const updated = data.projects.filter((_, i) => i !== index);
    onChange({ ...data, projects: updated });
  };

  // Education operations
  const updateEducation = (index: number, field: keyof EducationItem, value: string) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, education: updated });
  };

  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'Master of Computer Applications (MCA)',
      institution: 'State University',
      period: '2022–2024',
      grade: 'First Class with Distinction',
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const removeEducation = (index: number) => {
    const updated = data.education.filter((_, i) => i !== index);
    onChange({ ...data, education: updated });
  };

  // Reset to default
  const handleReset = () => {
    if (
      window.confirm(
        'Reset resume to Lalit Katheriya original PDF content? Any unsaved edits will be replaced.'
      )
    ) {
      onChange(DEFAULT_RESUME);
    }
  };

  const sections = [
    { id: 'header', label: 'Contact Info', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'skills', label: 'Technical Skills', icon: Code2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'keywords', label: 'ATS Keywords', icon: Tag },
  ];

  return (
    <div className="flex flex-col h-full bg-neutral-900 border-r border-neutral-800 text-neutral-100">
      {/* Editor Top Bar */}
      <div className="p-4 border-b border-neutral-800 flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h2 className="font-bold text-base text-white flex items-center gap-2">
            <span>Resume Form Editor</span>
            <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-700/50 px-2 py-0.5 rounded-full font-medium">
              Live Synced
            </span>
          </h2>
          <p className="text-xs text-neutral-400">
            Edit fields directly or customize for specific roles
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAiTailor}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all active:scale-95"
            title="Tailor resume to any Job Description for 90+ ATS Score"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>AI Job Tailor (90+ ATS)</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg text-xs font-medium border border-neutral-700 transition-colors"
            title="Reset back to Lalit's exact original resume"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-neutral-800 bg-neutral-950/60 px-2 py-1.5 gap-1">
        {sections.map((s) => {
          const Icon = s.icon;
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section Forms Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* HEADER SECTION */}
        {activeSection === 'header' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={data.header.fullName}
                  onChange={(e) => updateHeader('fullName', e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  placeholder="LALIT KATHERIYA"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Professional Title / Subtitle
                </label>
                <input
                  type="text"
                  value={data.header.title}
                  onChange={(e) => updateHeader('title', e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  placeholder="MEAN STACK DEVELOPER | Angular | Node.js | Express.js | MongoDB"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={data.header.location}
                  onChange={(e) => updateHeader('location', e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  placeholder="Ujjain, Madhya Pradesh"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={data.header.phone}
                  onChange={(e) => updateHeader('phone', e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  placeholder="+91-9179255860"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={data.header.email}
                  onChange={(e) => updateHeader('email', e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  placeholder="Lalitkatheriya9941@gmail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  LinkedIn Profile / URL
                </label>
                <input
                  type="text"
                  value={data.header.linkedin}
                  onChange={(e) => updateHeader('linkedin', e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  placeholder="linkedin.com/in/lalitkatheriya369"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  GitHub Profile / Portfolio (Optional)
                </label>
                <input
                  type="text"
                  value={data.header.github || ''}
                  onChange={(e) => updateHeader('github', e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  placeholder="github.com/lalitkatheriya (optional)"
                />
              </div>
            </div>
          </div>
        )}

        {/* SUMMARY SECTION */}
        {activeSection === 'summary' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-neutral-300">
                Professional Summary
              </label>
              <span className="text-[11px] text-neutral-400">
                {data.summary.length} characters • ~{data.summary.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <textarea
              rows={6}
              value={data.summary}
              onChange={(e) => updateSummary(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed font-sans"
              placeholder="Write a concise 3-4 line summary packed with targeted keywords..."
            />
            <div className="bg-neutral-800/70 border border-neutral-700/60 rounded-lg p-3 text-xs text-neutral-300 space-y-1">
              <div className="font-semibold text-blue-400 flex items-center gap-1.5">
                <span>ATS Summary Pro-Tip</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-normal">
                Include years of experience, core tech stack (e.g., MEAN Stack, Angular, Node.js, MongoDB), architectural capabilities (REST APIs, RxJS, NgRx), and cloud exposure (AWS, Docker, CI/CD).
              </p>
            </div>
          </div>
        )}

        {/* TECHNICAL SKILLS SECTION */}
        {activeSection === 'skills' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-xs text-neutral-400">
                Categories are parsed line-by-line by ATS scanners.
              </div>
              <button
                onClick={addSkillCategory}
                className="flex items-center gap-1 text-xs bg-neutral-800 hover:bg-neutral-700 text-blue-400 px-2.5 py-1 rounded-md border border-neutral-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.technicalSkills.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  className="bg-neutral-800/80 border border-neutral-700/80 rounded-lg p-3 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={cat.category}
                      onChange={(e) => updateSkill(idx, 'category', e.target.value)}
                      className="bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-xs font-semibold text-neutral-200 focus:outline-none focus:border-blue-500 w-1/2"
                      placeholder="Category (e.g. Frontend)"
                    />
                    <button
                      onClick={() => removeSkillCategory(idx)}
                      className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                      title="Delete category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={cat.skills}
                    onChange={(e) => updateSkill(idx, 'skills', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-blue-500"
                    placeholder="Comma-separated skills (e.g., Angular 18, TypeScript, RxJS...)"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE SECTION */}
        {activeSection === 'experience' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-xs text-neutral-400">
                Work experience & impact bullet points
              </div>
              <button
                onClick={addExperience}
                className="flex items-center gap-1 text-xs bg-neutral-800 hover:bg-neutral-700 text-blue-400 px-2.5 py-1 rounded-md border border-neutral-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Position</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.experience.map((exp, expIdx) => (
                <div
                  key={exp.id || expIdx}
                  className="bg-neutral-800/90 border border-neutral-700 rounded-lg p-3.5 space-y-3"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-700/60">
                    <span className="text-xs font-bold text-white">
                      Position #{expIdx + 1}
                    </span>
                    <button
                      onClick={() => removeExperience(expIdx)}
                      className="text-neutral-400 hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] text-neutral-400">Job Title / Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(expIdx, 'role', e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400">Company Name</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(expIdx, 'company', e.target.value)
                        }
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) =>
                          updateExperience(expIdx, 'location', e.target.value)
                        }
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400">Time Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) =>
                          updateExperience(expIdx, 'period', e.target.value)
                        }
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-semibold text-neutral-300">
                        Achievement & Responsibility Bullets
                      </label>
                      <button
                        onClick={() => addExperienceBullet(expIdx)}
                        className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Bullet</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {exp.highlights.map((bullet, bulletIdx) => (
                        <div key={bulletIdx} className="flex items-start gap-2">
                          <span className="text-neutral-500 pt-1.5 text-xs">•</span>
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) =>
                              updateExperienceBullet(expIdx, bulletIdx, e.target.value)
                            }
                            className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-neutral-200 focus:outline-none focus:border-blue-500 leading-snug"
                          />
                          <button
                            onClick={() => removeExperienceBullet(expIdx, bulletIdx)}
                            className="text-neutral-500 hover:text-red-400 pt-1.5 p-1"
                            title="Delete bullet"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS SECTION */}
        {activeSection === 'projects' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-xs text-neutral-400">
                Key client & enterprise projects
              </div>
              <button
                onClick={addProject}
                className="flex items-center gap-1 text-xs bg-neutral-800 hover:bg-neutral-700 text-blue-400 px-2.5 py-1 rounded-md border border-neutral-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.projects.map((proj, projIdx) => (
                <div
                  key={proj.id || projIdx}
                  className="bg-neutral-800/90 border border-neutral-700 rounded-lg p-3.5 space-y-3"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-700/60">
                    <span className="text-xs font-bold text-white">
                      Project #{projIdx + 1}
                    </span>
                    <button
                      onClick={() => removeProject(projIdx)}
                      className="text-neutral-400 hover:text-red-400 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] text-neutral-400">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProject(projIdx, 'title', e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400">Period / Date</label>
                      <input
                        type="text"
                        value={proj.period}
                        onChange={(e) => updateProject(projIdx, 'period', e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400">
                        Technologies Stack
                      </label>
                      <input
                        type="text"
                        value={proj.technologies}
                        onChange={(e) =>
                          updateProject(projIdx, 'technologies', e.target.value)
                        }
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                        placeholder="e.g. Angular, Node.js, MongoDB..."
                      />
                    </div>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-semibold text-neutral-300">
                        Project Bullets
                      </label>
                      <button
                        onClick={() => addProjectBullet(projIdx)}
                        className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Bullet</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {proj.highlights.map((bullet, bulletIdx) => (
                        <div key={bulletIdx} className="flex items-start gap-2">
                          <span className="text-neutral-500 pt-1.5 text-xs">•</span>
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) =>
                              updateProjectBullet(projIdx, bulletIdx, e.target.value)
                            }
                            className="flex-1 bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-neutral-200 focus:outline-none focus:border-blue-500 leading-snug"
                          />
                          <button
                            onClick={() => removeProjectBullet(projIdx, bulletIdx)}
                            className="text-neutral-500 hover:text-red-400 pt-1.5 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION SECTION */}
        {activeSection === 'education' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-xs text-neutral-400">Academic qualifications</div>
              <button
                onClick={addEducation}
                className="flex items-center gap-1 text-xs bg-neutral-800 hover:bg-neutral-700 text-blue-400 px-2.5 py-1 rounded-md border border-neutral-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Education</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.education.map((edu, eduIdx) => (
                <div
                  key={edu.id || eduIdx}
                  className="bg-neutral-800/80 border border-neutral-700 rounded-lg p-3 space-y-2.5"
                >
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-xs font-semibold text-neutral-200">
                      Degree #{eduIdx + 1}
                    </span>
                    <button
                      onClick={() => removeEducation(eduIdx)}
                      className="text-neutral-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] text-neutral-400">
                        Degree & Specialization
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(eduIdx, 'degree', e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400">
                        Institute / University
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          updateEducation(eduIdx, 'institution', e.target.value)
                        }
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400">Years</label>
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) => updateEducation(eduIdx, 'period', e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400">
                        CGPA / Percentage (Optional)
                      </label>
                      <input
                        type="text"
                        value={edu.grade || ''}
                        onChange={(e) => updateEducation(eduIdx, 'grade', e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATS KEYWORDS SECTION */}
        {activeSection === 'keywords' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-neutral-300">
                ATS Keywords Index Block
              </label>
              <span className="text-[11px] text-neutral-400">
                Comma-separated exact match tokens
              </span>
            </div>
            <textarea
              rows={4}
              value={data.atsKeywords}
              onChange={(e) => onChange({ ...data, atsKeywords: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
              placeholder="MEAN Stack, Angular, TypeScript, JavaScript, Node.js, Express.js, MongoDB..."
            />

            <div className="flex flex-wrap gap-1.5 pt-2">
              {data.atsKeywords
                .split(',')
                .map((k) => k.trim())
                .filter(Boolean)
                .map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] bg-neutral-800 text-neutral-300 border border-neutral-700"
                  >
                    <span>{kw}</span>
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
