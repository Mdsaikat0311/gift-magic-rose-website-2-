export function Footer() {
  return (
    <footer className="border-t border-[#E9DCD7]/90 bg-white/65 pb-20 backdrop-blur-sm sm:pb-0">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-[#5C4B4F] sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <span className="font-display text-base font-bold text-[#8B1E3F]">
            Gift Magic
          </span>
          <span className="mx-2 text-[#C8B8B3]" aria-hidden="true">
            ·
          </span>
          <span className="text-xs sm:text-sm">
            মায়াভরা ১৫ আইটেমের গিফট প্যাকেজ · সারাদেশে ফ্রি ডেলিভারি
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm">
          <a href="#gallery" className="hover:text-[#8B1E3F] hover:underline">
            পণ্যের ছবি
          </a>
          <a href="#inside-box" className="hover:text-[#8B1E3F] hover:underline">
            ১৫টি উপহার
          </a>
          <a href="#how-to-order" className="hover:text-[#8B1E3F] hover:underline">
            অর্ডার নিয়ম
          </a>
          <a href="#order-form" className="hover:text-[#8B1E3F] hover:underline">
            অর্ডার করুন
          </a>
          <span className="text-[#8B787C]">© ২০২৬ Gift Magic</span>
        </div>
      </div>
    </footer>
  );
}
