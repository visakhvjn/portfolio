import { StyleSheet } from "@react-pdf/renderer";

export const resumeStyles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 42,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.35,
    color: "#111",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 14,
    objectFit: "cover",
  },
  headerText: {
    flex: 1,
    paddingTop: 2,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    lineHeight: 1.2,
  },
  titleLine: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
    lineHeight: 1.3,
  },
  contactLine: {
    fontSize: 9.5,
    marginBottom: 6,
    lineHeight: 1.4,
  },
  bio: {
    marginBottom: 8,
    textAlign: "justify",
  },
  linkRow: {
    marginTop: 2,
    fontSize: 9.5,
    lineHeight: 1.4,
  },
  section: {
    marginTop: 10,
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginBottom: 8,
    letterSpacing: 0.3,
    textDecoration: "underline",
    textDecorationColor: "#111",
  },
  sectionBody: {
    paddingLeft: 14,
    marginTop: 2,
  },
  numberedBlock: {
    marginBottom: 3,
  },
  projectBlock: {
    marginBottom: 8,
  },
  projectTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  projectDescription: {
    textAlign: "justify",
  },
  numberedTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  experienceJobBlock: {
    marginBottom: 12,
  },
  experienceCompanyLine: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  experienceCompanyName: {
    fontSize: 11.5,
  },
  experienceRoleLine: {
    fontSize: 10,
    marginBottom: 6,
    color: "#333",
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 8,
  },
  bulletMarker: {
    width: 16,
  },
  bulletText: {
    flex: 1,
  },
  muted: {
    color: "#333",
  },
  compactMeta: {
    marginTop: 10,
  },
  compactMetaLine: {
    marginBottom: 2,
    fontSize: 9.5,
    color: "#333",
  },
  compactMetaLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 0.3,
  },
});
