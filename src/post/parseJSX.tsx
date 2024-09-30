import { HTMLReactParserOptions } from "html-react-parser";
import Image from "next/image";
import { join } from "path/posix";
import parse from "html-react-parser"

export function parseJSX(html: string, articlePath: string) {
    const option: HTMLReactParserOptions = {
        replace(domNode) {
            if (domNode.type == "tag") {
                if (domNode.name == "img") {
                    return <Image
                        src={"/" + join("assets", articlePath, domNode.attribs.src)}
                        alt={domNode.attribs.alt ? domNode.attribs.alt : "Image"}
                        width={500}
                        height={500}
                    />
                }
            }
            return domNode
        },
    }

    const articleJSX = parse(html, option);

    return articleJSX
}


