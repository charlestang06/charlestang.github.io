import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import {NumberCard} from "@/components/number-card";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Image from "next/image";

export const metadata: Metadata = {
  title: `DJ EQ | Charles Tang`,
  description: RESUME_DATA.djSummary,
};

export default function Page() {
  return (
    <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
    <main className="relative mx-auto w-full scroll-my-12 overflow-auto p-4 print:p-12 md:p-16 dark:bg-gray-950">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6 dark:bg-gray-950">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-2">
            <Avatar className="mb-8 size-40 sm:hidden">
              <AvatarImage alt="DJ EQ" src={RESUME_DATA.djAvatarUrl} />
              <AvatarFallback>DJ EQ</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold">DJ EQ (Charles)</h1>
            <p className="max-w-md items-center text-pretty font-mono text-sm text-muted-foreground">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={RESUME_DATA.locationLink}
                target="_blank"
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
              {RESUME_DATA.contact.dj ? (
                <Button
                  key={RESUME_DATA.contact.dj.name}
                  className="size-10"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href="/">
                    <Headphones className="size-5" />
                  </a>
                </Button>
              ) : null}
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
            <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.djAvatarUrl} />
            <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
          </Avatar>
        </div>
        <Section>
          <h2 className="text-xl font-bold">About</h2>
          <p className="text-pretty font-mono text-sm text-muted-foreground">
            {RESUME_DATA.djSummary}
          </p>
        </Section>

        <Section>
          <h2 className="text-xl font-bold">Experience</h2>
          <div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3 dark">
           <NumberCard
                  key="Number of Events"
                  title="Number of Events"
                  description="Parties, Graduations, Events"
                  number="5"
                  text_size="lg"
                />
            <NumberCard
                  key="DJ Setup"
                  title="DJ Setup"
                  description="Controller, Software, Speakers"
                  number="Numark NS7III + Serato DJ Pro"
                  text_size="md"
                />
            <NumberCard
                  key=""
                  title="Songs Played"
                  description="Total songs over all events"
                  number="350+"
                  text_size="lg"
                />
                </div>
        </Section>

        <Section>
          <h2 className="text-xl font-bold">Images</h2>
          <div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3">
              <Image src="https://charlestang06.github.io/photos/IMG_0648.JPG" alt="Charles House" width="300" height="200" />
              <Image src="https://charlestang06.github.io/photos/IMG_2439.JPG" alt="DJ Controller" width="300" height="200" />
              <Image src="https://charlestang06.github.io/photos/IMG_0732.JPEG" alt="NECYSC Dance" width="300" height="200" />
          </div>
        
        </Section>
      </section>
    </main>
    </ThemeProvider>
  );
}
