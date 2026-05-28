"use client";

import { site } from "@/data/site";
import { useState } from "react";
import { ContactModal } from "./ContactModal";
import { ServicesModal } from "./ServicesModal";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { TechStack } from "./TechStack";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Projects } from "./Projects";
import { Recommendations } from "./Recommendations";

export function Portfolio() {
  const [contactOpen, setContactOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <>
      <Navbar onContactClick={() => setContactOpen(true)} />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6">
        <Hero
          onContactClick={() => setContactOpen(true)}
          onServicesClick={() => setServicesOpen(true)}
        />
        <Experience />
        <TechStack />
        <Projects />
        <Education />
        <Recommendations />
        <footer className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          <p>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline"
            >
              WhatsApp
            </a>
            {" · "}
            <a href={`mailto:${site.email}`} className="hover:text-emerald-400">
              {site.email}
            </a>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Visakh Vijayan.</p>
        </footer>
      </main>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <ServicesModal
        open={servicesOpen}
        onClose={() => setServicesOpen(false)}
        onContactClick={() => setContactOpen(true)}
      />
    </>
  );
}
