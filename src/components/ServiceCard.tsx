import { Service } from "@/data/services";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.4 }}
    className="glass-card p-6 flex flex-col justify-between gap-4 hover:border-primary/30 transition-colors"
  >
    <div>
      <h3 className="font-display font-semibold text-lg text-foreground">{service.name}</h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{service.description}</p>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-primary font-semibold text-sm">{service.price}</span>
      <Link
        to={`/book?service=${service.id}`}
        className="text-sm text-primary hover:text-primary-hover flex items-center gap-1 font-medium transition-colors"
      >
        Request Pickup <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  </motion.div>
);

export default ServiceCard;
