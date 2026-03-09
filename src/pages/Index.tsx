import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { BUSINESS } from "@/config/business";
import HeroSection from "@/components/home/HeroSection";
import ImageShowcase from "@/components/home/ImageShowcase";
import CategorySection from "@/components/home/CategorySection";
import TrustPoints from "@/components/home/TrustPoints";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ServicesCarousel from "@/components/home/ServicesCarousel";
import PartnersCarousel from "@/components/home/PartnersCarousel";
import FaqSection from "@/components/home/FaqSection";
import CtaSection from "@/components/home/CtaSection";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: BUSINESS.name,
  url: "https://247swiftlogistics.com",
  logo: "https://247swiftlogistics.com/favicon.png",
  image: "https://247swiftlogistics.com/og-image.jpg",
  description: BUSINESS.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abuja",
    addressRegion: "FCT",
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 9.0579,
    longitude: 7.4951,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS.phone,
    contactType: "customer service",
    availableLanguage: "English",
  },
  sameAs: [BUSINESS.instagram, BUSINESS.whatsappLink],
  email: BUSINESS.email,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "09:00",
      closes: "16:00",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
  priceRange: "₦₦",
  currenciesAccepted: "NGN",
  paymentAccepted: "Cash, Bank Transfer, POS",
};

const Index = () => {
  return (
    <PageTransition>
      <SEO title="247SWIFT LOGISTICS LTD - Driven by Speed, Powered by Trust" description="Fast and dependable delivery services across Nigeria. Same-day dispatch, interstate logistics, home relocation, and freight coordination." />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Header />
      <main>
        <HeroSection />
        <ImageShowcase />
        <CategorySection />
        <TrustPoints />
        <TestimonialsSection />
        <PartnersCarousel />
        <ServicesCarousel />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Index;
