import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="public-site bg-background text-foreground">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
