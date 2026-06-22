"use client";

import { useState, use, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProperty } from "@/lib/data";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

const AMENITY_ICONS: Record<string, string> = {
  "Ocean Views":"🌊","Private Pool":"🏔","Beach Access":"🏖️","Air Conditioning":"❄️",
  "WiFi":"📶","Full Kitchen":"🍳","BBQ":"🔥","Parking":"🚗","Washer/Dryer":"👕","Smart TV":"📺",
  "Rainforest Views":"🌿","Fire Pit":"🔥","Outdoor Bath":"🛁","Yoga Deck":"🧘",
  "Rooftop Pool":"🏔","Gym":"💪","Balcony":"🏙️","Secure Parking":"🔒","Concierge":"🎩","Elevator":"🔼",
  "Riverfront":"🇯️","Private Pontoon":"⛵","Kayaks Included":"🚣","Bicycle Hire":"🚴",
  "Panoramic Ocean Views":"🌅","Rooftop Terrace":"🌃","Gourmet Kitchen":"👨‍🍳",
  "Canal Views":"🌊","Private Jetty":"⚓","Heated Pool":"♨️","Beach Proximity":"🏖️",
  "Surf Storage":"🏄","Outdoor Shower":"🚿","Adults Only":"👫","King Bed":"🛏️",
  "Kitchenette":"🥘","Espresso Machine":"☕","Private Courtyard":"🌺","Beach Walk":"👟",
  "Hinterland Views":"🌄","Outdoor BBQ":"🍖","Concierge Access":"🗝️",
  "Fishing Dock":"🎣","Kayaks":"🛤","Large Parking":"🅿️","Bikes":"🚲","Laundry":"🧺e",
};

