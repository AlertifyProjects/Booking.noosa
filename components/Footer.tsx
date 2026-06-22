import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="text-white text-lg font-bold">
                booking<span className="text-teal-400">.noosa</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Your gateway to the best holiday accommodations across the beautiful Noosa region.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Noosa Heads</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Noosaville</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Sunshine Beach</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Hinterland</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Property Types</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Beachfront Villas</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Apartments</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Cottages</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Houses</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">List Your Property</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2026 booking.noosa. All rights reserved.</p>
          <p className="text-teal-400">Made with love for Noosa</p>
        </div>
      </div>
    </footer>
  );
}
