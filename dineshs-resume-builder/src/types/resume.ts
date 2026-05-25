export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface Project {
  id: string;
  title: string;
  bullets: string[];
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  from: string;
  to: string;
  current: boolean;
  projects: Project[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  score: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  year: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  certifications: Certification[];
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "Alexandra Chen",
    title: "Senior Product Designer",
    email: "alexandra.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexandrachen",
    website: "alexandrachen.design",
  },
  summary:
    "Creative and strategic product designer with 8+ years of experience crafting user-centered digital experiences. Passionate about solving complex problems through elegant design solutions. Proven track record of leading design teams and delivering products that increase user engagement by 40%.",
  skills: [
    { id: "1", name: "Figma", category: "Design Tools" },
    { id: "2", name: "Sketch", category: "Design Tools" },
    { id: "3", name: "Adobe Creative Suite", category: "Design Tools" },
    { id: "4", name: "HTML/CSS", category: "Technical" },
    { id: "5", name: "JavaScript", category: "Technical" },
    { id: "6", name: "React", category: "Technical" },
    { id: "7", name: "User Research", category: "UX" },
    { id: "8", name: "Prototyping", category: "UX" },
    { id: "9", name: "Usability Testing", category: "UX" },
    { id: "10", name: "Design Systems", category: "UX" },
    { id: "11", name: "Agile/Scrum", category: "Process" },
    { id: "12", name: "Project Management", category: "Process" },
  ],
  experience: [
    {
      id: "1",
      company: "TechVision Inc.",
      location: "San Francisco, CA",
      role: "Senior Product Designer",
      from: "Jan 2021",
      to: "Present",
      current: true,
      projects: [
        {
          id: "p1",
          title: "Design System Overhaul",
          bullets: [
            "Led complete redesign of company's design system serving 50+ product teams",
            "Reduced design-to-development handoff time by 60% through automated component specs",
            "Created 200+ reusable components used across 15 product lines",
          ],
        },
        {
          id: "p2",
          title: "Mobile App Redesign",
          bullets: [
            "Redesigned flagship mobile app increasing user retention by 35%",
            "Conducted 50+ user interviews to inform design decisions",
            "Collaborated with engineering to implement micro-interactions",
          ],
        },
      ],
    },
    {
      id: "2",
      company: "CreativeStudio Agency",
      location: "New York, NY",
      role: "UI/UX Designer",
      from: "Mar 2018",
      to: "Dec 2020",
      current: false,
      projects: [
        {
          id: "p3",
          title: "E-commerce Platform",
          bullets: [
            "Designed end-to-end shopping experience for Fortune 500 client",
            "Increased conversion rate by 25% through streamlined checkout flow",
            "Created comprehensive user journey maps and wireframes",
          ],
        },
      ],
    },
    {
      id: "3",
      company: "StartupHub",
      location: "Austin, TX",
      role: "Junior Designer",
      from: "Jun 2016",
      to: "Feb 2018",
      current: false,
      projects: [
        {
          id: "p4",
          title: "Brand Identity & Web Design",
          bullets: [
            "Developed brand identity for 10+ startup clients",
            "Designed responsive websites using modern frameworks",
            "Collaborated with marketing team on visual campaigns",
          ],
        },
      ],
    },
  ],
  education: [
    {
      id: "1",
      institution: "Rhode Island School of Design",
      degree: "Master of Fine Arts in Graphic Design",
      year: "2016",
      score: "3.9 GPA",
    },
    {
      id: "2",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Arts in Visual Communication",
      year: "2014",
      score: "3.7 GPA",
    },
  ],
  languages: [
    { id: "1", name: "English", proficiency: "Native" },
    { id: "2", name: "Mandarin Chinese", proficiency: "Fluent" },
    { id: "3", name: "Spanish", proficiency: "Conversational" },
  ],
  certifications: [
    { id: "1", name: "Certified User Experience Professional", organization: "Nielsen Norman Group", year: "2022" },
    { id: "2", name: "Google UX Design Certificate", organization: "Google", year: "2021" },
  ],
};
