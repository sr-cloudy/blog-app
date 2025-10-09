import { type NextRequest, NextResponse } from 'next/server';
// ⚠️ Adjust the import path for your utility file if necessary
import { updateSession } from './utils/supabase/middleware';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  // 1. Run the Supabase session update utility first
  // This refreshes the cookies and ensures the response carries them.
  const response = await updateSession(request);

  // 2. We now need a *new* server client (after updateSession ran)
  // to read the *current* session for protection logic.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          // This is a dummy setAll, as we only need to READ the cookies here.
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // 3. Get the user/session for protection check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define your protected paths
  const protectedPaths = ['/dashboard', '/private', '/settings'];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  // 4. Protection Logic (Redirect logged-out users)
  if (!user && isProtectedPath) {
    const loginUrl = new URL('/login', request.url);
    // Optionally add a 'next' param to redirect back after login
    loginUrl.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Optional: Redirect logged-in users away from auth pages
  const authPaths = ['/login', '/signup'];
  const isAuthPath = authPaths.includes(request.nextUrl.pathname);

  if (user && isAuthPath) {
    // Redirect logged-in users to the dashboard or home page
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 6. If no redirects are needed, return the response with updated cookies
  return response;
}

// Configuration to run middleware on most paths, excluding static assets
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - API routes (api)
     * - Static files (_next/static, _next/image, favicon.ico, etc.)
     * - Public files (e.g., specific images in /public)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
