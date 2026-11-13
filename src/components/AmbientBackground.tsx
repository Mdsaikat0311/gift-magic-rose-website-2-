export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#FCF8F6]"
    >
      {/* Top rose-silk atmospheric radial wash */}
      <div
        className="absolute -top-48 left-1/2 h-[820px] w-[1320px] -translate-x-1/2 rounded-full opacity-95"
        style={{
          background:
            'radial-gradient(ellipse 68% 58% at 50% 35%, rgba(212, 74, 106, 0.14) 0%, rgba(235, 168, 164, 0.16) 45%, rgba(252, 248, 246, 0) 78%)',
        }}
      />

      {/* Left rose-champagne warmth glow */}
      <div
        className="absolute top-[22%] -left-44 h-[680px] w-[680px] rounded-full opacity-90"
        style={{
          background:
            'radial-gradient(circle, rgba(226, 146, 152, 0.17) 0%, rgba(252, 248, 246, 0) 70%)',
        }}
      />

      {/* Right deep crimson-blush accent wash */}
      <div
        className="absolute top-[46%] -right-40 h-[720px] w-[720px] rounded-full opacity-85"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 30, 63, 0.105) 0%, rgba(224, 154, 154, 0.12) 45%, rgba(252, 248, 246, 0) 74%)',
        }}
      />

      {/* Bottom warm silk vignette */}
      <div
        className="absolute -bottom-56 left-1/2 h-[660px] w-[1140px] -translate-x-1/2 rounded-full opacity-90"
        style={{
          background:
            'radial-gradient(ellipse 62% 52% at 50% 60%, rgba(202, 124, 134, 0.14) 0%, rgba(252, 248, 246, 0) 76%)',
        }}
      />

      {/* Subtle fine architectural atelier grid & dot weave */}
      <div className="bg-atelier-grain absolute inset-0 opacity-65" />
      <div className="bg-silk-grid absolute inset-0 opacity-55" />

      {/* Delicate boutique hairline corner rings */}
      <svg
        className="absolute -top-24 -right-24 h-[460px] w-[460px] text-[#8B1E3F]/[0.07]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="148" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="102" stroke="currentColor" strokeWidth="0.75" />
      </svg>

      {/* Subtle hairline romantic heart outline on left edge */}
      <svg
        className="absolute top-[36%] -left-16 h-[320px] w-[320px] text-[#8B1E3F]/[0.055]"
        viewBox="0 0 240 240"
        fill="none"
      >
        <path
          d="M120 206C120 206 28 148 28 84C28 52 52 28 82 28C101 28 114 38 120 50C126 38 139 28 158 28C188 28 212 52 212 84C212 148 120 206 120 206Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M120 184C120 184 46 136 46 86C46 62 64 46 84 46C99 46 112 55 120 67C128 55 141 46 156 46C176 46 194 62 194 86C194 136 120 184 120 184Z"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="4 5"
        />
      </svg>

      <svg
        className="absolute bottom-12 -left-28 h-[420px] w-[420px] text-[#B8866B]/[0.08]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="132" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 7" />
      </svg>

      {/* Top subtle soft vignette edge */}
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background:
            'linear-gradient(to bottom, rgba(252, 248, 246, 0.65), rgba(252, 248, 246, 0))',
        }}
      />
    </div>
  );
}
