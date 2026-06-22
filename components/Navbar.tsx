"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                <path d="M10 6a1 1 0 00-1 1v3a1 1 0 00.293.707l2 2a1 1 0 001.414-1.414L11 9.586V7a1 1 0 00-1-1z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              booking<span className="text-teal-500">.noosa</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/search" className="hover:text-teal-600 transition-colors">Explore</Link>
            <a href="#" className="hover:text-teal-600 transition-colors">Experiences</a>
            <a href="#" className="hover:text-teal-600 transition-colors">About Noosa</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors px-3 py-1.5">
              Sign in
            </button>
            <button className="text-sm font-medium bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition-colors">
              List your property
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-2">
            <Link href="/search" className="block px-3 py-2 text-sm text-gray-700 hover:text-teal-600">Explore</Link>
            <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:text-teal-600">Experiences</a>
            <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:text-teal-600">About Noosa</a>
            <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:text-teal-600">Sign in</a>
          </div>
        )}
      </div>
    </nav>
  );
}
