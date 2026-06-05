export type ProjectVisibility = 'public' | 'family' | 'owner';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  techStack: string[];
  visibility: ProjectVisibility;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export interface ProjectWithStats extends Project {
  githubStats?: {
    stars: number;
    forks: number;
    issues: number;
  };
}
