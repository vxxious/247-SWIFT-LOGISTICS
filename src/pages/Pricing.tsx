import { pricingTiers } from "@/data/pricing";
import PricingCard from "@/components/PricingCard";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";

const Pricing = () => {
  return (
    <PageTransition>
      <SEO title="Pricing - 247SWIFT LOGISTICS" description="Clear, upfront pricing with no hidden fees. Choose the delivery plan that fits your needs." />
      <BreadcrumbJsonLd items={[{ name: "Pricing", path: "/pricing" }]} />
      <Header />
      <Breadcrumbs />
      <main className="section-padding">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Pricing</h1>
          <p className="text-muted-foreground max-w-xl mb-12">
            Clear, upfront pricing with no hidden fees. Choose the plan that fits your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} index={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Pricing;
