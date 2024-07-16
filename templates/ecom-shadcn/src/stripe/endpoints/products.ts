import { NextResponse } from 'next/server';
import type { PayloadHandler, PayloadRequest } from 'payload';
import stripeClient from '../stripeClient';
import { checkRole } from '@/db/collections/users/access/checkRole';

const logs = process.env.LOGS_STRIPE_PROXY === '1';

// use this handler to get all Stripe products
// prevents unauthorized or non-admin users from accessing all Stripe products
// GET /api/products
export const productsProxy: PayloadHandler = async (req: PayloadRequest) => {
    if (!req.user || !checkRole(['admin'], req.user)) {
        if (logs)
            req.payload.logger.error({
                err: `You are not authorized to access products`,
            });
        return NextResponse.json(
            {
                error: 'You are not authorized to access products',
            },
            { status: 401 }
        );
    }

    try {
        const products = await stripeClient.products.list({
            limit: 100,
        });

        // res.status(200).json(products);
        return NextResponse.json({ data: products.data }, { status: 200 });
    } catch (error: unknown) {
        if (logs)
            req.payload.logger.error({
                err: `Error using Stripe API: ${error}`,
            });
        return NextResponse.json(
            {
                error: `Error using Stripe API: ${error}`,
            },
            { status: 500 }
        );
    }
};
