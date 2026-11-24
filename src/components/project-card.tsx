import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { ProductionIcon } from "./production-icon";
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
    <>
      <Card className="glow flex flex-col overflow-hidden border border-muted p-3">
        <CardHeader>
          <div className="items-center space-y-1">
            <div className="inline-flex w-full items-center gap-1">
              <CardTitle className="inline-flex w-full items-center text-base">
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    {title}{" "}
                    <span className="size-1 rounded-full bg-green-500"></span>
                  </a>
                ) : (
                  title
                )}
              </CardTitle>
              {production && (
                <>
                  <ProductionIcon className="-mr-0 hover:scale-110" />
                </>
              )}
            </div>
            <div className="hidden font-mono text-xs underline print:visible">
              {link
                ?.replace("https://", "")
                .replace("www.", "")
                .replace("/", "")}
            </div>
            <CardDescription className="font-mono text-xs">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex">
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px] hover:scale-105"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
