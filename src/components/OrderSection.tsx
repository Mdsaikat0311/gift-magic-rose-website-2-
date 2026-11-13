import { FormEvent, useState } from 'react';
import { CheckCircle2, Copy, Minus, Plus, RotateCcw } from 'lucide-react';
import {
  GIFT_PACKAGES,
  formatBDT,
} from '../data/products';

interface ConfirmedOrder {
  orderCode: string;
  customerName: string;
  phone: string;
  address: string;
  deliveryZone: 'inside' | 'outside';
  packageName: string;
  quantity: number;
  subtotal: number;
  total: number;
}

export function OrderSection() {
  const [quantity, setQuantity] = useState(1);
  const [deliveryZone, setDeliveryZone] = useState<'inside' | 'outside'>('inside');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedPkg = GIFT_PACKAGES[0];
  const subtotal = selectedPkg.price * quantity;
  const total = subtotal;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
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

    const randomCode = `GM-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      orderCode: randomCode,
      customerName: trimmedName,
      phone: trimmedPhone,
      address: trimmedAddress,
      deliveryZone,
      packageName: selectedPkg.name,
      quantity,
      subtotal,
      total,
    });
  }

  function handleCopyOrderId() {
    if (!confirmedOrder) return;
    navigator.clipboard?.writeText(confirmedOrder.orderCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleResetOrder() {
    setConfirmedOrder(null);
    setCustomerName('');
    setPhone('');
    setAddress('');
    setQuantity(1);
    setErrorMessage('');
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

          {confirmedOrder ? (
            <div className="mt-8 rounded-2xl border border-[#D8E5D9] bg-[#F7FBF7] p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-4 border-b border-[#E1ECE2] pb-5 sm:flex-row sm:items-center">
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="mt-0.5 h-7 w-7 shrink-0 text-[#236B39]" />
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#193B23]">
                      অর্ডার #{confirmedOrder.orderCode} নিশ্চিত হয়েছে
                    </h3>
                    <p className="mt-1 text-sm text-[#355A40]">
                      ধন্যবাদ {confirmedOrder.customerName}। আপনার গিফট প্যাকেজটি সুন্দরভাবে প্রস্তুত করা হচ্ছে।
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#C6DBC9] bg-white px-3.5 py-2 text-xs font-semibold text-[#1E472A] transition-colors hover:bg-[#EFF6F0] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copied ? 'কপি হয়েছে' : 'অর্ডার কোড কপি করুন'}</span>
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 text-sm text-[#2B3B2F] sm:grid-cols-2">
                <div className="space-y-1.5">
                  <p>
                    <span className="font-semibold">প্যাকেজ:</span>{' '}
                    {confirmedOrder.packageName} ({formatBDT(confirmedOrder.quantity)}টি)
                  </p>
                  <p>
                    <span className="font-semibold">মোবাইল:</span>{' '}
                    <span className="tabular-nums">{confirmedOrder.phone}</span>
                  </p>
                  <p>
                    <span className="font-semibold">ঠিকানা:</span> {confirmedOrder.address}
                  </p>
                </div>

                <div className="space-y-1.5 rounded-xl border border-[#DCE8DD] bg-white p-4">
                  <div className="flex justify-between">
                    <span>পণ্যের মূল্য</span>
                    <span className="font-semibold tabular-nums">
                      ৳{formatBDT(confirmedOrder.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      ডেলিভারি চার্জ (
                      {confirmedOrder.deliveryZone === 'inside'
                        ? 'ঢাকার ভেতরে'
                        : 'ঢাকার বাইরে'}
                      )
                    </span>
                    <span className="font-semibold text-[#236B39]">ফ্রি (৳০)</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E8EFE9] pt-2 text-base font-bold text-[#193B23]">
                    <span>সর্বমোট (ক্যাশ অন ডেলিভারি)</span>
                    <span className="tabular-nums">
                      ৳{formatBDT(confirmedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleResetOrder}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-[#8B1E3F] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#721632] cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>নতুন আরেকটি অর্ডার করুন</span>
                </button>
              </div>
            </div>
          ) : (
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
                      className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#8B1E3F] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#721632] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B1E3F] cursor-pointer"
                    >
                      অর্ডার কনফার্ম করুন · ৳{formatBDT(total)}
                    </button>
                    <p className="mt-2.5 text-center text-xs text-[#6B575C]">
                      ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে টাকা পরিশোধ করবেন
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
