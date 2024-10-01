import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path/posix";
import { baseConfig } from "../config";
import { parsePost } from "./parsePost";

let uuidToPath: { [key: string]: string } = {};
let cached: boolean = false;

export default async function getUuidToPath(): Promise<{ [key: string]: string }> {
    if (cached) {
        return uuidToPath
    }
    else {
        const dirList = readdirSync(baseConfig.postsFolder).filter((file) => {
            return statSync(join(baseConfig.postsFolder, file)).isDirectory();
        })

        // generate uuidToPath table and uuid list
        for (const postName of dirList) {
            const markdown = readFileSync(join(baseConfig.postsFolder, postName, "index.md"), { encoding: "utf-8" });
            const post = await parsePost(markdown)

            // undefined or "" uuid detect
            if (post.frontMatter.uuid === undefined || post.frontMatter.uuid == "") {
                throw new Error(`UUID is not defined. on ${postName}`)
            }

            // duplicate uuid detect
            if (uuidToPath[post.frontMatter.uuid] === undefined) {
                uuidToPath[post.frontMatter.uuid] = postName;
            }
            else {
                if (uuidToPath[post.frontMatter.uuid] !== postName) {
                    throw new Error(`Duplicate UUID. ("${uuidToPath[post.frontMatter.uuid]}" and "${postName}")`);
                }
            }
        }
        cached = true;

        return uuidToPath
    }
}
