export default function NoteCard({ noteFrontMatter }) {
  return (
    <div className="p-2 drop-shadow-lg bg-red-50 rounded-lg flex items-center justify-center shadow-red-400/50">
      <span>{noteFrontMatter.title}</span>
    </div>
  );
}
