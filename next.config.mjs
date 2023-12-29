// next.config.mjs

import remarkGfm from 'remark-gfm'
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
}

const withMDX = createMDX({
    options: {
        extension: /\.mdx?$/,
        remarkPlugins: [],
        rehypePlugins: [],
    }
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig)

