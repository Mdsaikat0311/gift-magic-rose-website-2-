interface NavbarProps {
  onQuickOrder: () => void;
}

export function Navbar({ onQuickOrder }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E9DCD7]/80 bg-[#FCF8F6]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Title */}
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-[#8B1E3F] whitespace-nowrap shrink-0 sm:text-2xl"
        >
          Gift Magic
        </a>

        {/* Zone 2: Clean single-line text nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A3B3E]">
          <a
            href="#gallery"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#8B1E3F] hover:underline hover:underline-offset-4"
          >
            পণ্যের ছবি
          </a>
          <a
            href="#inside-box"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#8B1E3F] hover:underline hover:underline-offset-4"
          >
            ১৫টি উপহার
          </a>
          <a
            href="#how-to-order"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#8B1E3F] hover:underline hover:underline-offset-4"
          >
            অর্ডার নিয়ম
          </a>
          <a
            href="#order-form"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#8B1E3F] hover:underline hover:underline-offset-4"
          >
            অর্ডার ফর্ম
          </a>
        </nav>

        {/* Zone 3: Single primary conversion CTA */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onQuickOrder}
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#8B1E3F] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#721632] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B1E3F] whitespace-nowrap shrink-0 cursor-pointer"
          >
            অর্ডার করুন · ৳৫৯৯
          </button>
        </div>
      </div>
    </header>
  );
}
