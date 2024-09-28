import { readFileSync } from "fs";
import { join } from "path";
import { baseConfig } from "../config";


export default function getMarkdownArticle(filePath: string): string {
    return readFileSync(join(baseConfig.postsFolder, filePath, "index.md"), { encoding: "utf-8" });
}
