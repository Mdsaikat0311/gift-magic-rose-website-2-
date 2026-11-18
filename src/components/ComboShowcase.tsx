import { useRef, useState } from 'react';
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Gift,
  Truck,
} from 'lucide-react';
import {
  COMBO_ITEMS,
  GALLERY_IMAGES,
  GIFT_PACKAGES,
  formatBDT,
} from '../data/products';
import { ProductImage } from './ProductImage';

interface ComboShowcaseProps {
  onQuickOrder: () => void;
}

export function ComboShowcase({ onQuickOrder }: ComboShowcaseProps) {
  const pkg = GIFT_PACKAGES[0];
  const detailPhotos = GALLERY_IMAGES.slice(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  function goToPrevSlide() {
    setActiveSlide((prev) =>
      prev === 0 ? detailPhotos.length - 1 : prev - 1
    );
  }

  function goToNextSlide() {
    setActiveSlide((prev) =>
      prev === detailPhotos.length - 1 ? 0 : prev + 1
    );
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX;
    if (typeof endX === 'number') {
      const diff = touchStartX.current - endX;
      if (diff > 40) {
        goToNextSlide();
      } else if (diff < -40) {
        goToPrevSlide();
      }
    }
    touchStartX.current = null;
  }

  return (
    <section id="inside-box" className="py-8 sm:py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Slim Free Delivery Callout Bar */}
        <div className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-[#8B1E3F] px-3 py-2 text-center text-white shadow-xs sm:mb-5 sm:gap-2.5 sm:rounded-2xl sm:px-5 sm:py-3">
          <Truck className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
          <span className="font-display text-[12.5px] font-semibold leading-snug sm:text-base sm:font-bold sm:tracking-wide">
            সারাদেশে ডেলিভারি চার্জ একদম ফ্রি (৳০)
          </span>
        </div>

        <div className="rounded-3xl border border-[#EAE0DC] bg-white/90 p-4 shadow-xs backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-2 border-b border-[#EFE5E1] pb-4 sm:flex-row sm:items-end sm:pb-6">
            <div>
              <div className="flex items-center gap-2.5">
                <Gift className="h-5 w-5 shrink-0 text-[#8B1E3F]" />
                <h2
                  className="font-display text-xl font-bold text-[#1E1618] sm:text-3xl"
                  style={{ textWrap: 'balance' }}
                >
                  মায়াভরা গিফট প্যাকেজে যা যা থাকছে
                </h2>
              </div>
              <p className="mt-1 text-xs font-medium text-[#6B575C] sm:text-sm">
                সম্পূর্ণ ১৫টি উপহার এক বক্সেই মাত্র ৳{formatBDT(pkg.price)} — আলাদা আলাদা কিনলে খরচ হতো ৳{formatBDT(pkg.regularPrice)}+
              </p>
            </div>
            <p className="text-xs font-semibold text-[#8B1E3F] sm:text-sm whitespace-nowrap shrink-0">
              ১৫টি আইটেম · ফ্রি ডেলিভারি
            </p>
          </div>

          {/* Mobile-Friendly Scannable Numbered List */}
          <ol className="mt-4 divide-y divide-[#F3EAE6] sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:divide-y-0 lg:grid-cols-3">
            {COMBO_ITEMS.map((item) => (
              <li
                key={item.number}
                className="flex items-start gap-3 py-2.5 sm:rounded-xl sm:border sm:border-[#F2E7E3] sm:bg-[#FCF8F6]/70 sm:p-3.5"
              >
                <span className="font-display min-w-[26px] text-sm font-bold text-[#8B1E3F] tabular-nums shrink-0 sm:text-base">
                  {item.number}.
                </span>
                <div className="min-w-0">
                  <h3 className="font-sans text-sm font-semibold leading-snug text-[#1E1618]">
                    {item.name}
                  </h3>
                  <p className="mt-0.5 hidden text-xs leading-relaxed text-[#625155] sm:block">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* 3-Photo Interactive Full-Size Slide Carousel */}
          <div className="mt-6 border-t border-[#EFE5E1] pt-5 sm:mt-8 sm:pt-7">
            <div className="mb-4 text-center">
              <h3 className="font-display text-lg font-bold text-[#1E1618] sm:text-xl">
                ভেলভেট রোজ রিং বক্সের কাছ থেকে তোলা ছবি
              </h3>
              <p className="mt-1 text-xs text-[#6B575C] sm:text-sm">
                পাশে স্লাইড করে ৩টি আসল ছবি দেখে নিন
              </p>
            </div>

            <div className="mx-auto w-full max-w-[540px]">
              <div
                className="relative overflow-hidden rounded-2xl border border-[#EAE0DC] bg-[#F5ECE9]"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex items-start transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {detailPhotos.map((photo) => (
                    <div key={photo.id} className="w-full shrink-0">
                      <ProductImage
                        src={photo.src}
                        alt={photo.alt}
                        className="block h-auto w-full"
                      />
                    </div>
                  ))}
                </div>

                {/* Previous / Next Controls */}
                <button
                  type="button"
                  onClick={goToPrevSlide}
                  aria-label="আগের ছবি"
                  className="absolute top-1/2 left-2.5 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#1E1618] shadow-md backdrop-blur-xs transition-colors duration-150 hover:bg-white hover:text-[#8B1E3F] cursor-pointer sm:left-3"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goToNextSlide}
                  aria-label="পরের ছবি"
                  className="absolute top-1/2 right-2.5 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#1E1618] shadow-md backdrop-blur-xs transition-colors duration-150 hover:bg-white hover:text-[#8B1E3F] cursor-pointer sm:right-3"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Slide Counter */}
                <div className="absolute right-3 bottom-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-xs tabular-nums">
                  {formatBDT(activeSlide + 1)} / {formatBDT(detailPhotos.length)}
                </div>
              </div>

              {/* Caption & Dot Indicators */}
              <div className="mt-3 flex flex-col items-center gap-2.5 text-center">
                <p className="text-xs font-medium text-[#5A494D] sm:text-sm">
                  {detailPhotos[activeSlide]?.caption}
                </p>
                <div className="flex items-center justify-center gap-2">
                  {detailPhotos.map((photo, index) => {
                    const isActive = index === activeSlide;
                    return (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        aria-label={`ছবি ${formatBDT(index + 1)}`}
                        className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'w-7 bg-[#8B1E3F]'
                            : 'w-2.5 bg-[#D8C7C2] hover:bg-[#B89CA3]'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Direct Mid-Page Conversion CTA */}
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={onQuickOrder}
                className="inline-flex min-h-[48px] w-full max-w-[440px] items-center justify-center gap-2 rounded-xl bg-[#8B1E3F] px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors duration-150 hover:bg-[#721632] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B1E3F] sm:text-base whitespace-nowrap cursor-pointer"
              >
                <span>১৫ আইটেম কম্বো অর্ডার করুন · ৳{formatBDT(pkg.price)}</span>
                <ArrowDown className="h-4 w-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
