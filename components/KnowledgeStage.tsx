export function KnowledgeStage({ knowledgeStage }: { knowledgeStage: string }) {
  if (knowledgeStage === "solido") {
    return (
      <>
        <span className="uppercase">conocimiento sólido</span>
      </>
    );
  } else if (knowledgeStage === "aprendiendo") {
    return (
      <>
        <span className="uppercase">aún aprendiendo</span>
      </>
    );
  } else {
    return <></>;
  }
}
