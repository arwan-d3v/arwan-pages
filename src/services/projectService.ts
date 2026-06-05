import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { Project, ProjectVisibility, ProjectWithStats } from "@/types/project";
import { getRepoStats } from "@/lib/github";

const PROJECTS_COLLECTION = "projects";

export async function getProjects(userRole: 'owner' | 'family' | 'user' | null) {
  if (!db) return [];

  const allowedVisibilities: ProjectVisibility[] = ['public'];
  if (userRole === 'family' || userRole === 'owner') {
    allowedVisibilities.push('family');
  }
  if (userRole === 'owner') {
    allowedVisibilities.push('owner');
  }

  try {
    const q = query(
      collection(db, PROJECTS_COLLECTION),
      where("visibility", "in", allowedVisibilities),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const projects: Project[] = [];

    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() } as Project);
    });

    const projectsWithStats: ProjectWithStats[] = await Promise.all(
      projects.map(async (project) => {
        if (project.githubUrl) {
          const stats = await getRepoStats(project.githubUrl);
          return { ...project, githubStats: stats || undefined };
        }
        return project;
      })
    );

    return projectsWithStats;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
  if (!db) throw new Error("Firebase not initialized");

  return addDoc(collection(db, PROJECTS_COLLECTION), {
    ...project,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateProject(id: string, project: Partial<Project>) {
  if (!db) throw new Error("Firebase not initialized");

  const projectRef = doc(db, PROJECTS_COLLECTION, id);
  return updateDoc(projectRef, {
    ...project,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string) {
  if (!db) throw new Error("Firebase not initialized");

  return deleteDoc(doc(db, PROJECTS_COLLECTION, id));
}
