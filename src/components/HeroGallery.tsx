import { ArrowDown, Check, ShieldCheck, Truck, Gift } from 'lucide-react';
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
  onQuickOrder: (pkgId: GiftPackage['id']) => void;
}

export function HeroGallery({
  activeImageIndex,
  onSelectImage,
  selectedPackage,
  onQuickOrder,
}: HeroGalleryProps) {
  const activeImage = GALLERY_IMAGES[activeImageIndex] ?? GALLERY_IMAGES[0];
  const discountPercent = Math.round(
    ((selectedPackage.regularPrice - selectedPackage.price) /
      selectedPackage.regularPrice) *
      100
  );

  return (
    <section id="top" className="relative pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-5">
          {/* 1. Editorial Intro & Package Summary */}
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <h1
              className="font-display text-3xl font-bold leading-[1.28] text-[#1E1618] sm:text-4xl lg:text-[42px]"
              style={{ textWrap: 'balance' }}
            >
              মায়াভরা ১৫ আইটেমের রোমান্টিক গিফট প্যাকেজ
            </h1>

            <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[#4F4044]">
              আর্টিফিশিয়াল গোলাপ, ডায়মন্ড কাট রিং, নোসেপিন, কানের দুল, নেকলেস, পায়েল, কাভেরি মেহেদী,
              ব্রেসলেট, টিপ, ২টি ডেইরি মিল্ক, চিরকুট, পাউচ ব্যাগ, ব্রুজ ও প্রিমিয়াম বক্স—ফ্রি বাবুল
              প্যাকেজিং এবং সারাদেশে ফ্রি ডেলিভারি।
            </p>

            {/* Selected Package Summary Info */}
            <div className="mt-6 rounded-xl border border-[#8B1E3F]/30 bg-white/80 px-4 py-3.5 shadow-xs">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#1E1618]">
                    {selectedPackage.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[#6A5257]">
                    সারা বাংলাদেশে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি
                  </p>
                </div>
                <span className="text-base font-bold text-[#8B1E3F] tabular-nums whitespace-nowrap shrink-0">
                  ৳{formatBDT(selectedPackage.price)}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Interactive Product Photography Gallery */}
          <div
            id="gallery"
            className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[#EAE0DC] bg-white p-2.5 shadow-sm">
              <div className="relative w-full overflow-hidden rounded-xl bg-[#F6EFECE6]">
                <ProductImage
                  src={activeImage.src}
                  alt={activeImage.alt}
                  priority
                  className="block h-auto w-full transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pt-10 pb-3.5">
                  <p className="text-sm font-medium text-white">
                    {activeImage.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Thumbnail Switchers for all uploaded product photos */}
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
                        ? 'border-[#8B1E3F] ring-2 ring-[#8B1E3F]/20'
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

          {/* 3. Selected Package Price & Highlights (After Image Part on Mobile) */}
          <div className="rounded-2xl border border-[#EAE0DC] bg-white/80 p-5 shadow-xs backdrop-blur-sm lg:col-span-6 lg:col-start-1 lg:row-start-2">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#F1E8E4] pb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#8B1E3F] tabular-nums">
                  ৳{formatBDT(selectedPackage.price)}
                </span>
                <span className="text-base text-[#8C7A7E] line-through tabular-nums">
                  ৳{formatBDT(selectedPackage.regularPrice)}
                </span>
              </div>
              <span className="text-xs font-semibold text-[#8B1E3F]">
                {formatBDT(discountPercent)}% ছাড় · ফ্রি ডেলিভারি
              </span>
            </div>

            <ul className="mt-4 space-y-2">
              {selectedPackage.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-[#3E3033]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8B1E3F]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Primary Order Action Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onQuickOrder(selectedPackage.id)}
                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#8B1E3F] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#721632] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B1E3F] whitespace-nowrap cursor-pointer"
              >
                <span>এখনই অর্ডার করুন</span>
                <ArrowDown className="h-4 w-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width 3-Column Trust Strip Below Hero Split */}
        <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-[#EAE0DC] bg-white/75 p-5 backdrop-blur-sm sm:grid-cols-3 sm:gap-6">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B1E3F]/10 text-[#8B1E3F]">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold text-[#1E1618]">
                সারা দেশে হোম ডেলিভারি
              </h2>
              <p className="mt-0.5 text-xs leading-relaxed text-[#625155]">
                ঢাকায় ২৪–৪৮ ঘণ্টায় এবং সারা বাংলাদেশে ২–৩ দিনে পৌঁছে যাবে।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B1E3F]/10 text-[#8B1E3F]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold text-[#1E1618]">
                এক টাকাও অগ্রিম লাগবে না
              </h2>
              <p className="mt-0.5 text-xs leading-relaxed text-[#625155]">
                পণ্য হাতে পেয়ে ডেলিভারি ম্যানের সামনে দেখে টাকা পরিশোধ করবেন।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B1E3F]/10 text-[#8B1E3F]">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold text-[#1E1618]">
                ছবির সাথে শতভাগ মিল
              </h2>
              <p className="mt-0.5 text-xs leading-relaxed text-[#625155]">
                আমাদের নিজস্ব তোলা বাস্তব ছবির মতোই সুন্দর প্যাকেজিংয়ে ডেলিভারি।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
