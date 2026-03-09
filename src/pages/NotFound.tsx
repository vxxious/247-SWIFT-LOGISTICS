import { Link } from "react-router-dom";
import { ArrowRight, PackageX } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const NotFound = () => (
  <PageTransition>
    <SEO title="Page Not Found - 247SWIFT LOGISTICS" description="The page you are looking for does not exist or has been moved." />
    <Header />
    <main className="section-padding min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20"
        >
          <PackageX className="w-12 h-12 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-display text-7xl md:text-8xl font-bold text-primary mb-2"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="font-display text-xl font-semibold text-foreground mb-2"
        >
          Package not found
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-sm text-muted-foreground mb-8 leading-relaxed"
        >
          Looks like this delivery took a wrong turn. The page you are looking for does not exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link to="/" className="btn-primary text-sm">
            Back to Home <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/contact" className="btn-outline text-sm">
            Contact Support
          </Link>
        </motion.div>
      </div>
    </main>
    <Footer />
  </PageTransition>
);

export default NotFound;
