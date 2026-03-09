import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter, ScrollRestoration, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";

const Services = lazy(() => import("./pages/Services"));
const Pricing = lazy(() => import("./pages/Pricing"));

const Coverage = lazy(() => import("./pages/Coverage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const BookDelivery = lazy(() => import("./pages/BookDelivery"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Layout = () => (
  <>
    <ScrollRestoration />
    <Outlet />
  </>
);

const Fallback = () => <LoadingScreen />;

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/services", element: <Suspense fallback={<Fallback />}><Services /></Suspense> },
      { path: "/pricing", element: <Suspense fallback={<Fallback />}><Pricing /></Suspense> },
      
      { path: "/coverage", element: <Suspense fallback={<Fallback />}><Coverage /></Suspense> },
      { path: "/about", element: <Suspense fallback={<Fallback />}><About /></Suspense> },
      { path: "/contact", element: <Suspense fallback={<Fallback />}><Contact /></Suspense> },
      { path: "/book", element: <Suspense fallback={<Fallback />}><BookDelivery /></Suspense> },
      { path: "*", element: <Suspense fallback={<Fallback />}><NotFound /></Suspense> },
    ],
  },
]);

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
