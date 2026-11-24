import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import type { Experience } from "@/lib/portfolio-types";

export function ExperienceCard({ work }: { work: Experience }) {
  return (
    <Card className="flex items-start gap-3 sm:gap-4">
      <div className="flex-shrink-0">
        <Avatar>
          <AvatarImage alt={work.company} src={work.logo} />
          <AvatarFallback>
            {work.company?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="min-w-0 flex-1">
        <CardHeader>
          <div className="flex flex-col items-start gap-1.5 text-base sm:flex-row sm:items-center sm:justify-between sm:gap-x-2">
            <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold leading-snug">
              <a
                className="hover:underline"
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {work.company}
              </a>

              <span className="hidden flex-wrap gap-1 sm:inline-flex">
                {work.badges.map((badge) => (
                  <Badge
                    variant="secondary"
                    className="align-middle text-xs"
                    key={badge}
                  >
                    {badge}
                  </Badge>
                ))}
              </span>
            </h3>
            <div className="hidden shrink-0 whitespace-nowrap font-mono text-[11px] tabular-nums leading-relaxed text-muted-foreground sm:block lg:text-xs">
              {work.start} – {work.end}
            </div>
          </div>

          <h4 className="font-mono text-sm leading-snug">{work.title}</h4>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[11px] leading-relaxed text-muted-foreground sm:hidden">
            <span className="whitespace-nowrap tabular-nums">
              {work.start} – {work.end}
            </span>
            {work.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </CardHeader>
        {"description" in work ? (
          <CardContent className="mt-2 text-xs">{work.description}</CardContent>
        ) : null}
      </div>
    </Card>
  );
}
