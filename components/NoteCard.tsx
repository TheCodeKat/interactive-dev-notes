export default function NoteCard({ noteFrontMatter }){
    return (
        <div className="p-2 drop-shadow-lg">
            <span>{noteFrontMatter.title}</span>
        </div>
    )
}