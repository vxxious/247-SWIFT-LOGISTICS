import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeNames: Record<string, string> = {
  "/services": "Services",
  "/pricing": "Pricing",
  "/coverage": "Coverage",
  "/about": "About Us",
  "/contact": "Contact",
  "/book": "Book a Delivery",
};

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pageName = routeNames[pathname];

  if (!pageName) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-card/50 border-b border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-3">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>
          <li><ChevronRight className="w-3.5 h-3.5" /></li>
          <li className="text-foreground font-medium">{pageName}</li>
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
