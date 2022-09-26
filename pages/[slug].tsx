import { readdirSync } from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import { join } from "path";
import { ParsedUrlQuery } from "querystring";
import { getParsedFileContentBySlug, renderMarkdown } from "../lib/Markdown";
import { MDXRemote } from 'next-mdx-remote'

const NOTES_PATH = join(process.cwd(), process.env.notesMarkdownPath ?? "");

export interface InteractiveNoteProps extends ParsedUrlQuery{
    frontMatter: any
    html: any
  }

export const getStaticPaths: GetStaticPaths<InteractiveNoteProps> = async () => {
  const paths = readdirSync(NOTES_PATH)
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<InteractiveNoteProps> = async({params}: {params: InteractiveNoteProps})  => {
    const notesMarkdownContent = getParsedFileContentBySlug(params.slug, NOTES_PATH);

  const renderHTML = await renderMarkdown(notesMarkdownContent.content);

  return {
    props: {
      frontMatter: notesMarkdownContent.frontMatter,
      html: renderHTML
    }
  }
}

export function InteractiveNote({frontMatter, html}) {
  return (
    <>
      <div>The SVG diagrams go here</div>
      <div>
      <MDXRemote {...html}/>
      </div>
    </>
  );
}

export default InteractiveNote;