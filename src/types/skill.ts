export interface Skill {
  id: string;
  name: string;
  category: string; // e.g., 'Frontend', 'Backend', 'DevOps'
  proficiency: number; // 1-100
  icon?: string;
  createdAt: any;
  updatedAt: any;
}
