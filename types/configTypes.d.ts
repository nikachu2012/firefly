type Social = {
    service: string
    url: string
}

type Author = {
    id: string
    name: string
    username: string
    social?: Social[]
}

type BlogConfig = {
    title: string
    description: string

    category: string[]
    author: Author[]
}
