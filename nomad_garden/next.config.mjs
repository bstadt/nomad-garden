// next.config.mjs

import remarkGfm from 'remark-gfm'
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
    }
}

const withMDX = createMDX({
    options: {
        extension: /\.mdx?$/,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
    }
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig)

