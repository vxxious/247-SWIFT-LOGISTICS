import { coverageZones } from "@/data/coverage";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Coverage = () => {
  return (
    <PageTransition>
      <SEO title="Service Coverage - 247SWIFT LOGISTICS" description="We deliver across Nigeria. See the regions and cities we currently serve." />
      <BreadcrumbJsonLd items={[{ name: "Coverage", path: "/coverage" }]} />
      <Header />
      <Breadcrumbs />
      <main className="section-padding">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Service Coverage</h1>
          <p className="text-muted-foreground max-w-xl mb-12">
            We deliver across Nigeria. Here are the regions and cities we currently serve.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverageZones.map((zone, i) => (
              <motion.div
                key={zone.region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">{zone.region}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${
                    zone.type === "local"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/10 text-secondary"
                  }`}>
                    {zone.type === "local" ? "Local" : "Interstate"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {zone.areas.map((area) => (
                    <span
                      key={area}
                      className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-md"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Coverage;
