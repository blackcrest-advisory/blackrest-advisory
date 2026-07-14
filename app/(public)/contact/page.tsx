import { HeroSection } from "@/components/landing/contact/HeroSection";
import { ContactForm } from "@/components/landing/contact/ContactForm";
import { OfficeLocations } from "@/components/landing/contact/OfficeLocations";
import { MapSection } from "@/components/landing/contact/MapSection";

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