const partners = [
  { name: "Jumia", initials: "JM" },
  { name: "Konga", initials: "KG" },
  { name: "Dangote Group", initials: "DG" },
  { name: "GTBank", initials: "GT" },
  { name: "Flutterwave", initials: "FW" },
  { name: "Paystack", initials: "PS" },
  { name: "Andela", initials: "AN" },
  { name: "Interswitch", initials: "IS" },
];

const PartnersCarousel = () => {
  const allPartners = [...partners, ...partners];

  return (
    <section className="py-12 md:py-16 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20 mb-8">
        <p className="text-center text-sm font-medium tracking-widest uppercase text-muted-foreground">
          Trusted by Leading Brands
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

        <div className="flex gap-12 md:gap-16 items-center w-max animate-[scroll_25s_linear_infinite]">
          {allPartners.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex items-center gap-3 shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center border border-border">
                <span className="font-display text-sm font-bold text-primary">
                  {p.initials}
                </span>
              </div>
              <span className="font-display text-base font-semibold text-muted-foreground whitespace-nowrap">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
