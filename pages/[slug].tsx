import { readdirSync } from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import { join } from "path";
import { ParsedUrlQuery } from "querystring";
import { getParsedFileContentBySlug, renderMarkdown } from "../lib/Markdown";
import { MDXRemote } from "next-mdx-remote";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const NOTES_PATH = join(process.cwd(), process.env.notesMarkdownPath ?? "");
const DIAGRAMS_PATH = join(process.cwd(), process.env.diagramsComponentsPath ?? "");

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

// get the SVG Diagram Component
/*const Diagram = dynamic(() => import('../components/header'), {
  suspense: true,
})*/

const getDiagramComponent = (diagramName: string) => dynamic(() => import(`../diagrams/${diagramName}`), {
  suspense: true
});

export function InteractiveNote({ frontMatter, html }) {
  const router = useRouter();

  const Diagram = getDiagramComponent(router.asPath.slice(1))

  return (
    <>
    <span>{router.asPath}</span>
      <div>
        <Diagram/>
      </div>
      <div>
        <MDXRemote {...html} />
      </div>
    </>
  );
}

export default InteractiveNote;
