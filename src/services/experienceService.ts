import { db } from "@/lib/firebase";
import {
  collection,
  query,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { Experience } from "@/types/experience";

const EXPERIENCE_COLLECTION = "experiences";

export async function getExperiences() {
  if (!db) return [];

  try {
    const q = query(
      collection(db, EXPERIENCE_COLLECTION),
      orderBy("startDate", "desc")
    );

    const querySnapshot = await getDocs(q);
    const experiences: Experience[] = [];

    querySnapshot.forEach((doc) => {
      experiences.push({ id: doc.id, ...doc.data() } as Experience);
    });

    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function createExperience(experience: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) {
  if (!db) throw new Error("Firebase not initialized");

  return addDoc(collection(db, EXPERIENCE_COLLECTION), {
    ...experience,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateExperience(id: string, experience: Partial<Experience>) {
  if (!db) throw new Error("Firebase not initialized");

  const expRef = doc(db, EXPERIENCE_COLLECTION, id);
  return updateDoc(expRef, {
    ...experience,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteExperience(id: string) {
  if (!db) throw new Error("Firebase not initialized");

  return deleteDoc(doc(db, EXPERIENCE_COLLECTION, id));
}
