import { HeroSection } from "@/components/landing/contact/HeroSection";
import { ContactForm } from "@/components/landing/contact/ContactForm";
import { PageWrapper } from "@/components/ui/PageWrapper";

export default function ContactPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <ContactForm />
    </PageWrapper>
  );
}
