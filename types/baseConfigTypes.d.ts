type BaseConfig = {
    useUuid: boolean

    tempFolder: string
    postsFolder: string
    frontmatter: {
        type: "yaml" | "toml"
        marker: string
    }
}
