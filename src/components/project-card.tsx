import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
  production?: boolean;
}

export function ProjectCard({
  title,
  description,
  tags,
  link,
  production,
}: Props) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="">
        <div className="items-center space-y-1.5">
          <div className="flex w-full items-center gap-2">
            <CardTitle className="flex-1 text-base">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  {title}
                  <span className="size-1.5 rounded-full bg-green-500"></span>
                </a>
              ) : (
                title
              )}
            </CardTitle>
            {production && (
              <Badge variant="outline" className="shrink-0 text-[10px] font-normal">
                Live
              </Badge>
            )}
          </div>
          <CardDescription className="text-xs leading-relaxed">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex">
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge
              className="px-1.5 py-0 font-mono text-[10px]"
              variant="secondary"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
