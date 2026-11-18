import { ArrowDown, Check, Gift, ShieldCheck, Truck } from 'lucide-react';
import {
  GALLERY_IMAGES,
  GiftPackage,
  formatBDT,
} from '../data/products';
import { ProductImage } from './ProductImage';

interface HeroGalleryProps {
  activeImageIndex: number;
  onSelectImage: (index: number) => void;
  selectedPackage: GiftPackage;
  onQuickOrder: () => void;
}

export function HeroGallery({
  activeImageIndex,
  onSelectImage,
  selectedPackage,
  onQuickOrder,
}: HeroGalleryProps) {
  const activeImage = GALLERY_IMAGES[activeImageIndex] ?? GALLERY_IMAGES[0];
  const savings = selectedPackage.regularPrice - selectedPackage.price;
  const discountPercent = Math.round(
    (savings / selectedPackage.regularPrice) * 100
  );

  return (
    <section id="top" className="relative pt-6 pb-10 sm:pt-10 sm:pb-14">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-5">
          {/* 1. Clear Value Proposition Headline & Offer Summary */}
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8B1E3F]">
              <span>১৫ আইটেমের স্পেশাল কম্বো</span>
              <span aria-hidden="true">·</span>
              <span>সারাদেশে ফ্রি ডেলিভারি</span>
              <span aria-hidden="true">·</span>
              <span>ক্যাশ অন ডেলিভারি</span>
            </div>

            <h1
              className="font-display mt-2.5 text-[28px] font-bold leading-[1.26] text-[#1E1618] sm:text-4xl lg:text-[42px]"
              style={{ textWrap: 'balance' }}
            >
              প্রিয়জনকে চমকে দেওয়ার ১৫ আইটেমের মায়াভরা গিফট বক্স
            </h1>

            <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-[#4F4044] sm:text-base">
              ভেলভেট গোলাপ রিং বক্স, ডায়মন্ড কাট রিং, নোসেপিন, কানের দুল, নেকলেস, পায়েল, কাভেরি মেহেদী,
              ব্রেসলেট, টিপ, ২টি ডেইরি মিল্ক ও চিরকুটসহ সম্পূর্ণ ১৫টি উপহার এখন এক বক্সেই।
            </p>

            {/* Quick Offer Anchor Strip */}
            <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-[#8B1E3F]/25 bg-white/85 px-4 py-3 shadow-xs">
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#1E1618]">
                  {selectedPackage.name}
                </p>
                <p className="mt-0.5 text-xs font-medium text-[#236B39]">
                  ফ্রি বাবুল প্যাকেজিং ও সারাদেশে ফ্রি হোম ডেলিভারি
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-[#8B1E3F] tabular-nums whitespace-nowrap">
                  ৳{formatBDT(selectedPackage.price)}
                </p>
                <p className="text-[11px] text-[#7A666B] line-through tabular-nums whitespace-nowrap">
                  ৳{formatBDT(selectedPackage.regularPrice)}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Uncropped Real Product Gallery */}
          <div
            id="gallery"
            className="flex flex-col gap-3.5 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[#EAE0DC] bg-white p-2 shadow-sm sm:p-2.5">
              <div className="relative w-full overflow-hidden rounded-xl bg-[#F6EFECE6]">
                <ProductImage
                  src={activeImage.src}
                  alt={activeImage.alt}
                  priority
                  className="block h-auto w-full transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-4 pt-12 pb-3.5">
                  <p className="text-xs font-medium text-white sm:text-sm">
                    {activeImage.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Thumbnail Switchers */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {GALLERY_IMAGES.map((img, index) => {
                const isActive = index === activeImageIndex;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => onSelectImage(index)}
                    aria-label={img.caption}
                    className={`group relative aspect-square overflow-hidden rounded-xl border bg-white p-1 transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'border-[#8B1E3F] ring-2 ring-[#8B1E3F]/25'
                        : 'border-[#E6D9D4] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <ProductImage
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. High-Conversion Offer & Order Box (Below Gallery on Mobile, Bottom-Left on Desktop) */}
          <div className="rounded-2xl border border-[#8B1E3F]/25 bg-white/90 p-5 shadow-sm backdrop-blur-sm lg:col-span-6 lg:col-start-1 lg:row-start-2">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#F1E8E4] pb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#8B1E3F] tabular-nums sm:text-4xl">
                  ৳{formatBDT(selectedPackage.price)}
                </span>
                <span className="text-base text-[#8C7A7E] line-through tabular-nums">
                  ৳{formatBDT(selectedPackage.regularPrice)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-[#8B1E3F] tabular-nums">
                  {formatBDT(discountPercent)}% ছাড় · ৳{formatBDT(savings)} সাশ্রয়
                </p>
                <p className="text-[11px] font-semibold text-[#236B39]">
                  ডেলিভারি চার্জ: ফ্রি (৳০)
                </p>
              </div>
            </div>

            <ul className="mt-4 space-y-2.5">
              <li className="flex items-start gap-2.5 text-sm text-[#3E3033]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8B1E3F]" />
                <span>
                  এক প্যাকেজেই ১৫টি আকর্ষণীয় উপহার — গড়ে প্রতি আইটেম মাত্র ৳৪০
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[#3E3033]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8B1E3F]" />
                <span>
                  কোনো অগ্রিম টাকা লাগবে না — পণ্য হাতে পেয়ে দেখে টাকা দিন
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[#3E3033]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8B1E3F]" />
                <span>
                  ফ্রি সুরক্ষিত বাবুল প্যাকেজিং ও সারাদেশে ফ্রি হোম ডেলিভারি
                </span>
              </li>
            </ul>

            <div className="mt-5">
              <button
                type="button"
                onClick={onQuickOrder}
                className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#8B1E3F] px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors duration-150 hover:bg-[#721632] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B1E3F] whitespace-nowrap cursor-pointer"
              >
                <span>এখনই অর্ডার করুন · ৳{formatBDT(selectedPackage.price)}</span>
                <ArrowDown className="h-4 w-4 shrink-0" />
              </button>
              <p className="mt-2 text-center text-xs text-[#6B575C]">
                মাত্র ৩০ সেকেন্ডে নাম, নম্বর ও ঠিকানা দিয়ে অর্ডার কনফার্ম করুন
              </p>
            </div>
          </div>
        </div>

        {/* Full-Width 3-Column Guarantee Strip */}
        <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-[#EAE0DC] bg-white/80 p-4 backdrop-blur-sm sm:mt-10 sm:grid-cols-3 sm:gap-6 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B1E3F]/10 text-[#8B1E3F]">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-sans text-sm font-bold text-[#1E1618]">
                সারাদেশে ডেলিভারি ফ্রি (৳০)
              </h2>
              <p className="mt-0.5 text-xs leading-relaxed text-[#625155]">
                ঢাকায় ২৪–৪৮ ঘণ্টায় এবং সারাদেশে ২–৩ দিনে পৌঁছে যাবে।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B1E3F]/10 text-[#8B1E3F]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-sans text-sm font-bold text-[#1E1618]">
                এক টাকাও অগ্রিম ছাড়া অর্ডার
              </h2>
              <p className="mt-0.5 text-xs leading-relaxed text-[#625155]">
                ডেলিভারি ম্যানের সামনে পণ্য যাচাই করে মূল্য পরিশোধ করবেন।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B1E3F]/10 text-[#8B1E3F]">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-sans text-sm font-bold text-[#1E1618]">
                ছবির সাথে ১০০% আসল পণ্য
              </h2>
              <p className="mt-0.5 text-xs leading-relaxed text-[#625155]">
                নিজস্ব স্টুডিও ছবি অনুযায়ী প্রতিটি আইটেম ও ফ্রি বাবুল র‍্যাপ।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
