export interface TopicTagProps {
  topicName: string;
}

export default function TopicTag({ topicName }: TopicTagProps) {
  return <div className="p-1 rounded-md bg bg-sky-100 w-fit">{topicName}</div>;
}
