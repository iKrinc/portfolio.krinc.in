export default function Footer() {
  return (
    <footer className="border-t border-gray-900 py-6 md:py-8 px-4 md:px-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="font-mono text-gray-600 text-[10px] md:text-xs tracking-widest">
          SRINIVAS KRISHNA S K // portfolio.krinc.in
        </div>
        <div className="font-mono text-gray-700 text-[10px] md:text-xs">
          BUILT WITH NEXT.JS + GSAP + FRAMER MOTION
        </div>
        <a
          href="https://github.com/sponsors/iKrinc"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-gray-600 hover:text-orange-500 text-[10px] md:text-xs transition-colors tracking-widest"
        >
          SPONSOR ON GITHUB
        </a>
      </div>
    </footer>
  );
}
