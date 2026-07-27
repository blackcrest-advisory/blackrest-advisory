import { HeroSection } from "@/components/landing/contact/HeroSection";
import { ContactForm } from "@/components/landing/contact/ContactForm";
import { OfficeLocations } from "@/components/landing/contact/OfficeLocations";
import { MapSection } from "@/components/landing/contact/MapSection";
import { PageWrapper } from "@/components/ui/PageWrapper";

export default function ContactPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <ContactForm />
      <OfficeLocations />
      <MapSection />
    </PageWrapper>
  );
}
