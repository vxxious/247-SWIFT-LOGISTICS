export interface PricingTier {
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Standard Delivery",
    description: "For everyday parcels and documents within the city",
    price: "N2,000",
    features: [
      "Same-day delivery within city",
      "Up to 5kg package weight",
      "SMS delivery confirmation",
      "Basic tracking updates",
    ],
    cta: "Book Now",
  },
  {
    name: "Express Delivery",
    description: "Priority handling with faster turnaround",
    price: "N5,000",
    features: [
      "2-hour express delivery",
      "Up to 15kg package weight",
      "Real-time GPS tracking",
      "Photo proof of delivery",
      "Dedicated rider",
    ],
    popular: true,
    cta: "Book Now",
  },
  {
    name: "Interstate",
    description: "Reliable delivery across states",
    price: "N10,000",
    features: [
      "Door-to-door interstate delivery",
      "Up to 30kg package weight",
      "Real-time tracking",
      "Insurance coverage",
      "48–hour delivery guarantee",
    ],
    cta: "Book Now",
  },
  {
    name: "Enterprise",
    description: "Custom logistics for businesses",
    price: "Custom",
    features: [
      "Dedicated account manager",
      "Volume-based pricing",
      "API integration",
      "Warehousing support",
      "Priority support line",
      "Monthly invoicing",
    ],
    cta: "Contact Us",
  },
];
