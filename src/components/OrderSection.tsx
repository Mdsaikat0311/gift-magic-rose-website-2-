import { FormEvent, useRef, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import {
  GIFT_PACKAGES,
  formatBDT,
} from '../data/products';
import { trackMetaEvent } from '../lib/metaPixel';
import { submitWooOrder } from '../lib/woocommerceClient';
import type { ConfirmedOrder } from './ThankYouPage';

interface OrderSectionProps {
  onOrderConfirmed: (order: ConfirmedOrder) => void;
}

export function OrderSection({ onOrderConfirmed }: OrderSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [deliveryZone, setDeliveryZone] = useState<'inside' | 'outside'>('inside');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const checkoutTrackedRef = useRef(false);

  const selectedPkg = GIFT_PACKAGES[0];
  const subtotal = selectedPkg.price * quantity;
  const total = subtotal;

  function markInitiateCheckout() {
    if (checkoutTrackedRef.current) return;
    checkoutTrackedRef.current = true;
    void trackMetaEvent({
      eventName: 'InitiateCheckout',
      value: total,
      currency: 'BDT',
      contentName: selectedPkg.name,
      contentIds: [selectedPkg.id],
      numItems: quantity,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMessage('');

    const trimmedName = customerName.trim();
    const trimmedPhone = phone.trim().replace(/[\s-]/g, '');
    const trimmedAddress = address.trim();

    if (!trimmedName) {
      setErrorMessage('অনুগ্রহ করে আপনার পুরো নাম লিখুন।');
      return;
    }

    if (!/^(\+?88)?01[3-9]\d{8}$/.test(trimmedPhone)) {
      setErrorMessage('অনুগ্রহ করে সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।');
      return;
    }

    if (trimmedAddress.length < 8) {
      setErrorMessage('অনুগ্রহ করে ডেলিভারির সম্পূর্ণ ঠিকানা (বাসা, রোড, এলাকা/জেলা) লিখুন।');
      return;
    }

    setIsSubmitting(true);
    let finalOrderCode = `GM-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const result = await submitWooOrder({
        customerName: trimmedName,
        phone: trimmedPhone,
        address: trimmedAddress,
        deliveryZone,
        quantity,
        packageName: selectedPkg.name,
        unitPrice: selectedPkg.price,
      });
      finalOrderCode = result.orderCode;
    } finally {
      setIsSubmitting(false);
    }

    const orderPayload: ConfirmedOrder = {
      orderCode: finalOrderCode,
      customerName: trimmedName,
      phone: trimmedPhone,
      address: trimmedAddress,
      deliveryZone,
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      quantity,
      subtotal,
      total,
    };

    setCustomerName('');
    setPhone('');
    setAddress('');
    setQuantity(1);
    setErrorMessage('');
    onOrderConfirmed(orderPayload);
  }

  return (
    <section id="order-form" className="py-10 pb-16 sm:py-14 sm:pb-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E7D8D3] bg-white/90 p-6 shadow-sm backdrop-blur-md sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#8B1E3F]">
              সহজ ক্যাশ অন ডেলিভারি ফর্ম · ডেলিভারি ফ্রি
            </p>
            <h2
              className="font-display mt-1.5 text-2xl font-bold text-[#1E1618] sm:text-3xl"
              style={{ textWrap: 'balance' }}
            >
              অর্ডার করতে নিচের ফর্মটি পূরণ করুন
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5E4D51]">
              কোনো অগ্রিম পেমেন্ট ও ডেলিভারি চার্জ ছাড়াই অর্ডার কনফার্ম করুন।
            </p>
          </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12"
            >
              {/* Form Inputs Left */}
              <div className="space-y-5 lg:col-span-7">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#8B1E3F]/30 bg-[#8B1E3F]/[0.04] px-4 py-3.5">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1E1618]">
                      {selectedPkg.name}
                    </p>
                    <p className="text-xs text-[#6B575C]">
                      সারা বাংলাদেশে ফ্রি হোম ডেলিভারি
                    </p>
                  </div>
                  <span className="text-base font-bold text-[#8B1E3F] tabular-nums shrink-0">
                    ৳{formatBDT(selectedPkg.price)}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="customer-name"
                      className="mb-1.5 block text-sm font-semibold text-[#1E1618]"
                    >
                      ১. আপনার নাম <span className="text-[#8B1E3F]">*</span>
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      value={customerName}
                      onFocus={markInitiateCheckout}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="যেমন: তানভীর আহমেদ"
                      className="w-full rounded-xl border border-[#DFD1CC] bg-white px-4 py-3 text-sm text-[#1E1618] placeholder:text-[#9A888C] focus:border-[#8B1E3F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customer-phone"
                      className="mb-1.5 block text-sm font-semibold text-[#1E1618]"
                    >
                      ২. মোবাইল নম্বর <span className="text-[#8B1E3F]">*</span>
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      value={phone}
                      onFocus={markInitiateCheckout}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full rounded-xl border border-[#DFD1CC] bg-white px-4 py-3 text-sm text-[#1E1618] tabular-nums placeholder:text-[#9A888C] focus:border-[#8B1E3F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="customer-address"
                    className="mb-1.5 block text-sm font-semibold text-[#1E1618]"
                  >
                    ৩. ডেলিভারির সম্পূর্ণ ঠিকানা <span className="text-[#8B1E3F]">*</span>
                  </label>
                  <textarea
                    id="customer-address"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="বাসা নম্বর, রোড, এলাকা, থানা ও জেলার নাম লিখুন"
                    className="w-full rounded-xl border border-[#DFD1CC] bg-white px-4 py-3 text-sm text-[#1E1618] placeholder:text-[#9A888C] focus:border-[#8B1E3F] focus:outline-none"
                  />
                </div>

                <div>
                  <span className="mb-1.5 block text-sm font-semibold text-[#1E1618]">
                    ৪. ডেলিভারি এলাকা (চার্জ ফ্রি)
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setDeliveryZone('inside')}
                      className={`min-h-[44px] rounded-xl border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer sm:text-sm ${
                        deliveryZone === 'inside'
                          ? 'border-[#8B1E3F] bg-[#8B1E3F]/8 text-[#8B1E3F]'
                          : 'border-[#DFD1CC] bg-white text-[#4A3B3E]'
                      }`}
                    >
                      ঢাকার ভেতরে (ফ্রি)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryZone('outside')}
                      className={`min-h-[44px] rounded-xl border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer sm:text-sm ${
                        deliveryZone === 'outside'
                          ? 'border-[#8B1E3F] bg-[#8B1E3F]/8 text-[#8B1E3F]'
                          : 'border-[#DFD1CC] bg-white text-[#4A3B3E]'
                      }`}
                    >
                      ঢাকার বাইরে (ফ্রি)
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary Right */}
              <div className="lg:col-span-5">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-[#EAE0DC] bg-[#FCF8F6] p-6">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#1E1618]">
                      আপনার অর্ডারের হিসাব
                    </h3>

                    <div className="mt-4 flex items-center justify-between gap-4 border-b border-[#EAE0DC] pb-4">
                      <div>
                        <p className="text-sm font-semibold text-[#1E1618]">
                          {selectedPkg.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[#6B575C] tabular-nums">
                          একক মূল্য: ৳{formatBDT(selectedPkg.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg border border-[#DFD1CC] bg-white p-1">
                        <button
                          type="button"
                          aria-label="পরিমাণ কমান"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="flex h-8 w-8 items-center justify-center rounded-md text-[#4A3B3E] hover:bg-[#F5ECE9] cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[24px] text-center text-sm font-bold tabular-nums">
                          {formatBDT(quantity)}
                        </span>
                        <button
                          type="button"
                          aria-label="পরিমাণ বাড়ান"
                          onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                          className="flex h-8 w-8 items-center justify-center rounded-md text-[#4A3B3E] hover:bg-[#F5ECE9] cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2.5 text-sm text-[#4A3B3E]">
                      <div className="flex justify-between">
                        <span>পণ্যের মোট মূল্য</span>
                        <span className="font-semibold text-[#1E1618] tabular-nums">
                          ৳{formatBDT(subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          ডেলিভারি চার্জ (
                          {deliveryZone === 'inside' ? 'ঢাকার ভেতরে' : 'ঢাকার বাইরে'})
                        </span>
                        <span className="font-semibold text-[#236B39]">ফ্রি (৳০)</span>
                      </div>
                      <div className="flex justify-between border-t border-[#E6D9D4] pt-3 text-base font-bold text-[#1E1618]">
                        <span>সর্বমোট পরিশোধযোগ্য</span>
                        <span className="text-xl text-[#8B1E3F] tabular-nums">
                          ৳{formatBDT(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    {errorMessage && (
                      <p
                        role="alert"
                        className="mb-3 rounded-xl border border-[#E7B7BE] bg-[#FDF1F3] px-3.5 py-2.5 text-xs font-medium text-[#8B1E3F]"
                      >
                        {errorMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#8B1E3F] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#721632] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B1E3F] cursor-pointer"
                    >
                      {isSubmitting
                        ? 'অর্ডার পাঠানো হচ্ছে...'
                        : `অর্ডার কনফার্ম করুন · ৳${formatBDT(total)}`}
                    </button>
                    <p className="mt-2.5 text-center text-xs text-[#6B575C]">
                      ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে টাকা পরিশোধ করবেন
                    </p>
                  </div>
                </div>
              </div>
            </form>
        </div>
      </div>
    </section>
  );
}
