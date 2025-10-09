import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// This utility function is solely responsible for refreshing the session cookies.
export async function updateSession(request: NextRequest) {
  // Create a response object that will carry the refreshed cookies
  const response = NextResponse.next();

  // Initialize Supabase client configured to handle cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        // When Supabase refreshes the session, it calls setAll,
        // which updates the cookies on the response object.
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Call getSession() to trigger the session refresh logic.
  // We don't need the session data here, just the side effect of cookie refresh.
  await supabase.auth.getSession();

  // Return the response object with the potentially updated cookies.
  return response;
}