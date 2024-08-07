/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CartItems".
 */
export type CartItems =
    | {
          product?: (number | null) | Product;
          quantity?: number | null;
          id?: string | null;
      }[]
    | null;

export interface Config {
    auth: {
        users: UserAuthOperations;
    };
    collections: {
        users: User;
        media: Media;
        products: Product;
        orders: Order;
        'payload-preferences': PayloadPreference;
        'payload-migrations': PayloadMigration;
    };
    globals: {};
    locale: null;
    user: User & {
        collection: 'users';
    };
}
export interface UserAuthOperations {
    forgotPassword: {
        email: string;
    };
    login: {
        password: string;
        email: string;
    };
    registerFirstUser: {
        email: string;
        password: string;
    };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
    id: number;
    name?: string | null;
    roles: ('admin' | 'customer')[];
    cart?: {
        items?: CartItems;
    };
    updatedAt: string;
    createdAt: string;
    email: string;
    resetPasswordToken?: string | null;
    resetPasswordExpiration?: string | null;
    salt?: string | null;
    hash?: string | null;
    loginAttempts?: number | null;
    lockUntil?: string | null;
    password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
    id: number;
    title: string;
    publishedOn?: string | null;
    stripeProductID?: string | null;
    media: number | Media;
    priceJSON?: string | null;
    skipSync?: boolean | null;
    updatedAt: string;
    createdAt: string;
    _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
    id: number;
    alt: string;
    updatedAt: string;
    createdAt: string;
    url?: string | null;
    thumbnailURL?: string | null;
    filename?: string | null;
    mimeType?: string | null;
    filesize?: number | null;
    width?: number | null;
    height?: number | null;
    focalX?: number | null;
    focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
    id: number;
    orderedBy?: (number | null) | User;
    stripePaymentIntentID?: string | null;
    total: number;
    items?:
        | {
              product: number | Product;
              price?: number | null;
              quantity?: number | null;
              id?: string | null;
          }[]
        | null;
    updatedAt: string;
    createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
    id: number;
    user: {
        relationTo: 'users';
        value: number | User;
    };
    key?: string | null;
    value?:
        | {
              [k: string]: unknown;
          }
        | unknown[]
        | string
        | number
        | boolean
        | null;
    updatedAt: string;
    createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
    id: number;
    name?: string | null;
    batch?: number | null;
    updatedAt: string;
    createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
    [k: string]: unknown;
}

declare module 'payload' {
    export interface GeneratedTypes extends Config {}
}
