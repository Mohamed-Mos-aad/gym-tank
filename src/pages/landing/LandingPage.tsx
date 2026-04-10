// ** Sections
import HeroSection from "./sections/HeroSection";
import Features from "./sections/Features";
import Prices from "./sections/Prices";
import ContactUs from "./sections/ContactUs";



export default function LandingPage() {
    return (
        <main>
            <HeroSection />
            <Features />
            <Prices />
            <ContactUs />
        </main>
    )
}
