import { SalesCapabilities } from "@/components/landing/services/sales&business/SalesCapabilities";
import { SalesHero } from "@/components/landing/services/sales&business/SalesHero";
import { SalesProcess } from "@/components/landing/services/sales&business/SalesProcess";
import { PageWrapper } from "@/components/ui/PageWrapper";

export default function SalesSupportPage() {
  return (
    <PageWrapper>
      <SalesHero />
      <SalesCapabilities />
      <SalesProcess />
    </PageWrapper>
  );
}
