import { article } from "@/src/article";
import { config } from "@/src/config";

export default function Home() {
  return (
    <>
      <h1>{config.title}</h1>

      <pre>{JSON.stringify(article, null, 2)}</pre>
    </>
  );
}
