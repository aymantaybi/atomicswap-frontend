import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: any) {
    return (
        <>
            <Navbar />
            <main style={{ minHeight: "85vh", width: "100%", padding: "0 0.5rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                {children}
            </main>
            <Footer />
        </>
    )
}