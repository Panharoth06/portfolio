import { Project } from "@/types/ProjectType";

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
    {
        project_name: "Banking API System",
        category: "Backend System",
        description:
            "A secure banking REST API with RBAC, KYC verification, Keycloak authentication, and file upload for identity documents.",
        technologies: ["Spring Boot", "PostgreSQL", "Keycloak", "REST API"],
        year: 2025,
    },
    {
        project_name: "Auto-Offensive",
        category: "Security Platform (Team Project)",
        description:
            "A platform for automated security scanning and remote code execution, helping developers detect vulnerabilities through source code analysis, dependency scanning, and AI-assisted remediation — with real-time logs, job orchestration, and CLI/TUI support.",
        technologies: [
            "FastAPI",
            "Golang (gRPC)",
            "SSE",
            "PostgreSQL",
            "Redis",
            "MinIO",
            "Docker",
            "Jenkins",
            "SonarQube",
            "Trivy",
            "Next.js",
            "Tailwind CSS",
            "BetterAuth",
            "MCP / Claude",
        ],
        year: 2025,
    },
];

export function ProjectExperience() {
    return (
        <section className="w-full my-20">
            {/* Header */}
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
                <div className="inline-block px-3 py-1 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
                    <span className="text-xs tracking-widest uppercase text-primary font-mono">
                        Projects
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-foreground/50 via-foreground to-foreground/50 bg-size-[200%_auto] animate-shine">
                    Project Experience
                </h2>
                <p className="text-sm text-muted-foreground max-w-md">
                    A selection of projects I&apos;ve built, from backend systems to full-stack platforms.
                </p>
            </div>
            <div className="mb-40 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {projects.map((project: Project, index: number) => (
                    <div
                        id="project-section"
                        key={index}
                        className="group relative h-full w-full overflow-hidden rounded-xl bg-card/30 p-px border border-border/40"
                    >
                        <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-primary)_50%,transparent_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-60 dark:group-hover:opacity-100" />

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
                                {project.technologies.map((tech: string) => (
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
        </section>
    );
}
