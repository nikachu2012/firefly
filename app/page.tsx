import { baseConfig, config } from "@/src/config";
import getAllPost from "@/src/post/getAllPost";
import Link from "next/link";
import { join } from "path/posix";

export default async function Home() {
    return (
        <>
            <h1>{config.title}</h1>
            <ol className="list-disc list-inside ml-5">
                {(await getAllPost()).map((e) => {
                    return <>
                        <li><Link href={join(baseConfig.postsFolder, baseConfig.useUuid && e.frontMatter.uuid !== undefined ? e.frontMatter.uuid : e.filePath)}>{e.frontMatter.title}</Link></li>
                    </>
                })}
            </ol>
        </>
    );
}
