export type ExperienceType = 'full-time' | 'freelance';

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: any; // Firestore Timestamp
  endDate?: any; // Firestore Timestamp, null if current
  description: string[];
  type: ExperienceType;
  techStack?: string[];
  link?: string;
  createdAt: any;
  updatedAt: any;
}
