import remarkParse from 'remark-parse';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkExtractFrontmatter from 'remark-extract-frontmatter';
import { parse } from "yaml"
import { frontMatterTypeGuard } from '../typeguard/frontMatter';

export async function parsePost(postMarkdown: string): Promise<MarkdownObj> {
    const processed = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter, [{
            type: 'yaml',
            marker: '-',
            anywhere: false
        }])
        .use(remarkExtractFrontmatter, {
            yaml: parse,
            name: 'frontMatter'
        })
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(postMarkdown)

    const frontMatter = frontMatterTypeGuard(processed.data.frontMatter as frontMatter);

    return {
        html: String(processed), frontmatter: frontMatter
    }
}
