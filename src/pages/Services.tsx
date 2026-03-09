import { services, serviceCategories } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";

const Services = () => {
  return (
    <PageTransition>
      <SEO title="Our Services - 247SWIFT LOGISTICS" description="Same-day dispatch, interstate logistics, home relocation, and freight coordination across Nigeria." />
      <BreadcrumbJsonLd items={[{ name: "Services", path: "/services" }]} />
      <Header />
      <Breadcrumbs />
      <main className="section-padding">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Our Services</h1>
          <p className="text-muted-foreground max-w-xl mb-12">
            From same-day dispatch to full-scale freight coordination, we handle every logistics need with speed and precision.
          </p>

          {serviceCategories.map((cat) => {
            const items = services.filter((s) => s.category === cat);
            return (
              <div key={cat} className="mb-12">
                <h2 className="font-display text-xl font-semibold mb-6 text-primary">{cat}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((s, i) => (
                    <ServiceCard key={s.id} service={s} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Services;
