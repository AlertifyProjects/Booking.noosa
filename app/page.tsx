import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import { properties } from "@/lib/data";

const HERO_IMAGE = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&q=90";

const AREA_HIGHLIGHTS = [
  { name: "Noosa Heads", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80", count: 3 },
  { name: "Noosaville", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80", count: 2 },
  { name: "Sunshine Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", count: 2 },
  { name: "Noosa Hinterland", image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600&q=80", count: 1 },
];

const EXPERIENCES = [
  { icon: "🏄", label: "World-class surfing" },
  { icon: "🐨", label: "National Park walks" },
  { icon: "🛆", label: "River kayaking" },
  { icon: "🍽️", label: "Fine dining" },
  { icon: "🐠", label: "Snorkelling reefs" },
  { icon: "🚴", label: "Cycling trails" },
];

export default function HomePage() {
  const featuredProperties = properties.slice(0, 4);
  return (
    <div className="min-h-screen">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image src={HERO_IMAGE} alt="Beautiful Noosa beach" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full mb-6 border border-white/30">
            <span className="w-2 h-2 bg-teal-400 rounded-full" />
            Noosa, Queensland, Australia
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            Your Perfect<br /><span className="text-teal-300">Noosa</span> Escape
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto leading-relaxed">
            Discover handpicked holiday homes across Noosa&apos;s most beautiful locations — beach, river, and hinterland.
          </p>
          <div className="flex justify-center"><SearchBar /></div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-white/80 text-sm">
            {["Instant confirmation", "Best price guarantee", "24/7 local support"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-teal-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Explore Noosa</h2>
            <p className="text-gray-500 mt-1">Find your perfect spot across the region</p>
          </div>
          <Link href="/search" className="text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors hidden sm:block">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {AREA_HIGHLIGHTS.map((area) => (
            <Link key={area.name} href={`/search?location=${encodeURIComponent(area.name)}`} className="group relative rounded-2xl overflow-hidden block" style={{aspectRatio:'3/4'}}>
              <Image src={area.image} alt={area.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-lg leading-tight">{area.name}</p>
                <p className="text-white/70 text-sm">{area.count} properties</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Stays</h2>
              <p className="text-gray-500 mt-1">Our most loved properties this season</p>
            </div>
            <Link href="/search" className="text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors hidden sm:block">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProperties.map((property) => <PropertyCard key={property.id} property={property} />)}
          </div>
          <div className="text-center mt-10">
            <Link href="/search" className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3.5 rounded-full transition-colors">
              Browse All Properties
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Life in Noosa</h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">From world-class surf to lush national parks, Noosa offers unforgettable experiences for every traveller.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {EXPERIENCES.map((exp) => (
            <div key={exp.label} className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:border-teal-200 hover:shadow-md transition-all">
              <div className="text-3xl mb-2">{exp.icon}</div>
              <p className="text-sm font-medium text-gray-700">{exp.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-teal-600 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for your Noosa adventure?</h2>
          <p className="text-teal-100 mb-8 text-lg">Join thousands of happy guests who&apos;ve discovered their perfect Noosa stay with us.</p>
          <Link href="/search" className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-8 py-3.5 rounded-full hover:bg-teal-50 transition-colors">
            Find Your Property
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
