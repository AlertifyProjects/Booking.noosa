"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  compact?: boolean;
  initialValues?: {
    location?: string;
    checkin?: string;
    checkout?: string;
    guests?: string;
  };
}

export default function SearchBar({ compact = false, initialValues = {} }: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState(initialValues.location || "");
  const [checkin, setCheckin] = useState(initialValues.checkin || "");
  const [checkout, setCheckout] = useState(initialValues.checkout || "");
  const [guests, setGuests] = useState(initialValues.guests || "2");

  const locations = [
    "All Noosa", "Noosa Heads", "Noosaville", "Noosa Hinterland",
    "Sunshine Beach", "Peregian Beach", "Castaways Beach", "Noosa Sound", "Tewantin",
  ];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    if (guests) params.set("guests", guests);
    router.push(`/search?${params.toString()}`);
  }

  if (compact) {
    return (
      <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="text-sm text-gray-700 bg-transparent outline-none">
          <option value="">All locations</option>
          {locations.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <span className="text-gray-200">|</span>
        <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className="text-sm text-gray-700 bg-transparent outline-none w-32" />
        <span className="text-gray-200">|</span>
        <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className="text-sm text-gray-700 bg-transparent outline-none w-32" />
        <span className="text-gray-200">|</span>
        <select value={guests} onChange={(e) => setGuests(e.target.value)} className="text-sm text-gray-700 bg-transparent outline-none">
          {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n} {n===1?"guest":"guests"}</option>)}
        </select>
        <button type="submit" className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-teal-600 transition-colors flex-shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-3 max-w-4xl w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="px-4 py-3">
          <label className="block text-xs font-bold text-gray-800 mb-1">Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full text-sm text-gray-600 bg-transparent outline-none">
            <option value="">Where in Noosa?</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="px-4 py-3">
          <label className="block text-xs font-bold text-gray-800 mb-1">Check-in</label>
          <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className="w-full text-sm text-gray-600 bg-transparent outline-none" />
        </div>
        <div className="px-4 py-3">
          <label className="block text-xs font-bold text-gray-800 mb-1">Check-out</label>
          <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className="w-full text-sm text-gray-600 bg-transparent outline-none" />
        </div>
        <div className="px-4 py-3 flex items-end gap-3">
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-800 mb-1">Guests</label>
            <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full text-sm text-gray-600 bg-transparent outline-none">
              {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n} {n===1?"guest":"guests"}</option>)}
            </select>
          </div>
          <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
