// ** Sections
import HeroSection from "./sections/HeroSection";
import Features from "./sections/Features";
import Prices from "./sections/Prices";
import ContactUs from "./sections/ContactUs";
import Footer from "./sections/Footer";



export default function LandingPage() {
    return (
        <main>
            <HeroSection />
            <Features />
            <Prices />
            <ContactUs />
            <Footer />
        </main>
    )
}
