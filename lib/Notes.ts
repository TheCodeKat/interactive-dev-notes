import fs from "fs";
import path, { join } from "path";
import matter from "gray-matter";

const NOTES_PATH = join(process.cwd(), process.env.notesMarkdownPath ?? "");

export function getSortedNotesData() {
  // Leemos los nombres de todos los archivos dentro de /notes
  const fileNames = fs.readdirSync(NOTES_PATH);
  const allPostsData: any[] = fileNames.map((fileName) => {
    // Le quitamos la extensión al archivo .mdx para obtener el id
    const id = fileName.replace(/\.mdx$/, "");

    // Leemos el contenido markdown del archivo como una string
    const fullPath = path.join(NOTES_PATH, fileName);

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
