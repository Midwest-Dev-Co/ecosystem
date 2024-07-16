import type { CollectionConfig } from 'payload';

import { ProductSelect } from './ui/ProductSelect';
import { beforeProductChange } from './hooks/beforeChange';
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts';
import { PriceDisplay } from './ui/PriceDisplay';

const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'stripeProductID', '_status'],
    },

    versions: {
        drafts: true,
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeChange: [beforeProductChange],
        afterDelete: [deleteProductFromCarts],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'publishedOn',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData._status === 'published' && !value) {
                            return new Date();
                        }
                        return value;
                    },
                ],
            },
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Product Details',
                    fields: [
                        {
                            name: 'stripeProductID',
                            label: 'Stripe Product',
                            type: 'text',
                            admin: {
                                components: {
                                    Field: ProductSelect,
                                },
                            },
                        },
                        {
                            name: 'media',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                        },
                        {
                            name: 'priceJSON',
                            label: 'Price JSON',
                            type: 'textarea',
                            admin: {
                                readOnly: true,
                                rows: 10,
                                components: {
                                    Field: PriceDisplay,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'skipSync',
            label: 'Skip Sync',
            type: 'checkbox',
            admin: {
                position: 'sidebar',
                readOnly: true,
                hidden: true,
            },
        },
    ],
};

export default Products;
