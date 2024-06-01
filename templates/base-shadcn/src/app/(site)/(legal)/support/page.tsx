import { Metadata } from 'next';

export default function SupportPage() {
    return (
        <section
            id="support"
            className="2xl:py-18 my-4 py-4 text-center sm:my-6 sm:py-6 md:my-8 md:py-8 lg:my-10 lg:py-12 xl:my-12 xl:py-16 2xl:my-14"
        >
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
                Support
            </h1>
            <p
                className="mt-6 text-lg sm:mt-8 sm:text-xl md:mt-10 md:text-2xl
	  lg:mt-12 lg:text-3xl xl:mt-14 xl:text-4xl 2xl:mt-16 2xl:text-5xl"
            >
                For support, please contact us at{' '}
                <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                </a>
                .
            </p>
        </section>
    );
}

export const metadata: Metadata = {
    title: 'Support',
    description: 'Support page for the site.',
};
