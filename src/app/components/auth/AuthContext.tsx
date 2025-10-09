'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client'; // Import your client-side Supabase client

// --- 1. Context Setup ---
type AuthContextType = {
  user: User | null;
  session: Session | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
});

// --- 2. Provider Component (Client Component) ---
function AuthProvider({
  initialSession, // This comes from the Server Component
  children,
}: {
  initialSession: Session | null;
  children: React.ReactNode;
}) {
  const supabase = createClient();

  // Use the server-fetched session as the initial state
  const [session, setSession] = useState<Session | null>(initialSession);
  const user = useMemo(() => session?.user ?? null, [session]);

  // --- 3. Client-side Listener ---
  useEffect(() => {
    // This is the fallback/real-time listener for login/logout *after* page load
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // This will fire when the user logs in/out from the same browser session
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const value = { user, session };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

// --- 4. Custom Hook ---
export const useAuth = () => useContext(AuthContext);
