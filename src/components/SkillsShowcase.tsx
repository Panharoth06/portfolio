"use client"

import { useState } from "react"

interface Skill {
    name: string
    category: string
}

const skills: Skill[] = [
    { name: "Project Leader", category: "Leadership" },
    { name: "Spring Boot", category: "Backend" },
    { name: "Spring Data JPA", category: "Backend" },
    { name: "Hibernate", category: "Backend" },
    { name: "REST API Design", category: "Backend" },
    { name: "Microservices", category: "Backend" },
    { name: "gRPC", category: "Backend" },
    { name: "WebSocket", category: "Backend" },
    { name: "FastAPI", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Redis", category: "Database" },
    { name: "Entity Modeling", category: "Database" },
    { name: "OWASP Awareness", category: "Security" },
    { name: "Keycloak / IAM", category: "Security" },
    { name: "RBAC", category: "Security" },
    { name: "Docker", category: "DevOps" },
    { name: "Jenkins CI/CD", category: "DevOps" },
    { name: "Shell Scripting", category: "DevOps" },
    { name: "GCP", category: "DevOps" },
    { name: "Linux", category: "DevOps" },
    { name: "SDLC", category: "Process" },
]

const categories = ["All", "Backend", "Database", "Security", "DevOps", "Leadership", "Process"]

export function SkillsShowcase() {
    const [active, setActive] = useState("All")

    const filtered = active === "All" ? skills : skills.filter((s) => s.category === active)

    const gridClass =
        filtered.length <= 5
            ? "flex flex-wrap justify-center gap-3"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"

    return (
        <section className="w-full my-20">
            {/* Header */}
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
                <div className="inline-block px-3 py-1 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
                    <span className="text-xs tracking-widest uppercase text-primary font-mono">
                        Technical Skills
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-foreground/50 via-foreground to-foreground/50 bg-size-[200%_auto] animate-shine">
                    What I Work With
                </h2>
                <p className="text-sm text-muted-foreground max-w-md">
                    A snapshot of the tools, frameworks, and practices I use to build and secure systems.
                </p>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border transition-all duration-200 ${active === cat
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:border-border/80 hover:text-muted-foreground/80 bg-transparent"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Skills */}
            <div className={gridClass}>
                {filtered.map((skill) => (
                    <SkillPill key={skill.name} skill={skill} />
                ))}
            </div>
        </section>
    )
}

function SkillPill({ skill }: { skill: Skill }) {
    return (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-border bg-card backdrop-blur-sm transition-all duration-200 hover:border-border/80 hover:bg-card/80 cursor-default">
            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-muted-foreground" />
            <span className="text-sm font-medium text-foreground leading-tight whitespace-nowrap">
                {skill.name}
            </span>
        </div>
    )
}
