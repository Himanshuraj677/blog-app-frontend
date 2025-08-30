"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 relative overflow-hidden">
      
      {/* Floating stars */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Animated Illustration */}
      <div className="w-64 h-64 mb-8 relative animate-spin-slow z-10">
        <svg
          className="w-64 h-64 opacity-30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="30" strokeWidth="4" />
          <line x1="20" y1="20" x2="44" y2="44" strokeWidth="4" />
          <line x1="44" y1="20" x2="20" y2="44" strokeWidth="4" />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-6xl font-bold mb-4 animate-fade-in-down z-10" style={{ animationDelay: "0s" }}>404</h1>
      <h2 className="text-2xl md:text-3xl mb-4 font-semibold text-gray-300 animate-fade-in-down z-10" style={{ animationDelay: "0.2s" }}>
        Oops! Page Not Found
      </h2>
      <p className="text-center text-gray-400 mb-8 max-w-md animate-fade-in-down z-10" style={{ animationDelay: "0.4s" }}>
        The page you are looking for doesn&apos;t exist or has been removed. Maybe check the homepage or explore the latest posts.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg font-medium transition transform hover:scale-105 animate-fade-in-down z-10"
        style={{ animationDelay: "0.6s" }}
      >
        Go Back Home
      </Link>

      {/* Footer */}
      <p className="mt-12 text-gray-600 text-sm animate-fade-in-down z-10" style={{ animationDelay: "0.8s" }}>
        TechBlog &copy; {new Date().getFullYear()}
      </p>

      {/* CSS Animations */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-fade-in-down {
          animation: fadeDown 0.8s forwards;
        }

        @keyframes fadeDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: twinkle infinite alternate;
        }

        @keyframes twinkle {
          0% { opacity: 0.2; transform: translateY(0px); }
          100% { opacity: 0.8; transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
