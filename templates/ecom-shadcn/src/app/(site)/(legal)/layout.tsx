import { PropsWithChildren } from 'react';
import Link from 'next/link';

import LogoSquareIcon from '@/assets/icons/logo/logo-square.svg';
import SimpleFooter from './LegalFooter';
import LazyLocalImage from '@/components/common/LazyLocalImage';

export default function LegalLayout({ children }: PropsWithChildren) {
    return (
        <>
            <header className="absolute inset-x-0 top-0 z-30">
                <nav
                    className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        <Link
                            href="/"
                            className="-m-1.5 p-1.5"
                        >
                            <span className="sr-only">
                                {process.env.NEXT_PUBLIC_COMPANY_NAME}
                            </span>
                            <LazyLocalImage
                                className="h-8 w-8"
                                blur={false}
                                src={LogoSquareIcon}
                                alt={
                                    process.env.NEXT_PUBLIC_COMPANY_NAME ||
                                    'logo'
                                }
                                width={LogoSquareIcon.width}
                                height={LogoSquareIcon.height}
                            />
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="relative mx-auto my-24 w-full max-w-5xl grow space-y-6">
                {children}
            </main>

            <SimpleFooter />
        </>
    );
}
