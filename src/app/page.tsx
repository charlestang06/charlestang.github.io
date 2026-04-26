import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
  description: RESUME_DATA.summary,
};

export default function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-20">
      <section className="mx-auto w-full max-w-3xl space-y-12 bg-background print:space-y-6">
        {/* Hero Section */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex-1 space-y-3">
            <Avatar className="mb-8 size-44 ring-4 ring-muted sm:hidden">
              <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
              <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl font-bold tracking-tight">
              {RESUME_DATA.name}
            </h1>
            <p className="max-w-md text-pretty text-base text-muted-foreground">
              {RESUME_DATA.about}
            </p>
            <p className="max-w-md items-center text-pretty text-sm text-muted-foreground">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={RESUME_DATA.locationLink}
                target="_blank"
              >
                <GlobeIcon className="size-3" />
                {RESUME_DATA.location}
              </a>
            </p>
            <div className="flex gap-x-1 pt-1 text-sm text-muted-foreground print:hidden">
              {RESUME_DATA.contact.email ? (
                <Button
                  className="size-10"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={`mailto:${RESUME_DATA.contact.email}`}>
                    <MailIcon className="size-5" />
                  </a>
                </Button>
              ) : null}
              {RESUME_DATA.contact.social.map((social) => (
                <Button
                  key={social.name}
                  className="size-10"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={social.url}>
                    <social.icon className="size-5" />
                  </a>
                </Button>
              ))}
            </div>
            <div className="hidden flex-col gap-x-1 text-sm text-muted-foreground print:flex">
              {RESUME_DATA.contact.email ? (
                <a href={`mailto:${RESUME_DATA.contact.email}`}>
                  <span className="underline">{RESUME_DATA.contact.email}</span>
                </a>
              ) : null}
            </div>
          </div>
          <Avatar className="hidden size-44 ring-4 ring-muted sm:block">
            <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
            <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
          </Avatar>
        </div>

        {/* About */}
        <Section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            About
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {RESUME_DATA.summary}
          </p>
          <p className="text-pretty text-sm text-muted-foreground">
            View my{" "}
            <a
              className="underline underline-offset-4 transition-colors hover:text-foreground"
              href={RESUME_DATA.resumeUrl}
            >
              resume
            </a>
          </p>
        </Section>

        {/* Education */}
        <Section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Education
          </h2>
          {RESUME_DATA.education.map((education) => {
            return (
              <div key={education.school} className="space-y-1.5">
                <div className="flex items-center justify-between gap-x-2">
                  <h3 className="font-semibold leading-none">
                    {education.school}
                  </h3>
                  <div className="text-sm tabular-nums text-muted-foreground">
                    {"start" in education ? `${education.start} - ` : ""}
                    {education.end}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {education.degree}
                </p>
                {education.gpa != null ? (
                  <p className="text-xs text-muted-foreground">
                    GPA: {education.gpa} / 4.0
                  </p>
                ) : null}
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Relevant coursework: {education.coursework}
                </p>
              </div>
            );
          })}
        </Section>

        {/* Work Experience */}
        <Section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Experience
          </h2>
          <div className="space-y-0">
            {RESUME_DATA.work.map((work, index) => {
              return (
                <div
                  key={work.company}
                  className={`flex items-start gap-4 py-5 ${
                    index < RESUME_DATA.work.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="flex-shrink-0 pt-0.5">
                    <Avatar className="size-10">
                      <AvatarImage alt={work.company} src={work.logo} />
                      <AvatarFallback>
                        {work.company?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-x-2">
                      <h3 className="font-semibold leading-none">
                        <a className="hover:underline" href={work.link}>
                          {work.company}
                        </a>
                      </h3>
                      <div className="shrink-0 text-sm tabular-nums text-muted-foreground">
                        {work.start} - {work.end}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        {work.title}
                      </p>
                      {work.badges.map((badge) => (
                        <span
                          key={badge}
                          className="text-xs text-muted-foreground"
                        >
                          &middot; {badge}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {work.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Projects */}
        <Section className="scroll-mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Projects
          </h2>
          <div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-2">
            {RESUME_DATA.projects.map((project) => {
              return (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tags={project.techStack}
                  link={"link" in project ? project.link.href : undefined}
                  production={project.production ? project.production : false}
                />
              );
            })}
          </div>
        </Section>

        {/* Papers */}
        <Section className="scroll-mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Papers
          </h2>
          <div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-2">
            {RESUME_DATA.papers.map((paper) => {
              return (
                <ProjectCard
                  key={paper.title}
                  title={paper.title}
                  description={paper.description}
                  tags={paper.awards}
                  link={"link" in paper ? paper.link.href : undefined}
                />
              );
            })}
          </div>
        </Section>

        {/* Certificates */}
        <Section className="scroll-mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Certificates
          </h2>
          <div className="space-y-2">
            {RESUME_DATA.certificates.map((certificate) => (
              <div
                key={certificate.title}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <a
                    href={certificate.link.href}
                    target="_blank"
                    className="hover:underline"
                  >
                    {certificate.title}
                  </a>
                  <span className="text-muted-foreground">
                    {" "}
                    &mdash; {certificate.awardee.join(", ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Skills
          </h2>
          <div className="space-y-3">
            {Object.entries(RESUME_DATA.skills).map(([category, items]) => (
              <div key={category}>
                <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {category}
                </p>
                <div className="flex flex-wrap gap-1">
                  {items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-2 py-0.5 font-mono text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>
    </main>
  );
}
