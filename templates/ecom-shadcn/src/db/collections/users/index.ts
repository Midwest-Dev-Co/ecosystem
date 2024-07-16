import { NextResponse } from 'next/server';
import type { CollectionConfig, PayloadHandler, PayloadRequest } from 'payload';

const customerProxy: PayloadHandler = async (req: PayloadRequest) => {
    return NextResponse.json({ hello: 'world' });
};

const Users: CollectionConfig = {
    slug: 'users',
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['name', 'email'],
    },
    auth: true,
    fields: [
        {
            name: 'name',
            type: 'text',
        },
        {
            name: 'roles',
            type: 'select',
            hasMany: true,
            defaultValue: ['customer'],
            required: true,
            options: [
                {
                    label: 'admin',
                    value: 'admin',
                },
                {
                    label: 'customer',
                    value: 'customer',
                },
            ],
        },
        {
            label: 'Cart',
            name: 'cart',
            type: 'group',
            fields: [
                {
                    name: 'items',
                    label: 'Items',
                    type: 'array',
                    interfaceName: 'CartItems',
                    fields: [
                        {
                            name: 'product',
                            type: 'relationship',
                            relationTo: 'products',
                        },
                        {
                            name: 'quantity',
                            type: 'number',
                            min: 0,
                            admin: {
                                step: 1,
                            },
                        },
                    ],
                },
            ],
        },
    ],
    endpoints: [
        {
            path: '/:id/hello',
            method: 'get',
            handler: customerProxy,
        },
    ],
};

export default Users;
