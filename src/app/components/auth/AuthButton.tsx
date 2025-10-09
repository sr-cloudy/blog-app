'use client';

import { useAuth } from './AuthContext';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const { user } = useAuth(); // Read the state from the context
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();

    // IMPORTANT: router.refresh() forces Next.js to re-run the AuthProvider
    // Server Component, which will then fetch the new (null) session.
    router.refresh();
    router.push('/');
  };

  return user ? (
    <button onClick={handleSignOut}>Sign Out ({user.email})</button>
  ) : (
    <a href="/login">Login</a>
  );
}
