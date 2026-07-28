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

export interface SectionTitles {
  contact: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  languages: string;
  certifications: string;
  projects: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  sectionTitles?: SectionTitles;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  certifications: Certification[];
}

export const defaultSectionTitles: SectionTitles = {
  contact: "Contact",
  summary: "Professional Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  languages: "Languages",
  certifications: "Certifications",
  projects: "Projects",
};

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "Rohan Mehta",
    title: "Backend Software Developer",
    email: "rohan.mehta@email.com",
    phone: "+1 (555) 312-8890",
    location: "Bengaluru, India",
    linkedin: "linkedin.com/in/rohanmehta",
    website: "github.com/rohanmehta",
  },
  sectionTitles: defaultSectionTitles,
  summary:
    "Backend software developer with 6+ years of experience building scalable APIs, distributed systems, and LLM-powered applications. Specialized in designing and shipping Retrieval-Augmented Generation (RAG) pipelines using vector databases and orchestration frameworks. Proven track record of reducing latency and infrastructure costs while improving system reliability at scale.",
  skills: [
    { id: "1", name: "Python", category: "Languages" },
    { id: "2", name: "Java", category: "Languages" },
    { id: "3", name: "Go", category: "Languages" },
    { id: "4", name: "PostgreSQL", category: "Databases" },
    { id: "5", name: "Redis", category: "Databases" },
    { id: "6", name: "Pinecone / pgvector", category: "Databases" },
    { id: "7", name: "LangChain", category: "AI/ML" },
    { id: "8", name: "RAG Pipelines", category: "AI/ML" },
    { id: "9", name: "OpenAI & Anthropic APIs", category: "AI/ML" },
    { id: "10", name: "Docker & Kubernetes", category: "Infrastructure" },
    { id: "11", name: "AWS", category: "Infrastructure" },
    { id: "12", name: "REST & gRPC APIs", category: "Backend" },
  ],
  experience: [
    {
      id: "1",
      company: "NimbusStack Technologies",
      location: "Bengaluru, India",
      role: "Senior Backend Developer",
      from: "Feb 2022",
      to: "Present",
      current: true,
      projects: [
        {
          id: "p1",
          title: "Enterprise Knowledge Assistant (RAG Platform)",
          bullets: [
            "Architected a Retrieval-Augmented Generation pipeline ingesting 500K+ internal documents, cutting support ticket resolution time by 45%",
            "Built a hybrid retrieval layer combining pgvector similarity search with BM25 keyword ranking, improving answer relevance by 30%",
            "Designed chunking and embedding refresh workflows processing 50K+ documents daily with sub-second query latency",
          ],
        },
        {
          id: "p2",
          title: "Microservices Migration",
          bullets: [
            "Decomposed a monolithic order-processing service into 12 microservices, improving deployment frequency by 4x",
            "Reduced API p99 latency from 800ms to 180ms through caching and query optimization",
            "Introduced gRPC for inter-service communication, cutting payload size by 40%",
          ],
        },
      ],
    },
    {
      id: "2",
      company: "DataForge Solutions",
      location: "Pune, India",
      role: "Backend Developer",
      from: "Jul 2019",
      to: "Jan 2022",
      current: false,
      projects: [
        {
          id: "p3",
          title: "Document Search & Retrieval API",
          bullets: [
            "Built a semantic search API using OpenAI embeddings and FAISS, serving 200+ internal users",
            "Implemented rate-limited, authenticated REST endpoints handling 1M+ requests per month",
            "Set up CI/CD pipelines with Docker and Kubernetes, reducing deployment time by 70%",
          ],
        },
      ],
    },
    {
      id: "3",
      company: "CodeCraft Labs",
      location: "Pune, India",
      role: "Junior Software Engineer",
      from: "Jun 2017",
      to: "Jun 2019",
      current: false,
      projects: [
        {
          id: "p4",
          title: "Internal Tooling & API Development",
          bullets: [
            "Developed internal REST APIs used by 5+ product teams for data access and reporting",
            "Wrote automated test suites that increased backend code coverage from 40% to 85%",
            "Collaborated with DevOps to containerize legacy services using Docker",
          ],
        },
      ],
    },
  ],
  education: [
    {
      id: "1",
      institution: "Indian Institute of Technology (IIT)",
      degree: "Master of Technology in Computer Science",
      year: "2017",
      score: "8.7 CGPA",
    },
    {
      id: "2",
      institution: "Pune Institute of Computer Technology",
      degree: "Bachelor of Engineering in Information Technology",
      year: "2015",
      score: "8.3 CGPA",
    },
  ],
  languages: [
    { id: "1", name: "English", proficiency: "Fluent" },
    { id: "2", name: "Hindi", proficiency: "Native" },
    { id: "3", name: "Marathi", proficiency: "Conversational" },
  ],
  certifications: [
    { id: "1", name: "AWS Certified Solutions Architect – Associate", organization: "Amazon Web Services", year: "2023" },
    { id: "2", name: "LangChain & Vector Databases for LLM Applications", organization: "DeepLearning.AI", year: "2023" },
  ],
};
