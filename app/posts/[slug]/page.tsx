import { baseConfig } from "@/src/config";
import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join } from "path";
import { parseJSX } from "@/src/post/parseJSX";
import getPost from "@/src/post/getPost";
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
    let postHTML: PostObj;

    if (baseConfig.useUuid) {
        postHTML = await getPost(uuidToPath[params.slug]) // get markdown
    }
    else {
        postHTML = await getPost(params.slug)
    }

    return <>
        {postHTML.frontMatter.title}<br />
        {postJSX}
    </>;
}

