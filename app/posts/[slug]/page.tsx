import { baseConfig } from "@/src/config";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import getPost from "@/src/post/getPost";
import { uuidToPath } from "@/src/post/uuidToPath";
import { Metadata } from "next";
import PostTheme from "@/theme/post";

import "@/app/highlight.css"
export const dynamicParams = false;
export const dynamic = 'force-static';

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
    let postHTML: PostObj;

    if (baseConfig.useUuid) {
        postHTML = await getPost(uuidToPath[params.slug]) // get markdown
    }
    else {
        postHTML = await getPost(params.slug)
    }

    return PostTheme(postHTML);
}

