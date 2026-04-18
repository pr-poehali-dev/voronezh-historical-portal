import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./pages/HomePage";
import ObjectsPage from "./pages/ObjectsPage";
import MapPage from "./pages/MapPage";
import GalleryPage from "./pages/GalleryPage";
import ContactsPage from "./pages/ContactsPage";
import DistrictsPage from "./pages/DistrictsPage";
import Navigation from "./components/Navigation";

export type Section = "home" | "objects" | "map" | "gallery" | "districts" | "contacts";

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>("home");

  const renderPage = () => {
    switch (activeSection) {
      case "home": return <HomePage onNavigate={setActiveSection} />;
      case "objects": return <ObjectsPage />;
      case "map": return <MapPage />;
      case "gallery": return <GalleryPage />;
      case "districts": return <DistrictsPage />;
      case "contacts": return <ContactsPage />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
        <main key={activeSection} className="animate-fade-in">
          {renderPage()}
        </main>
      </div>
    </TooltipProvider>
  );
}