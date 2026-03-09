import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FormInput, FormTextarea, FormSelect } from "@/components/FormInput";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BUSINESS } from "@/config/business";
import { services } from "@/data/services";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingForm {
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  dropoffAddress: string;
  itemType: string;
  weight: string;
  urgency: string;
  preferredTime: string;
  paymentMethod: string;
  notes: string;
  service: string;
}

const STORAGE_KEY = "247swift-booking";

const defaultForm: BookingForm = {
  customerName: "",
  customerPhone: "",
  pickupAddress: "",
  dropoffAddress: "",
  itemType: "",
  weight: "",
  urgency: "standard",
  preferredTime: "",
  paymentMethod: "cash",
  notes: "",
  service: "",
};

const BookDelivery = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<BookingForm>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = stored ? JSON.parse(stored) : defaultForm;
    const serviceParam = searchParams.get("service");
    if (serviceParam) initial.service = serviceParam;
    return initial;
  });
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const update = (field: keyof BookingForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const serviceName = services.find((s) => s.id === form.service)?.name || form.service || "Not specified";

  const generateWhatsAppMessage = () => {
    const lines = [
      `--- ${BUSINESS.name} ---`,
      `Delivery Request`,
      ``,
      `Customer: ${form.customerName}`,
      `Phone: ${form.customerPhone}`,
      `Service: ${serviceName}`,
      ``,
      `Pickup: ${form.pickupAddress}`,
      `Drop-off: ${form.dropoffAddress}`,
      ``,
      `Item: ${form.itemType}`,
      `Weight: ${form.weight}`,
      `Urgency: ${form.urgency}`,
      `Preferred Time: ${form.preferredTime || "Flexible"}`,
      `Payment: ${form.paymentMethod}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    return encodeURIComponent(lines);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSummary(true);
  };

  const sendToWhatsApp = () => {
    const msg = generateWhatsAppMessage();
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${msg}`, "_blank");
  };

  const urgencyOptions = [
    { value: "standard", label: "Standard" },
    { value: "express", label: "Express (2-hour)" },
    { value: "same-day", label: "Same Day" },
    { value: "scheduled", label: "Scheduled" },
  ];

  const paymentOptions = [
    { value: "cash", label: "Cash on Delivery" },
    { value: "transfer", label: "Bank Transfer" },
    { value: "pos", label: "POS" },
  ];

  const serviceOptions = services.map((s) => ({ value: s.id, label: s.name }));

  return (
    <PageTransition>
      <SEO title="Book a Delivery - 247SWIFT LOGISTICS" description="Book your delivery online with 247Swift. Fast, reliable pickup and drop-off across Nigeria." />
      <BreadcrumbJsonLd items={[{ name: "Book a Delivery", path: "/book" }]} />
      <Header />
      <Breadcrumbs />
      <main className="section-padding">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Book a Delivery</h1>
          <p className="text-muted-foreground mb-10">
            Fill in the details below. After reviewing your summary, you can send the request via WhatsApp.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormInput
                  label="Your Name"
                  placeholder="Full name"
                  required
                  value={form.customerName}
                  onChange={(e) => update("customerName", e.target.value)}
                />
                <FormInput
                  label="Phone Number"
                  type="tel"
                  placeholder="+234..."
                  required
                  value={form.customerPhone}
                  onChange={(e) => update("customerPhone", e.target.value)}
                />
              </div>
              <FormSelect
                label="Service"
                options={serviceOptions}
                value={form.service}
                onChange={(e) => update("service", (e.target as HTMLSelectElement).value)}
              />
              <FormInput
                label="Pickup Address"
                placeholder="Where should we pick up?"
                required
                value={form.pickupAddress}
                onChange={(e) => update("pickupAddress", e.target.value)}
              />
              <FormInput
                label="Drop-off Address"
                placeholder="Where is it going?"
                required
                value={form.dropoffAddress}
                onChange={(e) => update("dropoffAddress", e.target.value)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormInput
                  label="Item Type"
                  placeholder="e.g. Documents, Electronics"
                  required
                  value={form.itemType}
                  onChange={(e) => update("itemType", e.target.value)}
                />
                <FormInput
                  label="Estimated Weight"
                  placeholder="e.g. 2kg"
                  value={form.weight}
                  onChange={(e) => update("weight", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormSelect
                  label="Urgency"
                  options={urgencyOptions}
                  value={form.urgency}
                  onChange={(e) => update("urgency", (e.target as HTMLSelectElement).value)}
                />
                <FormInput
                  label="Preferred Time"
                  type="time"
                  value={form.preferredTime}
                  onChange={(e) => update("preferredTime", e.target.value)}
                />
              </div>
              <FormSelect
                label="Payment Method"
                options={paymentOptions}
                value={form.paymentMethod}
                onChange={(e) => update("paymentMethod", (e.target as HTMLSelectElement).value)}
              />
              <FormTextarea
                label="Notes (optional)"
                placeholder="Any special instructions?"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
              <button type="submit" className="btn-primary text-sm justify-center">
                Review Booking <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Summary Panel (desktop) / Drawer (mobile via AnimatePresence) */}
            <AnimatePresence>
              {showSummary && (
                <>
                  {/* Mobile overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
                    onClick={() => setShowSummary(false)}
                  />
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 25 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto lg:static lg:col-span-2 lg:rounded-xl lg:border lg:max-h-none lg:z-auto"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display font-semibold text-lg">Booking Summary</h3>
                      <button
                        className="text-muted-foreground text-sm hover:text-foreground lg:hidden"
                        onClick={() => setShowSummary(false)}
                      >
                        Close
                      </button>
                    </div>

                    <div className="flex flex-col gap-3 text-sm">
                      {[
                        ["Name", form.customerName],
                        ["Phone", form.customerPhone],
                        ["Service", serviceName],
                        ["Pickup", form.pickupAddress],
                        ["Drop-off", form.dropoffAddress],
                        ["Item", form.itemType],
                        ["Weight", form.weight || "Not specified"],
                        ["Urgency", form.urgency],
                        ["Time", form.preferredTime || "Flexible"],
                        ["Payment", form.paymentMethod],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-4">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="text-foreground text-right font-medium">{value}</span>
                        </div>
                      ))}
                      {form.notes && (
                        <div>
                          <span className="text-muted-foreground">Notes</span>
                          <p className="text-foreground mt-1">{form.notes}</p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={sendToWhatsApp}
                      className="btn-primary w-full justify-center text-sm mt-6"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Send Request via WhatsApp
                    </button>

                    <button
                      onClick={() => {
                        setForm(defaultForm);
                        setShowSummary(false);
                        localStorage.removeItem(STORAGE_KEY);
                      }}
                      className="w-full text-center text-sm text-muted-foreground hover:text-foreground mt-3 transition-colors"
                    >
                      Clear and start over
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Desktop static summary placeholder when not shown */}
            {!showSummary && (
              <div className="hidden lg:flex lg:col-span-2 glass-card p-6 items-center justify-center">
                <div className="text-center">
                  <Check className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Fill in the form and click "Review Booking" to see your summary here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default BookDelivery;
