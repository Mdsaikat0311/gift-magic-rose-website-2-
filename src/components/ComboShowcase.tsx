import { useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Gift, Truck } from 'lucide-react';
import {
  COMBO_ITEMS,
  GALLERY_IMAGES,
  GIFT_PACKAGES,
  GiftPackage,
  formatBDT,
} from '../data/products';
import { ProductImage } from './ProductImage';

interface ComboShowcaseProps {
  onQuickOrder: (pkgId: GiftPackage['id']) => void;
}

export function ComboShowcase({
  onQuickOrder,
}: ComboShowcaseProps) {
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
    <>
      {/* Section 1: Single Featured Mayavora 15-Item Gift Package */}
      <section id="packages" className="py-8 sm:py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#8B1E3F]">
              আমাদের স্পেশাল প্যাকেজ
            </p>
            <h2
              className="font-display mt-1.5 text-2xl font-bold text-[#1E1618] sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              মায়াভরা গিফট প্যাকেজ · সারাদেশে ডেলিভারি চার্জ ফ্রি
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5C4B4F] sm:text-base">
              ১৫টি আকর্ষণীয় উপহার ও ফ্রি বাবুল প্যাকেজিংসহ সম্পূর্ণ গিফট বক্স মাত্র ৳৫৯৯ টাকায়।
            </p>
          </div>

          <article className="mt-6 grid grid-cols-1 items-start gap-6 overflow-hidden rounded-3xl border border-[#8B1E3F]/25 bg-white/85 p-4 shadow-xs backdrop-blur-sm sm:p-6 md:grid-cols-12 md:gap-8 md:p-7">
            <div className="w-full overflow-hidden rounded-2xl bg-[#F5ECE9] md:col-span-6">
              <ProductImage
                src={pkg.image}
                alt={pkg.name}
                className="block h-auto w-full"
              />
            </div>

            <div className="flex flex-col justify-between md:col-span-6">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <span className="text-xs font-semibold text-[#8B1E3F]">
                    ১৫ আইটেম কম্বো · ফ্রি ডেলিভারি
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl font-bold text-[#8B1E3F] tabular-nums">
                      ৳{formatBDT(pkg.price)}
                    </span>
                    <span className="text-sm text-[#8C7A7E] line-through tabular-nums">
                      ৳{formatBDT(pkg.regularPrice)}
                    </span>
                  </div>
                </div>

                <h3 className="font-display mt-2 text-xl font-bold text-[#1E1618] sm:text-2xl">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5A494D]">
                  {pkg.shortNote}
                </p>

                <ul className="mt-4 space-y-2 border-t border-[#F1E8E4] pt-4">
                  {pkg.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm text-[#3E3033]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8B1E3F]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => onQuickOrder(pkg.id)}
                  className="inline-flex min-h-[46px] w-full items-center justify-center rounded-xl bg-[#8B1E3F] px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#721632] whitespace-nowrap cursor-pointer"
                >
                  অর্ডার করুন · ৳{formatBDT(pkg.price)}
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Section 2: Mobile-Optimized Clean 15-Item List + Rose Ring Photo Strip */}
      <section id="inside-box" className="py-8 sm:py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          {/* Free Delivery Callout Bar */}
          <div className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-[#8B1E3F] px-3 py-2 text-center text-white shadow-xs sm:mb-5 sm:gap-2.5 sm:rounded-2xl sm:px-5 sm:py-3">
            <Truck className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
            <span className="font-display text-[12.5px] font-semibold leading-snug sm:text-base sm:font-bold sm:tracking-wide">
              সারাদেশে ডেলিভারি চার্জ একদম ফ্রি (৳০)
            </span>
          </div>

          <div className="rounded-3xl border border-[#EAE0DC] bg-white/85 p-4 shadow-xs backdrop-blur-sm sm:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-2 border-b border-[#EFE5E1] pb-4 sm:flex-row sm:items-end sm:pb-6">
              <div className="flex items-center gap-2.5">
                <Gift className="h-5 w-5 shrink-0 text-[#8B1E3F]" />
                <h2
                  className="font-display text-xl font-bold text-[#1E1618] sm:text-3xl"
                  style={{ textWrap: 'balance' }}
                >
                  মায়াভরা গিফট প্যাকেজে যা থাকছে
                </h2>
              </div>
              <p className="text-xs font-medium text-[#6B575C] sm:text-sm">
                মোট ১৫টি উপহার · সাথে বাবুল প্যাকেজিং ও ডেলিভারি একদম ফ্রি
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
