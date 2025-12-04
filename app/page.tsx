export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Blurred Background - Library/Classroom Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-teal-100 to-green-100">
        {/* Bookshelf Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-800/20 to-transparent">
            {/* Bookshelf shelves */}
            <div className="absolute bottom-0 left-0 right-0 h-1 border-t-2 border-amber-900/10"></div>
            <div className="absolute bottom-1/3 left-0 right-0 h-1 border-t-2 border-amber-900/10"></div>
            <div className="absolute bottom-2/3 left-0 right-0 h-1 border-t-2 border-amber-900/10"></div>
          </div>
        </div>
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/20"></div>
      </div>

      {/* Decorative Elements - Pencils and Paper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 opacity-10 rotate-12">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gray-600">
            <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 w-20 h-20 opacity-10 -rotate-12">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gray-600">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="2"/>
            <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="2"/>
            <line x1="7" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <div className="absolute top-40 right-20 w-12 h-12 opacity-10 rotate-45">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gray-600">
            <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="max-w-6xl w-full">
          {/* Brand Name */}
          <div className="text-center mb-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="text-teal-500">EDU</span>
              <span className="text-blue-700">CONNECT</span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-center text-gray-700 text-lg md:text-xl mb-16 font-medium">
            Effortless Student Record Management for Educators.
          </p>

          {/* Feature Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Classes & Enrollment */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 text-teal-500">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="8" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="8" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="8" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-center text-gray-800 font-bold text-lg mb-2">
                CLASSES & ENROLLMENT
              </h3>
              <p className="text-center text-gray-600 text-sm">
                Organize coursework & student lists
              </p>
            </div>

            {/* Grades & Progress */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 text-teal-500">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 12v5c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-center text-gray-800 font-bold text-lg mb-2">
                GRADES & PROGRESS
              </h3>
              <p className="text-center text-gray-600 text-sm">
                Track academic performance
              </p>
            </div>

            {/* Records & Reports */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 text-teal-500">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="9" y1="17" x2="15" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="18" cy="4" r="2" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-center text-gray-800 font-bold text-lg mb-2">
                RECORDS & REPORTS
              </h3>
              <p className="text-center text-gray-600 text-sm">
                Generate PDF/DOCX documents
              </p>
            </div>
          </div>

          {/* Call to Action and Motto */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              LEARN MORE
            </button>
            <p className="text-gray-700 text-sm md:text-base font-medium">
              For Teachers, By Educators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
