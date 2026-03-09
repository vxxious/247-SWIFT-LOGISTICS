import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How quickly can you deliver my package?",
    a: "We offer same-day delivery within cities, 2-hour express options for urgent items, and 24–48 hour interstate deliveries across all 36 states.",
  },
  {
    q: "What items can I send?",
    a: "We handle documents, electronics, food packages, fashion items, e-commerce orders, and more. Fragile and high-value items receive special handling. Prohibited items include flammable or illegal goods.",
  },
  {
    q: "How do I book a delivery?",
    a: "Simply click 'Book a Delivery', fill in the pickup and drop-off details, choose your preferred service, and submit your request via WhatsApp. A rider will be assigned within minutes.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash on delivery, bank transfers, and POS payments. Payment is flexible to suit your convenience.",
  },
  {
    q: "Is my package insured?",
    a: "Yes — our Business and Enterprise plans include insurance coverage. For standard deliveries, optional insurance can be added at booking.",
  },
  {
    q: "What areas do you cover?",
    a: "We operate across all 36 Nigerian states and the FCT. Intra-city, inter-city, and interstate routes are all supported with dedicated hubs nationwide.",
  },
  {
    q: "What are the delivery timelines for each service?",
    a: "Intra-city standard deliveries arrive within 4–6 hours. Express deliveries take just 1–2 hours. Interstate shipments are delivered within 24–48 hours depending on the route and distance.",
  },
  {
    q: "How do you ensure rider and package safety?",
    a: "All our riders are vetted, trained, and equipped with proper safety gear. Packages are handled with care using tamper-proof packaging, and riders follow strict delivery protocols to ensure your items arrive intact.",
  },
  {
    q: "Do you offer bulk order or business discounts?",
    a: "Yes! We offer competitive rates for businesses with regular shipping needs. Our Business and Enterprise plans include volume discounts, dedicated account managers, and priority dispatch. Contact us for a custom quote.",
  },
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-display font-semibold text-foreground text-sm md:text-base group-hover:text-primary transition-colors">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground pb-5 leading-relaxed pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const FaqSection = () => {
  return (
    <section className="section-padding">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-center text-sm mb-10">
          Everything you need to know about our delivery services.
        </p>
        <div className="glass-card p-6 md:p-8">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
