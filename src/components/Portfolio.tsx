"use client";

import { useState } from "react";
import { ContactModal } from "./ContactModal";
import { ServicesModal } from "./ServicesModal";
import { Certificates } from "./Certificates";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { TechStack } from "./TechStack";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { Recommendations } from "./Recommendations";
import { SiteChrome } from "./SiteChrome";

export function Portfolio() {
  const [contactOpen, setContactOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <>
      <SiteChrome onContactClick={() => setContactOpen(true)}>
        <Hero
          onContactClick={() => setContactOpen(true)}
          onServicesClick={() => setServicesOpen(true)}
        />
        <Experience />
        <TechStack />
        <Projects />
        <Education />
        <Recommendations />
        <Certificates />
      </SiteChrome>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <ServicesModal
        open={servicesOpen}
        onClose={() => setServicesOpen(false)}
        onContactClick={() => setContactOpen(true)}
      />
    </>
  );
}
