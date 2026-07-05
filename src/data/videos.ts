export type Video = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  watchUrl: string;
  thumbnailUrl: string;
};

export const videos: Video[] = [
  {
    id: "qr-codes-chatgpt-mcp",
    title: "Generate Dynamic QR Codes with ChatGPT MCP",
    description:
      "Create, manage, and track dynamic QR codes from ChatGPT via an MCP server — generate codes for any URL and update destinations without leaving the chat.",
    youtubeId: "8g_JJXtwjBE",
    watchUrl: "https://www.youtube.com/watch?v=8g_JJXtwjBE",
    thumbnailUrl: "https://i.ytimg.com/vi/8g_JJXtwjBE/hqdefault.jpg",
  },
  {
    id: "team-document-qa-hub",
    title: "Build a Team Document Q&A Hub | OpenAI",
    description:
      "Turn PDFs and office documents into an AI-powered knowledge base. A walkthrough of building team document search and Q&A with OpenAI.",
    youtubeId: "ZXug0hG7apM",
    watchUrl: "https://www.youtube.com/watch?v=ZXug0hG7apM",
    thumbnailUrl: "https://i.ytimg.com/vi/ZXug0hG7apM/hqdefault.jpg",
  },
  {
    id: "dumpd-mcp-posting",
    title: "Posting to Dumpd using Model Context Protocol (MCP)",
    description:
      "Post directly to Dumpd from Claude using MCP — watch a blog post get created and published seamlessly from an AI assistant workflow.",
    youtubeId: "frKbXz1vMRA",
    watchUrl: "https://www.youtube.com/watch?v=frKbXz1vMRA",
    thumbnailUrl: "https://i.ytimg.com/vi/frKbXz1vMRA/hqdefault.jpg",
  },
];

export function getYouTubeEmbedUrl(video: Video): string {
  return `https://www.youtube.com/embed/${video.youtubeId}?rel=0`;
}
