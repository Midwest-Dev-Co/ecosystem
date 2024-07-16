'use client';

import { CopyToClipboard, TextField, useField } from '@payloadcms/ui';
import { TextField as ITextField } from 'payload';
import * as React from 'react';

export const LinkToPaymentIntent: React.FC<ITextField> = (props) => {
    const { name, label } = props;

    const { value: stripePaymentIntentID } = useField({ path: name });

    const href = `https://dashboard.stripe.com/${
        process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY ? 'test/' : ''
    }payments/${stripePaymentIntentID}`;

    return (
        <div>
            <p style={{ marginBottom: '0' }}>
                {typeof label === 'string' ? label : 'Stripe Payment Intent ID'}
            </p>
            <TextField
                {...props}
                label=""
            />
            {Boolean(stripePaymentIntentID) && (
                <div>
                    <div>
                        <span
                            className="label"
                            style={{
                                color: '#9A9A9A',
                            }}
                        >
                            {`Manage in Stripe`}
                        </span>
                        <CopyToClipboard value={href} />
                    </div>
                    <div
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontWeight: '600',
                        }}
                    >
                        <a
                            href={`https://dashboard.stripe.com/${
                                process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY
                                    ? 'test/'
                                    : ''
                            }customers/${stripePaymentIntentID}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {href}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};
