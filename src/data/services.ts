export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export const serviceCategories = [
  "Delivery Services",
  "Moving & Relocation",
  "Logistics Solutions",
] as const;

export const services: Service[] = [
  {
    id: "dispatch-courier",
    name: "Dispatch and Courier Delivery",
    description:
      "Quick same-day dispatch and courier services for documents, parcels, and small packages within the city.",
    price: "From N2,000",
    category: "Delivery Services",
  },
  {
    id: "business-retail",
    name: "Business and Retail Deliveries",
    description:
      "Reliable scheduled deliveries for businesses, e-commerce stores, and retail outlets with tracking updates.",
    price: "From N3,000",
    category: "Delivery Services",
  },
  {
    id: "interstate",
    name: "Interstate Logistics",
    description:
      "Secure long-distance delivery across states with real-time tracking and guaranteed timelines.",
    price: "From N10,000",
    category: "Delivery Services",
  },
  {
    id: "home-office-relocation",
    name: "Home and Office Relocation",
    description:
      "Full-service moving for homes and offices. We handle packing, loading, transport, and setup at your new location.",
    price: "Request a quote",
    category: "Moving & Relocation",
  },
  {
    id: "goods-transport",
    name: "Goods Transportation",
    description:
      "Heavy-duty transport for bulk goods, equipment, and large items using our fleet of trucks and vans.",
    price: "Request a quote",
    category: "Moving & Relocation",
  },
  {
    id: "warehousing",
    name: "Warehousing Support",
    description:
      "Short-term and long-term storage solutions with inventory management and on-demand dispatch.",
    price: "Request a quote",
    category: "Logistics Solutions",
  },
  {
    id: "freight",
    name: "Freight Coordination",
    description:
      "End-to-end freight management including pickup, consolidation, and delivery for commercial shipments.",
    price: "Request a quote",
    category: "Logistics Solutions",
  },
];
