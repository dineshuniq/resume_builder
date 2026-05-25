import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ResumeData } from "@/types/resume";
import { defaultResumeData } from "@/types/resume";

interface ResumeStore {
  resumeData: ResumeData;
  selectedTemplate: number;
  accentColor: string;
  mobileTab: "form" | "preview";
  expandedSections: string[];
  setResumeData: (data: ResumeData) => void;
  updatePersonalInfo: (field: string, value: string) => void;
  updateSummary: (summary: string) => void;
  setSelectedTemplate: (template: number) => void;
  setAccentColor: (color: string) => void;
  setMobileTab: (tab: "form" | "preview") => void;
  toggleSection: (section: string) => void;
  addSkill: (skill: { id: string; name: string; category: string }) => void;
  removeSkill: (id: string) => void;
  addExperience: (exp: ResumeData["experience"][0]) => void;
  removeExperience: (id: string) => void;
  updateExperience: (id: string, field: string, value: unknown) => void;
  addProject: (expId: string, project: ResumeData["experience"][0]["projects"][0]) => void;
  removeProject: (expId: string, projectId: string) => void;
  updateProject: (expId: string, projectId: string, field: string, value: unknown) => void;
  addEducation: (edu: ResumeData["education"][0]) => void;
  removeEducation: (id: string) => void;
  addLanguage: (lang: ResumeData["languages"][0]) => void;
  removeLanguage: (id: string) => void;
  addCertification: (cert: ResumeData["certifications"][0]) => void;
  removeCertification: (id: string) => void;
  resetToDefault: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: defaultResumeData,
      selectedTemplate: 1,
      accentColor: "#e94560",
      mobileTab: "form",
      expandedSections: ["personal", "experience"],

      setResumeData: (data) => set({ resumeData: data }),

      updatePersonalInfo: (field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: {
              ...state.resumeData.personalInfo,
              [field]: value,
            },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          resumeData: { ...state.resumeData, summary },
        })),

      setSelectedTemplate: (template) => set({ selectedTemplate: template }),

      setAccentColor: (color) => set({ accentColor: color }),

      setMobileTab: (tab) => set({ mobileTab: tab }),

      toggleSection: (section) =>
        set((state) => ({
          expandedSections: state.expandedSections.includes(section)
            ? state.expandedSections.filter((s) => s !== section)
            : [...state.expandedSections, section],
        })),

      addSkill: (skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [...state.resumeData.skills, skill],
          },
        })),

      removeSkill: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((s) => s.id !== id),
          },
        })),

      addExperience: (exp) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [...state.resumeData.experience, exp],
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((e) => e.id !== id),
          },
        })),

      updateExperience: (id, field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((e) =>
              e.id === id ? { ...e, [field]: value } : e
            ),
          },
        })),

      addProject: (expId, project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((e) =>
              e.id === expId
                ? { ...e, projects: [...e.projects, project] }
                : e
            ),
          },
        })),

      removeProject: (expId, projectId) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((e) =>
              e.id === expId
                ? {
                    ...e,
                    projects: e.projects.filter((p) => p.id !== projectId),
                  }
                : e
            ),
          },
        })),

      updateProject: (expId, projectId, field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((e) =>
              e.id === expId
                ? {
                    ...e,
                    projects: e.projects.map((p) =>
                      p.id === projectId ? { ...p, [field]: value } : p
                    ),
                  }
                : e
            ),
          },
        })),

      addEducation: (edu) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, edu],
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((e) => e.id !== id),
          },
        })),

      addLanguage: (lang) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: [...state.resumeData.languages, lang],
          },
        })),

      removeLanguage: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: state.resumeData.languages.filter((l) => l.id !== id),
          },
        })),

      addCertification: (cert) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: [...state.resumeData.certifications, cert],
          },
        })),

      removeCertification: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.filter(
              (c) => c.id !== id
            ),
          },
        })),

      resetToDefault: () => set({ resumeData: defaultResumeData }),
    }),
    {
      name: "resume-builder-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        resumeData: state.resumeData,
        selectedTemplate: state.selectedTemplate,
        accentColor: state.accentColor,
        expandedSections: state.expandedSections,
      }),
    }
  )
);
