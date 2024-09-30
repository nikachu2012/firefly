import { readdirSync, statSync } from "fs";
import { join } from "path";
import { baseConfig } from "../config";
import getPost from "./getPost";

export default async function getAllPost(): Promise<PostObj[]> {
    const dirList = readdirSync(baseConfig.postsFolder).filter((file) => {
        return statSync(join(baseConfig.postsFolder, file)).isDirectory();
    })

    let result: PostObj[] = [];

    for (const element of dirList) {
        const post: PostObj = await getPost(element);

        result.push(post);
    }

    return result;
}
