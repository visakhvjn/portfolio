import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  content: string;
};

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-12 scroll-mt-28 font-serif text-3xl font-medium tracking-tight text-ink first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-12 scroll-mt-28 font-serif text-2xl font-medium tracking-tight text-ink first:mt-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-10 scroll-mt-28 font-serif text-xl font-medium tracking-tight text-ink first:mt-0">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mt-6 text-[1.0625rem] leading-loose text-ink-soft first:mt-0">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="mt-6 list-disc space-y-2 pl-6 text-[1.0625rem] text-ink-soft">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-6 list-decimal space-y-2 pl-6 text-[1.0625rem] text-ink-soft">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-loose marker:text-faint">{children}</li>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="font-medium text-accent-strong underline decoration-accent/40 underline-offset-4 transition hover:text-ink hover:decoration-ink/40"
            {...(href?.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-ink">{children}</strong>
        ),
        em: ({ children }) => <em className="italic text-ink">{children}</em>,
        blockquote: ({ children }) => (
          <blockquote className="mt-8 border-l-2 border-accent py-1 pl-5 font-serif text-lg italic text-ink-soft">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-12 border-line" />,
        code: ({ className, children }) => {
          const isBlock = Boolean(className?.includes("language-"));
          if (isBlock) {
            return (
              <code className="font-mono text-[0.9em] leading-relaxed text-ink">
                {children}
              </code>
            );
          }
          return (
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-[0.875em] text-accent-strong">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="mt-8 overflow-x-auto rounded-xl border border-line bg-surface p-4 text-sm text-ink [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-ink">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
