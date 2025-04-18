import dynamic from 'next/dynamic';
import { Metadata, ResolvingMetadata } from 'next';
import FadeInPost from "@/components/fade-in-post";

export default async function Page({ params }: { params: { post: string } }) {
    const Content = await getPostData(params.post);
    const meta = await getPostMeta(params.post);
    return (
        <div className="container mx-auto px-4 py-8">
            <meta property="og:title" content={meta.title} />
            <meta property="og:image" content={meta.thumbnail} />
            <FadeInPost>
              {meta.unstyled ? (
                <Content />
              ) : (
                <div className="max-w-2xl mx-auto">
                  <Content />
                </div>
              )}
            </FadeInPost>
        </div>
    );
}

async function getPostData(post: string)
{
    return dynamic(() => import(`../${post}.mdx`));
}

async function getPostMeta(post: string) {
    const mod = await import(`../${post}.mdx`);
    return mod.meta;
}

export async function generateMetadata({ params }: { params: { post: string } }, parent: ResolvingMetadata): Promise<Metadata> {
    const meta = await getPostMeta(params.post)
    return {
        openGraph: {
            type: 'website',
            title: meta.title,
            description: meta.description,
            images: [meta.thumbnail],
        },
        twitter: {
            card: 'summary_large_image',
        },
    };
}