import { useState } from "react";
import { FormInput, FormTextarea } from "@/components/FormInput";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BUSINESS } from "@/config/business";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <PageTransition>
      <SEO title="Contact Us - 247SWIFT LOGISTICS" description="Have a question or need a custom quote? Reach out to 247Swift Logistics and we'll get back to you promptly." />
      <BreadcrumbJsonLd items={[{ name: "Contact", path: "/contact" }]} />
      <Header />
      <Breadcrumbs />
      <main className="section-padding">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground mb-12">
            Have a question or need a custom quote? Reach out and we will get back to you promptly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              {sent ? (
                <div className="glass-card p-8 text-center">
                  <Send className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-xl mb-2">Message Sent</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for reaching out. We will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <FormInput label="Full Name" placeholder="Your name" required />
                  <FormInput label="Email" type="email" placeholder="you@example.com" required />
                  <FormInput label="Phone (optional)" type="tel" placeholder="+234..." />
                  <FormTextarea label="Message" placeholder="How can we help?" required />
                  <button type="submit" className="btn-primary text-sm justify-center">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold mb-4">Get in Touch</h3>
                <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                  <a href={`tel:${BUSINESS.phone}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                    {BUSINESS.phoneDisplay}
                  </a>
                  <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                    {BUSINESS.email}
                  </a>
                  <span className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    {BUSINESS.address}
                  </span>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display font-semibold mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For faster responses, chat with us directly on WhatsApp.
                </p>
                <a
                  href={BUSINESS.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm inline-flex"
                >
                  Open WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Contact;
