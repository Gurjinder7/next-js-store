import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function HomeLayout({
    children}:{children: React.ReactNode}) {
    return (
        <>
            <Header />
            <section style={{height:'90vh'}}>
                {children}
            </section>
            <Footer />

        </>
    )
}