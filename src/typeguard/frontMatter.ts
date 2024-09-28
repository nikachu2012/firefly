export function frontMatterTypeGuard(obj: frontMatter): frontMatter {
    // frontmatter.title
    if (typeof obj.title !== "string")
        throw new Error(`Frontmatter Title is not string. (title: ${String(obj.title)})`)

    // description
    if (typeof obj.description !== "string" && typeof obj.description !== "undefined")
        throw new Error(`Frontmatter Description is not string. (description: ${String(obj.description)})`)

    // timestamp
    if (typeof obj.timestamp == "string" || typeof obj.timestamp === "number") {
        if (new Date(obj.timestamp).toString() === "Invalid Date")
            throw new Error(`Frontmatter Timestamp can't be parsed. (timestamp: ${String(obj.timestamp)})`)
    }
    else
        throw new Error(`Frontmatter Timestamp is not string or number. (timestamp: ${String(obj.timestamp)})`)

    // author
    if (typeof obj.author !== "string")
        throw new Error(`Frontmatter Author is not string. (author: ${String(obj.author)})`)

    // uuid
    if (typeof obj.uuid !== "string" && typeof obj.uuid !== "undefined")
        throw new Error(`Frontmatter UUID is not string. (uuid: ${String(obj.uuid)})`)

    return obj
}
