'use client';

import { priceFromJSON } from '@/stripe/priceFromJson';
import { TextInput, useField } from '@payloadcms/ui';
import { TextareaField } from 'payload';
import React from 'react';

export const PriceDisplay: React.FC<TextareaField> = (props) => {
    const { name } = props;

    const { value } = useField({ path: name });

    return (
        <div>
            <p style={{ marginBottom: '1rem' }}>Price</p>
            <TextInput
                disabled
                readOnly
                value={priceFromJSON(value as string)}
            />
        </div>
    );
};
