import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://247swiftlogistics.com";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
}

const SEO = ({ title, description, ogImage = "/og-image.jpg" }: SEOProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

    const setMeta = (attr: string, key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
  }, [title, description, ogImage, pathname]);

  return null;
};

export default SEO;
