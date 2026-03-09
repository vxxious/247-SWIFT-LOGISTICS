import { PricingTier } from "@/data/pricing";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const PricingCard = ({ tier, index }: { tier: PricingTier; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.4 }}
    className={`glass-card p-6 md:p-8 flex flex-col relative ${
      tier.popular ? "border-primary ring-1 ring-primary/20" : ""
    }`}
  >
    {tier.popular && (
      <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
        Most Popular
      </span>
    )}
    <h3 className="font-display font-bold text-xl text-foreground">{tier.name}</h3>
    <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
    <div className="mt-5 mb-6">
      <span className="font-display text-3xl font-bold text-foreground">{tier.price}</span>
      {tier.price !== "Custom" && <span className="text-muted-foreground text-sm ml-1">starting</span>}
    </div>
    <ul className="flex flex-col gap-3 flex-1 mb-6">
      {tier.features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          {f}
        </li>
      ))}
    </ul>
    <Link
      to={tier.cta === "Contact Us" ? "/contact" : "/book"}
      className={tier.popular ? "btn-primary justify-center text-sm" : "btn-outline justify-center text-sm"}
    >
      {tier.cta}
    </Link>
  </motion.div>
);

export default PricingCard;
