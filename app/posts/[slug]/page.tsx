import { parseArticleMarkdown } from "@/src/article";
import { baseConfig } from "@/src/config";
import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join } from "path";
import { uuidToPath } from "@/src/post/uuidToPath";
import { Metadata } from "next";

export const dynamicParams = false;
export const dynamic = 'force-static';

const EXPORT_PATH = join(baseConfig.tempFolder, "uuidToPath.json");


export async function generateStaticParams() {
    const dirList = readdirSync(baseConfig.postsFolder).filter((file) => {
        return statSync(join(baseConfig.postsFolder, file)).isDirectory();
    })
    if (baseConfig.useUuid) {
        return Object.keys(uuidToPath).map((postUuid: string) => ({
            slug: postUuid
        }))
    }
    else {
        return dirList.map((postName: string) => ({
            slug: postName
        }))
    }
}

export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
    const postHTML = await getPost(uuidToPath[params.slug]) // get markdown

    return {
        title: `${postHTML.frontMatter.title}`,
        description: `${postHTML.frontMatter.description ? postHTML.frontMatter.description : ""}`,
    };
}

export default async function Post({ params }: { params: { slug: string } }) {
    if (baseConfig.useUuid) {
        const uuidToPath: { [key: string]: string } = JSON.parse(readFileSync(EXPORT_PATH, { encoding: "utf-8" }));
        const markdown = getMarkdownArticle(uuidToPath[params.slug]) // get markdown
        const articleHTML = await parseArticleMarkdown(markdown); // generate html
        const articleJSX = parseJSX(articleHTML.html, uuidToPath[params.slug]); // parse html

        return <>
            {articleHTML.frontmatter.title}<br />
            {articleJSX}
            {JSON.stringify(articleHTML.frontmatter, null, 2)}<br />
        </>;
    }
    else {
        const markdown = getMarkdownArticle(params.slug)
        const articleHTML = await parseArticleMarkdown(markdown);
        const articleJSX = parseJSX(articleHTML.html, params.slug);

        return <>
            {articleHTML.frontmatter.title}<br />
            {articleJSX}
            {JSON.stringify(articleHTML.frontmatter, null, 2)}<br />
        </>;
    }
}

