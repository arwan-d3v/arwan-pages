import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { Connector, ConnectorVisibility } from "@/types/connector";

const CONNECTORS_COLLECTION = "connectors";

export async function getConnectors(userRole: 'owner' | 'family' | 'user' | null) {
  if (!db) return [];

  const allowedVisibilities: ConnectorVisibility[] = ['public'];
  if (userRole === 'family' || userRole === 'owner') {
    allowedVisibilities.push('family');
  }
  if (userRole === 'owner') {
    allowedVisibilities.push('owner');
  }

  try {
    const q = query(
      collection(db, CONNECTORS_COLLECTION),
      where("visibility", "in", allowedVisibilities),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const connectors: Connector[] = [];

    querySnapshot.forEach((doc) => {
      connectors.push({ id: doc.id, ...doc.data() } as Connector);
    });

    return connectors;
  } catch (error) {
    console.error("Error fetching connectors:", error);
    return [];
  }
}

export async function createConnector(connector: Omit<Connector, 'id' | 'createdAt' | 'updatedAt'>) {
  if (!db) throw new Error("Firebase not initialized");

  return addDoc(collection(db, CONNECTORS_COLLECTION), {
    ...connector,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteConnector(id: string) {
  if (!db) throw new Error("Firebase not initialized");

  return deleteDoc(doc(db, CONNECTORS_COLLECTION, id));
}
