// app/private/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function PrivatePage() {
  // ✅ Create the Supabase client with server-side cookies
  const supabase = await createClient();

  // ✅ Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 🔐 Redirect if not logged in
  if (!session) {
    redirect('/login');
  }

  // ✅ If logged in, render the page
  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <p>This is a private page only accessible to logged-in users.</p>
    </div>
  );
}
