import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_ROOT = path.join(process.cwd(), "blog");
const TOPICS_PATH = path.join(BLOG_ROOT, "topics.json");

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

type TopicDefinition = {
  slug: string;
  title: string;
  description?: string;
};

type TopicsFile = {
  topics: TopicDefinition[];
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

function readTopicDefinitions(): TopicDefinition[] {
  if (!fs.existsSync(TOPICS_PATH)) return [];

  try {
    const parsed = JSON.parse(fs.readFileSync(TOPICS_PATH, "utf8")) as TopicsFile;
    if (!Array.isArray(parsed.topics)) return [];

    return parsed.topics.filter(
      (topic): topic is TopicDefinition =>
        typeof topic?.slug === "string" && topic.slug.trim().length > 0,
    );
  } catch {
    return [];
  }
}

function getTopicDefinition(topicSlug: string): TopicDefinition | undefined {
  return readTopicDefinitions().find((topic) => topic.slug === topicSlug);
}

function topicTitle(topicSlug: string, definition?: TopicDefinition) {
  return definition?.title?.trim() || titleFromSlug(topicSlug);
}

function parsePostFile(
  topicSlug: string,
  topicLabel: string,
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
    topicTitle: topicLabel,
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
  return readTopicDefinitions().map((definition) => {
    const slug = definition.slug.trim();
    const posts = getPostsByTopic(slug);
    return {
      slug,
      title: topicTitle(slug, definition),
      description: definition.description?.trim() || "",
      postCount: posts.length,
    };
  });
}

export function getTopicBySlug(topicSlug: string): BlogTopic | undefined {
  return getTopics().find((topic) => topic.slug === topicSlug);
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const definition of readTopicDefinitions()) {
    const topicSlug = definition.slug.trim();
    const topicDir = path.join(BLOG_ROOT, topicSlug);
    if (!fs.existsSync(topicDir)) continue;

    const label = topicTitle(topicSlug, definition);
    for (const fileName of fs.readdirSync(topicDir)) {
      const post = parsePostFile(topicSlug, label, fileName);
      if (post) posts.push(post);
    }
  }

  return posts.sort(comparePostsByDateDesc);
}

export function getPostsByTopic(topicSlug: string): BlogPost[] {
  const definition = getTopicDefinition(topicSlug);
  if (!definition) return [];

  const topicDir = path.join(BLOG_ROOT, topicSlug);
  if (!fs.existsSync(topicDir)) return [];

  const label = topicTitle(topicSlug, definition);

  return fs
    .readdirSync(topicDir)
    .map((fileName) => parsePostFile(topicSlug, label, fileName))
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
