import { parseArticleMarkdown } from "@/src/article";
import { baseConfig } from "@/src/config";
import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join } from "path";
import { parseJSX } from "@/src/JSXconverter";
import getMarkdownArticle from "@/src/getMarkdownArticle";

export const dynamicParams = false;
export const dynamic = 'force-static';

const EXPORT_PATH = join(baseConfig.tempFolder, "uuidToPath.json");


export async function generateStaticParams() {
    const dirList = readdirSync(baseConfig.postsFolder).filter((file) => {
        return statSync(join(baseConfig.postsFolder, file)).isDirectory();
    })

    if (baseConfig.useUuid) {
        let uuidToPath: { [key: string]: string } = {};
        let result: Array<string> = [];

        for (const postName of dirList) {
            const markdown = readFileSync(join(baseConfig.postsFolder, postName, "index.md"), { encoding: "utf-8" });
            const articleHTML = await parseArticleMarkdown(markdown)
            if (uuidToPath[articleHTML.frontmatter.uuid] === undefined) {
                uuidToPath[articleHTML.frontmatter.uuid] = postName;
            }
            else {
                throw new Error(`Duplicate UUID. ("${uuidToPath[articleHTML.frontmatter.uuid]}" and "${postName}")`)
            }

            writeFileSync(EXPORT_PATH, JSON.stringify(uuidToPath, null, 4));

            result.push(articleHTML.frontmatter.uuid);
        }

        return result.map((postUuid: string) => ({
            slug: postUuid
        }))
    }
    else {
        return dirList.map((postName: string) => ({
            slug: postName
        }))
    }
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

