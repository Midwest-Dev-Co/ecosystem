import Link from 'next/link';
import LogoHorizontalIcon from '@/assets/icons/logo/logo-horizontal.svg';
import LazyLocalImage from '@/components/common/LazyLocalImage';

export default function SimpleFooter() {
    return (
        <footer
            id="footer"
            className="flex flex-col items-center justify-center bg-slate-50/80 px-6 pb-12 pt-14 sm:pt-16 lg:px-8"
        >
            {/* Logo */}
            <LazyLocalImage
                className="h-6 w-auto"
                blur={false}
                src={LogoHorizontalIcon || ''}
                alt={process.env.NEXT_PUBLIC_COMPANY_NAME || 'logo'}
                width={LogoHorizontalIcon.width}
                height={LogoHorizontalIcon.height}
            />

            {/* Copyright */}
            <p className="mt-8 text-center text-xs leading-5 text-slate-700">
                &copy;{' '}
                {new Date(
                    new Date().setMonth(new Date().getMonth() - 1)
                ).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}{' '}
                - {process.env.NEXT_PUBIC_COMPANY_NAME}. All rights reserved.
            </p>

            {/* Address */}
            <div className="mt-4 text-center text-xs italic leading-5 text-slate-500">
                <p>TSKADDRESSLINE1, TSKADDRESSLINE2</p>
                <p>TSKCITY, TSKSTATEINITIALS TSKZIP</p>
                <p>TSKCOUNTRY</p>
            </div>

            {/* Legal Docs */}
            <div className="mt-4 text-center text-xs leading-5 text-slate-600">
                <Link
                    href="/terms-of-service"
                    className="transition-colors duration-200 hocus:text-slate-800"
                >
                    Terms of Service
                </Link>
                {' | '}
                <Link
                    href="/privacy-policy"
                    className="transition-colors duration-200 hocus:text-slate-800"
                >
                    Privacy Policy
                </Link>
            </div>
        </footer>
    );
}
