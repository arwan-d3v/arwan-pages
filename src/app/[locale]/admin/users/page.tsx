"use client";

import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserCog, Trash2, ShieldCheck, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  email: string;
  role: "owner" | "family" | "user";
}

export default function UserManagement() {
  const { user, role, loading } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== "owner") {
      router.push("/");
    }
  }, [role, loading, router]);

  const fetchUsers = async () => {
    if (!db) return;
    setIsRefreshing(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData: UserProfile[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as UserProfile);
      });
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (role === 'owner') fetchUsers();
  }, [role]);

  const handleUpdateRole = async (userId: string, newRole: "family" | "user") => {
    if (!db) return;
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  if (loading) return <div className="p-24 text-neon-cyan animate-pulse">SYNCHRONIZING_USER_DATABASE...</div>;
  if (role !== "owner") return null;

  return (
    <main className="min-h-screen bg-background font-mono p-24">
      <Header />
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-neon-cyan crt-glow flex items-center gap-4">
          <UserCog className="w-8 h-8" /> USER_AUTHORIZATION_PROTOCOL
        </h1>
        <button
          onClick={fetchUsers}
          className={`px-4 py-2 border border-neon-cyan/50 text-neon-cyan text-sm hover:bg-neon-cyan/10 transition-all ${isRefreshing ? 'animate-pulse' : ''}`}
        >
          [REFRESH_DATABASE]
        </button>
      </div>

      <div className="border border-neon-cyan/20 bg-black/40 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-neon-cyan/10 text-neon-cyan border-b border-neon-cyan/20">
            <tr>
              <th className="p-4">IDENTITY (UID)</th>
              <th className="p-4">CLEARANCE_LEVEL</th>
              <th className="p-4">PROTOCOLS</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-muted-foreground italic">No auxiliary identities detected in database.</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-b border-neon-cyan/10 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-xs">{u.id}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      u.role === 'owner' ? 'bg-neon-emerald/20 text-neon-emerald' :
                      u.role === 'family' ? 'bg-neon-cyan/20 text-neon-cyan' :
                      'bg-white/10 text-white/50'
                    }`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 flex gap-4">
                    {u.role !== 'owner' && (
                      <>
                        <button
                          onClick={() => handleUpdateRole(u.id, u.role === 'family' ? 'user' : 'family')}
                          className="flex items-center gap-1 text-[10px] text-neon-emerald hover:underline"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          [{u.role === 'family' ? 'REVOKE_FAMILY_ACCESS' : 'GRANT_FAMILY_ACCESS'}]
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-12 p-6 border border-white/10 bg-white/5 rounded-md">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-neon-cyan" /> PUBLIC_ACCESS_RULES
        </h2>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
          <li>Unauthenticated users can only view [PUBLIC] content modules.</li>
          <li>New registrants are assigned [USER] status by default.</li>
          <li>[FAMILY] status grants VIEW-ONLY access to the internal Command Center.</li>
          <li>[OWNER] status (Super Admin) is the only identity authorized for WRITE/CRUD protocols.</li>
        </ul>
      </div>
    </main>
  );
}
