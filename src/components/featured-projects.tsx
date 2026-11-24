"use client";

import { useId } from "react";
import { ShowMoreButton } from "./show-more-button";
import { ProjectCard } from "./project-card";
import { entryId } from "@/lib/skill-links";
import { useLinkedEntry } from "./use-linked-entry";

import type { Project } from "@/lib/portfolio-types";

function Cards({
  projects,
  expanded,
  panelId,
}: {
  projects: readonly Project[];
  expanded: boolean;
  panelId: string;
}) {
  return (
    <div
      id={panelId}
      className="featured-project-grid grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3 print:grid-cols-3 print:gap-2"
    >
      {projects.map((project, index) => (
        <div
          key={project.title}
          id={entryId("project", project.title)}
          tabIndex={-1}
          data-collapsible={index >= 3 ? true : undefined}
          className={`${index < 3 || expanded ? "flex" : "hidden"} scroll-mt-8 rounded-lg focus:outline-none print:flex [&>*]:w-full`}
        >
          <ProjectCard
            title={project.title}
            description={project.description}
            tags={project.techStack}
            link={project.link?.href}
            production={project.production}
          />
        </div>
      ))}
    </div>
  );
}

export function FeaturedProjects({
  projects,
}: {
  projects: readonly Project[];
}) {
  const { container, expanded, setExpanded } = useLinkedEntry();
  const panelId = useId();
  return (
    <div ref={container} className="-mx-3">
      <Cards projects={projects} expanded={expanded} panelId={panelId} />
      {projects.length > 3 && (
        <ShowMoreButton
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
          controls={panelId}
          className="mt-2"
          buttonClassName="min-h-7"
        />
      )}
    </div>
  );
}
