import { Order } from '@/assets/typescript/payload-types';
import { FieldHook } from 'payload';

export const populateOrderedBy: FieldHook<Order> = async ({
    req,
    operation,
    value,
}) => {
    if ((operation === 'create' || operation === 'update') && !value) {
        return req.user?.id;
    }

    return value;
};
