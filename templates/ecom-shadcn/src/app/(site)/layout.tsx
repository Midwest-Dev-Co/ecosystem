import '@/assets/styles/globals.css';

import { baskervville, inter } from '@/assets/fonts/googleFonts';
import { lexend } from '@/assets/fonts/localFonts';

import { cn } from '@/lib/utils';

import { PropsWithChildren } from 'react';
import { defaultMetadata } from '../defaultMetadata';

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html
            lang="en"
            className={cn(
                inter.variable,
                baskervville.variable,
                lexend.variable
            )}
        >
            <body
                suppressHydrationWarning
                className="flex min-h-screen flex-col"
            >
                {children}
            </body>
        </html>
    );
}

export const metadata = defaultMetadata;
