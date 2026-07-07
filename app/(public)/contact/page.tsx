import { HeroSection } from "@/components/contact/HeroSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { OfficeLocations } from "@/components/contact/OfficeLocations";
import { MapSection } from "@/components/contact/MapSection";

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <ContactForm />
      <OfficeLocations />
      <MapSection />
    </main>
  );
}