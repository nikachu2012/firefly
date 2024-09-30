import "./github-markdown.css"
import "./fix-list.css"
import "remark-github-alerts/styles/github-colors-light.css";
import "remark-github-alerts/styles/github-base.css";


export default function PostTheme({ jsx, html, frontMatter }: PostObj) {
    return <>
        <main className="w-4/6 m-auto">
            <div className="my-4">
                <h1 className="text-4xl font-bold mb-2">{frontMatter.title}</h1>
                {new Date(frontMatter.timestamp).toString()} / {frontMatter.author}
            </div>
            <div className="markdown-body">{jsx}</div>
        </main>
    </>
}
