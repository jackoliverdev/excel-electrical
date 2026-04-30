import { Fragment, type ReactNode } from "react";

type LegalMarkdownProps = {
  markdown: string;
};

export function LegalMarkdown({ markdown }: LegalMarkdownProps) {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={`h3-${key++}`} className="text-lg font-semibold text-foreground">
          {line.slice(4)}
        </h3>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${key++}`} className="text-2xl font-bold tracking-tight text-brand-primary">
          {line.slice(3)}
        </h2>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(lines[i].trim().slice(2).trim());
        i += 1;
      }

      blocks.push(
        <ul key={`ul-${key++}`} className="list-disc space-y-2 pl-5 text-[var(--text-muted)]">
          {listItems.map((item) => (
            <li key={`li-${key++}`}>{item}</li>
          ))}
        </ul>,
      );
      continue;
    }

    const paragraphLines: string[] = [];
    while (i < lines.length) {
      const nextLine = lines[i].trim();
      if (!nextLine || nextLine.startsWith("## ") || nextLine.startsWith("### ") || nextLine.startsWith("- ")) {
        break;
      }
      paragraphLines.push(nextLine);
      i += 1;
    }

    if (paragraphLines.length > 0) {
      blocks.push(
        <p key={`p-${key++}`} className="leading-8 text-[var(--text-muted)]">
          {paragraphLines.join(" ")}
        </p>,
      );
    }
  }

  return <Fragment>{blocks}</Fragment>;
}
