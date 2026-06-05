import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";
import { Skill } from "@/types/skill";

const SKILLS_COLLECTION = "skills";

export async function getSkills() {
  if (!db) return [];

  try {
    const q = query(
      collection(db, SKILLS_COLLECTION),
      orderBy("category"),
      orderBy("proficiency", "desc")
    );

    const querySnapshot = await getDocs(q);
    const skills: Skill[] = [];

    querySnapshot.forEach((doc) => {
      skills.push({ id: doc.id, ...doc.data() } as Skill);
    });

    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

export async function createSkill(skill: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) {
  if (!db) throw new Error("Firebase not initialized");

  return addDoc(collection(db, SKILLS_COLLECTION), {
    ...skill,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteSkill(id: string) {
  if (!db) throw new Error("Firebase not initialized");

  return deleteDoc(doc(db, SKILLS_COLLECTION, id));
}
