"use client";

import Link from "next/link";
import Image from "next/image";
import { Property } from "@/lib/data";

interface PropertyCardProps {
  property: Property;
  searchParams?: string;
}

export default function PropertyCard({ property, searchParams = "" }: PropertyCardProps) {
  const href = `/property/${property.id}${searchParams ? `?${searchParams}` : ""}`;

  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200">
        <div className="relative h-52 overflow-hidden">
          <Image src={property.images[0]} alt={property.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">{property.type}</span>
          </div>
          <div className="absolute top-3 right-3">
            <button onClick={(e) => e.preventDefault()} className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors">
              <svg className="w-4 h-4 text-gray-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-teal-600 font-medium mb-0.5">{property.location}</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug truncate">{property.name}</h3>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-semibold text-gray-800">{property.rating}</span>
              <span className="text-xs text-gray-500">({property.reviews})</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{property.description}</p>
          <div className="flex items-center gap-3 mt-2.5 text-xs text-gray-500">
            <span>{property.bedrooms} bed</span><span>·</span>
            <span>{property.bathrooms} bath</span><span>·</span>
            <span>Up to {property.guests} guests</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div>
              <span className="text-lg font-bold text-gray-900">${property.price}</span>
              <span className="text-xs text-gray-500 ml-1">/ night</span>
            </div>
            <span className="text-xs bg-teal-50 text-teal-700 font-medium px-2 py-1 rounded-lg">View details</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
