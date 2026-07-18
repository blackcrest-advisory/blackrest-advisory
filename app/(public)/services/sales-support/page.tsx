import { SalesCapabilities } from "@/components/landing/services/sales&business/SalesCapabilities";
import { SalesHero } from "@/components/landing/services/sales&business/SalesHero";
import { SalesProcess } from "@/components/landing/services/sales&business/SalesProcess";

export default function SalesSupportPage() {
  return (
    <main>
      <SalesHero />
      <SalesCapabilities />
      <SalesProcess />
    </main>
  );
}
