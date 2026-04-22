import Navbar from "@/components/nexus/Navbar";
import Hero from "@/components/nexus/Hero";
import ValueProps from "@/components/nexus/ValueProps";
import ReceptionistView from "@/components/nexus/ReceptionistView";
import PrivacyToggle from "@/components/nexus/PrivacyToggle";
import FeatureBundle from "@/components/nexus/FeatureBundle";
import Footer from "@/components/nexus/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="features">
        <Hero />
        <ValueProps />
        <ReceptionistView />
        <PrivacyToggle />
        <FeatureBundle />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
