"use client";

import { useState } from "react";
import { About } from "./About";
import { Contact } from "./Contact";
import { ServicesModal } from "./ServicesModal";
import { Experience } from "./Experience";
import { TechStack } from "./TechStack";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { SiteChrome } from "./SiteChrome";

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export function Portfolio() {
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <>
      <SiteChrome onContactClick={scrollToContact}>
        <Hero
          onContactClick={scrollToContact}
          onServicesClick={() => setServicesOpen(true)}
        />
        <TechStack />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </SiteChrome>
      <ServicesModal
        open={servicesOpen}
        onClose={() => setServicesOpen(false)}
        onContactClick={scrollToContact}
      />
    </>
  );
}
