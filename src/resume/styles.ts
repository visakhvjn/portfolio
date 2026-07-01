import { StyleSheet } from "@react-pdf/renderer";

export const resumeStyles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 42,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.32,
    color: "#111",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 12,
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
    marginBottom: 5,
    textAlign: "justify",
  },
  linkRow: {
    marginTop: 2,
    fontSize: 9.5,
    lineHeight: 1.4,
  },
  section: {
    marginTop: 8,
    marginBottom: 2,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginBottom: 5,
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
  projectDescription: {
    textAlign: "justify",
    fontSize: 8.5,
    lineHeight: 1.3,
  },
  projectTable: {
    borderWidth: 1,
    borderColor: "#bbb",
  },
  projectTableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
  projectTableRowLast: {
    borderBottomWidth: 0,
  },
  projectTableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
  projectTableCell: {
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderRightColor: "#bbb",
  },
  projectTableCellLast: {
    borderRightWidth: 0,
  },
  projectTableHeaderText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
  },
  projectTableCellText: {
    fontSize: 8.5,
    lineHeight: 1.3,
  },
  projectTableSnoCol: {
    width: "6%",
  },
  projectTableNameCol: {
    width: "20%",
  },
  projectTableDescCol: {
    width: "46%",
  },
  projectTableTechCol: {
    width: "28%",
  },
  projectTableFootnote: {
    marginTop: 4,
    fontSize: 8.5,
    color: "#333",
  },
  numberedTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  experienceJobBlock: {
    marginBottom: 8,
  },
  experienceCompanyLine: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  experienceCompanyName: {
    fontSize: 11.5,
  },
  experienceRoleLine: {
    fontSize: 10,
    marginBottom: 4,
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
    marginTop: 6,
  },
  compactMetaLine: {
    marginBottom: 1,
    fontSize: 9,
    color: "#333",
  },
  compactMetaLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 0.3,
  },
});
