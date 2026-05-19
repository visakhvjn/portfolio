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
    "Warning: no profile image at public/images/profile.png — resume will omit photo.",
  );
}

const outDir = path.join(root, "public/resume");
const outFile = path.join(outDir, "Visakh_Vijayan_Resume.pdf");

fs.mkdirSync(outDir, { recursive: true });

const content = buildResumeContent(profileImagePath);

renderToFile(<ResumeDocument content={content} />, outFile)
  .then(() => {
    console.log(`Resume written to ${outFile}`);
  })
  .catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
