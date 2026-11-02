export interface ResumeHeader {
  fullName: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github?: string;
  portfolio?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  period: string;
  technologies: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade?: string;
}

export interface ResumeData {
  header: ResumeHeader;
  summary: string;
  technicalSkills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  atsKeywords: string;
}

export interface AtsAnalysisResult {
  overallScore: number;
  formatScore: number;
  impactScore: number;
  matchingKeywords: string[];
  missingKeywords: string[];
  keyImprovements?: string[];
  suggestions?: string[];
  executiveSummary?: string;
}
