import path from "path";
import fs from "fs";
import Landing from "@/components/landing";

export default async function Home() {

  const directory = path.resolve('./app/posts');
  const fileNames = fs.readdirSync(directory);
  const slugs = fileNames
      .filter((fileName: string) => fileName.endsWith('mdx'))
      .map((fileName) => fileName.replace('.mdx', ''));
  const metas = await Promise.all(slugs.map((slug) => getPostMeta(slug)));

  return (
      <div>
          <Landing slugs={slugs} metas={metas}/>
      </div>
  );
}

async function getPostMeta(post: string) {
    const mod = await import(`./posts/${post}.mdx`);
    return mod.meta;
}