function generateCalendarDays(year: number, month: number, unavailableDates: string[]) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0,0,0,0);
  const days: { date: Date | null; unavailable: boolean; past: boolean }[] = [];
  for (let i = 0; i < firstDay; i++) days.push({ date: null, unavailable: false, past: false });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dateStr = date.toISOString().split("T")[0];
    days.push({ date, unavailable: unavailableDates.includes(dateStr), past: date < today });
  }
  return days;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function PropertyContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const property = getProperty(id);
  if (!property) return notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [bookingCheckin, setBookingCheckin] = useState(searchParams.get("checkin") || "");
  const [bookingCheckout, setBookingCheckout] = useState(searchParams.get("checkout") || "");
  const [bookingGuests, setBookingGuests] = useState(searchParams.get("guests") || "2");

  const nights = useMemo(() => {
    if (!bookingCheckin || !bookingCheckout) return 0;
    const diff = (new Date(bookingCheckout).getTime() - new Date(bookingCheckin).getTime()) / (1000*60*60*24);
    return diff > 0 ? diff : 0;
  }, [bookingCheckin, bookingCheckout]);

  const subtotal = nights * property.price;
  const cleaningFee = 120;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + cleaningFee + serviceFee;
  const calDays = generateCalendarDays(calYear, calMonth, property.unavailableDates);

  function handleBook() {
    if (!property) return;
    const p = new URLSearchParams({ propertyId: property.id, checkin: bookingCheckin, checkout: bookingCheckout, guests: bookingGuests, nights: nights.toString(), total: total.toString() });
    router.push(`/booking/confirmation?${p.toString()}`);
  }

  function prevMonth() { if (calMonth===0){setCalMonth(11);setCalYear(calYear-1);}else setCalMonth(calMonth-1); }
  function nextMonth() { if (calMonth===11){setCalMonth(0);setCalYear(calYear+1);}else setCalMonth(calMonth+1); }

  return (
    <div className="min-h-screen bg-white">
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-2" onClick={() => setLightboxOpen(false)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button className="absolute left-4 text-white/80 hover:text-white bg-white/10 rounded-full p-2" onClick={(e)=>{e.stopPropagation();setActiveImage((activeImage-1+property.images.length)%property.images.length);}}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="relative w-full max-w-5xl h-[80vh] px-16" onClick={(e)=>e.stopPropagation()}>
            <Image src={property.images[activeImage]} alt={property.name} fill className="object-contain" sizes="100vw" />
          </div>
          <button className="absolute right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-2" onClick={(e)=>{e.stopPropagation();setActiveImage((activeImage+1)%property.images.length);}}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">{activeImage+1} / {property.images.length}</div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link><span>/</span>
          <Link href="/search" className="hover:text-teal-600 transition-colors">Search</Link><span>/</span>
          <span className="text-gray-900 truncate max-w-xs">{property.name}</span>
        </div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{property.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <strong>{property.rating}</strong> ({property.reviews} reviews)
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-teal-600 font-medium">{property.location}</span>
              <span className="text-gray-300">·</span>
              <span className="capitalize">{property.type}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-2 hover:border-gray-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              Share
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-2 hover:border-gray-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[420px]">
          <div className="col-span-2 row-span-2 relative cursor-pointer" onClick={() => { setActiveImage(0); setLightboxOpen(true); }}>
            <Image src={property.images[0]} alt={`${property.name} - photo 1`} fill priority className="object-cover hover:brightness-90 transition-all" sizes="50vw" />
          </div>
          {property.images.slice(1,4).map((img, i) => (
            <div key={i} className="relative cursor-pointer" onClick={() => { setActiveImage(i+1); setLightboxOpen(true); }}>
              <Image src={img} alt={`${property.name} - photo ${i+2}`} fill className="object-cover hover:brightness-90 transition-all" sizes="25vw" />
              {i===2 && property.images.length>4 && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-white font-semibold text-lg">+{property.images.length-4} more</span></div>}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
          {property.images.map((img, i) => (
            <button key={i} onClick={() => { setActiveImage(i); setLightboxOpen(true); }} className={`flex-shrink-0 relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${activeImage===i?"border-teal-500":"border-transparent"}`}>
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="flex flex-wrap gap-4 py-6 border-t border-b border-gray-100">
              {[{icon:"🛏️",val:property.bedrooms,label:"Bedrooms"},{icon:"🚿",val:property.bathrooms,label:"Bathrooms"},{icon:"👥",val:`Up to ${property.guests}`,label:"Guests"}].map((s)=>(
                <div key={s.label} className="flex items-center gap-2">
                  <span className="text-2xl">{s.icon}</span>
                  <div><p className="font-semibold text-gray-900">{s.val}</p><p className="text-xs text-gray-500">{s.label}</p></div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {property.highlights.map((h) => (
                <div key={h} className="flex items-center gap-3 bg-teal-50 rounded-xl p-4">
                  <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <span className="text-sm font-medium text-teal-800">{h}</span>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">About this property</h2>
              <p className="text-gray-600 leading-relaxed">{property.longDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2.5 text-sm text-gray-700 bg-gray-50 rounded-xl p-3">
                    <span className="text-lg">{AMENITY_ICONS[amenity] || "✓"}</span><span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Availability</h2>
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="p-2 hover:bg-white rounded-lg transition-colors border border-gray-200">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <h3 className="font-semibold text-gray-900">{MONTHS[calMonth]} {calYear}</h3>
                  <button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg transition-colors border border-gray-200">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
                  {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d)=><div key={d} className="py-1 font-medium">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calDays.map((day, i) => (
                    <div key={i} className="aspect-square flex items-center justify-center">
                      {day.date && (
                        <span className={`w-full h-full flex items-center justify-center text-sm rounded-full ${
                          day.past ? "text-gray-300 cursor-not-allowed" :
                          day.unavailable ? "bg-red-100 text-red-400 line-through cursor-not-allowed" :
                          "hover:bg-teal-100 text-gray-700 cursor-pointer hover:text-teal-700 transition-colors"
                        }`}>{day.date.getDate()}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-100 border border-red-200 inline-block" /> Unavailable</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-white border border-gray-200 inline-block" /> Available</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-gray-900">${property.price}</span>
                <span className="text-gray-500">/ night</span>
              </div>
              <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-2 divide-x divide-gray-200">
                  <div className="p-3"><label className="block text-xs font-bold text-gray-800 mb-1">CHECK-IN</label><input type="date" value={bookingCheckin} onChange={(e)=>setBookingCheckin(e.target.value)} className="w-full text-sm text-gray-700 outline-none" /></div>
                  <div className="p-3"><label className="block text-xs font-bold text-gray-800 mb-1">CHECK-OUT</label><input type="date" value={bookingCheckout} onChange={(e)=>setBookingCheckout(e.target.value)} className="w-full text-sm text-gray-700 outline-none" /></div>
                </div>
                <div className="border-t border-gray-200 p-3">
                  <label className="block text-xs font-bold text-gray-800 mb-1">GUESTS</label>
                  <select value={bookingGuests} onChange={(e)=>setBookingGuests(e.target.value)} className="w-full text-sm text-gray-700 outline-none bg-transparent">
                    {Array.from({length:property.guests},(_,i)=>i+1).map((n)=><option key={n} value={n}>{n} {n===1?"guest":"guests"}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={handleBook} disabled={!bookingCheckin||!bookingCheckout||nights<=0} className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-lg">
                {nights>0?"Book Now":"Select Dates"}
              </button>
              {nights>0&&(
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600"><span>${property.price} × {nights} {nights===1?"night":"nights"}</span><span>${subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Cleaning fee</span><span>${cleaningFee}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Service fee</span><span>${serviceFee}</span></div>
                  <div className="flex justify-between font-bold text-gray-900 text-base pt-3 border-t border-gray-100"><span>Total</span><span>${total.toLocaleString()}</span></div>
                </div>
              )}
              <p className="text-xs text-gray-400 text-center mt-4">You won&apos;t be charged yet</p>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-teal-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Secure booking
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-teal-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Free cancellation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16"><Footer /></div>
    </div>
  );
}

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Loading property...</p></div>}>
      <PropertyContent params={params} />
    </Suspense>
  );
}
