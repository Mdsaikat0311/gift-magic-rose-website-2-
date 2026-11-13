import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { GiftPackage, formatBDT } from '../data/products';
import { ProductImage } from './ProductImage';

export interface CartItem {
  pkg: GiftPackage;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (pkgId: GiftPackage['id'], delta: number) => void;
  onRemoveItem: (pkgId: GiftPackage['id']) => void;
  onProceedToOrder: (pkgId: GiftPackage['id']) => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToOrder,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.pkg.price * item.quantity,
    0
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="আপনার শপিং ব্যাগ"
    >
      <div className="flex h-full w-full max-w-md flex-col bg-[#FCF8F6] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#EAE0DC] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#8B1E3F]" />
            <h2 className="font-display text-lg font-bold text-[#1E1618]">
              আপনার গিফট ব্যাগ
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="ব্যাগ বন্ধ করুন"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5D7D2] bg-white text-[#4A3B3E] hover:text-[#1E1618] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B1E3F]/10 text-[#8B1E3F]">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <p className="mt-4 text-base font-semibold text-[#1E1618]">
                আপনার ব্যাগ এখন খালি
              </p>
              <p className="mt-1 max-w-[28ch] text-sm text-[#6B575C]">
                ১৫ আইটেমের সম্পূর্ণ গিফট কম্বোটি ব্যাগে যোগ করুন।
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 rounded-xl bg-[#8B1E3F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#721632] cursor-pointer"
              >
                প্যাকেজ দেখুন
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ pkg, quantity }) => (
                <div
                  key={pkg.id}
                  className="flex gap-4 rounded-2xl border border-[#EAE0DC] bg-white p-3.5"
                >
                  <ProductImage
                    src={pkg.image}
                    alt={pkg.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1E1618]">
                          {pkg.name}
                        </h3>
                        <p className="mt-0.5 text-sm font-bold text-[#8B1E3F] tabular-nums">
                          ৳{formatBDT(pkg.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(pkg.id)}
                        aria-label={`${pkg.name} সরান`}
                        className="p-1 text-[#8C7A7E] hover:text-[#8B1E3F] cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="পরিমাণ কমান"
                        onClick={() => onUpdateQuantity(pkg.id, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E2D4CF] text-[#4A3B3E] hover:bg-[#F5ECE9] cursor-pointer"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[20px] text-center text-xs font-bold tabular-nums">
                        {formatBDT(quantity)}
                      </span>
                      <button
                        type="button"
                        aria-label="পরিমাণ বাড়ান"
                        onClick={() => onUpdateQuantity(pkg.id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E2D4CF] text-[#4A3B3E] hover:bg-[#F5ECE9] cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#EAE0DC] bg-white px-6 py-5">
            <div className="flex items-center justify-between text-sm text-[#4A3B3E]">
              <span>পণ্যের মোট মূল্য</span>
              <span className="text-lg font-bold text-[#1E1618] tabular-nums">
                ৳{formatBDT(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#236B39] font-medium">
              সারা বাংলাদেশে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি (৳০)
            </p>
            <button
              type="button"
              onClick={() => onProceedToOrder(items[0].pkg.id)}
              className="mt-4 inline-flex min-h-[46px] w-full items-center justify-center rounded-xl bg-[#8B1E3F] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#721632] cursor-pointer"
            >
              অর্ডার ফর্মে এগিয়ে যান
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
