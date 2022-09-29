export default function NoteCard({ noteFrontMatter }){
    return (
        <div>
            <span>{noteFrontMatter.title}</span>
        </div>
    )
}