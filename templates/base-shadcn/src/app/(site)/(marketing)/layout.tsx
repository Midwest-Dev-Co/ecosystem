import Footer from '@/components/navigation/footer/Footer';
import Navbar from '@/components/navigation/navbar/Navbar';
import { Toaster } from '@/components/ui/Sonner';
import { PropsWithChildren } from 'react';

export default function MarketingLayout({ children }: PropsWithChildren) {
    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Children */}
            {children}

            {/* Footer */}
            <Footer />

            {/* Modal */}
            {/* {modal} */}

            {/* Toast Container */}
            <Toaster />

            {/* Analytics */}
            {/* <Analytics /> */}
        </>
    );
}
