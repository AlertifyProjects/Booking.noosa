"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProperty } from "@/lib/data";
import Footer from "@/components/Footer";

function generateBookingRef() {
  return "BN" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

const BOOKING_REF = generateBookingRef();

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId") || "";
  const checkin = searchParams.get("checkin") || "";
  const checkout = searchParams.get("checkout") || "";
  const guests = searchParams.get("guests") || "2";
  const nights = parseInt(searchParams.get("nights") || "0");
  const total = parseInt(searchParams.get("total") || "0");
  const property = getProperty(propertyId);

  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking not found</h1>
          <Link href="/" className="text-teal-600 hover:underline">Return home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-teal-100 text-lg">Your Noosa escape is all sorted. We can&apos;t wait to welcome you!</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-medium">
            Booking reference: <strong className="text-white tracking-wider">{BOOKING_REF}</strong>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="flex items-start gap-4 p-6">
            <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={property.images[0]} alt={property.name} fill className="object-cover" sizes="112px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-teal-600 mb-0.5 capitalize">{property.type} · {property.location}</p>
              <h2 className="font-bold text-gray-900 text-lg leading-snug">{property.name}</h2>
              <div className="flex items-center gap-1 mt-1">
                <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold text-gray-800">{property.rating}</span>
                <span className="text-xs text-gray-500">({property.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
            {[{label:"Check-in",val:formatDate(checkin)},{label:"Check-out",val:formatDate(checkout)},{label:"Guests",val:`${guests} ${parseInt(guests)===1?"guest":"guests"}`},{label:"Duration",val:`${nights} ${nights===1?"night":"nights"}`}].map((item) => (
              <div key={item.label} className="p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-gray-900">{item.val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Payment Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600"><span>${property.price} × {nights} {nights===1?"night":"nights"}</span><span>${(property.price*nights).toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-600"><span>Cleaning fee</span><span>$120</span></div>
            <div className="flex justify-between text-gray-600"><span>Service fee</span><span>${(total-property.price*nights-120).toLocaleString()}</span></div>
            <div className="flex justify-between font-bold text-gray-900 text-base pt-3 border-t border-gray-100"><span>Total charged</span><span>${total.toLocaleString()} AUD</span></div>
          </div>
          <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <span className="text-sm text-green-700 font-medium">Payment successful · Confirmation sent to your email</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-4">
            {[
              { step:"1", title:"Confirmation email", desc:"A full booking confirmation with property details has been sent to your email.", icon:"📧" },
              { step:"2", title:"Host contact", desc:"Your host will reach out 48 hours before arrival with check-in instructions.", icon:"📱" },
              { step:"3", title:"Arrival", desc:"Head to the property on your check-in date. Standard check-in time is 3:00 PM.", icon:"🏡" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0 text-xl">{item.icon}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            <div>
              <p className="font-semibold text-amber-800 text-sm">Cancellation Policy</p>
              <p className="text-amber-700 text-sm mt-1">Free cancellation up to 7 days before check-in. Cancellations made within 7 days of check-in are non-refundable. Contact us at support@booking.noosa for any changes to your booking.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1 text-center bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3.5 rounded-xl transition-colors">Back to Home</Link>
          <Link href="/search" className="flex-1 text-center bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl transition-colors border border-gray-200">Explore More Properties</Link>
          <button onClick={() => window.print()} className="flex-1 text-center bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl transition-colors border border-gray-200 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print receipt
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Loading confirmation...</p></div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
