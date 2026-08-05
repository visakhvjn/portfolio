import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_ROOT = path.join(process.cwd(), "blog");

export type BlogTopic = {
  slug: string;
  title: string;
  description: string;
  postCount: number;
};

export type BlogPostMeta = {
  slug: string;
  topic: string;
  topicTitle: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  draft: boolean;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

type TopicConfig = {
  title?: string;
  description?: string;
};

type PostFrontmatter = {
  title?: string;
  description?: string;
  date?: string | Date;
  draft?: boolean;
};

function normalizeDate(value: string | Date | undefined): string {
  if (!value) return "";
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string") return value.trim();
  return String(value);
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function readingMinutesFromContent(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function ensureBlogRoot() {
  if (!fs.existsSync(BLOG_ROOT)) {
    fs.mkdirSync(BLOG_ROOT, { recursive: true });
  }
}

function readTopicConfig(topicSlug: string): TopicConfig {
  const configPath = path.join(BLOG_ROOT, topicSlug, "topic.json");
  if (!fs.existsSync(configPath)) return {};

  try {
    return JSON.parse(fs.readFileSync(configPath, "utf8")) as TopicConfig;
  } catch {
    return {};
  }
}

function listTopicDirs(): string[] {
  ensureBlogRoot();
  return fs
    .readdirSync(BLOG_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function parsePostFile(
  topicSlug: string,
  topicTitle: string,
  fileName: string,
): BlogPost | null {
  if (!fileName.endsWith(".md")) return null;

  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(BLOG_ROOT, topicSlug, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  if (frontmatter.draft === true) return null;

  const title =
    typeof frontmatter.title === "string"
      ? frontmatter.title.trim()
      : titleFromSlug(slug);
  const description =
    typeof frontmatter.description === "string"
      ? frontmatter.description.trim()
      : "";
  const date = normalizeDate(frontmatter.date);

  return {
    slug,
    topic: topicSlug,
    topicTitle,
    title,
    description,
    date,
    readingMinutes: readingMinutesFromContent(content),
    draft: false,
    content,
  };
}

function comparePostsByDateDesc(a: BlogPostMeta, b: BlogPostMeta) {
  if (a.date && b.date && a.date !== b.date) {
    return a.date < b.date ? 1 : -1;
  }
  if (a.date && !b.date) return -1;
  if (!a.date && b.date) return 1;
  return a.title.localeCompare(b.title);
}

export function getTopics(): BlogTopic[] {
  return listTopicDirs().map((slug) => {
    const config = readTopicConfig(slug);
    const posts = getPostsByTopic(slug);
    return {
      slug,
      title: config.title?.trim() || titleFromSlug(slug),
      description: config.description?.trim() || "",
      postCount: posts.length,
    };
  });
}

export function getTopicBySlug(topicSlug: string): BlogTopic | undefined {
  return getTopics().find((topic) => topic.slug === topicSlug);
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const topicSlug of listTopicDirs()) {
    const config = readTopicConfig(topicSlug);
    const topicTitle = config.title?.trim() || titleFromSlug(topicSlug);
    const topicDir = path.join(BLOG_ROOT, topicSlug);

    for (const fileName of fs.readdirSync(topicDir)) {
      const post = parsePostFile(topicSlug, topicTitle, fileName);
      if (post) posts.push(post);
    }
  }

  return posts.sort(comparePostsByDateDesc);
}

export function getPostsByTopic(topicSlug: string): BlogPost[] {
  const topicDir = path.join(BLOG_ROOT, topicSlug);
  if (!fs.existsSync(topicDir)) return [];

  const config = readTopicConfig(topicSlug);
  const topicTitle = config.title?.trim() || titleFromSlug(topicSlug);

  return fs
    .readdirSync(topicDir)
    .map((fileName) => parsePostFile(topicSlug, topicTitle, fileName))
    .filter((post): post is BlogPost => post !== null)
    .sort(comparePostsByDateDesc);
}

export function getPost(
  topicSlug: string,
  postSlug: string,
): BlogPost | undefined {
  return getPostsByTopic(topicSlug).find((post) => post.slug === postSlug);
}

export function getAllPostParams() {
  return getAllPosts().map((post) => ({
    topic: post.topic,
    slug: post.slug,
  }));
}

export function formatPostDate(date: string) {
  if (!date) return null;

  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
