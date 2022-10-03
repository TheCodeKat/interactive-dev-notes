import Image from "next/image";
import Link from "next/link";

export interface NoteCardProps {
  noteFrontMatter: any;
  noteId: any;
}

export default function NoteCard({ noteFrontMatter, noteId }: NoteCardProps) {
  return (
    <Link href={noteId}>
      <div className="p-2 shadow-md hover:scale-105 duration-300 ease-in-out hover:cursor-pointer hover:shadow-lg hover:shadow-froly/50 bg-fair-pink/25 rounded-lg flex flex-col items-center justify-center shadow-froly/50 m-2 h-40 w-40">
        {noteFrontMatter.cover && (
          <div className="mb-2">
            <Image
              src={noteFrontMatter.cover}
              width="100"
              height="100"
              alt={noteFrontMatter.title}
            />
          </div>
        )}
        <h3>{noteFrontMatter.title}</h3>
      </div>
    </Link>
  );
}
