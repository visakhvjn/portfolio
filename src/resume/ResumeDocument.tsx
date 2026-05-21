import {
  Document,
  Image,
  Link,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";
import type { ResumeBullet, ResumeContent } from "./types";
import { resumeStyles as s } from "./styles";

type Props = { content: ResumeContent };

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.sectionBody}>{children}</View>
    </View>
  );
}

function LinkedProjectName({ name, url }: { name: string; url?: string }) {
  if (url) {
    return <Link src={url}>{name}</Link>;
  }
  return <>{name}</>;
}

function BulletItem({ children }: { children: ReactNode }) {
  return (
    <View style={s.bulletRow}>
      <Text style={s.bulletMarker}>•</Text>
      <Text style={s.bulletText}>{children}</Text>
    </View>
  );
}

function ExperienceBullet({ bullet }: { bullet: ResumeBullet }) {
  if (!bullet.link) {
    return <BulletItem>{bullet.text}</BulletItem>;
  }

  const { start, name, url } = bullet.link;
  const before = bullet.text.slice(0, start);
  const after = bullet.text.slice(start + name.length);

  return (
    <BulletItem>
      {before}
      <Link src={url}>{name}</Link>
      {after}
    </BulletItem>
  );
}

function linkDisplayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function chunkPairs<T>(items: T[]): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return rows;
}

function HeaderLinkGrid({
  links,
}: {
  links: { label: string; url: string }[];
}) {
  return (
    <View style={s.linkGrid}>
      {chunkPairs(links).map((row, rowIndex) => (
        <View key={rowIndex} style={s.linkGridRow}>
          {row.map((link) => (
            <View key={link.url} style={s.linkCell}>
              <Text style={s.linkCellText}>
                <Text style={s.linkLabel}>{link.label}: </Text>
                <Link src={link.url}>{linkDisplayUrl(link.url)}</Link>
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

export function ResumeDocument({ content }: Props) {
  const portfolioHost = content.portfolioUrl.replace(/^https?:\/\//, "");
  const headerLinks = [
    { label: "Portfolio", url: content.portfolioUrl },
    ...content.links,
  ];

  return (
    <Document title={`${content.name} — Resume`} author={content.name}>
      <Page size="A4" style={s.page} wrap>
        <View style={s.headerRow}>
          {content.profileImagePath ? (
            <Image src={content.profileImagePath} style={s.avatar} />
          ) : null}
          <View style={s.headerText}>
            <Text style={s.name}>{content.name}</Text>
            <Text style={s.titleLine}>{content.title}</Text>
            <Text style={s.contactLine}>
              {content.email} | {content.phone}
            </Text>
            <Text style={s.bio}>{content.bio}</Text>
            <HeaderLinkGrid links={headerLinks} />
          </View>
        </View>

        <Section title="SKILLS">
          {content.skillCategories.map((cat, i) => (
            <Text key={cat.title} style={s.numberedBlock}>
              {i + 1}. {cat.title} — {cat.items}
            </Text>
          ))}
        </Section>

        <Section title="WORK EXPERIENCE (8+ years)">
          {content.workExperience.map((job, i) => (
            <View key={`${job.company}-${i}`} style={s.experienceJobBlock}>
              <Text style={s.experienceCompanyLine}>
                <Text style={s.experienceCompanyName}>{job.company}</Text>,{" "}
                {job.location} ({job.period})
              </Text>
              <Text style={s.experienceRoleLine}>{job.role}</Text>
              {job.bullets.map((bullet) => (
                <ExperienceBullet key={bullet.text.slice(0, 48)} bullet={bullet} />
              ))}
            </View>
          ))}
        </Section>

        <Section title="EDUCATION">
          {content.education.map((e, i) => (
            <Text key={e.line} style={s.numberedBlock}>
              {i + 1}. {e.line}
            </Text>
          ))}
        </Section>

        <Section title="PROJECTS">
          {content.projects.map((project, i) => (
            <Text key={project.name} style={s.numberedBlock}>
              {i + 1}. <LinkedProjectName name={project.name} url={project.url} />
              {" — "}
              {project.description}
            </Text>
          ))}
          <Text style={s.numberedBlock}>
            {content.projects.length + 1}. More projects at{" "}
            <Link src={content.portfolioUrl}>{portfolioHost}</Link>
          </Text>
        </Section>

        <Section title="ACHIEVEMENTS">
          {content.achievements.map((item, i) => (
            <Text key={item} style={s.numberedBlock}>
              {i + 1}. {item}
            </Text>
          ))}
        </Section>

        <Section title="LANGUAGES">
          <Text style={s.muted}>{content.languages}.</Text>
        </Section>

        <Section title="INTERESTS">
          <Text style={s.muted}>{content.interests}.</Text>
        </Section>
      </Page>
    </Document>
  );
}
