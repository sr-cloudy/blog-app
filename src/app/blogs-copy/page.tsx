import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server'; // Assumed server client utility
import BlogManager from '../components/BlogManager';

// This is the Server Component responsible for Authentication
export default async function ProfilePage() {
  // 1. Initialize the server-side Supabase client
  const supabase = await createClient();

  // 2. Retrieve the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 3. 🔐 Perform the final check and redirect if unauthorized
  if (!session) {
    // Redirect the user to the login page
    redirect('/login');
  }

  // 4. If authorized, render the client component
  // Note: We don't need to pass the user ID, as the API routes
  // should handle fetching the user ID from the cookies.
  return <BlogManager />;
}

// export default function ProfilePage() {
//   return <div>Hello from profile page</div>;
// }
