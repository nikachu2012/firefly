import { readFileSync } from "fs";

export const config: BlogConfig = JSON.parse(readFileSync("config.json", { encoding: "utf-8" }));

export function getAuthor(id: string): Author[] {
    return config.author.filter((value) => {
        return value.id == id;
    })
}
