export type Testimonial = {
  id: string;
  clientName: string;
  review: string;
  /** e.g. "United Kingdom" — Fiverr */
  location?: string;
  /** Fiverr gig title */
  gig?: string;
  /** e.g. "Fiverr" | "LinkedIn" */
  source?: string;
  /** Role or tagline under the name — LinkedIn */
  headline?: string;
  /** e.g. "Managed Visakh directly · November 2023" */
  relationship?: string;
};
