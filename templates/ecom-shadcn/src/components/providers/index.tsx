'use client';

import { AuthProvider } from '@payloadcms/ui';
import React from 'react';

export const Providers: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return <AuthProvider>{children}</AuthProvider>;
};
