// ** Pages
import LandingPage from "@/pages/landing/LandingPage";
// ** Components
import NavBar from "@/components/navigation/NavBar";



export default function LandingPageLayout() {
    return (
        <main className="min-h-screen">
            <NavBar />
            <LandingPage />
        </main>
    )
}