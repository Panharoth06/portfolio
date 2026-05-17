'use client'
import { NeuralBackground } from "@/components/NeuralBackground"
import Image from "next/image";

import { WavePath } from "@/components/ui/wave-path";
import { OrbitIcon, OrbitRotation } from "@/components/ui/orbit-rotation";
import { FaDocker, FaJava } from "react-icons/fa";
import { SiArchlinux, SiCplusplus, SiCyberdefenders, SiFastapi, SiGithub, SiJenkins, SiKalilinux, SiKatana, SiKeycloak, SiNextdotjs, SiPostgresql, SiPostman, SiRust, SiSpringboot, SiSwagger, SiTypescript, SiWireshark } from "react-icons/si";
import Link from "next/link";
import CircularText from "@/components/CircularButton";
import { FaGolang } from "react-icons/fa6";
import { SkillsShowcase } from "@/components/SkillsShowcase";
import { ProjectExperience } from "@/components/ProjectExperience";

const predefined_icons: OrbitIcon[] = [
  { Icon: SiJenkins, name: "Jenkins" },
  { Icon: SiSpringboot, name: "Spring Boot" },
  { Icon: SiNextdotjs, name: "NextJS" },
  { Icon: FaDocker, name: "Docker" },
  { Icon: SiArchlinux, name: "Arch" },
  { Icon: SiSwagger, name: "Swagger" },
  { Icon: SiKeycloak, name: "Keycloak" },
  { Icon: SiGithub, name: "Github" },
  { Icon: SiRust, name: "Rust" },
  { Icon: FaGolang, name: "Golang" },
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

        <section id="hero" className="container mx-auto px-6 py-20 md:py-32 mb-20">
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
                  src="/me.jpg"
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

        <div className="mb-10 sm:mb-40 w-full flex justify-center">
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

        <section id="skills">
          <SkillsShowcase />
        </section>

        <section id="projects">
          <ProjectExperience />
        </section>

      </div>
      <CircularText />
    </NeuralBackground>
  )
}