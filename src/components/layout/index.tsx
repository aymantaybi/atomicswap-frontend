import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: any) {
    return (
        <>
            <Navbar />
            <main style={{ minHeight: "85vh", width: "100%", padding: "0 0.5rem", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }} >
                {children}
            </main>
            <Footer />
        </>
    )
}