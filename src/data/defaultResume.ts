import { ResumeData } from '../types/resume';

export const DEFAULT_RESUME: ResumeData = {
  header: {
    fullName: 'LALIT KATHERIYA',
    title: 'MEAN STACK DEVELOPER | Angular | Node.js | Express.js | MongoDB',
    location: 'Ujjain, Madhya Pradesh',
    phone: '+91-9179255860',
    email: 'Lalitkatheriya9941@gmail.com',
    linkedin: 'linkedin.com/in/lalitkatheriya369',
    github: '',
    portfolio: '',
  },
  summary:
    'MEAN Stack Developer with 4.5+ years of experience building scalable web applications using Angular, TypeScript, Node.js, Express.js, MongoDB and REST APIs. Strong experience in reusable Angular components, RxJS, NgRx, authentication, API integration, database development, responsive UI, performance optimization and Agile development. Hands-on exposure to AWS, Docker, Git and CI/CD.',
  technicalSkills: [
    {
      id: 'skill-1',
      category: 'Frontend',
      skills:
        'Angular 13–18+, TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS, Angular Material, Bootstrap, Tailwind CSS, PWA',
    },
    {
      id: 'skill-2',
      category: 'Backend',
      skills: 'Node.js, Express.js, REST APIs, JWT Authentication',
    },
    {
      id: 'skill-3',
      category: 'Database',
      skills: 'MongoDB, MySQL, SQL, Firebase',
    },
    {
      id: 'skill-4',
      category: 'State Management',
      skills: 'RxJS, NgRx',
    },
    {
      id: 'skill-5',
      category: 'Cloud & DevOps',
      skills: 'AWS EC2, S3, IAM, Docker, GitHub Actions, GitLab CI/CD',
    },
    {
      id: 'skill-6',
      category: 'Tools',
      skills: 'Git, GitHub, GitLab, Postman, Jira, ClickUp, VS Code',
    },
    {
      id: 'skill-7',
      category: 'Performance/Security',
      skills:
        'Lazy Loading, Code Splitting, Lighthouse, Core Web Vitals, OWASP Best Practices',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Full Stack Web Developer',
      company: 'E-Way IT Solution',
      location: 'Ujjain',
      period: 'Mar 2022 – Present',
      highlights: [
        'Developed responsive and scalable web applications using Angular, TypeScript, Ionic, Bootstrap, HTML5 and SCSS.',
        'Built reusable Angular components, services and modules; implemented RxJS and NgRx for reactive programming and state management.',
        'Designed and integrated RESTful APIs using Node.js and Express.js with MongoDB database integration.',
        'Implemented JWT-based authentication, secure API communication, third-party integrations and production issue resolution.',
        'Improved application performance using lazy loading, code splitting and frontend optimization; worked in Agile/Scrum with Git, code reviews and sprint planning.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Lotto Social UK Lottery – Hybrid Application',
      period: 'Jul 2022 – Present',
      technologies: 'Angular, Ionic, TypeScript, Node.js, REST APIs, Firebase',
      highlights: [
        'Developed core Angular modules, reusable components and responsive UI; integrated REST APIs, Firebase and payment workflows.',
        'Improved performance, resolved production issues and collaborated through Agile development, Git branching and code reviews.',
      ],
    },
    {
      id: 'proj-2',
      title: 'Metro Exchange – Stock Dashboard',
      period: 'Jul 2024 – Aug 2024',
      technologies: 'Angular 18, TypeScript, REST APIs, Bootstrap, SCSS',
      highlights: [
        'Migrated an AngularJS stock dashboard to Angular 18; developed reusable responsive components and integrated real-time stock APIs.',
        'Refactored legacy code and optimized performance, maintainability and cross-device experience.',
      ],
    },
    {
      id: 'proj-3',
      title: 'Enablement Dashboard – US Navy Workflow System',
      period: 'Jan 2025 – Apr 2025',
      technologies: 'Angular 15, Angular Material, TypeScript, REST APIs',
      highlights: [
        'Developed reusable workflow dashboard components, responsive UI and REST API integrations using Angular best practices.',
        'Optimized dashboard performance and cross-browser compatibility.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech, Electronics & Communication Engineering',
      institution: 'Prashanti Institute of Technology and Science, University RGPV',
      period: '2019–2022',
      grade: 'CGPA: 8.40',
    },
  ],
  atsKeywords:
    'MEAN Stack, Angular, TypeScript, JavaScript, Node.js, Express.js, MongoDB, REST API, RxJS, NgRx, JWT, AWS, Docker, Git, CI/CD, Agile, Scrum',
};

export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: 'Senior MEAN / Full Stack Developer (Fintech & Cloud)',
    company: 'FinEdge Technologies',
    text: `Job Description:
We are looking for an experienced Senior MEAN Stack Developer to design, develop, and maintain high-performance enterprise financial applications.

Requirements:
- 4+ years of professional software engineering experience with MongoDB, Express.js, Angular (v14+), and Node.js.
- Deep expertise in TypeScript, RxJS, NgRx state management, and building reactive single-page applications.
- Strong hands-on experience designing secure RESTful microservices, API authentication (JWT, OAuth2), and rate limiting.
- Proven experience with MongoDB aggregation pipelines, indexing, database schema optimization, and caching strategies (Redis).
- Proficiency with AWS cloud architecture (EC2, S3, CloudFront), Docker containerization, and CI/CD pipelines (GitHub Actions).
- Experience leading performance optimization (Core Web Vitals, code splitting, lazy loading) and OWASP security compliance.
- Collaborative mindset in an Agile / Scrum environment with automated testing, code reviews, and Git workflows.`,
  },
  {
    title: 'Lead Angular & Node.js Engineer (Enterprise SaaS)',
    company: 'Global Cloud Systems',
    text: `About the Role:
Global Cloud Systems is seeking a Lead Full Stack Engineer (Angular 17/18 + Node.js) to scale our mission-critical workflow dashboards.

Key Responsibilities:
- Architect scalable, reusable front-end architectures using modern Angular (v16-v18), Angular Signals, RxJS, and SCSS/Tailwind CSS.
- Build resilient backend microservices with Node.js, Express.js, and TypeScript with robust error handling and monitoring.
- Optimize complex real-time data streaming (WebSockets, server-sent events) for financial and analytical dashboards.
- Manage NoSQL & Relational databases (MongoDB, PostgreSQL) ensuring data integrity and high availability.
- Deploy containers on AWS (ECS, EKS, Docker) and manage automated CI/CD deployment pipelines.
- Mentor junior engineers, conduct thorough peer code reviews, and uphold clean code principles and unit test coverage.`,
  },
  {
    title: 'Full Stack JavaScript / TypeScript Developer',
    company: 'NextGen Digital Labs',
    text: `We are hiring a Full Stack Developer specializing in TypeScript, Angular, and Node.js.

Must-Haves:
- Strong proficiency in modern JavaScript (ES6+) and TypeScript.
- Hands-on experience developing single-page applications using Angular, Ionic (for mobile hybrid), and Material UI.
- Proven track record building and consuming RESTful APIs, webhooks, and third-party payment gateways (Stripe/PayPal).
- Working knowledge of MongoDB and Firebase (Firestore, Auth, Cloud Messaging).
- Experience with Docker, Linux environments, Git branching strategies, and Jira/ClickUp sprint management.
- Passion for clean UI, cross-browser responsiveness, accessibility (WCAG), and fast page load times.`,
  },
];
