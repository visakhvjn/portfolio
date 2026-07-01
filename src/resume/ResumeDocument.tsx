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

function LinkedProjectTitle({ title, url }: { title: string; url?: string }) {
  if (url) {
    return <Link src={url}>{title}</Link>;
  }
  return <>{title}</>;
}

type ProjectTableColumnStyle =
  | typeof s.projectTableSnoCol
  | typeof s.projectTableNameCol
  | typeof s.projectTableDescCol
  | typeof s.projectTableTechCol;

function ProjectTableCell({
  children,
  columnStyle,
  last,
}: {
  children: ReactNode;
  columnStyle: ProjectTableColumnStyle;
  last?: boolean;
}) {
  return (
    <View
      style={[
        s.projectTableCell,
        columnStyle,
        ...(last ? [s.projectTableCellLast] : []),
      ]}
    >
      {children}
    </View>
  );
}

function ProjectsTable({
  projects,
  portfolioUrl,
}: {
  projects: ResumeContent["projects"];
  portfolioUrl: string;
}) {
  const portfolioHost = portfolioUrl.replace(/^https?:\/\//, "");

  return (
    <>
      <View style={s.projectTable}>
        <View style={s.projectTableHeaderRow}>
          <ProjectTableCell columnStyle={s.projectTableSnoCol}>
            <Text style={s.projectTableHeaderText}>SNo</Text>
          </ProjectTableCell>
          <ProjectTableCell columnStyle={s.projectTableNameCol}>
            <Text style={s.projectTableHeaderText}>Project Name</Text>
          </ProjectTableCell>
          <ProjectTableCell columnStyle={s.projectTableDescCol}>
            <Text style={s.projectTableHeaderText}>Project Description</Text>
          </ProjectTableCell>
          <ProjectTableCell columnStyle={s.projectTableTechCol} last>
            <Text style={s.projectTableHeaderText}>Tech Stack used</Text>
          </ProjectTableCell>
        </View>
        {projects.map((project, index) => (
          <View
            key={project.title}
            style={[
              s.projectTableRow,
              ...(index === projects.length - 1 ? [s.projectTableRowLast] : []),
            ]}
          >
            <ProjectTableCell columnStyle={s.projectTableSnoCol}>
              <Text style={s.projectTableCellText}>{index + 1}</Text>
            </ProjectTableCell>
            <ProjectTableCell columnStyle={s.projectTableNameCol}>
              <Text style={s.projectTableCellText}>
                <LinkedProjectTitle title={project.title} url={project.url} />
              </Text>
            </ProjectTableCell>
            <ProjectTableCell columnStyle={s.projectTableDescCol}>
              <RichText text={project.description} />
            </ProjectTableCell>
            <ProjectTableCell columnStyle={s.projectTableTechCol} last>
              <Text style={s.projectTableCellText}>{project.tech}</Text>
            </ProjectTableCell>
          </View>
        ))}
      </View>
      <Text style={s.projectTableFootnote}>
        Additional projects and technical case studies available at{" "}
        <Link src={portfolioUrl}>{portfolioHost}</Link>.
      </Text>
    </>
  );
}

/** Renders plain text with **bold** segments for react-pdf. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <Text style={s.projectDescription}>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <Text key={i} style={{ fontFamily: "Helvetica-Bold" }}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
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

function HeaderLinks({
  links,
}: {
  links: { label: string; url: string }[];
}) {
  return (
    <Text style={s.linkRow}>
      {links.map((link, i) => (
        <Text key={link.url}>
          {i > 0 ? " · " : ""}
          <Link src={link.url}>{link.label}</Link>
        </Text>
      ))}
    </Text>
  );
}

export function ResumeDocument({ content }: Props) {
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
            <Text style={s.titleLine} wrap={false}>
              {content.title}
            </Text>
            <Text style={s.contactLine}>
              {content.email} | {content.phone}
            </Text>
            <Text style={s.bio}>{content.bio}</Text>
            <HeaderLinks links={headerLinks} />
          </View>
        </View>

        <Section title="SKILLS">
          {content.skillCategories.map((cat, i) => (
            <Text key={cat.title} style={s.numberedBlock}>
              {i + 1}. {cat.title} — {cat.items}
            </Text>
          ))}
        </Section>

        <Section title="EDUCATION">
          {content.education.map((e, i) => (
            <Text key={e.line} style={s.numberedBlock}>
              {i + 1}. {e.line}
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

        <Section title="PROJECTS">
          <ProjectsTable
            projects={content.projects}
            portfolioUrl={content.portfolioUrl}
          />
        </Section>

        <View style={s.compactMeta}>
          <Text style={s.compactMetaLine}>
            <Text style={s.compactMetaLabel}>ACHIEVEMENTS — </Text>
            {content.achievements.join(" · ")}
          </Text>
          <Text style={s.compactMetaLine}>
            <Text style={s.compactMetaLabel}>LANGUAGES — </Text>
            {content.languages}
          </Text>
          <Text style={s.compactMetaLine}>
            <Text style={s.compactMetaLabel}>INTERESTS — </Text>
            {content.interests}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
