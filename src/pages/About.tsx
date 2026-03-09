import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BUSINESS } from "@/config/business";
import { motion } from "framer-motion";
import { Target, Eye, Shield, Users } from "lucide-react";

const values = [
  { icon: Target, title: "Speed", desc: "We prioritize fast turnaround without compromising safety." },
  { icon: Shield, title: "Reliability", desc: "Consistent service you can depend on every time." },
  { icon: Eye, title: "Transparency", desc: "Clear pricing and real-time updates at every step." },
  { icon: Users, title: "Customer First", desc: "Your satisfaction drives everything we do." },
];

const About = () => {
  return (
    <PageTransition>
      <SEO title="About Us - 247SWIFT LOGISTICS" description="Learn about 247Swift Logistics — fast, dependable delivery services across Nigeria built for speed, safety, and consistency." />
      <BreadcrumbJsonLd items={[{ name: "About Us", path: "/about" }]} />
      <Header />
      <Breadcrumbs />
      <main className="section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">About {BUSINESS.shortName}</h1>

          <div className="prose prose-invert max-w-none mb-16">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {BUSINESS.name} provides fast and dependable delivery services across cities and states in Nigeria. We help individuals and businesses move goods with confidence using a team built for speed, safety, and consistency.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-4">
              From same-day courier services to interstate logistics and full-scale freight coordination, we are committed to making logistics seamless and stress-free. Our trained riders and drivers handle every package with care, ensuring it arrives at its destination on time and in perfect condition.
            </p>
          </div>

          <h2 className="font-display text-2xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <v.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default About;
