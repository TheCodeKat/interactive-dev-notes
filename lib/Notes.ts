import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "notesMarkdownPath");

export function getSortedNotesData() {
  // Leemos los nombres de todos los archivos dentro de /notes
  const fileNames = fs.readdirSync(POSTS_PATH);
  const allPostsData = fileNames.map((fileName) => {
    // Le quitamos la extensión al archivo .mdx para obtener el id
    const id = fileName.replace(/\.mdx$/, "");

    // Leemos el contenido markdown del archivo como una string
    const fullPath = path.join(POSTS_PATH, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Usamos gray-matter para obtener los metadatos de la nota
    const matterResult = matter(fileContents);

    // Regresamos los metadatos y el id
    return {
      id,
      ...matterResult.data,
    };
  });

  // Ordenamos las notas por fecha
  return allPostsData.sort(({ creationDate: a }, { creationDate: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
