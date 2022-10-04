import { readdirSync } from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import { join } from "path";
import { ParsedUrlQuery } from "querystring";
import { getParsedFileContentBySlug, renderMarkdown } from "../lib/Markdown";
import { MDXRemote } from "next-mdx-remote";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import TopicTag from "../components/TopicTag";

const NOTES_PATH = join(process.cwd(), process.env.notesMarkdownPath ?? "");

export interface InteractiveNoteProps {
  frontMatter: any;
  html: any;
}

export interface InteractiveNoteParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<InteractiveNoteParams> =
  async () => {
    const paths = readdirSync(NOTES_PATH)
      .map((path) => path.replace(/\.mdx?$/, ""))
      .map((slug) => ({ params: { slug } }));
    return {
      paths,
      fallback: false,
    };
  };

export const getStaticProps: GetStaticProps<
  InteractiveNoteProps,
  InteractiveNoteParams
> = async ({ params }) => {
  const notesMarkdownContent = getParsedFileContentBySlug(
    params?.slug?.toString() ?? "",
    NOTES_PATH
  );

  const renderHTML = await renderMarkdown(notesMarkdownContent.content);

  return {
    props: {
      frontMatter: notesMarkdownContent.frontMatter,
      html: renderHTML,
    },
  };
};

// Esta función devolverá un componente que contiene un diagrama SVG interactivo,
// de acuerdo a la ruta, o nombre del diagrama, que se proporcione
const getDiagramComponent = (diagramName: string) =>
  dynamic(() => import(`../diagrams/${diagramName}`), {
    ssr: false,
  });

const mdxElements = {
  ProblemStatement: dynamic(async () => {
    return await import("../components/ProblemStatement");
  }),
};

export function InteractiveNote({ frontMatter, html }: InteractiveNoteProps) {
  const router = useRouter();

  // Queremos mostrar el diagrama que corresponde con la ruta a la que accedió el usuario
  const Diagram = getDiagramComponent(router.asPath.slice(1));

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <div className="flex">
        <div className="w-6/12">
          <Diagram />
        </div>
        <div className="w-6/12 p-4">
          <h1>{frontMatter.title}</h1>
          {frontMatter.topics.map((topic: string, i: any) => (
            <TopicTag topicName={topic} key={i} />
          ))}
          <MDXRemote {...html} components={mdxElements} />
        </div>
      </div>
    </>
  );
}

export default InteractiveNote;
