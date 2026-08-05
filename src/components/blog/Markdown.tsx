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
          <h1 className="mt-10 scroll-mt-28 text-3xl font-bold tracking-tight text-white first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-10 scroll-mt-28 text-2xl font-semibold tracking-tight text-white">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 scroll-mt-28 text-xl font-semibold tracking-tight text-white">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mt-5 text-base leading-8 text-slate-200">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-200">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-5 list-decimal space-y-2 pl-6 text-slate-200">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-8 marker:text-emerald-400/80">{children}</li>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="font-medium text-emerald-400 underline decoration-emerald-400/30 underline-offset-4 transition hover:text-emerald-300 hover:decoration-emerald-300/60"
            {...(href?.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-white">{children}</strong>
        ),
        em: ({ children }) => <em className="italic text-slate-100">{children}</em>,
        blockquote: ({ children }) => (
          <blockquote className="mt-6 border-l-2 border-emerald-400/40 py-1 pl-5 text-slate-200 italic">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-10 border-white/10" />,
        code: ({ className, children }) => {
          const isBlock = Boolean(className?.includes("language-"));
          if (isBlock) {
            return (
              <code className="font-mono text-[0.9em] leading-relaxed text-slate-100">
                {children}
              </code>
            );
          }
          return (
            <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.875em] text-emerald-300">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="mt-6 overflow-x-auto rounded-xl bg-[#060914] p-4 text-sm">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
