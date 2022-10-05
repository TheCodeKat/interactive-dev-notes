import Image from "next/image";
import Link from "next/link";
import { KnowledgeStage } from "./KnowledgeStage";
import { RelativeDate } from "./RelativeDate";
import TopicTag from "./TopicTag";

export interface NoteCardProps {
  noteFrontMatter: any;
  noteId: any;
}

export default function NoteCard({ noteFrontMatter, noteId }: NoteCardProps) {
  return (
    <Link href={noteId}>
      <div className="p-2 shadow-md hover:scale-105 duration-300 ease-in-out hover:cursor-pointer hover:shadow-lg hover:shadow-froly/50 rounded-lg flex flex-col items-center justify-center shadow-froly/50 m-2 h-40 w-40 border border-blush">
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
        <div>
          <h3 className="font-source-code-pro text-blush">
            {noteFrontMatter.title}
          </h3>
          <KnowledgeStage knowledgeStage={noteFrontMatter.knowledgeStage} />
          <RelativeDate date={noteFrontMatter.updateDate} />
        </div>

        {noteFrontMatter.topics.map((topic: string, i: any) => (
          <TopicTag topicName={topic} key={i} />
        ))}
      </div>
    </Link>
  );
}
