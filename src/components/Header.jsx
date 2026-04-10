export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 py-8 px-6 shadow-lg">
      {/* decorative blobs */}
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto flex items-center gap-4">
        {/* flame icon */}
        <div className="flex-shrink-0 bg-white/20 rounded-2xl p-3 shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-9 h-9 text-white drop-shadow"
          >
            <path d="M12 2C6.5 8 4 11.5 4 14a8 8 0 0016 0c0-2.5-2.5-6-8-12zm0 18a6 6 0 01-6-6c0-1.5 1.2-4 6-9.5 4.8 5.5 6 8 6 9.5a6 6 0 01-6 6z" />
            <path d="M12 8c-2 3-3 5-3 6a3 3 0 006 0c0-1-1-3-3-6z" />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow">
            Gas Bill Tracker
          </h1>
          <p className="text-white/80 text-sm mt-0.5">
            Society • 60 Flats • Monthly Payments
          </p>
        </div>
      </div>
    </header>
  );
}
