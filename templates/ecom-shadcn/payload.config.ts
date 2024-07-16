import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { stripePlugin } from '@payloadcms/plugin-stripe';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';

import sharp from 'sharp';
import Users from '@/db/collections/users';
import { Media } from '@/db/collections/Media';
import Products from '@/db/collections/products';
import { priceUpdated } from '@/stripe/webhooks/priceUpdated';
import { productsProxy } from '@/stripe/endpoints/products';
import { productUpdated } from '@/stripe/webhooks/productUpdated';
import { Orders } from '@/db/collections/orders';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
    },
    collections: [Users, Media, Products, Orders],
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(
            dirname,
            'src/assets/typescript/payload-types.ts'
        ),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || '',
        },
    }),
    sharp,
    endpoints: [
        {
            path: '/stripe/products',
            method: 'get',
            handler: productsProxy,
        },
    ],
    plugins: [
        stripePlugin({
            stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
            isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
            stripeWebhooksEndpointSecret:
                process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
            rest: false,
            webhooks: {
                'product.created': productUpdated,
                'product.updated': productUpdated,
                'price.updated': priceUpdated,
            },
        }),
    ],
});
