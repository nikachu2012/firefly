import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { readdirSync, readFileSync, statSync } from "fs";
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { join } from 'path';

export const articleFolders = readdirSync("article");
export let article: Article[] = [];

(async () => {
    for (const element of articleFolders) {
        if (!statSync(join("article", element)).isDirectory()) {
            continue;
        }

        const markdown = readFileSync(join("article", element, "index.md"), { encoding: "utf-8" });
        const articleHTML = await parseArticleMarkdown(markdown)

        console.log(articleHTML)

        article.push({
            title: "",
            description: "",
            id: "",
            uuid: "",
            author: [{
                id: "",
                name: "",
                username: "",
            }],
            markdown: markdown,
            html: articleHTML
        })
    }
})();


async function parseArticleMarkdown(articleMarkdown: string): Promise<string> {
    const processed = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(articleMarkdown)

    return String(processed)
}
