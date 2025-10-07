import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            {/* <button className="btn btn-primary">Get Started</button> */}
            <Link href="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
    // <div className="flex flex-col items-center justify-center min-h-screen">
    //   <div className="p-8 bg-white rounded-lg shadow-md text-center">
    //     <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome</h1>
    //     <p className="text-gray-600 mb-6">
    //       This is a demo of Next.js authentication with Supabase Middleware.
    //     </p>
    //     <div className="space-x-4">
    //       <Link
    //         href="/login"
    //         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    //       >
    //         Login
    //       </Link>
    //       <Link
    //         href="/dashboard"
    //         className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
    //       >
    //         Go to Dashboard
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
}
