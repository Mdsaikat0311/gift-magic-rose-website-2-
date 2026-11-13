/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { ComboShowcase } from './components/ComboShowcase';
import { Footer } from './components/Footer';
import { HeroGallery } from './components/HeroGallery';
import { Navbar } from './components/Navbar';
import { OrderSection } from './components/OrderSection';
import { GIFT_PACKAGES, GiftPackage } from './data/products';

export default function App() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const selectedPackage = GIFT_PACKAGES[0];

  function handleQuickOrder(_pkgId: GiftPackage['id']) {
    const el = document.getElementById('order-form');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <AmbientBackground />

      <Navbar />

      <main className="flex-1">
        <HeroGallery
          activeImageIndex={activeImageIndex}
          onSelectImage={setActiveImageIndex}
          selectedPackage={selectedPackage}
          onQuickOrder={handleQuickOrder}
        />

        <ComboShowcase onQuickOrder={handleQuickOrder} />

        <OrderSection />
      </main>

      <Footer />
    </div>
  );
}
