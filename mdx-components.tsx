import type { MDXComponents } from 'mdx/types'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Apply styles to the common Markdown components
        p: props => <p className="text-lg leading-7 my-4">{props.children}</p>,
        h1: props => <h1 className="text-4xl font-bold mb-6 mt-8">{props.children}</h1>,
        h2: props => <h2 className="text-3xl font-semibold mb-5 mt-7">{props.children}</h2>,
        h3: props => <h3 className="text-2xl font-semibold mb-4 mt-6">{props.children}</h3>,
        h4: props => <h4 className="text-xl font-semibold mb-3 mt-5">{props.children}</h4>,
        ul: props => <ul className="list-disc list-inside my-4 ml-4">{props.children}</ul>,
        ol: props => <ol className="list-decimal list-inside my-4 ml-4">{props.children}</ol>,
        li: props => <li className="mb-1">{props.children}</li>,
        a: props => <a className="euclid-blue font-semibold hover:underline" {...props}>{props.children}</a>,
        blockquote: props => <blockquote className="border-l-4 pl-4 border-euclid-yellow italic my-4">{props.children}</blockquote>,
        ...components,
    };
}