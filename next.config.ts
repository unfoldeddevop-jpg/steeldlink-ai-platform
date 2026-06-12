import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '50mb', // Allows large PDF uploads
        },
    },
};
export default nextConfig;