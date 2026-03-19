const REVALATE_LOGO =
  "https://storage.googleapis.com/revalate-ai-studio-media/revalate-logos/revalate-ai-studio-wordmark-white.png";

const GridLines = () => (
  <div className="fixed inset-0 pointer-events-none z-[5] grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-0 h-full w-full opacity-[0.03] px-6 lg:px-12">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className={`border-r border-slate-500 h-full ${
          i >= 4 && i < 6 ? "hidden md:block" : ""
        } ${i >= 6 ? "hidden lg:block" : ""}`}
      />
    ))}
  </div>
);

const NotFound = () => (
  <div className="min-h-screen bg-background text-slate-400 flex flex-col">
    <GridLines />

    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 lg:px-12 xl:px-24 bg-background/95 backdrop-blur-md border-b border-slate-800/50">
      <div className="flex items-center justify-between max-w-[90rem] mx-auto">
        <a href="/">
          <img src={REVALATE_LOGO} alt="Revalate" className="h-8 w-auto" />
        </a>
      </div>
    </header>

    <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 xl:px-24 pt-24 pb-12">
      <div className="max-w-2xl w-full text-center">
        <span className="text-primary text-xs font-semibold tracking-widest uppercase block mb-6">
          Page Not Found
        </span>

        <h1 className="text-white text-[8rem] md:text-[10rem] lg:text-[12rem] font-medium tracking-tight leading-none mb-4">
          404
        </h1>

        <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-12 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <a href="/" className="btn-primary">
          Back to Home
        </a>
      </div>
    </main>

    <footer className="bg-footer-bg border-t border-slate-800 py-8 px-6 lg:px-12 xl:px-24">
      <div className="max-w-[90rem] mx-auto flex items-center justify-center">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Revalate Inc. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
);

export default NotFound;
