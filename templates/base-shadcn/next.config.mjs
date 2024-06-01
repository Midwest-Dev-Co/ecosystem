/** @type {import('next').NextConfig} */
const nextConfig = {
    // Don't know why this won't work : /
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 'images.unsplash.com',
    //             port: '',
    //             pathname: '**',
    //         },
    //         {
    //             protocol: 'https',
    //             hostname: 'source.unsplash.com',
    //             port: '',
    //             pathname: '**',
    //         },
    //     ],
    // },
    images: {
        domains: ['images.unsplash.com', 'source.unsplash.com'],
    },
    reactStrictMode: true,
    poweredByHeader: false,
};

export default nextConfig;
