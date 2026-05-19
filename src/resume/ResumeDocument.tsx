import {
  Document,
  Image,
  Link,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";
import type { ResumeContent } from "./types";
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

function NumberedItem({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <View style={s.bulletRow}>
      <Text style={s.bulletMarker}>{index}.</Text>
      <Text style={s.bulletText}>{children}</Text>
    </View>
  );
}

function ProductBullet({
  index,
  line,
}: {
  index: number;
  line: ResumeContent["workExperience"][0]["products"][0];
}) {
  return (
    <NumberedItem index={index}>
      <Text>
        <LinkedProjectName name={line.name} url={line.url} />
        {" — "}
        {line.description}
      </Text>
    </NumberedItem>
  );
}

export function ResumeDocument({ content }: Props) {
  const portfolioHost = content.portfolioUrl.replace(/^https?:\/\//, "");

  const profileLinks = content.links.map((l, i) => (
    <Text key={l.label}>
      {i > 0 ? " | " : null}
      <Link src={l.url}>{l.label}</Link>
    </Text>
  ));

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
              ({content.email} | Ph: {content.phone})
            </Text>
            <Text style={s.bio}>{content.bio}</Text>
            <Text style={s.linkRow}>
              <Text style={s.linkLabel}>Portfolio: </Text>
              <Link src={content.portfolioUrl}>{portfolioHost}</Link>
              <Text> | <Text style={s.linkLabel}>Links:</Text> </Text>
              {profileLinks}
            </Text>
          </View>
        </View>

        <Section title="TECH STACK">
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
              {job.products.map((product, productIndex) => (
                <ProductBullet
                  key={product.name}
                  index={productIndex + 1}
                  line={product}
                />
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
            {content.projects.length + 1}. Check out more projects I&apos;m working
            on at <Link src={content.portfolioUrl}>{portfolioHost}</Link>
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
