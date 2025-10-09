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
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="p-8 bg-white rounded-lg shadow-md text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mb-2">Welcome back!</p>
        <p className="text-gray-800 font-semibold mb-6 break-all">
          {session.user.email}
        </p>

        {/* <form action="/auth/signout" method="post">
          <button className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
            Sign Out
          </button>
        </form> */}
        {/*
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form> */}
      </div>
    </div>
  );
}
