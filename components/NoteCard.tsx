import Image from "next/image";

export default function NoteCard({ noteFrontMatter }) {
  return (
    <div className="p-2 shadow-md hover:scale-105 duration-300 ease-in-out hover:cursor-pointer hover:shadow-lg hover:shadow-red-500/50 bg-red-50 rounded-lg flex flex-col items-center justify-center shadow-red-400/50 m-2 h-40 w-40">
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
