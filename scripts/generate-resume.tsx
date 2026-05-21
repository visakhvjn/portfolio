import { renderToFile } from "@react-pdf/renderer";
import fs from "node:fs";
import path from "node:path";
import { buildResumeContent } from "../src/resume/buildContent";
import { ResumeDocument } from "../src/resume/ResumeDocument";

const root = process.cwd();

const profileCandidates = [
  path.join(root, "public/images/profile.png"),
  path.join(root, "public/images/profile.jpg"),
];

const profileImagePath =
  profileCandidates.find((p) => fs.existsSync(p)) ?? null;

if (!profileImagePath) {
  console.warn(
    "Warning: no profile image at public/images/profile.png — photo resume will omit photo.",
  );
}

const outDir = path.join(root, "public/resume");

const variants = [
  {
    file: "Visakh_Vijayan_Resume.pdf",
    profileImagePath,
  },
  {
    file: "Visakh_Vijayan_Resume_No_Photo.pdf",
    profileImagePath: null,
  },
] as const;

fs.mkdirSync(outDir, { recursive: true });

async function main() {
  for (const variant of variants) {
    const outFile = path.join(outDir, variant.file);
    const content = buildResumeContent(variant.profileImagePath);
    await renderToFile(<ResumeDocument content={content} />, outFile);
    console.log(`Resume written to ${outFile}`);
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
