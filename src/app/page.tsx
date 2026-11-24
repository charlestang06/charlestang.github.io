import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { CertificateStack } from "@/components/certificate-stack";
import { FeaturedProjects } from "@/components/featured-projects";
import { ExperienceList } from "@/components/experience-list";
import { PaperBookshelf } from "@/components/paper-bookshelf";
import { SkillKeycaps } from "@/components/skill-keycaps";
import { SiteFooter } from "@/components/site-footer";
import { entryId } from "@/lib/skill-links";
import { ProductionIcon } from "@/components/production-icon";
import { ExperienceCard } from "@/components/experience-card";
import { Coursework } from "@/components/coursework";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} · Software Engineer`,
  description: RESUME_DATA.summary,
};

export default function Page() {
  return (
    <main
      id="top"
      className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-12"
    >
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-2">
            <Avatar className="mb-8 size-40 sm:hidden">
              <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
              <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold">{RESUME_DATA.name}</h1>
            <p className="max-w-md text-pretty font-mono text-base text-muted-foreground">
              {RESUME_DATA.about}
            </p>
            <p className="max-w-md items-center text-pretty font-mono text-sm text-muted-foreground">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={RESUME_DATA.locationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon className="size-3" />
                {RESUME_DATA.location}
              </a>
            </p>
            <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
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
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="size-5" />
                  </a>
                </Button>
              ))}
            </div>
            <div className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex">
              {RESUME_DATA.contact.email ? (
                <a href={`mailto:${RESUME_DATA.contact.email}`}>
                  <span className="underline">{RESUME_DATA.contact.email}</span>
                </a>
              ) : null}
            </div>
          </div>
          <Avatar className="hidden size-40 sm:block">
            <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
            <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
          </Avatar>
        </div>
        <Section>
          <h2 className="text-xl font-bold">About</h2>
          <p className="text-pretty font-mono text-sm text-muted-foreground">
            {RESUME_DATA.summary}
          </p>
        </Section>

        <Section id="education" className="scroll-mt-8">
          <h2 className="text-xl font-bold">Education</h2>
          {RESUME_DATA.education.map((education) => {
            return (
              <Card key={education.school}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="font-semibold leading-none">
                      {education.school}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="mt-2">{education.degree}</CardContent>
                {education.gpa != null ? (
                  <CardContent className="mt-2 text-xs">
                    GPA: {education.gpa} / 4.0
                  </CardContent>
                ) : null}
                <Coursework
                  selected={education.selectedCoursework}
                  all={education.coursework}
                />
              </Card>
            );
          })}
        </Section>

        <Section>
          <h2 className="text-xl font-bold">Experience</h2>
          <ExperienceList
            entryIds={RESUME_DATA.work.map((work) =>
              entryId("experience", work.company),
            )}
          >
            {RESUME_DATA.work.map((work) => (
              <ExperienceCard key={work.company} work={work} />
            ))}
          </ExperienceList>
        </Section>

        <Section className="scroll-mb-16">
          <h2 className="text-xl font-bold">Projects</h2>
          <p className="inline-flex items-center gap-2 font-mono text-xs text-gray-500">
            <ProductionIcon className="shrink-0 text-gray-500 hover:scale-110" />{" "}
            = production app
          </p>
          <FeaturedProjects projects={RESUME_DATA.projects} />
        </Section>

        <Section
          id="papers"
          className="!mt-0 scroll-mb-16 scroll-mt-8 print:!mt-6"
        >
          <h2 className="text-xl font-bold">Papers</h2>
          <PaperBookshelf papers={RESUME_DATA.papers} />
        </Section>

        <Section className="scroll-mb-16">
          <h2 className="text-xl font-bold">Certificates</h2>
          <CertificateStack certificates={RESUME_DATA.certificates} />
        </Section>

        <Section>
          <h2 className="text-xl font-bold">Skills</h2>
          <SkillKeycaps
            groups={RESUME_DATA.skillGroups}
            projects={RESUME_DATA.projects}
            experiences={RESUME_DATA.work}
          />
        </Section>
        <SiteFooter />
      </section>
    </main>
  );
}
