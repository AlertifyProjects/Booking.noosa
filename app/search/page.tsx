"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import { properties } from "@/lib/data";

const PROPERTY_TYPES = ["All", "villa", "house", "apartment", "cottage"];
const BEDROOM_OPTIONS = ["Any", "1", "2", "3", "4", "5+"];

function SearchContent() {
  const searchParams = useSearchParams();
  const locationParam = searchParams.get("location") || "";
  const checkinParam = searchParams.get("checkin") || "";
  const checkoutParam = searchParams.get("checkout") || "";
  const guestsParam = searchParams.get("guests") || "";

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedBedrooms, setSelectedBedrooms] = useState("Any");
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...properties];
    if (locationParam && locationParam !== "All Noosa") {
      result = result.filter((p) => p.location.toLowerCase().includes(locationParam.toLowerCase()));
    }
    if (selectedType !== "All") result = result.filter((p) => p.type === selectedType);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedBedrooms !== "Any") {
      const n = parseInt(selectedBedrooms);
      result = selectedBedrooms === "5+" ? result.filter((p) => p.bedrooms >= 5) : result.filter((p) => p.bedrooms === n);
    }
    if (guestsParam) result = result.filter((p) => p.guests >= parseInt(guestsParam));
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [locationParam, selectedType, priceRange, selectedBedrooms, guestsParam, sortBy]);

  const searchParamString = new URLSearchParams({
    ...(checkinParam && { checkin: checkinParam }),
    ...(checkoutParam && { checkout: checkoutParam }),
    ...(guestsParam && { guests: guestsParam }),
  }).toString();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:block">
            <SearchBar compact initialValues={{ location: locationParam, checkin: checkinParam, checkout: checkoutParam, guests: guestsParam }} />
          </div>
          <div className="md:hidden flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">{locationParam || "All Noosa"}</p>
              <p className="text-sm text-gray-500">{checkinParam && checkoutParam ? `${checkinParam} → ${checkoutParam}` : "Any dates"} · {guestsParam || "Any"} guests</p>
            </div>
            <button className="text-sm bg-teal-500 text-white px-3 py-1.5 rounded-full font-medium">Edit</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full hover:border-teal-400 transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filters
            </button>
            {PROPERTY_TYPES.map((type) => (
              <button key={type} onClick={() => setSelectedType(type)} className={`text-sm px-4 py-2 rounded-full border font-medium transition-colors shadow-sm ${selectedType === type ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"}`}>
                {type === "All" ? "All types" : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-sm text-gray-500 hidden sm:block">{filtered.length} properties</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-full outline-none shadow-sm">
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Price per night</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Min</label>
                    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
                      <span className="text-gray-400 text-sm mr-1">$</span>
                      <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value)||0, priceRange[1]])} className="w-full text-sm outline-none text-gray-700" min={0} max={priceRange[1]} />
                    </div>
                  </div>
                  <span className="text-gray-400 mt-5">—</span>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Max</label>
                    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
                      <span className="text-gray-400 text-sm mr-1">$</span>
                      <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)||1000])} className="w-full text-sm outline-none text-gray-700" min={priceRange[0]} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Bedrooms</h3>
                <div className="flex flex-wrap gap-2">
                  {BEDROOM_OPTIONS.map((opt) => (
                    <button key={opt} onClick={() => setSelectedBedrooms(opt)} className={`px-3 py-1.5 rounded-lg text-sm border font-medium transition-colors ${selectedBedrooms === opt ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"}`}>{opt}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-end">
                <button onClick={() => { setPriceRange([0,1000]); setSelectedType("All"); setSelectedBedrooms("Any"); setSortBy("recommended"); }} className="text-sm text-teal-600 font-medium underline hover:text-teal-700">Clear all filters</button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm text-gray-500">
            {filtered.length === 0 ? "No properties found" : `${filtered.length} ${filtered.length===1?"property":"properties"} available`}
            {locationParam && ` in ${locationParam}`}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search in a different location.</p>
            <button onClick={() => { setPriceRange([0,1000]); setSelectedType("All"); setSelectedBedrooms("Any"); }} className="bg-teal-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-teal-600 transition-colors">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((property) => <PropertyCard key={property.id} property={property} searchParams={searchParamString} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Loading...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}
