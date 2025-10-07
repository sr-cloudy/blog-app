import { redirect } from 'next/navigation';
import AccountForm from './account-form';
import { createClient } from '@/utils/supabase/server';

export default async function Account() {
  const supabase = await createClient();

  // ✅ Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 🔐 Redirect if not logged in
  if (!session) {
    redirect('/login');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user} />;
}
