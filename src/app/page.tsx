'use client'
import { NeuralBackground } from "@/components/NeuralBackground"
import Image from "next/image";

import me from "./../../public/me.jpg"
import { WavePath } from "@/components/ui/wave-path";
import { OrbitIcon, OrbitRotation } from "@/components/ui/orbit-rotation";
import { FaDocker, FaJava } from "react-icons/fa";
import { SiArchlinux, SiCplusplus, SiCyberdefenders, SiFastapi, SiGithub, SiKalilinux, SiKatana, SiKeycloak, SiNextdotjs, SiPostgresql, SiPostman, SiSpringboot, SiSwagger, SiTypescript, SiWireshark } from "react-icons/si";
import Link from "next/link";
import CircularText from "@/components/CircularButton";

interface Project {
  project_name: string;
  category: string;
  description: string;
  technologies: string[];
  year: number;
}

const projects: Project[] = [
  {
    project_name: "EMP Manage Pro",
    category: "Console-Based System",
    description:
      "A robust employee management system featuring role management, structured records, and QR-based check-in/check-out for attendance tracking.",
    technologies: ["C++", "Python (Flask)", "HTML", "CSS"],
    year: 2024,
  },
  {
    project_name: "Reandata",
    category: "Educational Web Platform",
    description:
      "A learning-focused platform designed for students interested in data analytics, offering curated content and exploratory resources.",
    technologies: ["React + Vite", "Redux Toolkit", "Zod", "Tailwind CSS"],
    year: 2025,
  },
  {
    project_name: "CodeCompass",
    category: "Developer Platform",
    description:
      "A competitive programming and algorithm practice platform where developers solve problems authored by the community, powered by secure authentication and online code execution.",
    technologies: [
      "Spring Boot",
      "Next.js",
      "TypeScript",
      "Keycloak",
      "shadcn/ui",
      "Docker",
      "Judge0",
    ],
    year: 2025,
  },
];

const predefined_icons: OrbitIcon[] = [
  { Icon: SiKalilinux, name: "Kali" },
  { Icon: SiSpringboot, name: "Spring Boot" },
  { Icon: SiNextdotjs, name: "NextJS" },
  { Icon: FaDocker, name: "Docker" },
  { Icon: SiArchlinux, name: "Arch" },
  { Icon: SiSwagger, name: "Swagger" },
  { Icon: SiKeycloak, name: "Keycloak" },
  { Icon: SiPostman, name: "Postman" },
  { Icon: SiKatana, name: "Katana" },
  { Icon: SiWireshark, name: "Wire shark" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: FaJava, name: "Java" },
  { Icon: SiPostgresql, name: "PostgreSQL" },
  { Icon: SiCplusplus, name: "C++" },
  { Icon: SiFastapi, name: "FastAPI" }
]

const center_icon: OrbitIcon = {
  Icon: SiCyberdefenders, name: "Cybersecurity"
}


export default function Home() {
  return (
    <NeuralBackground>
      <div className="container mx-auto px-6 min-h-screen flex flex-col justify-center items-center">

        <section className="container mx-auto px-6 py-20 md:py-32 mb-20">
          {/* Grid Container: 1 col on mobile, 2 cols on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* COLUMN 1: TEXT CONTENT */}
            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-block px-3 py-1 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
                <span className="text-xs tracking-widest uppercase text-primary animate-shine font-mono">
                  Cybersecurity
                </span>
              </div>

              {/* Heading */}
              <h1
                className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-foreground/50 via-foreground to-foreground/50 bg-size-[200%_auto] animate-shine leading-tight"
              >
                PANHAROTH <br /> CHHENG.
              </h1>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                I build secure, scalable digital systems with a strong focus on
                cybersecurity, performance, and modern web architecture.
              </p>

              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                {/* Primary Button */}
                <a
                  href="#project-section"
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                  View Projects
                </a>

                <Link
                  href="https://github.com/Panharoth06"
                  target="_blank"
                  className="px-8 py-3 flex items-center gap-2 border border-border bg-card/50 hover:bg-card/80 transition-colors rounded-md backdrop-blur-sm group"
                >
                  <SiGithub className="text-xl group-hover:text-primary transition-colors" />
                  <span className="font-medium">GitHub</span>
                </Link>
              </div>
            </div>

            {/* COLUMN 2: IMAGE */}
            {/* We use 'order-1 lg:order-2' to put image on top on mobile, but right side on desktop */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">

              {/* Decorative Glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-primary/20 rounded-full blur-[100px] -z-10" />

              {/* Image Container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-100 lg:h-100 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-card/30 backdrop-blur-sm">
                <Image
                  src={me}
                  alt="Panharoth Chheng"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </section>

        <WavePath className="mb-40 sm:mb-60" />

        <div className="mb-10 sm:mb-20 w-full flex justify-center">
          <div className="scale-[0.6] sm:scale-[0.85] md:scale-100 transform-gpu">
            <OrbitRotation
              icons={predefined_icons}
              orbitCount={3}
              orbitGap={6}
              size="lg"
              centerIcon={center_icon}
            />
          </div>
        </div>



        <div className="my-40 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {projects.map((project, index) => (
            <div
              id="project-section"
              key={index}
              className="group relative h-full w-full overflow-hidden rounded-xl bg-card/30 p-px"
            >
              <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-primary)_50%,transparent_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 h-full w-full rounded-xl bg-card/95 backdrop-blur-md p-6 transition-colors">
                <span className="text-xs uppercase tracking-widest text-primary font-mono">
                  {project.category}
                </span>

                <h3 className="text-xl font-bold mt-2 mb-2">
                  {project.project_name}
                </h3>

                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 border border-border rounded-md bg-card/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <CircularText/>
    </NeuralBackground>
  )
}