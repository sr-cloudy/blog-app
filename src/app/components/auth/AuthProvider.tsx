import { createClient } from '@/utils/supabase/server'; // Assuming your file is in utils/supabase/server.ts
import { cookies } from 'next/headers';
import AuthContext from './AuthContext';
export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Create the server client
  // Note: Your createClient is async, but Next.js handles it.
  const supabase = await createClient();

  // 2. Fetch the session on the server
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 3. Pass the initial session to the Client Component Context
  return (
    // Pass the initial, non-null or null session data immediately to the client
    <AuthContext initialSession={session}>{children}</AuthContext>
  );
}
