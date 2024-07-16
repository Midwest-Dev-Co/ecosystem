import { CollectionConfig } from 'payload';
import { populateOrderedBy } from './hooks/populateOrderedBy';
import { LinkToPaymentIntent } from './ui/LinkToPaymentIntent';

export const Orders: CollectionConfig = {
    slug: 'orders',
    admin: {
        useAsTitle: 'createdAt',
        defaultColumns: ['createdAt', 'orderedBy'],
    },
    fields: [
        {
            name: 'orderedBy',
            type: 'relationship',
            relationTo: 'users',
            hooks: {
                beforeChange: [populateOrderedBy],
            },
        },
        {
            name: 'stripePaymentIntentID',
            label: 'Stripe Payment Intent ID',
            type: 'text',
            admin: {
                position: 'sidebar',
                components: {
                    Field: LinkToPaymentIntent,
                },
            },
        },
        {
            name: 'total',
            type: 'number',
            required: true,
            min: 0,
        },
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'product',
                    type: 'relationship',
                    relationTo: 'products',
                    required: true,
                },
                {
                    name: 'price',
                    type: 'number',
                    min: 0,
                },
                {
                    name: 'quantity',
                    type: 'number',
                    min: 0,
                },
            ],
        },
    ],
};
