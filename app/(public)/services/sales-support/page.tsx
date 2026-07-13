import { SalesCapabilities } from "@/components/services/sales&business/SalesCapabilities";
import { SalesHero } from "@/components/services/sales&business/SalesHero";
import { SalesProcess } from "@/components/services/sales&business/SalesProcess";

export default function SalesSupportPage() {
  return (
    <main>
      <SalesHero />
      <SalesCapabilities />
      <SalesProcess />
    </main>
  );
}
