import Image from "next/image";

export default function NoteCard({ noteFrontMatter }) {
  return (
    <div className="p-2 drop-shadow-lg bg-red-50 rounded-lg flex flex-col items-center justify-center shadow-red-400/50">
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
  );
}
