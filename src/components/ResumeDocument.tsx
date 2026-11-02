import React from 'react';
import { ResumeData } from '../types/resume';

interface ResumeDocumentProps {
  data: ResumeData;
  scale?: number;
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({ data, scale = 1 }) => {
  const { header, summary, technicalSkills, experience, projects, education, atsKeywords } =
    data;

  return (
    <div
      id="ats-resume-printable"
      className="bg-white text-neutral-900 shadow-xl transition-all duration-200"
      style={{
        width: '100%',
        maxWidth: '820px',
        minHeight: '1060px',
        margin: '0 auto',
        padding: '38px 46px',
        fontFamily: 'Arial, Helvetica, "Liberation Sans", sans-serif',
        fontSize: '11px',
        lineHeight: 1.42,
        color: '#111827',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top center',
        boxSizing: 'border-box',
      }}
    >
      {/* HEADER */}
      <header className="text-center mb-3">
        <h1
          className="text-2xl font-black tracking-wider uppercase mb-1 text-black"
          style={{ letterSpacing: '0.05em' }}
        >
          {header.fullName || 'FULL NAME'}
        </h1>
        <div className="text-[12px] font-bold text-neutral-800 tracking-wide uppercase mb-1.5">
          {header.title}
        </div>
        <div className="text-[10.5px] text-neutral-700 font-medium flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5">
          {header.location && <span>{header.location}</span>}
          {header.location && header.phone && <span className="text-neutral-400">|</span>}
          {header.phone && (
            <a
              href={`tel:${header.phone.replace(/[^0-9+]/g, '')}`}
              className="text-neutral-700 hover:text-blue-700 hover:underline"
            >
              {header.phone}
            </a>
          )}
          {header.phone && header.email && <span className="text-neutral-400">|</span>}
          {header.email && (
            <a
              href={`mailto:${header.email}`}
              className="text-neutral-700 hover:text-blue-700 hover:underline"
            >
              {header.email}
            </a>
          )}
          {header.linkedin && (
            <>
              <span className="text-neutral-400">|</span>
              <a
                href={
                  header.linkedin.startsWith('http')
                    ? header.linkedin
                    : `https://${header.linkedin}`
                }
                target="_blank"
                rel="noreferrer"
                className="text-neutral-700 hover:text-blue-700 hover:underline"
              >
                {header.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </>
          )}
          {header.github && (
            <>
              <span className="text-neutral-400">|</span>
              <a
                href={
                  header.github.startsWith('http')
                    ? header.github
                    : `https://${header.github}`
                }
                target="_blank"
                rel="noreferrer"
                className="text-neutral-700 hover:text-blue-700 hover:underline"
              >
                {header.github.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </>
          )}
        </div>
      </header>

      {/* SECTION: PROFESSIONAL SUMMARY */}
      {summary && (
        <section className="mb-3">
          <h2 className="text-[12px] font-bold tracking-wider uppercase text-black border-b border-black pb-0.5 mb-1.5">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-[11px] leading-relaxed text-justify text-neutral-900">
            {summary}
          </p>
        </section>
      )}

      {/* SECTION: TECHNICAL SKILLS */}
      {technicalSkills && technicalSkills.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[12px] font-bold tracking-wider uppercase text-black border-b border-black pb-0.5 mb-1.5">
            TECHNICAL SKILLS
          </h2>
          <div className="space-y-1">
            {technicalSkills.map((item) => (
              <div key={item.id} className="text-[10.5px] leading-tight">
                <span className="font-bold text-neutral-900">{item.category}: </span>
                <span className="text-neutral-800">{item.skills}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: PROFESSIONAL EXPERIENCE */}
      {experience && experience.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[12px] font-bold tracking-wider uppercase text-black border-b border-black pb-0.5 mb-1.5">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-2.5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline flex-wrap text-[11px] font-bold text-black mb-0.5">
                  <div>
                    <span>{exp.role}</span>
                    {exp.company && (
                      <>
                        <span className="mx-1 text-neutral-500 font-normal">|</span>
                        <span>{exp.company}</span>
                      </>
                    )}
                    {exp.location && (
                      <>
                        <span className="mx-1 text-neutral-500 font-normal">|</span>
                        <span className="font-medium text-neutral-800">{exp.location}</span>
                      </>
                    )}
                  </div>
                  <div className="font-semibold text-neutral-800">{exp.period}</div>
                </div>

                <ul className="list-disc ml-4 space-y-0.5 text-[10.5px] leading-snug text-neutral-800">
                  {exp.highlights.map((bullet, idx) => (
                    <li key={idx} className="pl-0.5">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: SELECTED PROJECTS */}
      {projects && projects.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[12px] font-bold tracking-wider uppercase text-black border-b border-black pb-0.5 mb-1.5">
            SELECTED PROJECTS
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline flex-wrap text-[11px] font-bold text-black mb-0.5">
                  <div>{proj.title}</div>
                  <div className="font-semibold text-neutral-800">{proj.period}</div>
                </div>

                {proj.technologies && (
                  <div className="text-[10px] italic text-neutral-800 mb-1">
                    <span className="font-bold not-italic">Technologies: </span>
                    {proj.technologies}
                  </div>
                )}

                <ul className="list-disc ml-4 space-y-0.5 text-[10.5px] leading-snug text-neutral-800">
                  {proj.highlights.map((bullet, idx) => (
                    <li key={idx} className="pl-0.5">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: EDUCATION */}
      {education && education.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[12px] font-bold tracking-wider uppercase text-black border-b border-black pb-0.5 mb-1.5">
            EDUCATION
          </h2>
          <div className="space-y-1">
            {education.map((edu) => (
              <div key={edu.id} className="text-[10.5px] leading-snug">
                <span className="font-bold text-black">{edu.degree}</span>
                {edu.institution && <span> – {edu.institution}</span>}
                {edu.period && <span> | {edu.period}</span>}
                {edu.grade && <span className="font-semibold"> | {edu.grade}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: ATS KEYWORDS */}
      {atsKeywords && (
        <section className="mb-2">
          <div className="text-[10.5px] leading-snug">
            <span className="font-bold text-black">ATS Keywords: </span>
            <span className="text-neutral-800">{atsKeywords}</span>
          </div>
        </section>
      )}

      {/* FOOTER NOTE MATCHING ORIGINAL PDF */}
      <footer className="mt-8 pt-4 border-t border-neutral-100 text-center text-[9px] text-neutral-400 font-medium">
        {header.fullName || 'Lalit Katheriya'} | {header.title?.split('|')[0]?.trim() || 'MEAN Stack Developer'}
      </footer>
    </div>
  );
};
