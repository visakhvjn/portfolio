import type { ResumeProductLine } from "./types";

/** Office products not modeled as portfolio projects — keyed by experience id. */
export const experienceProductExtras: Record<string, ResumeProductLine[]> = {
  unify: [
    {
      name: "MyKula",
      description:
        "A private community social platform connecting parents, educators, and local businesses.",
    },
  ],
  better: [
    {
      name: "Bionic",
      description:
        "UI Engineer for a platform that allows automating contractual work for companies.",
    },
    {
      name: "SunLead",
      description:
        "Team lead for a solar lead generation tool for the US markets.",
    },
  ],
  seenit: [
    {
      name: "Search",
      description:
        "Worked with Elasticsearch to improve the user search experience and faceted search.",
    },
  ],
  vawsum: [
    {
      name: "Vawme",
      description:
        "A teaching assistant that allowed prescribing courses to students based on classes and curriculum.",
    },
    {
      name: "Enquiry",
      description:
        "Admission inquiry using a Google Forms-type model with customised drag-and-drop forms for admissions, certificates, mark sheets, and more.",
    },
    {
      name: "RFID attendance",
      description:
        "Integrated RFID readers at schools to set up student attendance funnelled to parents as well.",
    },
    {
      name: "Timetable integration",
      description:
        "Integration of a 3rd party time-table generation software for classes, teacher assignment to free periods, and absent-teacher adjustments.",
    },
    {
      name: "Trakkerz",
      description:
        "School bus tracking application using .NET services with Google Maps live view on the admin panel.",
    },
    {
      name: "SMS module",
      description:
        "SMS tracking panel for multiple vendors with easy switching and auto-prioritising based on load.",
    },
  ],
};

/**
 * Product order per role. `slug` pulls from projects data; `extraIndex` picks from
 * experienceProductExtras[experienceId] in order.
 */
export const experienceProductOrder: Record<
  string,
  Array<{ slug?: string; extraIndex?: number }>
> = {
  unify: [
    { slug: "remus" },
    { slug: "unify-domains" },
    { slug: "lvpei" },
    { slug: "summit" },
    { slug: "relaxx-ai" },
    { slug: "unify-trust" },
    { extraIndex: 0 },
  ],
  better: [
    { slug: "nesh" },
    { extraIndex: 0 },
    { slug: "pinch-life" },
    { extraIndex: 1 },
    { slug: "recco-joy" },
  ],
  seenit: [{ slug: "styleade" }, { extraIndex: 0 }],
  vawsum: [{ slug: "vawsum-payments" }, { extraIndex: 0 }, { extraIndex: 3 }, { extraIndex: 1 }, { extraIndex: 2 }, { extraIndex: 4 }, { extraIndex: 5 }],
};
