import { readdirSync } from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import { join } from "path";
import { ParsedUrlQuery } from "querystring";
import { getParsedFileContentBySlug, renderMarkdown } from "../lib/Markdown";
import { MDXRemote } from "next-mdx-remote";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const NOTES_PATH = join(process.cwd(), process.env.notesMarkdownPath ?? "");

export interface InteractiveNoteProps extends ParsedUrlQuery {
  frontMatter: any;
  html: any;
}

export const getStaticPaths: GetStaticPaths<
  InteractiveNoteProps
> = async () => {
  const paths = readdirSync(NOTES_PATH)
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<InteractiveNoteProps> = async ({
  params,
}: {
  params: InteractiveNoteProps;
}) => {
  const notesMarkdownContent = getParsedFileContentBySlug(
    params.slug,
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
    suspense: true,
  });

export function InteractiveNote({ frontMatter, html }) {
  const router = useRouter();

  // Queremos mostrar el diagrama que corresponde con la ruta a la que accedió el usuario
  const Diagram = getDiagramComponent(router.asPath.slice(1));

  return (
    <>
      <div>
        <Diagram />
      </div>
      <div>
        <MDXRemote {...html} />
      </div>
    </>
  );
}

export default InteractiveNote;
