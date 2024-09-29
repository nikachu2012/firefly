import { readFileSync } from "fs";
import { join } from "path/posix";
import { baseConfig } from "../config";
import { parsePost } from "./parsePost";
import { parseJSX } from "./parseJSX";

export let cache: { [key: string]: PostObj } = {}

export default async function getPost(filePath: string): Promise<PostObj> {
    const targetFilePath = join(baseConfig.postsFolder, filePath, "index.md");

    if (cache[filePath] !== undefined) {
        // cached
        console.log(`Note: ${filePath} is using cache.`)

        return cache[filePath]
    }

    // not cached
    console.log(`Note: ${filePath} is not using cache.`)
    const markdown = readFileSync(targetFilePath, { encoding: "utf-8" }); // get markdown
    const { html, frontMatter } = await parsePost(markdown); // generate html
    const postJSX = parseJSX(html, filePath); // parse JSX

    const newObj: PostObj = { html: html, jsx: postJSX, frontMatter: frontMatter }
    cache[filePath] = newObj;

    return newObj
}
