import { Hero } from "@/components/sections/Hero";
import { HomeSolutions } from "@/components/sections/HomeSolutions";
import { HomeCRM } from "@/components/sections/HomeCRM";
import { HomeEcosystems } from "@/components/sections/HomeEcosystems";
import { HomeBrief } from "@/components/sections/HomeBrief";
import { HomeProjects } from "@/components/sections/HomeProjects";
import { HomeClients } from "@/components/sections/HomeClients";
import { HomeStats } from "@/components/sections/HomeStats";
import { HomeBookDemo } from "@/components/sections/HomeBookDemo";
import { client } from "@/lib/sanity";
import { projectsQuery, servicesQuery } from "@/lib/queries";
import { projects as mockProjects, servicesList as mockServicesList } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  let sanityProjects = [];
  let sanityServices: any[] = [];
  try {
    sanityProjects = await client.fetch(projectsQuery);
    sanityServices = await client.fetch(servicesQuery);
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
  }

  const projects = sanityProjects?.length > 0 ? sanityProjects : mockProjects;
  const services = sanityServices?.length > 0 ? [...sanityServices, ...mockServicesList] : mockServicesList;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* 1. Hero Video */}
      <Hero />

      {/* 2. Solutions Looping Marquee */}
      <HomeSolutions />

      {/* 3. CRM Integrations Marquee */}
      <HomeCRM />

      {/* 4. Ecosystems (Compact Clickable Box) */}
      <HomeEcosystems services={services} />

      {/* 5. Brief About Opet */}
      <HomeBrief />

      {/* 6. Projects (3D Stacked Slider) */}
      <HomeProjects projects={projects} />

      {/* 7. Clients (Trusted by Global Leaders Marquee) */}
      <HomeClients />

      {/* 8. Stats (Units Sold, Projects, Countries) */}
      <HomeStats />

      {/* 9. Book a Demo CTA */}
      <HomeBookDemo />
    </main>
  );
}
