export interface TopicTagProps {
  topicName: string;
}

export default function TopicTag({ topicName }: TopicTagProps) {
  return <div>{topicName}</div>;
}
